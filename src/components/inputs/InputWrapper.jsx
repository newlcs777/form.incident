export default function InputWrapper({ label, children }) {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-[#0033A0] font-semibold text-sm">
            {label}
          </label>
        )}
        {children}
      </div>
    );
  }
  