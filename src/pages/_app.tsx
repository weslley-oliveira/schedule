import { ContextProvider } from '../contexts/Context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return( 
  <ContextProvider>
    <Component {...pageProps} />
  </ContextProvider>)
}

export default MyApp
