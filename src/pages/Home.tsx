import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [t] = useTranslation('page__home');

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Helmet>
      Home Page
    </>
  );
};

export default Home;
