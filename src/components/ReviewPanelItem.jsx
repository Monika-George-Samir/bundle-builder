import QuantityCounter from "./QuantityCounter";

export default function ReviewPanelItem({ item, onQuantityChange }) {
    console.log(item);
    
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`w-10.25 h-10.25 object-contain flex justify-center items-center rounded-[5px]  ${item.stepId === "home-monitoring-plan" ? "bg-transparent" : "bg-white"}`}
        >
          <img src={item.image} alt={item.id} />
        </div>

        <p className="text-[#0B0D10] text-[12px]/[16px] lg:text-[14px] xl:text-[18px] tracking-[0.5%]">
          {item.stepId === "home-monitoring-plan" ? (
            <>
              <span className="text-[14px]/[100%] lg:text-[16px] xl:text-[20px] text-[#000000]">
                {item.name.split(" ")[0]}{" "}
              </span>
              <span className="text-[14px]/[100%] lg:text-[16px] xl:text-[20px] text-[#4E2FD2]">
                {item.name.split(" ").slice(1).join(" ")}
              </span>
            </>
          ) : (
            item.required ? (
                <>
                <span>{item.name}</span>
                <span> (Required)</span>
                </>
            ) : (
                <span>{item.name}</span>
            )
          )}
        </p>
      </div>

      <div className="flex gap-4.5">
        {item.stepId !== "home-monitoring-plan" && item.name !== "Fast Shipping" &&(
        <QuantityCounter 
            totalQuantity={item.quantity}
            isMinusActive={item.quantity > 0}
            handleIncrement={() => onQuantityChange(item.stepId, item.productId, item.variantId, 1)}
            handleDecrement={() => onQuantityChange(item.stepId, item.productId, item.variantId, -1)}
            disabled={item.required}
            isReview={true}/>
        )}
        <div className="flex flex-col items-center gap-0.75 xl:flex-row">
          {item.comparePrice && (
            <span className="text-[#6F7882] text-[12px]/[16px] lg:text-[14px] xl:text-[16px] tracking-[0.5%] line-through decoration-1">
              $
              {item.stepId === "home-monitoring-plan"
                ? `${(item.comparePrice * item.quantity).toFixed(2)}/mo`
                : (item.comparePrice * (item.quantity || 1)).toFixed(2)}
            </span>
          )}
          <span className="text-[#4E2FD2] text-[12px]/[16px] lg:text-[14px] xl:text-[16px] tracking-[0.5%]">
            {/* ${item.price ? item.price * item.quantity : item.priceLabel} */}
            {item.price > 0
              ? `$${(item.price * item.quantity).toFixed(2)}${item.stepId === "home-monitoring-plan" ? "/mo" : ""}`
              : item.priceLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
