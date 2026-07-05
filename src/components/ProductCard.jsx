import { useState } from "react";
import ProductVariantBtn from "./ProductVariantBtn";
import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  product,
  onQuantityChange,
  onVariantChange,
  stepId,
}) {
  // console.log(product);

  const hasVariants = product.variants.length > 0;
  // console.log(activeVariant);

  const activeVariant = hasVariants
    ? (product.variants.find((v) => v.id === product.activeVariantId) ??
      product.variants[0])
    : null;

  const currentQty = hasVariants ? activeVariant.quantity : product.quantity;

  const isSelected = hasVariants
    ? product.variants.some((v) => v.quantity > 0)
    : product.quantity > 0;

  const totalQuantity = hasVariants
    ? activeVariant?.quantity
    : product.quantity;
  const isMinusActive = hasVariants
    ? activeVariant?.quantity > 0
    : product.quantity > 0;

  function handleIncrement() {
    onQuantityChange(stepId, product.id, activeVariant?.id ?? null, 1);
  }

  function handleDecrement() {
    onQuantityChange(stepId, product.id, activeVariant?.id ?? null, -1);
  }
  return (
    <div
      className={`w-full h-full rounded-[10px] p-2.75 flex xl:flex-col gap-3.25 bg-white ${product.variants.length === 0 ? "py-[31.5px] pr-[31.5px]" : ""} ${isSelected ? "border-2 border-[#4E2FD2B2]" : ""}`}
    >
      <div className="relative shrink-0 w-25.25 h-34.25 xl:w-full rounded-[5px] overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 inline-flex py-0.5 px-1.5 rounded-[10px] bg-[#4E2FD2] text-[12px]/[100%] text-white">
            Sale {product.badge}%
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-2 mb-2.5">
          <span className="text-base/[100%] tracking-[0.6px]">
            {product.name}
          </span>
          <p className="text-[12px]/[130%] tracking-[0.6px] text-[#1F1F1FBF]">
            {product.description}{" "}
            <a href={product.learnMore} className="underline text-[#0000EE]">
              Learn More
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {product.variants.map((variant) => {
            const isVariantSelected =
              activeVariant?.id === variant.id && variant.quantity > 0;
            return (
              <ProductVariantBtn
                key={variant.id}
                variant={variant}
                isActive={isVariantSelected}
                onClick={() => onVariantChange(stepId, product.id, variant.id)}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <QuantityCounter
            totalQuantity={totalQuantity}
            isMinusActive={isMinusActive}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            disabled={product.required}
          />
          <div className="flex flex-col gap-0.75 xl:flex-row">
            {product.comparePrice && (
              <span className="text-[#D8392B] leading-[100%] tracking-[0.6px] line-through decoration-1">
                ${product.comparePrice}
              </span>
            )}
            <span className="text-[#575757] leading-[100%] tracking-[0.6px]">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
