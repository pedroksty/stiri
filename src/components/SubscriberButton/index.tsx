import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'


interface SubscriberButtonProps {
  priceId: string
}

export default function SubscriberButton({ priceId }: SubscriberButtonProps) {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const { data } = await api.post('/subscribe')

      const { sessionId } = data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({
        sessionId
      })


    } catch (error) {
      console.log(error)
      alert(error.message)

    }


  }



  return (
    <button
      type="button"
      className={styles.subscriberButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
