import { useState } from "react";
import data from "./data/products.json";
import AccordionStep from "./components/AccordionStep";
import ReviewPanel from "./components/ReviewPanel";
import toast, { Toaster } from "react-hot-toast";


function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(() => {
    try {
      const localData = localStorage.getItem("saved-system");
      return localData ? JSON.parse(localData) : data.steps;
    } catch (error) {
      console.log(error, "error");
      return data.steps;
    }
  });

  function handleSaveSystem() {
    try {
      localStorage.setItem("saved-system", JSON.stringify(steps));
      toast.success("System saved succcessfully");
    } catch (error) {
      toast.error("Failed to save configuration");
    }
  }

  function onToggle(index) {
    setActiveStep(activeStep === index ? null : index);
  }

  function handleQuantityChange(stepId, productId, variantId, delta) {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id !== stepId) return step;
        return {
          ...step,
          products: step.products.map((product) => {
            if (product.id !== productId) return product;

            if (variantId) {
              return {
                ...product,
                variants: product.variants.map((v) =>
                  v.id === variantId
                    ? { ...v, quantity: Math.max(0, v.quantity + delta) }
                    : v,
                ),
              };
            }
            return {
              ...product,
              quantity: Math.max(0, (product.quantity || 0) + delta),
            };
          }),
        };
      }),
    );
  }

  function handleVariantChange(stepId, productId, variantId) {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id !== stepId) return step;
        return {
          ...step,
          products: step.products.map((product) => {
            if (product.id !== productId) return product;
            return { ...product, activeVariantId: variantId };
          }),
        };
      }),
    );
  }
  return (
    <section className=" grid grid-cols-1 lg:grid-cols-[1.92fr_1fr] xl:grid-cols-1 gap-7.25 pt-6">
      <Toaster />
      <div className="w-full bg-white p-3.75">
        <h1 className="text-[31.88px] font-bold flex items-center justify-center lg:hidden">
          Let's get started!
        </h1>
        {steps.map((step, index) => (
          <AccordionStep
            key={step.id}
            step={step}
            steps={steps}
            isActive={activeStep === index}
            onToggle={onToggle}
            onQuantityChange={handleQuantityChange}
            onVariantChange={handleVariantChange}
          />
        ))}
      </div>
      <div className="w-full bg-[#EDF4FF] lg:rounded-xl  ">
        <ReviewPanel
          steps={steps}
          shipping={data.shipping}
          handleSaveSystem={handleSaveSystem}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </section>
  );
}

export default App;
