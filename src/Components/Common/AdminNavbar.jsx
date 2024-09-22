import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {
  const navigate = useNavigate();
  const [logOutHandle, setLogOutHandle] = useState(false);
  const token = localStorage.getItem('token');


  const logoutButtonHandle = () => {
    setLogOutHandle(true);

  }

  const PaymentHistoryButton = () => {
    navigate('/admin/payment');
  }


  return (
    <>
      {token && (
        <div className='fixed fixed-bottom d-flex justify-content-between align-items-center bg-black p-2'>
          <div><a href="#logoutFunction"> <i className="fi fi-sr-sign-out-alt text-light ps-2" onClick={logoutButtonHandle}></i></a> </div>
          <div> <i className="fi fi-sr-wallet text-light pe-2" onClick={PaymentHistoryButton}></i> </div>
        </div>
      )}

      {/* Logout confirmation modal */}
      {logOutHandle && (
        <div id='logoutFunction' className="fixed inset-0 d-flex align-items-center justify-content-center card z-50">
          <div className="rounded-8">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="d-flex justify-content-between my-2">
              <button className="btn bg-danger py-2 px-4 rounded-6 " onClick={() => {
                localStorage.removeItem('token');

                navigate('/login');
              }}>
                Yes
              </button>
              <button className="btn bg-success py-2 px-4 " onClick={() => setLogOutHandle(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default AdminNavbar;