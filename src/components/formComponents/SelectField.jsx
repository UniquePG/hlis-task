function SelectField({ label, id, value, onChange, options, required }) {
    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required={required}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }
  
  export default SelectField;
  