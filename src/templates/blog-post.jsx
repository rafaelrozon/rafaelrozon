import * as React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { jsx, useTheme, css } from '@emotion/react';

import { rh } from '../utils/typography';
import Bio from '../components/Bio';
import Link from '../components/Link';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import {Newsletter} from '../components/Newsletter';
import formatDateInPT from '../utils/formatDateInPt';

const getDiscussUrl = (translations, defaultLang, host) => {
    const defaultTranslation = translations.find(trans => trans.lang === defaultLang);
    if (!defaultTranslation) {
        return '';
    }
    const page = `${host}${defaultTranslation.link}`;
    const search = encodeURIComponent(page);
    return `https://mobile.twitter.com/search?q=${search}`;
};

const getEditUrl = ({ githubUsername, githubRepository, pathFolder, lang, defaultLang }) => {
    const file = `index${lang === defaultLang ? '' : `.${lang}`}.md`;
    return `https://github.com/${githubUsername}/${githubRepository}/edit/master/${pathFolder}/${file}`;
};

const BlogPostTemplate = ({ data, location, pageContext }) => {
    const theme = useTheme();
    const post = data.markdownRemark;

    const { t } = useTranslation();
    const {
        fields: { directoryName }
    } = post;

    const { translations, defaultLang, lang } = pageContext;
    const { githubRepository, githubUsername, contentFolderPath, siteUrl, social } = data.site.siteMetadata;
    const twitter = social?.twitter;
    const title = t('blogTitle');
    const { previous, next } = data;
    const discussUrl = getDiscussUrl(translations, defaultLang, siteUrl);

    const editUrl = getEditUrl({
        githubRepository,
        githubUsername,
        pathFolder: `${contentFolderPath}/${directoryName}`,
        lang,
        defaultLang
    });
    const shouldDisplayFooter = twitter || githubUsername;

    return (
        <Layout location={location} title={title}>
            <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
            <article itemScope itemType="http://schema.org/Article">
                <header>
                    <h1
                        css={css`
                            margin-bottom: ${rh(1 / 2)};
                        `}
                        itemProp="headline"
                    >
                        {post.frontmatter.title}
                    </h1>
                    <p>{formatDateInPT(post.frontmatter.date)}</p>
                </header>
                <div
                    css={css`
                        background-color: ${theme.colors.gray[0]};
                        padding: ${theme.space[3]};
                        border-radius: 5px;
                        margin: ${rh(1)} 0;
                    `}
                >
                    {translations.length && (
                        <p
                            css={css`
                                margin: 0;
                                padding: 0;
                                font-size: ${rh(1 / 2)};
                            `}
                        >
                            <span>{t('translations')}: </span>
                            {translations.map(trans => {
                                if (trans.lang !== lang) {
                                    return (
                                        <Link
                                            to={trans.link}
                                            language={trans.lang}
                                            key={trans.lang}
                                            css={css`
                                                display: inline-block;
                                                text-transform: uppercase;
                                                text-decoration: none;
                                            `}
                                        >
                                            {trans.lang}
                                        </Link>
                                    );
                                }
                                return '';
                            })}
                        </p>
                    )}
                </div>
                {/* eslint-disable-next-line react/no-danger */}
                <section
                    css={css`
                        margin-bottom: ${rh(2)};
                    `}
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />

                {shouldDisplayFooter && (
                    <footer
                        css={css`
                            margin-bottom: ${rh(4)};

                            a {
                                color: ${theme.colors.secondary};
                            }
                        `}
                    >
                        {twitter && (
                            <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                                {t('discussOnTwitter')}
                            </a>
                        )}
                        {githubUsername && (
                            <>
                                {` • `}
                                <a href={editUrl} target="_blank" rel="noopener noreferrer">
                                    {t('editOnGithub')}
                                </a>
                            </>
                        )}
                    </footer>
                )}
                <Newsletter />
            </article>
            <aside
                css={css`
                    margin-top: ${rh(2)};
                `}
            >
                <h3
                    css={css`
                        color: ${theme.colors.secondary};
                    `}
                >
                    <Link noDecoration language={lang} to={`/${lang}`}>{t('blogTitle')}</Link>
                </h3>
                <Bio />
            </aside>
            <nav>
                <ul
                    css={css`
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        list-style: none;
                        padding: ${theme.space[4]};
                        margin: 0;
                    `}
                >
                    <li>
                        {previous && (
                            <Link to={`/${previous.frontmatter.path}`} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={`/${next.frontmatter.path}`} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
        $lang: String!
        $dateFormatString: String!
    ) {
        site {
            siteMetadata {
                social {
                    twitter
                }
                siteUrl
                githubUsername
                githubRepository
                contentFolderPath
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            html
            fields {
                directoryName
            }
            frontmatter {
                title
                date(formatString: $dateFormatString, locale: $lang)
                description
            }
        }
        previous: markdownRemark(id: { eq: $previousPostId }, frontmatter: { lang: { eq: $lang } }) {
            fields {
                slug
            }
            frontmatter {
                title
                path
                lang
            }
        }
        next: markdownRemark(id: { eq: $nextPostId }, frontmatter: { lang: { eq: $lang } }) {
            fields {
                slug
            }
            frontmatter {
                title
                path
                lang
            }
        }
    }
`;
