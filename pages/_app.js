import '../styles/globals.css'
import { SWRConfig } from 'swr'
import axios from 'axios'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (url) => axios.get(url).then(r => r.data) }}>
        <Head>
            <link rel="icon" href="/asiahealth.png" />
        </Head>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
