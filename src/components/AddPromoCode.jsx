import { useState } from 'react';
import "./addpromocode.css"
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddPromoCode({ onAddPromoCode, setRefresh }) {
  const [numPromoCodes, setNumPromoCodes] = useState(1); // Number of promo codes to generate
  const [promoCodes, setPromoCodes] = useState([createEmptyPromoCode()]); // State to hold the dynamic promo code inputs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const initialPromoCodeState = [{
    name: '',
    gender: 'male',  // default gender
    startDate: '',
    endDate: '',
    maxDiscount: 0,
    usageLimit: 1,   // Default value of 1
    perUserLimit: 1  // Default value of 1
  }];


  // Function to create an empty promo code object
  function createEmptyPromoCode() {
    return {
      name: '',
      gender: 'male', // default gender
      startDate: '',
      endDate: '',
      maxDiscount: 0,
      usageLimit: 1,
      perUserLimit: 1,
    };
  }

  // Handle the change in the number of promo codes to generate
  const handleNumPromoCodesChange = (e) => {
    const number = e.target.value;
    setNumPromoCodes(number);
    const newPromoCodes = Array.from({ length: number }, () => createEmptyPromoCode());
    setPromoCodes(newPromoCodes);
  };

  // Handle individual field changes for each promo code
  const handleInputChange = (index, field, value) => {
    const updatedPromoCodes = [...promoCodes];
    updatedPromoCodes[index][field] = value;
    setPromoCodes(updatedPromoCodes);
  };


  const validatePromoCodes = () => {
    for (let i = 0; i < promoCodes.length; i++) {
      const { name, gender, startDate, endDate, maxDiscount, usageLimit, perUserLimit } = promoCodes[i];

      if (!name || !gender || !startDate || !endDate || maxDiscount <= 0) {
        setError(`Promo code #${i + 1}: Please fill in all required fields correctly.`);
        return false;
      }

      if (new Date(startDate) >= new Date(endDate)) {
        setError(`Promo code #${i + 1}: Start date cannot be after end date.`);
        return false;
      }

      if (usageLimit <= 0 || perUserLimit <= 0) {
        setError(`Promo code #${i + 1}: Usage limit and per user limit must be positive.`);
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("promocodess", promoCodes);

    if (!validatePromoCodes()) return; // Prevent submission if validation fails

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/promocodes', promoCodes);

      if (response.status === 201) {
        // alert('Promo codes added successfully!');
        toast.success("Promo codes added successfully!")
        // onAddPromoCode(promoCodes); 
        setPromoCodes(initialPromoCodeState);
        setNumPromoCodes(1)
        setRefresh(p => !p)
      } else {
        setError('Failed to add promo codes.');
      }
    } catch (error) {
      console.log('Error adding promo codes:', error);
      setError('Error adding promo codes.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Promo Code</h2>

      <div className="mb-4">
        <label htmlFor="numPromoCodes" className="block text-sm font-medium text-gray-700">
          How many promo codes do you want to generate?
        </label>
        <input
          type="number"
          id="numPromoCodes"
          value={numPromoCodes}
          onChange={handleNumPromoCodesChange}
          min="1"
          className="mt-1 p-2 border border-gray-300 rounded-md w-1/3"
        />
      </div>

      <form onSubmit={handleSubmit} >
      <div className="space-y-4 max-h-[27rem] overflow-y-auto scrollable-form-container">
          {promoCodes.map((promoCode, index) => (
            <div key={index} className="accordion-item border rounded-md shadow-sm">
              <div
                onClick={() => toggleAccordion(index)}
                className="accordion-header flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded-t-md transition-colors duration-300 hover:bg-gray-200"
              >
                <h3 className="text-lg font-medium text-gray-800">Promo Code #{index + 1}</h3>
                <span className="text-xl font-semibold text-gray-600">
                  {openAccordionIndex === index ? '-' : '+'}
                </span>
              </div>
              <div
                className={`accordion-content transition-all duration-300 ease-in-out ${openAccordionIndex === index ? 'max-h-screen p-4' : 'max-h-0 overflow-hidden'}`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Promo Code Name</label>
                    <input
                      type="text"
                      value={promoCode.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value.toUpperCase())}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="PROMO2024"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={promoCode.gender}
                      onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={promoCode.startDate}
                      onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={promoCode.endDate}
                      onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Max Discount</label>
                    <input
                      type="number"
                      value={promoCode.maxDiscount}
                      onChange={(e) => handleInputChange(index, 'maxDiscount', e.target.value)}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      min="0"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                    <input
                      type="number"
                      value={promoCode.usageLimit}
                      onChange={(e) => handleInputChange(index, 'usageLimit', e.target.value)}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      min="1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Per User Limit</label>
                    <input
                      type="number"
                      value={promoCode.perUserLimit}
                      onChange={(e) => handleInputChange(index, 'perUserLimit', e.target.value)}
                      className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

        <button
          type="submit"
          className="w-full py-2 mt-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Submit Promo Codes'}
        </button>
      </form>
    </div>
  );
}
