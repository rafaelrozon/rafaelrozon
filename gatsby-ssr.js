import React from 'react';
import { I18nextProvider } from 'react-i18next';
import {ThemeProvider} from '@emotion/react';

import i18n from './i18n';
import { PageContextProvider } from './src/context/PageContext';
import theme from './src/utils/theme';

export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
    </ThemeProvider>
)

/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
export const wrapPageElement = ({ element, props }) => {
    return <PageContextProvider value={props.pageContext}>{element}</PageContextProvider>;
};
