import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

// Custom styled SelectField component
export default function SelectField({ name, value, onChange, options }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full py-2 pl-10 pr-8 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Select Municipality</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
