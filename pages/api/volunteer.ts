// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Volunteer from '@/animals/Volunteer'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    console.log("BODY", req.body)
    const volunteerData = Volunteer.admit.parse(JSON.parse(req.body))
    console.log("Data", volunteerData)
    const volunteer = await Volunteer.zoo.create(volunteerData)
    return res.status(200).json(volunteer)
  }
}
