// Type definitions for the application
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  experience: number;
  rating: number;
  availability: string[];
  fees: number;
  about: string;
  education: string[];
  address: string;
  phone: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'patient' | 'doctor' | 'admin';
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  symptoms?: string;
  createdAt?: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  doctorCount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface AppContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  specialties: Specialty[];
  bookAppointment: (appointment: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
}