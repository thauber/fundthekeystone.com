// pages/api/stripe-webhook.ts
import Donation from '@/animals/Donation';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your Stripe Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let { checkout } = req.query;
    if (Array.isArray(checkout)) checkout = checkout[0];
    if (!checkout) return res.status(400).end();


    
    const donation = await Donation.zoo.getBy("checkoutId", checkout)
    if (donation) {
      await Donation.zoo.update(donation.id, {completedAt: new Date()})
      // Acknowledge receipt of event
      const domain = process.env.DOMAIN || 'http://localhost:3000';
      return res.redirect(`${domain}/?checkout=true`)
    }
  }

  return res.status(405).end();
}
