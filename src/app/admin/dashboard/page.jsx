'use client'
import AddPromoCode from '@/components/AddPromoCode';
const PromoCodeList = dynamic(()=> import('@/components/PromoCodeList'), {ssr:false})
// import PromoCodeList from '@/components/PromoCodeList';
import Sidebar from '@/components/Sidebar/Sidebar'
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    // Function to fetch all promo codes
    const fetchPromoCodes = async () => {
      try {
        const response = await axios.get('/api/promocodes');
        console.log("responsss", response);
        setPromoCodes(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
        setLoading(false);
      }
    };
  
    // Fetch promo codes when the component mounts
    useEffect(() => {
      fetchPromoCodes();
    }, [refresh]);

    const handleAddPromoCode = (newPromoCode) => {
    //   setPromoCodes([...promoCodes, { ...newPromoCode, _id: Date.now() }]);
    };

    console.log("promocodes", setPromoCodes);

    const dummyPromoCodes = [
        {
          _id: '1',
          name: 'WINTER2024',
          gender: 'male',
          startDate: '2024-12-01',
          endDate: '2024-12-31',
          maxDiscount: 20,
          usageLimit: 100,
          perUserLimit: 1,
        },
        {
          _id: '2',
          name: 'SUMMER2024',
          gender: 'female',
          startDate: '2024-06-01',
          endDate: '2024-06-30',
          maxDiscount: 15,
          usageLimit: 50,
          perUserLimit: 2,
        },
        {
          _id: '3',
          name: 'SPRING2024',
          gender: 'male',
          startDate: '2024-03-01',
          endDate: '2024-03-31',
          maxDiscount: 10,
          usageLimit: 75,
          perUserLimit: 3,
        },
        {
          _id: '4',
          name: 'FESTIVE20',
          gender: 'female',
          startDate: '2024-11-01',
          endDate: '2024-11-15',
          maxDiscount: 25,
          usageLimit: 200,
          perUserLimit: 1,
        },
      ];
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <AddPromoCode onAddPromoCode={handleAddPromoCode} setRefresh={setRefresh} />
        {
            loading ? (
                <div>Loading...</div>
            ): (
                <PromoCodeList promoCodes={promoCodes} />
            )
        }
      </div>
    </div>
  )
}

export default AdminDashboard