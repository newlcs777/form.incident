export default function TextareaDescricao({ value, onChange }) {
    return (
      <textarea
        rows="4"
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
        value={value}
        onChange={onChange}
      ></textarea>
    );
  }
  