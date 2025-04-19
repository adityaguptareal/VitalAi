import { useState } from 'react';
import Button from './Button';
import { Link,useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);

    

  };

  return (
    <nav className={`bg-background`} >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold font-poppins text-primary font-p">
              {import.meta.env.VITE_APP_NAME || "SwasthVani"}
           </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 font-inter hover:text-primary hover:underline hover:pb-1 transition-all">
              Home
           </Link>
            <Link to="/about" className="text-gray-600 font-inter hover:text-primary hover:underline hover:pb-1 transition-all">
              About us
           </Link>
            <Link to="/contact" className="text-gray-600 font-inter hover:text-primary hover:underline hover:pb-1 transition-all">
             Contact us
           </Link>
            <Link to="/emergency" className="text-gray-600 font-inter hover:text-primary hover:underline hover:pb-1 transition-all">
              Emergency SOS
           </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
           <Link to="/login" className='text-primary font-medium'>
              Login
          </Link>

            <Button size="medium">
             <Link className='flex justify-center items-center' to={"/signup"}> Register  <ChevronRight size={15} /></Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 "
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  z-10 top-0">
              <Link to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-inter hover:text-primary hover:bg-gray-100"
              >
                Home
             </Link>
              <Link to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-inter hover:text-primary hover:bg-gray-100"
              >
               About us
             </Link>
              <Link to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-inter hover:text-primary hover:bg-gray-100"
              >
              Contact us
             </Link>
              <Link to="/emergency"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 font-inter hover:text-primary hover:bg-gray-100"
              >
                Emergency SOS
             </Link>
              <div className="mt-4 space-y-2">
                <Button variant="outline" size="small" className="w-full ">
                  Login
                </Button>
                <Button size="medium" className="w-full py-3">
                  <Link to={'/signup'} className='flex justify-center items-center'>Register  <ChevronRight size={15} /></Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;