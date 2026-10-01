import { z } from "zod";

export const variantRowSchema = z
  .object({
    variantId: z.string(),
    size: z.string(),
    actualPrice: z.number(),
    requestedPrice: z.coerce.number().positive("Must be greater than 0"),
    quantity: z.coerce.number().positive("Must be greater than 0"),
  })
  .refine((data) => data.requestedPrice <= data.actualPrice, {
    message: "Cannot exceed actual price",
    path: ["requestedPrice"],
  });

export const productCardSchema = z.object({
  productListingId: z.string(),
  productName: z.string(),
  variants: z.array(variantRowSchema).min(1, "Select at least one variant"),
});

export const createQuotationFormSchema = z.object({
  vendorId: z.string().min(1, "Select a vendor"),
  products: z.array(productCardSchema).min(1, "Select at least one product"),
});

export type FormInput = z.input<typeof createQuotationFormSchema>;
export type FormOutput = z.output<typeof createQuotationFormSchema>;

export type CreateQuotationFormValues = z.infer<
  typeof createQuotationFormSchema
>;
