function InputField({ label, type, id, name, value, onChange, placeholder, required }) {
    return (
      <div className="flex flex-col mb-4">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required={required}
        />
      </div>
    );
  }
  
  export default InputField;
  