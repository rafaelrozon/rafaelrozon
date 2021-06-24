/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
/** @jsx jsx */
import { jsx, css as cx, SerializedStyles } from '@emotion/react';

import { usePageContext } from '../context/PageContext';

interface LinkProps {
    language?: string;
    className?: string;
    noDecoration?: boolean;
    byPass?: boolean;
    styles?: SerializedStyles;
}

const Link: React.FC<LinkProps & React.ComponentProps<typeof GatsbyLink>> = ({
    to,
    language,
    children,
    hrefLang,
    itemProp,
    rel,
    styles,
    noDecoration,
    byPass,
    ...others
}): React.ReactElement => {
    const { lang } = usePageContext();

    let href = `/${lang}${to}`;

    if (language || byPass) {
        href = `${to}`;
    }

    return (
        <GatsbyLink
            rel={rel}
            hrefLang={hrefLang}
            to={href}
            itemProp={itemProp}
            css={styles}
            {...(noDecoration && {
                css: cx`
                    box-shadow: none;
                    text-decoration: none;
                    background: none;
                `
            })}
            {...others}
        >
            {children}
        </GatsbyLink>
    );
};

export default Link;
