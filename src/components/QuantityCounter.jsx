export default function QuantityCounter({
  totalQuantity,
  isMinusActive,
  handleIncrement,
  handleDecrement,
  disabled,
  isReview = false,
}) {
  return (
    <section
      className={`flex gap-2.5 rounded-sm py-1 ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        className={`cursor-pointer w-5 h-5 rounded-sm flex items-center justify-center border-2 ${isReview ? "border-transparent bg-white text-[#575757]" : "border-[#E6EBF0]"} ${!!isReview && isMinusActive ? "text-[#525963] bg-[#F0F4F7]" : "text-[#CED6DE]"}`}
      >
        -
      </button>
      <span className="text-[#0B0D10] leading-5">{totalQuantity}</span>
      <button
        type="button"
        onClick={() => handleIncrement(totalQuantity)}
        className={`cursor-pointer w-5 h-5 rounded-sm flex items-center justify-center border-2  ${isReview ? "border-transparent bg-white text-[#575757]" : "border-[#E6EBF0] bg-[#F0F4F7] text-[#525963]"}`}
      >
        +
      </button>
    </section>
  );
}
