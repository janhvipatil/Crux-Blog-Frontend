import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/postStyle.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;