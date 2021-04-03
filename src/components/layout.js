import * as React from "react"
import Link  from "./Link"
import { useTranslation } from "react-i18next"

import { usePageContext } from "../context/PageContext"
import LanguageSelector from "./LanguageSelector";

const Layout = ({ location, children }) => {
  const { lang, supportedLanguages = [] } = usePageContext() 
  const { t } = useTranslation();
  
  // also add path without lang as the root
  const roots = supportedLanguages.map(lang => `/${lang}`).concat(["/"]);
  const isRootPath = roots.indexOf(location.pathname) > -1;
  const rootPath = `/${lang}`

  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to={rootPath}>{t("blogTitle")}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to={rootPath} language={lang}>
        {t("blogTitle")}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {isRootPath && <LanguageSelector />}
        {header}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, {t("builtWith")}
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
