import { useState } from 'react';
import { useMenu } from '../contexts/MenuContext';
import { FiUser, FiSettings, FiHome, FiHelpCircle, FiInfo, FiPhone, FiFileText, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SideNav = () => {
  const { isOpen, toggleMenu } = useMenu();
  const [isAccountOpen, setIsAccountOpen] = useState(false);


  const toggleAccountNav = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu}></div>
      )}
      <div
        className={`fixed rounded top-0 left-0 h-full bg-stone-100 text-gray-900 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out w-64 z-50`}
        style={{ top: '77px' }}
      >
        <div className="p-4">
          <nav>
            <h2 className="text-blue-600 font-semibold">OnTop Health</h2>
            <ul>

              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiHome className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </li>

              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiSettings className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/settings" onClick={toggleMenu}>Settings</Link>
              </li>

              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiInfo className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/about" onClick={toggleMenu}>About</Link>
              </li>

              <h2 className="text-blue-600 font-semibold mt-4">SUPPORT</h2>

              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiHelpCircle className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/faq" onClick={toggleMenu}>FAQ</Link>
              </li>


              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiPhone className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/support" onClick={toggleMenu}>Support</Link>
              </li>

              <h2 className="text-blue-600 font-semibold mt-4">LEGAL</h2>

              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiFileText className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/terms" onClick={toggleMenu}>Terms and Conditions</Link>
              </li>


              <li className="p-4 hover:bg-blue-100 flex items-center">
                <FiFileText className="w-6 h-6 mr-2 text-blue-600" />
                <Link to="/privacy" onClick={toggleMenu}>Privacy Policy</Link>
              </li>

              <li className="p-4 hover:bg-blue-100">
                <button
                  onClick={toggleAccountNav}
                  className="flex justify-between w-full focus:outline-none"
                >
                  <div className="flex items-center">
                    <FiUser className="w-6 h-6 mr-2 text-blue-600" />
                    <span>Authentication</span>
                  </div>
                  <FiChevronDown
                    className={`w-6 h-6 transform transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                  />
                </button>
                {isAccountOpen && (
                  <ul className="pl-8 mt-2">
                  
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNav;
