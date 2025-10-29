import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2025-09-30.clover',
  appInfo: {
    name: 'xueji-nextjs-demo',
    url: 'https://xueji-nextjs-demo.vercel.app',
  },
})
