import '@/styles/globals.css';
import RootLayout from '../components/root-layout';
import supabase from '@/lib/supabaseClient';
import type { AppProps } from 'next/app';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <div id='root' />
      </SessionContextProvider>
    </>
  );
}
