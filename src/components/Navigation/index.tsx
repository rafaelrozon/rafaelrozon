import { useTranslation } from 'react-i18next';
import { FaRegBookmark } from 'react-icons/fa';

/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';

import Link from '../Link';
import { usePageContext } from '../../context/PageContext';
import LanguageSelector from '../LanguageSelector';
import { rh } from '../../utils/typography';
import { mq } from '../../utils/theme';

const navSection = css`
    display: flex;
    align-items: center;
`;

interface NavigationProps {
    translations: { lang: string; link: string }[];
    location: Location;
}

const Navigation = ({ translations, location }: NavigationProps): React.ReactElement => {
    const { lang, supportedLanguages = [] } = usePageContext();
    const { t } = useTranslation();
    const theme = useTheme();

    // also add path without lang as the root
    const roots = supportedLanguages.map(lang => `/${lang}`).concat(['/']);
    const isRootPath = roots.indexOf(location.pathname) > -1;
    const headerProps = {
        css: mq({
            color: theme.colors.primary,
            margin: 0,
            fontSize: [theme.space[4], theme.space[5]]
        }),
        children: (
            <Link language={lang} noDecoration to={`/${lang}`}>
                {t('blogTitle')}
            </Link>
        )
    };
    const header = isRootPath ? <h1 {...headerProps} /> : <h3 {...headerProps} />;

    return (
        <div
            css={css`
                margin: 0 auto;
                max-width: ${rh(36)};
                display: flex;
                justify-content: space-between;
            `}
        >
            <div css={navSection}>{header}</div>
            <div css={navSection}>
                {/* <div
                    css={css`
                        margin-right: ${rh(1)};
                    `}
                >
                    <Link
                        noDecoration
                        css={css`
                            ${navLink}
                        `}
                        to="/about"
                    >
                        About
                    </Link>
                    <Link
                        noDecoration
                        css={css`
                            ${navLink}
                        `}
                        to="/about"
                    >
                        Contact
                    </Link>
                </div> */}
                <Link
                    external
                    noDecoration
                    byPass
                    to={`https://getpocket.com/edit?url=${location.href}`}
                    target="__blank"
                >
                    <FaRegBookmark
                        css={css`
                            margin-right: ${rh(2 / 3)};
                            display: flex;
                        `}
                    />
                </Link>

                <LanguageSelector translations={translations} />
            </div>
        </div>
    );
};

export default Navigation;
