import React from 'react'
import DoctorsList from '../components/DoctorList';
import AppointmentsList from './AppointmentsList';

function DoctorConnect() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-poppins text-gray-800 text-center">
          Doctor Connect
        </h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-semibold font-poppins text-gray-700 mb-4">
            Available Doctors
          </h2>
          <DoctorsList />
        </section>
        <aside className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold font-poppins text-primary bg-blue-100 py-2 rounded-lg mb-4 text-center">
            Booked Appointments
          </h2>
          <AppointmentsList/>
          <div className="p-4 bg-gray-50 rounded-lg">
          
          </div>
        </aside>
      </main>
    </div>
  );
}

export default DoctorConnect
