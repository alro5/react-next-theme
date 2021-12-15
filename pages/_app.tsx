import '../src/sass/style.scss';

import type { AppProps /*, AppContext */ } from 'next/app'
import Layout from '../src/components/layout';

function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default App;