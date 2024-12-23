import React from 'react';

const NavigationBar = () => {
  return (
    <div className="flex justify-around items-center bg-[#1d1d1f] rounded-[16px] py-3">
      <a href="#" className="flex flex-col items-center text-[#667085] hover:text-white text-[12px] font-medium">
        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
        </svg>
        <span>Home</span>
      </a>
      <a href="#" className="flex flex-col items-center text-[#667085] hover:text-white text-[12px] font-medium">
        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor" />
        </svg>
        <span>Accounts</span>
      </a>
      <a href="#" className="flex flex-col items-center text-[#667085] hover:text-white text-[12px] font-medium">
        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H10V10H4V4ZM20 4V10H14V4H20ZM14 14H20V20H14V14ZM10 14V20H4V14H10ZM7 7V7.01H7.01V7H7ZM7 17V17.01H7.01V17H7ZM17 7V7.01H17.01V7H17ZM17 17V17.01H17.01V17H17Z" fill="currentColor" />
        </svg>
        <span>Scan QR</span>
      </a>
      <a href="#" className="flex flex-col items-center text-[#667085] hover:text-white text-[12px] font-medium">
        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor" />
        </svg>
        <span>Cards</span>
      </a>
      <a href="#" className="flex flex-col items-center text-[#667085] hover:text-white text-[12px] font-medium">
        <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor" />
        </svg>
        <span>Profile</span>
      </a>
    </div>
  );
};

export default NavigationBar;
