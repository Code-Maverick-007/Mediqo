import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AppContextType, Doctor, Appointment, Specialty } from '../types';
import { doctorsData } from '../data/doctorsData';
import { specialtiesData } from '../data/specialtiesData';

export const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(doctorsData);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [specialties] = useState<Specialty[]>(specialtiesData);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('prescripto_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Save appointments to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem('prescripto_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = (appointment: Partial<Appointment>) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: appointment.doctorId || '',
      patientId: appointment.patientId || '',
      date: appointment.date || '',
      time: appointment.time || '',
      status: 'scheduled',
      notes: appointment.notes,
      symptoms: appointment.symptoms,
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppointment, ...prev]);
    
    // Trigger notification for real-time updates
    window.dispatchEvent(new CustomEvent('appointmentBooked', { 
      detail: newAppointment 
    }));
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: 'cancelled' as const }
          : appointment
      )
    );
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, ...updates }
          : appointment
      )
    );
    
    // Trigger notification for real-time updates
    window.dispatchEvent(new CustomEvent('appointmentUpdated', { 
      detail: { id, updates } 
    }));
  };

  return (
    <AppContext.Provider value={{
      doctors,
      appointments,
      specialties,
      bookAppointment,
      cancelAppointment,
      updateAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};