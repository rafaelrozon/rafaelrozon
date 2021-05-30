import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import {ThemeProvider} from '@emotion/react';

import theme from "./utils/theme";
import i18n from "../i18n";

const AppProviders = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeProvider>
    )
};

export default AppProviders;
