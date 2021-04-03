import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { usePageContext } from "../context/PageContext"

const Link = ({ to, language, children, ...rest }) => {
  const { lang } = usePageContext()
  
  let href = `/${lang}${to}`

  if (language) {
      href = `${to}`;
  }
  
  return <GatsbyLink {...rest} to={href} >{children}</GatsbyLink>
}

export default Link
