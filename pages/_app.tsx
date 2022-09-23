import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

// Layout 
import AuthLayout from "../components/layouts/AuthLayout";
import Layout from "../components/layouts/Layout";
// Providers
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { useRouter } from "next/router";

import "../styles/globals.css";


export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};



// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      {router.route.search("auth") === 1 ? (
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    ) : (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )}

      <Component {...pageProps} />
    </SessionProvider>
  )
}