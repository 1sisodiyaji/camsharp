import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FooterBar() {
  const navigate = useNavigate();
  const [logOutHandle, setLogOutHandle] = useState(false);
  const token = sessionStorage.getItem('token');
 
  
  const logoutButtonHandle = () => {
    setLogOutHandle(true);
    
  }

  return (
    <>
      {token && (
      <div className='fixed  bottom-0 w-full  sm:w-72 md:w-full'>
        <div className='flex justify-around items-center   text-light h-12'>
          <a href="/" className='text-2xl'>
            <i className="fi fi-bs-house-chimney "></i>
          </a>
          <a href="/profile" className='text-2xl'>
            <i className="fi fi-bs-user"></i>
          </a>
          <a href="/items/camera" className='text-2xl'>
            <i className="fi fi-bs-camera"></i>
          </a>
          <a href="/menu" className='text-2xl'>
            <i className="fi fi-bs-menu-dots-vertical"></i>
          </a>
          <i className="fi fi-bs-sign-out-alt text-2xl hover:cursor-pointer" onClick={logoutButtonHandle}></i>
        </div>
      </div>
      )}

      {/* Logout confirmation modal */}
      {logOutHandle && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 max-w-full">
            <p className="mb-4 text-green-700">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600" onClick={() => {
               sessionStorage.removeItem('token');
                
                navigate('/login');
              }}>
                Yes
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600" onClick={() => setLogOutHandle(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    

    </>
  );
}

export default FooterBar;
