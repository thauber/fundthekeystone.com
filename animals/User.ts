import { Model, Field } from "animal-orm";
import {z} from "zod"; 

const User = new Model("users",{
  name: new Field(z.string()),
  email: new Field(z.string().email(), {unique: true}),
})
export default User