import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)
  const { t } = useTranslation()
  const twitter = data.site.siteMetadata?.social?.twitter || ""

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <p
        dangerouslySetInnerHTML={{
          __html: t("footer", {
            author: `<strong>${t("author")}</strong>`,
            authorSummary: t("authorSummary"),
            link: `<a href="https://twitter.com/${twitter}">${t("followOnTwitter")}</a>`,
          }),
        }}
      />
    </div>
  )
}

export default Bio
