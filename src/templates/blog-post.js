import * as React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import Bio from "../components/Bio"
import Link from "../components/Link"
import Layout from "../components/Layout"
import Seo from "../components/SEO"

const getDiscussUrl = (translations, defaultLang, host) => {
  const defaultTranslation = translations.find(
    trans => trans.lang === defaultLang
  )
  if (!defaultTranslation) {
    return ""
  }
  const page = `${host}${defaultTranslation.link}`
  const search = encodeURIComponent(page)
  return `https://mobile.twitter.com/search?q=${search}`
}

const getEditUrl = ({
  githubUsername,
  githubRepository,
  pathFolder,
  lang,
  defaultLang
}) => {  
  const file = `index${lang === defaultLang ? "" : `.${lang}`}.md`
  return `https://github.com/${githubUsername}/${githubRepository}/edit/master/${pathFolder}/${file}`
}

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark

  const { t } = useTranslation()
  const {
    fields: { directoryName },
  } = post

  const { translations, defaultLang, lang } = pageContext
  const {
    githubRepository,
    githubUsername,
    contentFolderPath,
    siteUrl,
    social,
  } = data.site.siteMetadata
  const twitter = social?.twitter
  const title = t("blogTitle")
  const { previous, next } = data
  const discussUrl = getDiscussUrl(translations, defaultLang, siteUrl)
  
  const editUrl = getEditUrl({
    githubRepository,
    githubUsername,
    pathFolder: `${contentFolderPath}/${directoryName}`,
    lang,
    defaultLang
  })
  const shouldDisplayFooter = twitter || githubUsername

  return (
    <Layout location={location} title={title}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p style={{ textTransform: "" }}>{post.frontmatter.date}</p>
        </header>
        <div>
          <p style={{ fontWeight: "bold" }}>
            {t("translations")}:{" "}
            {translations.map(trans => {
              if (trans.lang !== lang) {
                return (
                  <Link
                    to={trans.link}
                    language={trans.lang}
                    key={trans.lang}
                    style={{
                      display: "inline-block",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    {trans.lang}
                  </Link>
                )
              }
              return "";
            })}
          </p>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        {shouldDisplayFooter && (
          <>
            <footer>
              <p>
                {twitter && (
                  <a
                    href={discussUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("discussOnTwitter")}
                  </a>
                )}
                {githubUsername && (
                  <>
                    {` • `}
                    <a href={editUrl} target="_blank" rel="noopener noreferrer">
                      {t("editOnGithub")}
                    </a>
                  </>
                )}
              </p>
            </footer>
            <hr />
          </>
        )}
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.frontmatter.path}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.frontmatter.path}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $lang: String!
    $dateFormatString: String!
  ) {
    site {
      siteMetadata {
        social {
          twitter
        }
        siteUrl
        githubUsername
        githubRepository
        contentFolderPath
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        directoryName
      }
      frontmatter {
        title
        date(formatString: $dateFormatString, locale: $lang)
        description
      }
    }
    previous: markdownRemark(
      id: { eq: $previousPostId }
      frontmatter: { lang: { eq: $lang } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        path
        lang
      }
    }
    next: markdownRemark(
      id: { eq: $nextPostId }
      frontmatter: { lang: { eq: $lang } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        path
        lang
      }
    }
  }
`
