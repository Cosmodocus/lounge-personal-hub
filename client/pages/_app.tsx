import {AppProps} from "next/app";
import {useRouter} from "next/router";
import {NextPageWithLayout} from "next";
import "../styles/globals.css";
const App = ({Component, pageProps}: AppProps) => {

  const getLayout =
    (Component as NextPageWithLayout).getLayout ||
    ((page: React.ReactNode) => page);
  const {query} = useRouter();

  return getLayout(<Component {...pageProps} />, query);
};

export default App;
