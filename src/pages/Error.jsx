import React from 'react';
import { ReactComponent as ErrorIcon } from '../assets/error.svg';

function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ErrorIcon className="w-1/2 h-1/2 mb-4" />
      <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="mt-2 text-lg text-gray-700">We can't find the page you're looking for.</p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Go Back Home
      </button>
    </div>
  );
}

export default Error;