import { Model, Field } from "animal-orm";
import {z} from "zod"; 

const Volunteer = new Model("volunteers",{
  name: new Field(z.string()),
  email: new Field(z.string().email(), {unique: true}),
  phone: new Field(z.string().optional()),
})

export default Volunteer