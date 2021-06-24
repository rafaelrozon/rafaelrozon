import * as React from 'react';
import { useTranslation } from 'react-i18next';

/** @jsx jsx */
import { jsx, css, useTheme, Global } from '@emotion/react';

import Link from './Link';
import { usePageContext } from '../context/PageContext';
import LanguageSelector from './LanguageSelector';
import { rh } from '../utils/typography';

interface LayoutProps {
    location: Location;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ location, children, title }) => {
    const { lang, supportedLanguages = [] } = usePageContext();
    const { t } = useTranslation();
    const theme = useTheme();

    // also add path without lang as the root
    const roots = supportedLanguages.map(lang => `/${lang}`).concat(['/']);
    const isRootPath = roots.indexOf(location.pathname) > -1;
    const rootPath = `/${lang}`;

    let header;

    if (isRootPath) {
        header = (
            <h1
                css={css`
                    margin-top: 0;
                    color: ${theme.colors.primary};
                `}
            >
                <Link
                    language={lang}
                    noDecoration
                    css={css`
                        color: ${theme.colors.primary};
                    `}
                    to={rootPath}
                >
                    {title}
                </Link>
            </h1>
        );
    } else {
        header = (
            <Link
                noDecoration
                css={css`
                    font-weight: bold;
                    color: ${theme.colors.secondary};
                `}
                to={rootPath}
                language={lang}
            >
                {t('blogTitle')}
            </Link>
        );
    }

    return (
        <div
            css={css`
                background: ${theme.colors.background};
                height: 100%;
                min-height: 100vh;
            `}
        >
            <Global
                styles={css`
                    body,
                    html,
                    #___gatsby,
                    #___gatsby > div {
                        height: 100%;
                    }

                    p code {
                        background-color: ${theme.colors.gray[0]} !important;
                        color: ${theme.colors.primary} !important;
                        padding: 2px 4px !important;
                        border-radius: 3px !important;
                    }

                    .gatsby-highlight-code-line {
                        background-color: hsla(207, 95%, 15%, 1);
                        display: block;
                        margin-right: -1.3125rem;
                        margin-left: -1.3125rem;
                        padding-right: 1em;
                        padding-left: 1.25em;
                        border-left: 0.25em solid #ffa7c4;
                    }

                    .gatsby-highlight {
                        margin-bottom: 1.75rem;
                        margin-left: -1.3125rem;
                        margin-right: -1.3125rem;
                        border-radius: 10px;
                        background: #011627;
                        -webkit-overflow-scrolling: touch;
                        overflow: auto;
                    }

                    @media (min-width: 672px) {
                        .gatsby-highlight {
                            margin: 0 -80px ${rh(1)};
                        }
                    }
                `}
            />
            <div
                css={css`
                    margin: 0 auto;
                    max-width: ${rh(26)};
                    padding: ${theme.space[6]} ${theme.space[4]};
                `}
                data-is-root-path={isRootPath}
            >
                <header
                    css={css`
                        margin-bottom: ${rh(1)};
                        display: flex;
                        justify-content: space-between;
                    `}
                >
                    {header}
                    {isRootPath && <LanguageSelector />}
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
