// pages/api/create-checkout-session.ts

import Donation from '@/animals/Donation';
import User from '@/animals/User';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const domain = process.env.DOMAIN || 'http://localhost:3000';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2023-08-16',
});

const DonateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const publicDonations = await Donation.zoo.paginateBy("isAnonymous", false)
    res.status(200).json(publicDonations);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
export default DonateHandler; 