import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import { usePageContext } from '../context/PageContext';

interface MetaData {
    [key: string]: string;
}

interface SEOProps {
    description?: string;
    meta?: MetaData[];
    title: string;
}
const SEO = ({ description = '', meta = [], title }: SEOProps): React.ReactElement => {
    const { t } = useTranslation();

    const { lang, translations = [], pagePath } = usePageContext();
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                        social {
                            twitter
                        }
                    }
                }
            }
        `
    );

    const metaDescription = t('blogDescription');
    const defaultTitle = t('blogTitle');
    const host = site.siteMetadata.siteUrl;
    const pageUrl = `${host}${pagePath}`;

    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
            meta={([
                {
                    name: `description`,
                    content: description
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: description
                },
                {
                    property: `og:type`,
                    content: `website`
                },
                {
                    name: `twitter:card`,
                    content: `summary`
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata?.social?.twitter || ``
                },
                {
                    name: `twitter:title`,
                    content: title
                },
                {
                    name: `twitter:description`,
                    content: metaDescription
                },
                {
                    property: `og:locale`,
                    content: lang
                }
            ] as MetaData[]).concat(meta)}
        >
            <link rel="canonical" href={pageUrl} />
            <link rel="alternate" hrefLang="x-default" href={pageUrl} />

            {translations.map(trans => (
                <link key={trans.lang} rel="alternate" href={`${host}${trans.link}`} hrefLang={trans.lang} />
            ))}
        </Helmet>
    );
};

export default SEO;
