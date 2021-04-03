import * as React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

import Link from "../components/Link"
import Bio from "../components/Bio"
import Layout from "../components/Layout"
import Seo from "../components/SEO"


const BlogIndex = ({ data, location, pageContext}) => {
  const { t } = useTranslation()
  const {lang} = pageContext;
  const siteTitle = t("blogTitle")
  const posts = data.allMarkdownRemark.nodes
  const postsInLocale = posts.filter(post => post.frontmatter.lang === lang)

  if (postsInLocale.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={t("indexPageTitle")} />
      <Bio />
      
      <ol style={{ listStyle: `none` }}>
        {postsInLocale.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.frontmatter.path}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`/${post.frontmatter.path}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    {post.frontmatter.date}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($lang: String!, $dateFormatString: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: $lang } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: $dateFormatString, locale: $lang)
          title
          description
          lang
          path
        }
      }
    }
  }
`
