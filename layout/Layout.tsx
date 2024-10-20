import React, { ReactNode } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
      <Up/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: React.FC<T>,
) => {
  return function withLayoutComponent(props: T) {
    const { menu, firstCategory } = props;
    return (
      <AppContextProvider menu={menu} firstCategory={firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
