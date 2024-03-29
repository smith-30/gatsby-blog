// @flow
import React from "react";
import Helmet from "react-helmet";
import type { Node as ReactNode } from "react";
import styles from "./Layout.module.scss";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
};

const Layout = ({ children, title, description }: Props) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2255927023702252"
        crossorigin="anonymous"
      ></script>
    </Helmet>
    {children}
  </div>
);

export default Layout;
