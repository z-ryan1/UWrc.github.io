/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemeProvider from '@theme/ThemeProvider';
import UserPreferencesProvider from '@theme/UserPreferencesProvider';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import './styles.css';

import { useScrollPercentage } from 'react-scroll-percentage'

function Providers({children}) {
  return (
    <ThemeProvider>
      <UserPreferencesProvider>{children}</UserPreferencesProvider>
    </ThemeProvider>
  );
}

function Layout(props) {
  const {siteConfig} = useDocusaurusContext();
  const {
    favicon,
    title: siteTitle,
    themeConfig: {image: defaultImage, metadatas},
    url: siteUrl,
  } = siteConfig;
  const {
    children,
    title,
    noFooter,
    description,
    image,
    keywords,
    permalink,
  } = props;
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaImage = image || defaultImage;
  const metaImageUrl = useBaseUrl(metaImage, {
    absolute: true,
  });
  const faviconUrl = useBaseUrl(favicon);

  // default initializations
  let effectiveDocumentHeight = 1
  let scrollPercent = 1

  try {
    effectiveDocumentHeight = document.body.scrollHeight - window.innerHeight
    scrollPercent = Math.min(1, window.scrollY / effectiveDocumentHeight)
  } catch (e) {

  }

  const [scrollRef,] = useScrollPercentage()  // purpose of this hook is to refresh data on scroll

  return (
    <Providers>
      <Head>
        {/* TODO: Do not assume that it is in english language */}
        <html lang="en" />
        {metaTitle && <title>{metaTitle}</title>}
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        {favicon && <link rel="shortcut icon" href={faviconUrl} />}
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${metaTitle}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
        {permalink && <link rel="canonical" href={siteUrl + permalink} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Head // it's important to have an additional <Head> element here,
      // as it allows react-helmet to override values set in previous <Head>
      // ie we can override default metadatas such as "twitter:card"
      // In same Head, the same meta would appear twice instead of overriding
      // See react-helmet doc
      >
        {metadatas.map((metadata, i) => (
          <meta key={`metadata_${i}`} {...metadata} />
        ))}
      </Head>

      <AnnouncementBar />
      <Navbar scrollPercent={scrollPercent} />
      <div className="main-wrapper" ref={scrollRef}>{children}</div>
      {!noFooter && <Footer />}
    </Providers>
  );
}

export default Layout;
