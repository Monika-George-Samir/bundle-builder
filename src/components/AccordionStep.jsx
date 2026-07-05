import { useState } from "react";
import ProductCard from "./ProductCard";

export default function AccordionStep({
  step,
  steps,
  isActive,
  onToggle,
  onQuantityChange,
  onVariantChange,
}) {
  const currentIdx = steps.findIndex((s) => s.id === step.id);
  const nextStepIdx = currentIdx + 1;
  const nextStep = steps[currentIdx + 1];
  

  const selectedCount = step.products.filter((product) => {
    if (product.variants.length > 0) {
      return product.variants.some((v) => v.quantity > 0);
    }
    return product.quantity > 0;
  }).length;

  function handleNextStep() {
    if (nextStep) {
      onToggle(nextStepIdx)
    }
  }
  return (
    <section
      className={`w-full gap-1.25 rounded-[10px] ${isActive ? " bg-[#EDF4FF] p-3.75 mb-3.25" : ""} `}
    >
      <p className="text-[10px] tracking-[1.6px] uppercase text-[#484848] mb-1.25">
        Step {step.stepId} of 4
      </p>
      <button
        onClick={() => onToggle(currentIdx)}
        className={`w-full px-3.75 py-5 cursor-pointer gap-0.75 border-t-[0.5px] border-t-[#1F1F1F] ${!isActive ? "border-b-[0.5px] border-b-[#1F1F1F]" : ""} flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <img
            src={`/icons/${step.icon}.svg`}
            alt={step.icon}
            className="shrink-0"
          />
          <p className="text-[18px]/[100%] text-[#0B0D10]">{step.title}</p>
        </div>
        <span className="flex items-center gap-1 shrink-0">
          {selectedCount > 0 && (
            <p className="text-[#4E2FD2] text-[14px]/[16px]">
              {selectedCount} selected
            </p>
          )}
          {isActive ? (
            <img src="/icons/chevron-up.svg" />
          ) : (
            <img src="/icons/chevron-down.svg" />
          )}
        </span>
      </button>

      {isActive && (
        <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-2.75 mb-3.75 items-stretch">
          {step.products.map((product, idx) => {
            const isLastOdd =
              idx === step.products.length - 1 &&
              step.products.length % 2 !== 0;
            return (
              <div
                key={product.id}
                className={`min-w-0 ${isLastOdd ? "lg:col-span-2 lg:flex lg:justify-center xl:col-span-1" : ""}`}
              >
                <div
                  className={`h-full ${isLastOdd ? "lg:w-1/2 xl:w-full" : "w-full"}`}
                >
                  <ProductCard
                    product={product}
                    onQuantityChange={onQuantityChange}
                    onVariantChange={onVariantChange}
                    stepId={step.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isActive && nextStep && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleNextStep}
            className="border border-[#4E2FD2] text-[#4E2FD2] text-[18px]/[24px] py-1.25 px-6 rounded-[7px] cursor-pointer"
          >
            Next: {nextStep.title}
          </button>
        </div>
      )}
    </section>
  );
}
