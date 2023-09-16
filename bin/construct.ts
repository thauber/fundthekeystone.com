#!/usr/bin/env npx ts-node --project ./tsconfig.repl.json
import Donation from "../animals/Donation"
import faunadb from "faunadb"
import dotenv from "dotenv"
import Volunteer from "../animals/Volunteer"
import User from "../animals/User"
dotenv.config()

const main = async () => {
  const q = faunadb.query
  const client = Donation.zoo.client

  const Models = [
    User,
    Donation,
    Volunteer,
  ]

  await client.query(q.Do(...Models.map(m => m.construct())))
  await client.query(q.Do(...Models.map(m => m.index())))
}

main().catch(e => console.error(e))