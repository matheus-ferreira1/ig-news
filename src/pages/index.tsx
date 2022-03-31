import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span>world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// tem 3 formas de fazer uma chamada a API
// client side (SPA)
// server side (SSR)
//static site generation (SSG)


// o código da função abaixo será executado na camada do servidor node que o next roda,
// e não no browser. um consolelog na func abaixo não retorna nada na pagina
export const getStaticProps: GetStaticProps = async () => {
  
  const price = await stripe.prices.retrieve('price_1Kj8YrAMlbFDSibMmbtLn5jr')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 60s, 60m, 24h
  }
}