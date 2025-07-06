import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Doctor } from '../../types';
import Button from '../common/Button';

interface AppointmentSlotsProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string, date: string, time: string) => void;
}

const AppointmentSlots: React.FC<AppointmentSlotsProps> = ({ doctor, onBookAppointment }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDateAvailable = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return doctor.availability.includes(dayName);
  };

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      onBookAppointment(doctor.id, selectedDate, selectedTime);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-600">Consultation Fee: </span>
            <span className="text-sm font-medium text-gray-900 ml-1">${doctor.fees}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Select Date
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {dates.map((date) => {
              const dateStr = formatDate(date);
              const isAvailable = isDateAvailable(date);
              const isSelected = selectedDate === dateStr;
              
              return (
                <button
                  key={dateStr}
                  onClick={() => isAvailable && setSelectedDate(dateStr)}
                  disabled={!isAvailable}
                  className={`
                    p-3 rounded-lg border text-sm font-medium transition-colors
                    ${isAvailable 
                      ? isSelected 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }
                  `}
                >
                  {formatDateDisplay(date)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Select Time
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      p-2 rounded-lg border text-sm font-medium transition-colors
                      ${isSelected 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                      }
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-2">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-medium">{doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee:</span>
                <span className="font-medium">${doctor.fees}</span>
              </div>
            </div>
            <Button
              onClick={handleBookAppointment}
              className="w-full mt-4"
              size="large"
            >
              Book Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentSlots;