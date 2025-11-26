export default function InputField({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    error = "",
  }) {
    return (
      <div className="flex flex-col gap-1 w-full">
        
        {label && (
          <label className="text-[#0033A0] font-semibold text-sm">
            {label}
          </label>
        )}
  
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full p-3 rounded-lg border
            focus:outline-none
            bg-gray-50
            transition
            ${error ? "border-red-500" : "border-gray-300"}
            focus:border-[#0033A0]
          `}
        />
  
        {error && (
          <span className="text-xs text-red-600 font-medium">{error}</span>
        )}
      </div>
    );
  }
  