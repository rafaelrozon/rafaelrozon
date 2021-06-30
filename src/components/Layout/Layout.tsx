/** @jsx jsx */
import { jsx, css, useTheme, Global, SerializedStyles } from '@emotion/react';

import { rh } from '../../utils/typography';
import Navigation from '../Navigation';

interface LayoutProps {
    location: Location;
    styles?: SerializedStyles;
    translations: { lang: string; link: string }[];
}

const Layout: React.FC<LayoutProps> = ({ location, children, styles, translations }) => {
    const theme = useTheme();
    return (
        <div
            css={css`
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

                    @media (min-width: 576px) {
                        .gatsby-highlight {
                            margin-left: 0;
                            margin-right: 0;
                        }
                    }

                    @media (min-width: 992px) {
                        .gatsby-highlight {
                            margin: 0 -65px ${rh(1)};
                        }

                        /* .gatsby-resp-image-wrapper {
                            max-width: 100% !important;
                            margin: 0 -80px  !important;
                            display: block;
                        } */
                    }
                `}
            />
            <div
                css={{
                    paddingBottom: rh(2 / 3)
                }}
            >
                <div
                    css={css`
                        padding: ${rh(1)};
                    `}
                >
                    <Navigation translations={translations} location={location} />
                </div>
                <main
                    css={css`
                        ${styles}
                    `}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
