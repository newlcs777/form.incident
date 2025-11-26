export default function SelectField({ label, value, onChange, options }) {
    return (
      <div className="flex flex-col gap-1 w-full">
  
        {label && (
          <label className="text-[#0033A0] font-semibold text-sm">
            {label}
          </label>
        )}
  
        <select
          value={value}
          onChange={onChange}
          className="
            w-full p-3 rounded-lg border border-gray-300
            bg-gray-50
            focus:outline-none
            focus:border-[#0033A0]
            transition
          "
        >
          <option value="">Selecione</option>
  
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
  
      </div>
    );
  }
  