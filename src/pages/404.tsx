import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

interface NotFoundPageProps {
    location: Location;
}

const NotFoundPage = ({ location }: NotFoundPageProps): React.ReactElement => {
    const { t } = useTranslation();
    return (
        <Layout location={location} title={t('blogTitle')}>
            <Seo title={t('notFound')} />
            <h1>{t('notFound')}</h1>
            <p>{t('notFoundWarning')}</p>
        </Layout>
    );
};

export default NotFoundPage;
