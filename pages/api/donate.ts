// pages/api/create-checkout-session.ts

import Donation from '@/animals/Donation';
import User from '@/animals/User';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const domain = process.env.DOMAIN || 'http://localhost:3000';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2023-08-16',
});

type Price = {
  currency: string,
  product_data: { name: string, images: string[] },
  unit_amount: number,
  recurring?: { interval: "month" }
}

const DonateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, monthly, name, email, anonymous } = req.body;

  const price:Price = {
    currency: 'usd',
    product_data: {
      name: 'Keystone Bridge Donation',
      images: ['https://fundthekeystone.com/images/Bridge-Keystone-Placement.jpeg'],
    },
    unit_amount: parseInt(amount) * 100,
  }

  if (monthly) {
    price['recurring'] = {interval: 'month'}
  }

  try {
    let user = await User.zoo.getBy("email", email)
    if (!user) {
      user = await User.zoo.create({
        name,
        email,
      })
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
          price_data: price,
          quantity: 1,
        }
      ],
      mode: monthly ? 'subscription' : 'payment',
      success_url: `${domain}/api/finish?checkout={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/?error=cancelled`,
      customer_email: email,
      metadata: {
        monthly: String(monthly),
        anonymous: String(anonymous),
        name,
      },
    });
    const donation = await Donation.zoo.create({
      amount,
      isMonthly: monthly,
      isAnonymous: anonymous,
      checkoutId: session.id,
      payee: user.id,
    })
    res.status(200).json({ id: session.id, donataion: donation.id, user: user.id });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
export default DonateHandler; 