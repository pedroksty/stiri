import Head from 'next/head'
import { GetStaticProps } from 'next'
import SubscriberButton from '../components/SubscriberButton'

import styles from '../styles/home.module.scss'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string
    amount: string
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>

      <main className={styles.contentContainer} >
        <section className={styles.hero} >
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscriberButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IeY8xEJqihuzU6lE3sIwFHM')

  const product = {
    priceID: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
