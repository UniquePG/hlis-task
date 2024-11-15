// app/admin/components/PromoCodeList.js
export default function PromoCodeList({ promoCodes }) {
    return (
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">PromoCode List</h3>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Gender</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Max Discount</th>
              <th className="py-2 px-4 text-left">Usage Limit</th>
              <th className="py-2 px-4 text-left">Per User Limit</th>
            </tr>
          </thead>
          <tbody>
            {promoCodes.map((promoCode) => (
              <tr key={promoCode._id}>
                <td className="py-2 px-4">{promoCode.name}</td>
                <td className="py-2 px-4">{promoCode.gender}</td>
                <td className="py-2 px-4">{new Date(promoCode.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{new Date(promoCode.endDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">{promoCode.maxDiscount}%</td>
                <td className="py-2 px-4">{promoCode.usageLimit}</td>
                <td className="py-2 px-4">{promoCode.perUserLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  