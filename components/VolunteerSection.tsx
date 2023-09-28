// VolunteerSection.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmittedFieldObject, EmittedFieldSchema, Model, One } from "animal-orm";
import Volunteer from '@/animals/Donation'
import Spinner from "./Spinner";
import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  phone: z.string().optional(),
});

type Instance = One<typeof Volunteer>

const VolunteerSection = ({onShare}:{onShare:()=>void}) => {
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
    <section className="relative p-6 text-left min-h-screen w-full pt-28 bg-cool">
      <div className="text-white text-4xl md:text-6xl text-center">
        Help us in <span className="whitespace-nowrap">other ways</span>
      </div>
      <div className="flex items-start justify-center flex-wrap">
        <div className="my-10 flex flex-col items-start justify-center bg-white p-10 md:px-20 py-10">
        {loading
          ? <Spinner />
          : (response
            ? <h2 className="text-3xl font-display mb-4 text-cool">Thank You for Signing Up!</h2>
            : <>
                <h2 className="text-3xl font-display mb-4 text-cool">Volunteer with us</h2>
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
        <div className="my-10 w-full md:w-1/2 flex flex-col items-center justify-center p-10 md:px-20 py-10">
            <div className="flex items-center rounded justify-normal m-3  border-2 hover:bg-cool-light">
                <button onClick={onShare} type="button" className="mx-8 my-2 text-3xl transition-all duration-200 ease-in-out text-white cursor-pointer">SHARE</button>
            </div>
            <p className="text-2xl text-white pt-20 pb-5 text-center">Follow and Promote</p>
            <div className="flex">
                <a href="https://facebook.com/fundthekeystone" className={`mx-1 transition-all duration-200 ease-in-out cursor-pointer hover:opacity-70`}><FacebookIcon size={100} /></a>
                <a href="https://instagram.com/fundthekeystone" className={`mx-1 transition-all duration-200 ease-in-out cursor-pointer hover:opacity-70`}><InstagramIcon size={100} /></a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
