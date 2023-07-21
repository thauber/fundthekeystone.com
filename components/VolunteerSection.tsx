// VolunteerSection.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmittedFieldObject, EmittedFieldSchema, Model } from "animal-orm";
import Volunteer from '@/animals/Volunteer'
import Spinner from "./Spinner";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  phone: z.string().optional(),
});

type FieldSet = typeof Volunteer extends Model<infer M> ? M : never
type Instance = EmittedFieldObject<FieldSet, EmittedFieldSchema<FieldSet>>

const VolunteerSection: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Instance>();

  const onSubmit = async (data: any) => {
    setLoading(true)
    const response = await fetch('/api/volunteer', { method: "POST", body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone || undefined }) })
    setResponse(await response.json())
    setLoading(false)
  };

  const inputClass = "shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  const labelClass = "block text-black text-sm font-bold mb-2"

  return (
    <section className="md:snap-start md:snap-always relative flex flex-col items-start justify-center p-6 text-left h-screen w-full">
      <div className="md:m-10 w-full md:w-1/2 h-full flex flex-col items-start justify-center bg-white p-10 md:p-20">
      {loading
        ? <Spinner />
        : (response
          ? <h2 className="text-3xl font-rubikMonoOne mb-4 text-cool">Thank You for Signing Up!</h2>
          : <>
              <h2 className="text-3xl font-rubikMonoOne mb-4 text-cool">Volunteer with us</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="mb-4">
                  <label className={labelClass} htmlFor="name">Name</label>
                  <input className={inputClass} id="name" type="text" {...register('name')} />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message as string}</p>}
                </div>
                <div className="mb-4">
                  <label className={labelClass} htmlFor="email">Email</label>
                  <input className={inputClass} id="email" type="text" {...register('email')} />
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message as string}</p>}
                </div>
                <div className="mb-4">
                  <label className={labelClass} htmlFor="phone">Phone (Optional)</label>
                  <input className={inputClass} id="phone" type="text" {...register('phone')} />
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </>
        )
      }
      </div>
    </section>
  );
};

export default VolunteerSection;
