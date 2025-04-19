import { Facebook, Twitter, Instagram, LineChart } from 'lucide-react';

const Footer = () => {


  const quickLinks = [
    { text: 'About Us', href: '#' },
    { text: 'How It Works', href: '#' },
    { text: 'Features', href: '#' },
    { text: 'Pricing', href: '#' },
    { text: 'Contact', href: '#' }
  ];

  const supportLinks = [
    { text: 'FAQ', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Cookie Policy', href: '#' },
    { text: 'Help Center', href: '#' }
  ];

  return (
    <footer className="bg-white py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1  lg:col-span-2">
            <h2 className="text-2xl font-bold text-text-blue font-montserrat mb-2">{import.meta.env.VITE_APP_NAME ||"SwasthVani"}</h2>
            <p className="text-grey font-poppins mb-6 text-sm max-w-[350px] ">
              Revolutionizing healthcare with AI technology to provide accessible, accurate, and immediate health insights for everyone.
            </p>
            <div className="flex space-x-4">
             
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 font-montserrat mb-4">Quick Links</h3>
            <ul className="space-y-2  text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-grey hover:text-text-blue transition-colors duration-300 font-poppins"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1  lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 font-montserrat mb-4">Support</h3>
            <ul className="space-y-2  text-sm">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-grey hover:text-text-blue transition-colors duration-300 font-poppins"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
        </div>
      </div>
          <div className="w-full  mt-20">
            
            <div className="text-grey font-poppins text-sm flex flex-col justify-center items-center">
              <p className="mb-2 text-center">{`© ${new Date().getFullYear()} ${import.meta.env.VITE_APP_NAME ||"SwasthVani"}. All rights reserved.`}</p>
              <p className="flex items-center">
                Design and Dweveloped by <span className="text-text-blue mx-1">Aditya Kumar</span> 
              </p>
            </div>
          </div>
    </footer>
  );
};

export default Footer;