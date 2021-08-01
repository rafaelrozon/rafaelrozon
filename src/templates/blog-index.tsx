/* eslint-disable react/jsx-curly-brace-presence */
import * as React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';

import { rh } from '../utils/typography';
import { mq } from '../utils/theme';
import { PageContextValues } from '../context/PageContext';
import { Post } from '../types';
import Link from '../components/Link';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Bookmark from '../components/Bookmark';
import PostMetadata from '../components/PostMetadata';
import CopyLink from '../components/CopyLink';
import Footer from '../components/Footer';

interface BlogIndexProps {
    data: {
        allMarkdownRemark: {
            nodes: Post[];
        };
        site: {
            siteMetadata: {
                social: {
                    twitter: string;
                    github: string;
                    linkedin: string;
                };
            };
        };
    };
    location: Location;
    pageContext: PageContextValues;
}

const BlogIndex = ({ data, location, pageContext }: BlogIndexProps): React.ReactElement => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { lang } = pageContext;
    const siteTitle = t('blogTitle');
    const posts = data.allMarkdownRemark.nodes;
    const postsInLocale = posts.filter(post => post.frontmatter.lang === lang);
    const translations = [
        { lang: 'en', link: '/en' },
        { lang: 'pt', link: '/pt' }
    ];

    if (postsInLocale.length === 0) {
        return (
            <Layout location={location} title={siteTitle} translations={translations}>
                <Seo title="All posts" />
                <Bio />
                <p>{t('noPostsFound')}</p>
            </Layout>
        );
    }

    return (
        <Layout location={location} title={siteTitle} translations={translations}>
            <Seo title={t('indexPageTitle')} />
            <ol
                css={mq({
                    listStyle: 'none',
                    margin: [`${rh(1)} ${rh(2 / 3)}`, `0 0 ${rh(4)}`]
                })}
            >
                {postsInLocale.map(post => {
                    const title = post.frontmatter.title || post.fields.slug;
                    const description = post.frontmatter.description || post.excerpt;

                    return (
                        <li key={post.frontmatter.path}>
                            <article
                                css={mq({
                                    margin: [`${rh(2)} 0 ${rh(3)}`, `${rh(2)} 0 ${rh(4)}`]
                                })}
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                <header
                                    css={mq({
                                        margin: `0 auto`,
                                        maxWidth: [rh(26), rh(24)]
                                    })}
                                >
                                    <img
                                        css={mq({
                                            maxHeight: '480px',
                                            margin: '0 auto',
                                            display: 'block',
                                            width: '100%'
                                        })}
                                        src={post.frontmatter.coverImg}
                                        alt={post.frontmatter.coverImgAlt}
                                    />
                                </header>
                                <div
                                    css={mq({
                                        margin: `0 auto`,
                                        maxWidth: [rh(26), rh(21)]
                                    })}
                                >
                                    <section
                                        css={css`
                                            margin: 0 0 ${rh(1)};
                                        `}
                                    >
                                        <h2
                                            css={css`
                                                margin: ${rh(1)} 0 ${rh(1 / 2)};
                                            `}
                                        >
                                            <Link
                                                noDecoration
                                                css={css`
                                                    display: inline-block;
                                                    color: ${theme.colors.secondary};
                                                `}
                                                to={`/${post.frontmatter.path}`}
                                                itemProp="url"
                                            >
                                                <span itemProp="headline">{title}</span>
                                            </Link>
                                        </h2>
                                        {description && (
                                            <p
                                                // eslint-disable-next-line react/no-danger
                                                dangerouslySetInnerHTML={{
                                                    __html: description
                                                }}
                                                itemProp="description"
                                            />
                                        )}
                                    </section>
                                    <hr
                                        css={css`
                                            margin: 0;
                                            max-width: ${rh(30)};
                                        `}
                                    />
                                    <section
                                        css={css`
                                            display: flex;
                                            justify-content: space-between;
                                            max-width: ${rh(30)};
                                            align-items: center;
                                        `}
                                    >
                                        <PostMetadata date={post.frontmatter.date} timeToRead={post.timeToRead} />
                                        <div
                                            css={css`
                                                display: flex;
                                                align-items: center;

                                                & > * {
                                                    margin-left: ${rh(2 / 3)};
                                                }
                                            `}
                                        >
                                            <Bookmark
                                                url={`https://rafaelrozon.com/${lang}/${post.frontmatter.path}`}
                                            />
                                            <CopyLink
                                                styles={css`
                                                    position: relative;
                                                    top: -3px;
                                                `}
                                                text={`https://rafaelrozon.com/${lang}/${post.frontmatter.path}`}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </article>
                        </li>
                    );
                })}
            </ol>
            <Footer />
        </Layout>
    );
};

export default BlogIndex;

// TODO: check which fields are still in use from site query
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
                timeToRead
                frontmatter {
                    date(formatString: $dateFormatString, locale: $lang)
                    title
                    description
                    lang
                    path
                    coverImg
                    coverImgAlt
                }
            }
        }
    }
`;
