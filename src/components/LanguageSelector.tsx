/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';
import * as React from 'react';

import Link from './Link';
import { usePageContext } from '../context/PageContext';

const LanguageSelector = (): React.ReactElement => {
    const theme = useTheme();
    const { lang, supportedLanguages = [] } = usePageContext();
    return (
        <div>
            {supportedLanguages.map(langCode => (
                <Link
                    styles={css`
                        margin-right: 0.5em;
                        text-transform: uppercase;
                        color: ${theme.colors.primary};
                        border-bottom: ${lang === langCode ? `2px solid ${theme.colors.primary}` : 'none'};
                        box-shadow: none;
                    `}
                    key={langCode}
                    language={langCode}
                    to={`/${langCode}`}
                >
                    {langCode}
                </Link>
            ))}
        </div>
    );
};

export default LanguageSelector;
