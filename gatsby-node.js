const path = require(`path`)
const fs = require("fs-extra")
const { groupBy, indexBy, prop } = require("ramda")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogIndex = path.resolve("./src/templates/blog-index.js")

  const getTranslations = (postData) => {
    return Object.values(postData)
      .map(trans => {
        const { path, lang } = trans.frontmatter
        return {
          link: `/${lang}/${path}`,
          lang,
        }
      })
  }

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
              directoryName
            }
            frontmatter {
              path
              lang
            }
          }
        }
        site {
          siteMetadata {
            i18n {
              defaultLang
              locales {
                lang
                dateFormat
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  const { i18n } = result.data.site.siteMetadata
  const { defaultLang, locales } = i18n
  const supportedLanguages = locales.map(locale => locale.lang)
  const localesByKey = indexBy(prop("lang"), locales)

  const postsByDirectoryName = groupBy(post => post.fields.directoryName, posts)

  const createPosts = (postsList, lang) => {
    if (postsList.length > 0) {
      postsList.forEach((post, index) => {
        const previousPostId = index === 0 ? null : postsList[index - 1].id

        const nextPostId =
          index === postsList.length - 1 ? null : postsList[index + 1].id

        const translations = getTranslations(
          postsByDirectoryName[post.fields.directoryName]
        )

        const { path, lang: postLang } = post.frontmatter
        const pagePath = `/${lang}/${path}`

        createPage({
          path: pagePath,
          component: blogPost,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
            translations,
            pagePath,
            lang,
            defaultLang,
            supportedLanguages,
            dateFormatString: localesByKey[postLang].dateFormat,
          },
        })
      })
    }
  }

  // create index page for each lang
  supportedLanguages.forEach(lang => {
    createPage({
      path: `/${lang}`,
      component: blogIndex,
      context: {
        lang,
        defaultLang,
        supportedLanguages,
        dateFormatString: localesByKey[lang].dateFormat,
        pagePath: `/${lang}`
      },
    })
  })

  createPage({
    path: `/`,
    component: blogIndex,
    context: {
      lang: defaultLang,
      pagePath: `/${defaultLang}`,
      defaultLang,
      supportedLanguages,
      dateFormatString: localesByKey[defaultLang].dateFormat,
    },
  })

  supportedLanguages.forEach(lang => {
    const postsByLang = posts.filter(post => {
      return post.frontmatter.lang === lang
    })
    createPosts(postsByLang, lang)
  })
}

exports.onCreateNode = ({ node, actions, getNode  }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    createNodeField({
      name: `directoryName`,
      node,
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    })

    createNodeField({
      name: `translations`,
      node,
      value: [],
    })

    createNodeField({
      name: `supportedLanguages`,
      node,
      value: [],
    })

    createNodeField({
      name: `lang`,
      node,
      value: "en",
    })
  }
}

exports.onPostBuild = () => {
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales")
  )
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      contentFolderPath: String
      githubUsername: String
      githubRepository: String
      i18n: I18n
    }

    type I18n {
      defaultLang: String
      locales: [LocaleConfig]
    }

    type LocaleConfig {
      lang: String!
      dateFormat: String!
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      lang: String
      path: String
    }

    type Fields {
      slug: String
      directoryName: String
    }
  `)
}
