/* eslint-disable react/jsx-curly-brace-presence */
import { useStaticQuery, graphql } from 'gatsby';

/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';
import { FaTwitterSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';

import Link from '../components/Link';
import { rh } from '../utils/typography';
import * as sharedStyles from '../components/styles';

const Footer = (): React.ReactElement => {
    const theme = useTheme();
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                        social {
                            twitter
                            github
                            linkedin
                        }
                    }
                }
            }
        `
    );
    const social = site.siteMetadata.social;

    const socialMediaIcons = css`
        ${sharedStyles.icon};

        font-size: ${theme.space[5]};
        /* TODO: fix type */
        fill: ${theme.colors.pink};
    `;

    return (
        <footer
            css={css`
                text-align: center;
                margin-top: ${rh(3)};

                a {
                    margin: 0 ${theme.space[2]};
                    color: ${theme.colors.secondary};
                    text-transform: lowercase;
                }

                a:first-of-type {
                    margin-left: 0;
                }
            `}
        >
            <Link
                external
                noDecoration
                target="_blank"
                rel="noopener noreferrer"
                byPass
                to={`https://twitter.com/${social.twitter}`}
            >
                <FaTwitterSquare css={socialMediaIcons} />
            </Link>

            <Link
                external
                noDecoration
                target="_blank"
                rel="noopener noreferrer"
                byPass
                to={`https://github.com/${social.github}`}
            >
                <FaGithubSquare css={socialMediaIcons} />
            </Link>

            <Link
                external
                noDecoration
                target="_blank"
                rel="noopener noreferrer"
                byPass
                to={`https://www.linkedin.com/in/${social.linkedin}`}
            >
                <FaLinkedin css={socialMediaIcons} />
            </Link>
            <p
                css={css`
                    font-size: 0.7em;
                `}
            >
                Rafael Rozon &copy; {new Date().getFullYear()}
            </p>
        </footer>
    );
};

export default Footer;
