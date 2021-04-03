import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import { usePageContext } from '../context/PageContext';

const Link = ({ to, language, children, className, hrefLang, itemProp, rel, style, noDecoration }) => {
    const { lang } = usePageContext();

    let href = `/${lang}${to}`;

    if (language) {
        href = `${to}`;
    }

    const extra = {};

    if (className) {
        extra.className = className;
    }

    if (noDecoration) {
        const resetDecoration = css`
            box-shadow: none;
            text-decoration: none;
            background: none;
        `;

        extra.css = resetDecoration;
    }

    return (
        <GatsbyLink
            rel={rel}
            hrefLang={hrefLang}
            to={href}
            itemProp={itemProp}
            style={{ ...style }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...extra}
        >
            {children}
        </GatsbyLink>
    );
};

export default Link;
