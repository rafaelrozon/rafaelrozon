import * as React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';

import Link from '../components/Link';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { rh } from '../utils/typography';
import formatDateInPT from '../utils/formatDateInPt';

const BlogIndex = ({ data, location, pageContext }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { lang } = pageContext;
    const siteTitle = t('blogTitle');
    const posts = data.allMarkdownRemark.nodes;
    const { social } = data.site.siteMetadata;
    const postsInLocale = posts.filter(post => post.frontmatter.lang === lang);

    if (postsInLocale.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Seo title="All posts" />
                <Bio />
                <p>{t('noPostsFound')}</p>
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={t('indexPageTitle')} />

            <Bio />

            <ol
                css={css`
                    list-style: none;
                    margin: ${rh(2)} 0;
                `}
            >
                {postsInLocale.map(post => {
                    const title = post.frontmatter.title || post.fields.slug;

                    return (
                        <li key={post.frontmatter.path}>
                            <article
                                css={css`
                                    margin: ${rh(2)} 0;
                                `}
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                <header>
                                    <h2
                                        css={css`
                                            margin-bottom: ${rh(1 / 3)};
                                        `}
                                    >
                                        <Link
                                            noDecoration
                                            css={css`
                                                color: ${theme.colors.secondary};
                                            `}
                                            to={`/${post.frontmatter.path}`}
                                            itemProp="url"
                                        >
                                            <span itemProp="headline">{title}</span>
                                        </Link>
                                    </h2>
                                    <small>{formatDateInPT(post.frontmatter.date)}</small>
                                </header>
                                <section
                                    css={css`
                                        margin: 0 0 ${rh(1)} 0;
                                    `}
                                >
                                    <p
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML={{
                                            __html: post.frontmatter.description || post.excerpt
                                        }}
                                        itemProp="description"
                                    />
                                </section>
                            </article>
                        </li>
                    );
                })}
            </ol>
            <footer
                css={css`
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
                <Link target="_blank" rel="noopener noreferrer" byPass to={`https://twitter.com/${social.twitter}`}>Twitter</Link>
                {`·`}
                <Link target="_blank" rel="noopener noreferrer" byPass to={`https://github.com/${social.github}`}>GitHub</Link>
                {`·`}
                <Link target="_blank" rel="noopener noreferrer" byPass to={`https://www.linkedin.com/in/${social.linkedin}`}>LinkedIn</Link>
            </footer>
        </Layout>
    );
};

export default BlogIndex;

export const pageQuery = graphql`
    query($lang: String!, $dateFormatString: String!) {
        site {
            siteMetadata {
                title
                social {
                    twitter
                    github
                    linkedin
                }
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { lang: { eq: $lang } } }
        ) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: $dateFormatString, locale: $lang)
                    title
                    description
                    lang
                    path
                }
            }
        }
    }
`;
