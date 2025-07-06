import React from 'react';
import { Star, MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { Doctor } from '../../types';
import Button from '../common/Button';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctorId: string) => void;
  onViewProfile?: (doctorId: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {doctor.experience} years exp
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-blue-600 font-semibold mb-4">{doctor.specialty}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{doctor.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>Available: {doctor.availability.slice(0, 2).join(', ')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-semibold text-green-600">${doctor.fees} consultation</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="small"
            onClick={() => onViewProfile?.(doctor.id)}
            className="flex-1 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
          >
            View Profile
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => onBookAppointment?.(doctor.id)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;