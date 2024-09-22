import React, { useState, useEffect } from 'react';
import profileImages from '../Images/boy.webp';
import { useNavigate } from 'react-router-dom';
import Config from '../utils/Config';

function ProfileSection() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [logOutHandle, setLogOutHandle] = useState(false);

  useEffect(() => {
    // Fetch data from the server
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');

      try {
        // Token not found, navigate to login page
        if (!token) {
          console.log('Token is not storing on session storage: ', token);
          navigate('/login');
          return;
        }
        // Make a GET request to fetch user profile data
        const response = await fetch(`${Config.BASE_URL}/api/users/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        // Extract user data from response
        const data = await response.json();  
        setUserData(data);
      } catch (error) {
        console.log('Error:', error);
        navigate('/login'); // Redirect to login if an error occurs
      }
    };
    fetchUserData();
  }, [navigate]); // Empty dependency array ensures useEffect runs only once on component mount

  const ProfileInformationHandle = () => {
    if (userData) {
      navigate('/information');
    }
  };

  const ProfileBooking = () => {
    if (userData) {
      navigate(`/user-booking`);
    }
  };
  const AddressManageHandle =()=>{
    if(userData){
      navigate(`/user/address`)
    }
  }

  const LogOutButtonHandle = () => { 
    setLogOutHandle(true); 
  };

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const greeting = getGreeting();

  return (
    <>

      <div className={`container-fluid design g-0 ${logOutHandle ? 'blur-sm' : ''}`}>
        <div className='container' style={{minHeight: '100vh'}}>
          <div className="row">
            <div className="col-lg-6 col-12 py-lg-5">
              <div className="container">
                <div className=" card p-3">
                  <div className="d-flex">
                       <img src= {userData ? userData.image? userData.image: 'https://res.cloudinary.com/dsyspt4dz/image/upload/v1720692823/boy_chvkpb.webp' : 'https://res.cloudinary.com/dsyspt4dz/image/upload/v1720692823/boy_chvkpb.webp'} alt="Profile_image" className="img-fluid mx-auto border  rounded-circle" style={{ height: '100px' }} />
                  </div>

                  <div id="greeting" className="text-center mb-2">
                    <h2 id="user-name" className="text-2xl font-semibold">
                      {`${greeting}, `}
                      <span className="text-white">{userData ? userData.name.toUpperCase() : 'Loading...'}</span>
                    </h2>
                  </div>
                </div>
                <div className=' card my-3 p-lg-3 p-1'>
                  <h2 className="text-center mb-4">Personal Information</h2>

                  {userData ? (
                    <>
                      <div className="d-flex mb-4 justify-content-around align-items-center">
                        <div className="mb-4">
                          <label htmlFor="user-name" className="font-bold heading2">UserName : </label>
                          <small id="user-name" className="border border-grey p-2 ms-2 rounded-6 heading3">{userData.name.toUpperCase()}</small>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="full-name" className="font-bold heading2">Name:</label>
                          <small id="full-name" className="border border-grey p-2 ms-2 rounded-6 heading3">{userData.name.toUpperCase()}</small>
                        </div>
                      </div>

                      <div className="d-flex mb-4">
                        <h2 className="font-bold me-4 heading2">Email Address:</h2>
                        <span id="email" className="border border-grey p-2 ms-2 rounded-6 ">{userData.email}</span>
                      </div>

                      <div className="d-flex mb-4">
                        <h2 className="font-bold me-4">Mobile Number:</h2>
                        <span id="mobile-number" className="border border-grey p-2 ms-2 rounded-6">{userData.mobileNumber}</span>
                      </div>
                    </>
                  ) : (
                    <div>Loading...</div>
                  )}

                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12 py-lg-5">
              <div className="container">
              <div  className="card p-3">
                <div  className="mb-4">
                  <h2 className="text-center">Booking</h2>
                </div>

                <div id="account-section" className="flex flex-col items-start">
                  <div className="flex items-center text-xl mb-2 text-gray-700">
                  Account Setting <i className="fi fi-sr-settings ps-2 pt-2"></i>
                  </div>
                  <ul className="ml-8 text-sm text-gray-500">
                    <li style={{cursor: 'pointer'}} onClick={ProfileInformationHandle}>   Profile Information </li>
                    <li style={{cursor: 'pointer'}} onClick={ProfileBooking}>Booking Details</li>
                    <li style={{cursor: 'pointer'}} onClick={AddressManageHandle}>Manage Address</li>
                    <li style={{cursor: 'pointer'}}>Adhar Card Information</li>
                  </ul>
                </div>

                <div id="stuff-section" className="flex flex-col items-start mt-4">
                  <div className="flex items-center text-xl mb-2 text-gray-700">
                    <button className="mr-2 text-blue-500"><i className="fi fi-bs-user"></i></button>
                    My STUFF
                  </div>
                  <ul className="ml-8 text-sm text-gray-500">
                    <li style={{cursor: 'pointer'}} >My Coupons</li>
                    <li style={{cursor: 'pointer'}} >My Rating & Reviews</li>
                    <li style={{cursor: 'pointer'}} >All Notification</li>
                    <li style={{cursor: 'pointer'}} >My Wishlist</li>
                  </ul>
                </div>

                <div>
                  <a href="#logouotHandle">
                    
                  <button className="btn text-capitalize rounded-6" onClick={LogOutButtonHandle}>
                    
                    Logout <i className="fi fi-br-sign-out-alt"></i>
                    </button>
                  </a> 
                   
                 
                </div>
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {logOutHandle && (
        <div id='logouotHandle' className="card p-3 m-2 shadow-6">
          <div className=" ">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="d-flex justify-content-around">
              <button className="btn btn-outline-danger  text-capitalize" onClick={() => {
                sessionStorage.removeItem('token');
                window.location.href = "/";
              }}>
               <h6 className='text-danger'>Yes</h6> 
              </button>
              <button className="btn" onClick={() => setLogOutHandle(false)}>
               <h6 className='text-success'>No</h6> 
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default ProfileSection;
