import * as React from "react"
import Link from "./Link"
import { usePageContext } from "../context/PageContext"

const LanguageSelector = props => {
  const { lang, supportedLanguages } = usePageContext()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {supportedLanguages.map(code => {
        return (
          <Link
            style={{
              fontFamily: "var(--fontFamily-sans)",
              marginRight: "0.5em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: lang === code ? "bold" : "normal",
            }}
            key={code}
            language={code}
            to={`/${code}`}
          >
            {code}
          </Link>
        )
      })}
    </div>
  )
}

export default LanguageSelector;
