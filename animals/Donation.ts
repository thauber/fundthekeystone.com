import { Model, Field, RefField } from "animal-orm";
import {z} from "zod"; 
import User from "./User";
import DateField from "./fields/DateField";

const Donation = new Model("donations",{
  amount: new Field(z.number().positive()),
  isMonthly: new Field(z.boolean()), 
  isAnonymous: new Field(z.boolean(), {indexed: ['-completedAt']}),
  completedAt: new DateField.optional(),
  checkoutId: new Field(z.string(), {unique: true}),
  subscriptionId: new Field(z.string().optional(), {unique: true}),
  invoiceId: new Field(z.string().optional(), {unique: true}),
  payee: new RefField(User, {reverse: 'donations'})
})

export default Donation