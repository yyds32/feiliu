import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'

export default function App({ Component, pageProps }){
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const title = '示例站点'
  const description = '这是一个基于 Next.js 的示例站点骨架，包含站内搜索示例。'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/logo.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
