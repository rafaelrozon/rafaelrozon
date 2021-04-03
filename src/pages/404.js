import * as React from "react"
import { useTranslation } from "react-i18next"

import Layout from "../components/Layout"
import Seo from "../components/SEO"

const NotFoundPage = ({ location }) => {
  const { t } = useTranslation()
  return (
    <Layout location={location} title={t("blogTitle")}>
      <Seo title={t("notFound")} />
      <h1>{t("notFound")}</h1>
      <p>{t("notFoundWarning")}</p>
    </Layout>
  )
}

export default NotFoundPage