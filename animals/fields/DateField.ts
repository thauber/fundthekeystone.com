import { Field, type FieldOptions } from "animal-orm"
import z from "zod"

type OptionalDateToNumber = z.ZodPipeline<
  z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>,
  z.ZodOptional<z.ZodNumber>
>
type OptionalNumberToDate = z.ZodPipeline<z.ZodOptional<z.ZodNumber>, z.ZodOptional<z.ZodDate>>
class OptionalDateField extends Field<OptionalDateToNumber, OptionalNumberToDate> {
  constructor(options?: FieldOptions) {
    super(
      [
        // Number or Date -> Number
        z.union([z.date(), z.number()]).optional().pipe(z.coerce.number().optional()),
        // Number -> Date
        z.number().optional().pipe(z.coerce.date().optional()),
      ],
      options
    )
  }
}

type DateToNumber = z.ZodPipeline<z.ZodUnion<[z.ZodDate, z.ZodNumber]>, z.ZodNumber>
type NumberToDate = z.ZodPipeline<z.ZodNumber, z.ZodDate>
export default class DateField extends Field<DateToNumber, NumberToDate> {
  static optional = OptionalDateField
  constructor(options?: FieldOptions) {
    super(
      [
        // Number or Date -> Number
        z.union([z.date(), z.number()]).pipe(z.coerce.number()),
        // Number -> Date
        z.number().pipe(z.coerce.date()),
      ],
      options
    )
  }
}
