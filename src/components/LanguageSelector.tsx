/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';
import * as React from 'react';

import Link from './Link';
import { usePageContext } from '../context/PageContext';

interface LanguageSelectorProps {
    translations: { lang: string; link: string }[];
}
const LanguageSelector = ({ translations = [] }: LanguageSelectorProps): React.ReactElement => {
    const theme = useTheme();
    const { lang } = usePageContext();
    // TODO: change en to enum
    const sortedTranslations = translations.sort(trans => (trans.lang.toLowerCase() === 'en' ? -1 : 1));
    return (
        <div>
            {sortedTranslations.map(langCode => (
                <Link
                    styles={css`
                        margin-right: 0.5em;
                        text-transform: uppercase;
                        color: ${theme.colors.primary};
                        border-bottom: ${lang === langCode.lang ? `2px solid ${theme.colors.primary}` : 'none'};
                        box-shadow: none;
                    `}
                    key={langCode.lang}
                    language={langCode.lang}
                    to={`${langCode.link}`}
                >
                    {langCode.lang}
                </Link>
            ))}
        </div>
    );
};

export default LanguageSelector;
