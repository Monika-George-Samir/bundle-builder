import getReviewItems from "../getReviewItem";
import ReviewPanelItem from "./ReviewPanelItem";

export default function ReviewPanel({ steps, shipping, handleSaveSystem, onQuantityChange }) {
  // console.log(steps,shipping);

  const reviewItems = getReviewItems(steps);
  // console.log(reviewItems);

  let totalPrice = 0;
  let totalComparePrice = 0;

  reviewItems.forEach((item) => {
    totalPrice += (item.price || 0) * item.quantity;

    const compare = item.comparePrice > 0 ? item.comparePrice : item.price;
    totalComparePrice += (compare || 0) * item.quantity;
  });

  totalPrice += shipping?.price || 0;
  totalComparePrice += shipping?.comparePrice || 0;
  // console.log(totalComparePrice, totalPrice);
  const totalSavings = totalComparePrice - totalPrice;

  return (
    <section className="xl:flex p-5">
      <div>
        <span className="uppercase text-[12px]/[100%] tracking-[1.6px] flex items-center text-[#484848] p-3.75  mb-1.25 xl:hidden">
          Review
        </span>
        <div className="pt-5 pb-7.75 gap-2.5">
          <div className="flex flex-col gap-1.25 mb-2.5">
            <h2 className="text-[22px]/[100%] font-bold text-[#1F1F1F] tracking-[0.6px] xl:text-[18px]">
              Your security system
            </h2>
            <p className="text-[12px]/[130%] lg:text-[14px]/[130%] tracking-[0.6px] text-[#1F1F1FBF]">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row xl:justify-between">
            <div className="flex flex-col gap-2.5">
              {steps.map((step) => {
                const stepItems = reviewItems.filter(
                  (item) => item.stepId === step.id,
                );

                if (stepItems.length === 0) return null;
                const fullTextWithSpaces = step.id.replace(/-/g, " ");
                const lastWordONly = step.id.split("-").pop();
                return (
                  <div
                    key={step.id}
                    className={`border-t border-[#CED6DE] pt-3.75 gap-2 ${step.id === "home-monitoring-plan" ? "order-last" : ""}`}
                  >
                    <span className="uppercase text-[12px]/[16px] tracking-[3%] text-[#A8B2BD] inline-block mb-2">
                      {step.id === "home-monitoring-plan" ? (
                        <>
                          <span className="lg:hidden">
                            {fullTextWithSpaces}
                          </span>
                          <span className="hidden lg:block">
                            {lastWordONly}
                          </span>
                        </>
                      ) : (
                        <span className="">{step.id}</span>
                      )}
                    </span>
                    <div className="flex flex-col gap-3">
                      {stepItems.map((item) => (
                        <ReviewPanelItem key={item.id} item={item} onQuantityChange={onQuantityChange}/>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="order-last border-t border-[#CED6DE] pt-3.75 mt-2">
                <ReviewPanelItem
                  item={{
                    ...shipping,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between xl:flex-col xl:justify-normal mb-3.5">
          <div className="flex items-center gap-6.25 ">
            <div className="w-19.5 h-19.5 xl:w-32.75 xl:h-32.75">
              <img
                src="/images/satisfaction-badge.png"
                alt="Satisfaction Badge"
              />
            </div>
            <div className="hidden text-[18px]/[110%] tracking-[0.6px] text-[#1F1F1F] xl:block ">
              <span>30-day hassle-free returns</span>
              <p className="text-[16px]">
                If you're not totally in love with the product, we will refund
                you 100%.
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full items-end xl:flex-row xl:justify-between xl:items-center">
            <span className="py-1.25 px-2 bg-[#4E2FD2] text-white text-[12px]/[100%] tracking-[-5%] rounded-[3px] xl:p-2 xl:text-[16px]">
              as low as $19.19/mo
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#6F7882] text-[18px]/[20px] xl:text-[22px]/[20px] tracking-[0.25%] line-through decoration-1">
                ${totalComparePrice.toFixed(2)}
              </span>
              <span className="text-[#4E2FD2] text-[24px]/[32px] xl:text-[28px] tracking-[-0.13%]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-[12px]/[100%] tracking-[-0.6px] text-[#0AA288] flex items-center justify-center xl:text-[14px]/[100%] mb-1">
          Congrats! You’re saving ${totalSavings.toFixed(2)} on your security
          bundle!
        </p>
        <button className="w-full py-3.25 px-4 rounded-sm bg-[#4E2FD2] text-[17px]/[100%] text-white font-bold text-center mb-2">
          Checkout
        </button>
        <button type="button" onClick={handleSaveSystem} className="text-[12px]/[100%] tracking-[-0.02px] text-[#484848] text-center w-full underline cursor-pointer">
          Save my system for later
        </button>
      </div>
    </section>
  );
}
