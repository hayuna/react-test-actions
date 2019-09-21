import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

type Props = {
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  image?: string;
  robots?: string;
  twitterCard?: string;
  keyWords?: string[];
};

const Meta = (props: Props) => {
  const [t] = useTranslation('component__shared__meta');

  const getTitle = () => {
    const baseTitle = t('title');
    let title = props.title || t('description');

    if (title!.includes(baseTitle)) {
      title = `${title} - ${baseTitle}`;
    }

    return title;
  };

  const getUrl = () => {
    const baseUrl = t('url');
    let url = props.url || '';

    if (url!.includes(baseUrl)) {
      url = `${baseUrl}${url}`;
    }

    return url;
  };

  return (
    <Helmet>
      <html prefix="og: http://ogp.me/ns#" lang="vi" />
      <meta name="author" content={props.author || t('author')} />
      <meta name="description" content={props.description || t('description')} />
      {props.keyWords && <meta name="keywords" content={props.keyWords.join(',')} />}
      <meta name="robots" content={props.robots || t('robots')} />

      <meta property="og:type" content={props.type || t('type')} />
      <meta property="og:title" content={getTitle()} />
      <meta property="og:url" content={getUrl()} />
      <meta property="og:image" content={props.image || t('image')} />
      <meta name="twitter:card" content={props.twitterCard || t('twitterCard')} />

      <meta property="og:site_name" content={t('fullTitle')} />
      <meta name="twitter:image:alt" content={props.image || t('image')} />

      <meta property="fb:app_id" content={t('fbAppId')} />
      <meta name="twitter:site" content={t('twitterSite')} />

      <title>{getTitle()}</title>
      <link rel="canonical" href={getUrl()} />
    </Helmet>
  );
};

export default Meta;
