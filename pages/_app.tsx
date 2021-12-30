import '../src/sass/style.scss';

import type { AppProps /*, AppContext */ } from 'next/app';
import Layout from '../src/components/layout';
import { ModalProvider } from "react-modal-hook";
import { SessionProvider } from "next-auth/react";
import Page from './page';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <SessionProvider session={session}>
    <ModalProvider>
      <Layout>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Layout>
    </ModalProvider>
  </SessionProvider>
}

export default App;