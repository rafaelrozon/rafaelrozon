import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { css, jsx, useTheme } from '@emotion/react';

import {rh} from '../../utils/typography';

const Bio = () => {
    const theme = useTheme();
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
    `);
    const { t } = useTranslation();
    const twitter = data.site.siteMetadata?.social?.twitter || '';

    return (
        <div
            css={css`
                display: flex;
                margin-bottom: ${rh(3)};
                align-items: center;
            `}
        >
            <StaticImage
                css={css`
                    margin-right: ${theme.space[3]};
                    margin-bottom: 0;
                    min-width: 50px;
                    border-radius: 100%;
                `}
                layout="fixed"
                formats={['AUTO', 'WEBP', 'AVIF']}
                src="../../images/profile.png"
                width={50}
                height={50}
                quality={95}
                alt="Profile picture"
            />

                <p
                    css={css`
                        margin: 0;
                        a {
                            color: ${theme.colors.secondary};
                        }
                    `}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: t('footer', {
                            author: `<a href="https://twitter.com/${twitter}">${t('author')}</a>`,
                            authorSummary: t('authorSummary')
                        })
                    }}
                />
        </div>
    );
};

export default Bio;
