export default function ProductVariantBtn({ variant, isActive, onClick }) {
  return (
    <button
    onClick={onClick}
      className={`flex items-center shrink-0 cursor-pointer py-px ${variant.label === "White" ? "px-0.75" : "px-1.25"} border-[0.5px]  rounded-xs transition-all duration-200 ${isActive 
          ? "border-[#0AA288] bg-[#1DF0BB0A]" 
          : "border-[#CCCCCC]"
        }`}
    >
      <img
        src={variant.image}
        alt={variant.id}
        className="w-7 h-7 rounded-[5px] shrink-0"
      />
      <span className="text-[10px]/[100%] tracking-[0.6px] text-[#1F1F1F]">
        {variant.label}
      </span>
    </button>
  );
}
