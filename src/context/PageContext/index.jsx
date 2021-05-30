import React from 'react';
import { useTranslation } from 'react-i18next';
import { merge } from 'ramda';

const PageContext = React.createContext({});

export const PageContextProvider = ({ children, value }) => {
    const { i18n } = useTranslation();

    React.useEffect(() => {
        i18n.changeLanguage(value.lang);
    }, [value.lang, i18n]);

    const ctx = merge({}, value);

    return <PageContext.Provider value={ctx}>{children}</PageContext.Provider>;
};

export const usePageContext = () => React.useContext(PageContext);
