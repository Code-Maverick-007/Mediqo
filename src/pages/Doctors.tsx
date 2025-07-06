import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import DoctorList from '../components/doctor/DoctorList';

const Doctors: React.FC = () => {
  const { doctors } = useApp();
  const navigate = useNavigate();

  const handleBookAppointment = (doctorId: string) => {
    navigate(`/appointment/${doctorId}`);
  };

  const handleViewProfile = (doctorId: string) => {
    navigate(`/doctor-profile/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Doctor
          </h1>
          <p className="text-xl text-gray-600">
            Browse through our network of experienced healthcare professionals
          </p>
        </div>
        
        <DoctorList
          doctors={doctors}
          onBookAppointment={handleBookAppointment}
          onViewProfile={handleViewProfile}
        />
      </div>
    </div>
  );
};

export default Doctors;