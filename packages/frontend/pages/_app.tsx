import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IQ-Blog</title>
      </Head>
      <main className="app" style={{width: '100vw'}}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
