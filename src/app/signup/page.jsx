'use client';
import InputField from '@/components/formComponents/InputField';
import SelectField from '@/components/formComponents/SelectField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TopBar from '@/components/topbar/Topbar';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'male',
    place: '',
    username: '',
    password: '',
    confirmPassword: '',
    signupMethod: "Manual"
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Updating state:", name, value);
    setFormData({ ...formData, [name]: value });
  };

  console.log("formdata", formData);
  // Form validation
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match!';
    }

    if (formData.password.length < 6) {
      return 'Password should be at least 6 characters!';
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.place || !formData.username) {
      return 'Please fill in all the required fields!';
    }

    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    const { confirmPassword, ...dataToSend } = formData;
    console.log("Frombefoesubmitte ", formData);
    try {
      const response = await axios.post('/api/signup', dataToSend);
      if (response.status === 201) {
        toast.success("Signup successful");
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          gender: 'male',
          place: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
        router.push("/user");
      } else {
        setError('An error occurred during signup.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <>
    <TopBar />   
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-28">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <InputField
            label="Phone"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
          <SelectField
            label="Gender"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
            required
          />
          <InputField
            label="Place"
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Enter your place"
            required
          />
          <InputField
            label="Username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter a username"
            required
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a password"
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Login
        </Link>
      </div>
    </div>
    </>
  );
}
