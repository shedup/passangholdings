import { Nav, Footer, Layout } from "@/Components";
import { AuthContext } from "@/context/AuthContext";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContext>
        <Head>
          <title>Passang Holdings</title>
        </Head>
        <Layout>
          <Toaster
            toastOptions={{
              style: {
                background: "gray",
                color: "white",
              },
            }}
            containerStyle={{
              top: 60,
              left: 20,
              bottom: 20,
              right: 20,
            }}
          />
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
      <Analytics />
    </>
  );
}
