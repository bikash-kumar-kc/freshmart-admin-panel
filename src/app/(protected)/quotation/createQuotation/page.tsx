// app/quotation/create/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHeading from "@/components/PageHeading";
import {
  createQuotationFormSchema,
  CreateQuotationFormValues,
  FormInput,
  FormOutput,
} from "@/lib/validation/quotation/createQuotation";
import {
  useApprovedProductsByVendorQuery,
  useApprovedVendorsQuery,
  useCreateQuotationsMutation,
} from "@/lib/hooks/quotation/createquotation.queries";
import { VendorCombobox } from "./VendorCombo";
import { ProductMultiCombobox } from "./ProductMultiCombo";
import { QuotationProductCard } from "./QuotationProductCard";
import { useEffect } from "react";

export default function CreateQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vendorSearchId = searchParams.get("vendorId");
  const productId = searchParams.get("productId");

  // const { data: vendors = [] } = useApprovedVendorsQuery();

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(createQuotationFormSchema),
    defaultValues: { vendorId: "", products: [] },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const vendorId = watch("vendorId");
  // const { data: availableProducts = [] } = useApprovedProductsByVendorQuery(
  //   vendorId || null,
  // );

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const createQuotationMutation = useCreateQuotationsMutation();

  function handleVendorChange(newVendorId: string) {
    setValue("vendorId", newVendorId);
    setValue("products", []); // reset products when vendor changes — different vendor's product list
  }

  function toggleProduct(productListingId: string) {
    const existingIdx = productFields.findIndex(
      (p) => p.productListingId === productListingId,
    );
    if (existingIdx >= 0) {
      removeProduct(existingIdx);
    } else {
      const product = availableProducts.find(
        (p) => p.productListingId === productListingId,
      )!;
      appendProduct({
        productListingId: product.productListingId,
        productName: product.productName,
        variants: [],
      });
    }
  }

  const createQuotations = useCreateQuotationsMutation();
  const { data: vendors = [] } = useApprovedVendorsQuery();
  const { data: availableProducts = [] } = useApprovedProductsByVendorQuery(
    vendorId || null,
  );

  function onSubmit(values: CreateQuotationFormValues) {
    createQuotations.mutate(
      {
        vendorId: values.vendorId,
        // no adminId: the server reads it from the token
        quotations: values.products.map((p) => ({
          productListingId: p.productListingId,
          variants: p.variants.map((v) => ({
            variantId: v.variantId,
            adminSuggested: v.requestedPrice,
            quantity: v.quantity,
          })),
        })),
      },
      { onSuccess: () => router.push("/quotation") },
    );
  }

  useEffect(() => {
    if (
      availableProducts &&
      productId &&
      availableProducts.filter((p) => p.productListingId === productId).length >
        0
    ) {
      toggleProduct(productId);
    }
  }, [availableProducts, productId]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PageHeading
          title="Create Quotation"
          message="Generate a purchase quotation for one or more vendor products"
        />

        <div className="bg-statcard-background border border-statcard-border rounded-sm p-5 space-y-4">
          <div>
            <p className="text-xs font-medium text-app-muted-foreground mb-1.5">
              Vendor
            </p>
            <VendorCombobox
              vendors={vendors}
              value={vendorId ?? vendorSearchId}
              onChange={handleVendorChange}
            />
            {errors.vendorId && (
              <p className="text-xs text-input-text-error mt-1">
                {errors.vendorId.message}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-app-muted-foreground mb-1.5">
              Products
            </p>
            <ProductMultiCombobox
              products={availableProducts}
              selectedIds={productFields.map((p) => p.productListingId)}
              onToggle={toggleProduct}
              disabled={!vendorId}
              defaultId={
                availableProducts.filter(
                  (p) => p.productListingId === productId,
                ).length > 0
                  ? productId
                  : null
              }
            />
            {errors.products?.root?.message && (
              <p className="text-xs text-input-text-error mt-1">
                {errors.products.root.message}
              </p>
            )}
          </div>
        </div>

        {productFields.map((field, index) => {
          const productOption = availableProducts.find(
            (p) => p.productListingId === field.productListingId,
          );
          if (!productOption) return null;
          return (
            <QuotationProductCard
              key={field.id}
              productIndex={index}
              productOption={productOption}
              onRemoveProduct={() => removeProduct(index)}
            />
          );
        })}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={createQuotationMutation.isPending}
            className="px-5 py-2.5 rounded-sm text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary/90 disabled:opacity-60 transition-colors"
          >
            {createQuotationMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
