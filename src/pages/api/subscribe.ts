import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { stripe } from "../../services/stripe";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getSession({ req: request })


    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      // metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1IeY8xEJqihuzU6lE3sIwFHM', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: 'http://localhost:3000/posts',
      cancel_url: 'http://localhost:3000'
    })

    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('allow', 'POST')
    response.status(405).end('Method not allowed')

  }
}