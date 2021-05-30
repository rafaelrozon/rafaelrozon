import React from 'react';
/** @jsx jsx */
import { jsx, css, useTheme } from '@emotion/react';

import Link from './Link';
import { usePageContext } from '../context/PageContext';

const LanguageSelector = () => {
    const theme = useTheme();
    const { lang, supportedLanguages = [] } = usePageContext();

    return (
        <div>
            {supportedLanguages.map(code => (
                <Link
                    noDecoration
                    css={css`
                        margin-right: 0.5em;
                        text-transform: uppercase;
                        color: ${theme.colors.primary};
                        border-bottom: ${lang === code ? `2px solid ${theme.colors.primary}` : 'none'};
                    `}
                    key={code}
                    language={code}
                    to={`/${code}`}
                >
                    {code}
                </Link>
            ))}
        </div>
    );
};

export default LanguageSelector;
