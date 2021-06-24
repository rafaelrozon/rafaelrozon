import React from 'react';
import { useTranslation } from 'react-i18next';
import { merge } from 'ramda';

export interface PageContextValues {
    lang: string;
    supportedLanguages: string[];
    translations: { lang: string; link: string }[];
    pagePath: null | string;
    defaultLang: string;
}

const PageContext = React.createContext<PageContextValues>({
    lang: 'en',
    supportedLanguages: ['en', 'pt'],
    pagePath: null,
    translations: [],
    defaultLang: 'en'
});

interface PageContextProviderProps {
    value: {
        lang: string;
    };
    // children: React.ReactElement;
}

export const PageContextProvider: React.FC<PageContextProviderProps> = ({ children, value }) => {
    const { i18n } = useTranslation();

    React.useEffect(() => {
        i18n.changeLanguage(value.lang);
    }, [value.lang, i18n]);

    const ctx = merge({}, value);

    return <PageContext.Provider value={ctx}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContextValues => React.useContext(PageContext);
