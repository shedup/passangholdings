import { Nav, Footer } from "@/Components";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}
