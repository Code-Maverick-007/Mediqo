import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useApp } from '../context/useApp';
import { Doctor } from '../types';
import { useAuth } from '../context/useAuth';
import AppointmentSlots from '../components/doctor/AppointmentSlots';
import Button from '../components/common/Button';

const Appointment: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const { doctors, bookAppointment } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');


  const doctor = doctors.find((d: Doctor) => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Doctor not found</p>
          <Button onClick={() => navigate('/doctors')} className="mt-4">
            Back to Doctors
          </Button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = (doctorId: string, date: string, time: string) => {
    if (!user) {
      navigate('/login');
      return;
    }


    const appointmentData = {
      doctorId,
      patientId: user.id,
      date,
      time,
      symptoms,
      notes
    };

    bookAppointment(appointmentData);
    alert('Appointment booked successfully!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/doctors')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600 mt-2">
            Schedule your appointment with {doctor.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Doctor Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <p className="text-gray-600">{doctor.experience} years experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{doctor.about}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                {doctor.education && doctor.education.map((edu: string, index: number) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-600">{doctor.phone}</p>
                <p className="text-gray-600">{doctor.email}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation Fee</h3>
                <p className="text-2xl font-bold text-green-600">${doctor.fees}</p>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="space-y-6">
            {/* Appointment Details Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Symptoms or Reason for Visit
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe your symptoms or reason for the visit..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional notes or special requests..."
                  />
                </div>
              </div>
            </div>

            {/* Appointment Slots */}
            <AppointmentSlots
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;