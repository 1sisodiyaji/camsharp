import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import Config from '../utils/Config';

function ProfileInformation() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from the server
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');

      try {
        if (!token) {
          console.log('Token is not storing on session storage: ', token);
          navigate('/login');
          return;
        }
        // Make a GET request to fetch user profile data
        const response = await fetch(`${Config.BASE_URL}/api/users/information`, {
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
        navigate('/profile'); // Redirect to profile if an error occurs
      }
    };
    fetchUserData();
  }, [navigate]); // Empty dependency array ensures useEffect runs only once on component mount

  // Determine the current greeting based on the time of day
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
      <div className="container-fluid design g-0">
        <div className="row py-lg-5" style={{minHeight: '100vh'}}>

          <div className="col-lg-6 col-12 text-center">
            <img src={ProfileImg} alt="Profile_image" className="w-full img-fluid" style={{ height: '200px' }} />
            <div className="details-box">
              <h1 className="greeting-text text-xl md:text-2xl font-bold">
                {greeting}, <span className='text-warning'>{userData ? userData.name.toUpperCase() : 'Loading...'}</span>
              </h1>
              <p className="text-success">Your best choice is CamSharp.</p>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="conatiner-fluid card p-1 m-1">
              <h2 className="text-capitalize fw-bold mb-4 text-center">Personal Information</h2>
             
           
            {userData ? (
              <>
                <div className="d-flex flex-col justify-content-between py-lg-4">
                  <div className="mb-4">
                    <label htmlFor="user-name" className="fw-bold">UserName:</label>
                    <span id="user-name" className="border p-3 rounded-6 ms-1">{userData.name}</span>
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="full-name" className="fw-bold">Name:</label>
                    <span id="full-name" className="border p-3 rounded-6 ms-1">{userData.name}</span>
                  </div>
                </div>

                <div className="d-flex my-4">
                  <h2 className="fw-bold mr-4 heading2">Email Address:</h2>
                  <span id="email" className=" border   py-1 px-2 rounded-8 mx-3 heading2" style={{fontSize: '1.2rem'}}>{userData.email}</span>
                </div>

                <div className="d-flex my-4">
                  <h2 className="fw-bold mr-4 heading2">Mobile Number:</h2>
                  <span id="mobile-number" className="border   py-1 px-2 rounded-8 mx-2 heading2 ">{userData.mobileNumber}</span>
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
 </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ProfileInformation;
