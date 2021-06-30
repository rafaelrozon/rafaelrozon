import * as React from 'react';
/** @jsx jsx */
import { jsx, useTheme, css } from '@emotion/react';
import { graphql } from 'gatsby';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { FaHome, FaArrowAltCircleUp } from 'react-icons/fa';

import { Post, Site, Translation } from '../types';
import { PageContextValues } from '../context/PageContext';
import { rh } from '../utils/typography';
import { mq } from '../utils/theme';
import Link from '../components/Link';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { Newsletter } from '../components/Newsletter';
import Footer from '../components/Footer';
import PostMetadata from '../components/PostMetadata';
import * as sharedStyles from '../components/styles';

const getDiscussUrl = (translations: Translation[], defaultLang: string, host: string): string => {
    const defaultTranslation = translations.find(trans => trans.lang === defaultLang);
    if (!defaultTranslation) {
        return '';
    }
    const page = `${host}${defaultTranslation.link}`;
    const search = encodeURIComponent(page);
    return `https://mobile.twitter.com/search?q=${search}`;
};

const getEditUrl = ({
    githubUsername,
    githubRepository,
    pathFolder,
    lang,
    defaultLang
}: {
    githubUsername: string;
    githubRepository: string;
    pathFolder: string;
    lang: string;
    defaultLang: string;
}): string => {
    const file = `index${lang === defaultLang ? '' : `.${lang}`}.md`;
    return `https://github.com/${githubUsername}/${githubRepository}/edit/master/${pathFolder}/${file}`;
};

interface BlogPostTemplateProps {
    location: Location;
    pageContext: PageContextValues;
    data: {
        markdownRemark: Post;
        previous: {
            frontmatter: { path: string; title: string };
        };
        next: {
            frontmatter: { path: string; title: string };
        };
        site: Site;
    };
}

const navLinks = css(sharedStyles.icon, {
    margin: `0 ${rh(1)}`
});

const discussLinks = mq({
    display: ['inline-block', 'inline'],
    marginBottom: [rh(1), 0]
});

const BlogPostTemplate = ({ data, location, pageContext }: BlogPostTemplateProps): React.ReactElement => {
    const theme = useTheme();
    const post: Post = data.markdownRemark;

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
        <Layout
            location={location}
            title={title}
            translations={translations}
            styles={mq({
                margin: [`0 auto`, `${rh(2)} auto 0`],
                padding: [`0 ${rh(1)}`, 0]
            })}
        >
            <a id="top" />
            <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
            <article itemScope itemType="http://schema.org/Article">
                <header
                    css={mq({
                        textAlign: 'center',
                        marginBottom: [rh(2)],
                        marginTop: [rh(2), rh(4)]
                    })}
                >
                    <h1
                        css={mq({
                            marginBottom: rh(1 / 2)
                        })}
                        itemProp="headline"
                    >
                        {post.frontmatter.title}
                    </h1>
                    <PostMetadata date={post.frontmatter.date} timeToRead={post.timeToRead} />
                </header>
                <div
                    css={mq({
                        textAlign: 'center'
                    })}
                >
                    <img
                        css={mq({
                            margin: `0 auto ${rh(1)}`,
                            maxWidth: rh(30),
                            display: `block`,
                            width: `100%`
                        })}
                        src={post.frontmatter.coverImg}
                        alt={post.frontmatter.coverImgAlt}
                    />
                    {post.frontmatter.coverImgCredit ? <Markdown>{post.frontmatter.coverImgCredit}</Markdown> : null}
                </div>

                {/* eslint-disable-next-line react/no-danger */}
                <section
                    css={mq(sharedStyles.container, {
                        margin: `0 auto ${rh(1)}`
                    })}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: post.html }}
                    itemProp="articleBody"
                />

                {shouldDisplayFooter && (
                    <footer
                        css={mq(sharedStyles.container, {
                            padding: 0,
                            marginBottom: `${rh(3)}`,
                            fontSize: [`1rem`, `1.2rem`]
                        })}
                    >
                        {twitter && (
                            <a href={discussUrl} target="_blank" rel="noopener noreferrer" css={discussLinks}>
                                {t('discussOnTwitter')}
                            </a>
                        )}
                        {githubUsername && (
                            <>
                                {
                                    <span
                                        css={mq({
                                            margin: `0 ${rh(1 / 2)}`
                                        })}
                                    >
                                        •
                                    </span>
                                }
                                <a href={editUrl} target="_blank" rel="noopener noreferrer" css={discussLinks}>
                                    {t('editOnGithub')}
                                </a>
                            </>
                        )}
                    </footer>
                )}
            </article>
            <Newsletter
                styles={mq(sharedStyles.container, {
                    margin: `${rh(3 / 2)} auto`
                })}
            />
            <nav css={mq(sharedStyles.container)}>
                <ul
                    css={mq({
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        listStyle: 'none',
                        margin: [`${theme.space[4]} 0 ${theme.space[5]}`, `${theme.space[6]} 0`]
                    })}
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
                <div
                    css={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: `${rh(1)} ${theme.space[4]} 0`,
                        fontSize: '1.5em'
                    }}
                >
                    <Link to="/" noDecoration css={navLinks}>
                        <FaHome />
                    </Link>
                    <Link to="#top" byPass noDecoration css={navLinks}>
                        <FaArrowAltCircleUp />
                    </Link>
                </div>
            </nav>

            <Footer />
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
            timeToRead
            frontmatter {
                title
                date(formatString: $dateFormatString, locale: $lang)
                description
                coverImg
                coverImgAlt
                coverImgCredit
                path
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
