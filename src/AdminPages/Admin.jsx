import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import './Admin.css';  // Import the CSS file
import AdminNavbar from "../Components/Common/AdminNavbar";
import Config from '../utils/Config';


function AdminPage() {
  const [recentBooking, setRecentBooking] = useState([]);
  const [newData, setNewData] = useState(false);

  useEffect(() => {
    const fetchRecentBooking = async () => {
      try {
        const response = await fetch(`${Config.BASE_URL}/api/admin`);
        if (!response.ok) {
          throw new Error('Failed to fetch recent booking');
        }
        const data = await response.json();
        if (data.length > recentBooking.length) {
          setNewData(true);
          setTimeout(() => setNewData(false), 2000);
        }
        setRecentBooking(data);
      } catch (error) {
        console.error('Error fetching recent booking:', error);
      }
    };

    fetchRecentBooking();
  }, [recentBooking.length]);

  // Sort recentBooking by createdAt date in descending order
  const sortedRecentBooking = [...recentBooking].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

  // Function to truncate the name to the first word
  const truncateName = (name) => {
    return name.split(' ')[0].toUpperCase();
  };

  const DeleteBooked = async (productId) => {
    try {
      const response = await fetch(`${Config.BASE_URL}/api/delete/${productId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      // Update the state to reflect the deletion

    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <>

      <div  className="container-fluid g-0 design py-lg-5" style={{ minHeight: '100vh' }}>
        <h1  className="fw-bold text-center my-2">Admin</h1>
        <div  className="row g-0">
          <div className="col-lg-6 col-12">
            <div  className="d-flex align-items-center justify-content-center mb-6">
              <div  className="card p-3">
                <i  className={`Notification-icon fi fi-sr-aperture ${newData ? 'text-warning animate-shake' : ''}`}></i>
                <div  className="d-flex flex-column align-items-center justify-content-center">
                  <h1  className=" h2 fw-bold">CamSharp</h1>
                  <p  className="text-warning mt-2">Your premier destination for photography</p>
                </div>

                <div  className="text-center mb-6">
                  <div  className="d-flex justify-content-center align-items-center my-2">
                    <img src={ProfileImg} alt="Profile"  className="rounded-circle img-fluid border" style={{ height: '100px' }} />
                  </div>
                  <h1  className="h5 font-weight-bold">{greeting}, </h1>
                  <h1  className="h5 font-weight-bold  mt-2">ROSHAN SINGH DEO</h1>
                  <p  className="text-warning">Your journey to success starts here, with own CamSharp..</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            {/* <!-- Section of Booking --> */}
            <div  className="text-center bg-warning my-3  px-2 py-2 m-1">
              <h1  className="fw-bold h4">Recent Booking...</h1>
            </div>

            {/* <!-- User Info --> */}
            {sortedRecentBooking.map((booking, index) => (
              <div key={index}  className=" my-2 m-1 card p-3">
                <div  className="d-flex justify-content-between h-6 ">
                  <div  className=" d-flex justify-start ">
                    <h4  className="mb-2"><span className='text-warning fw-bold pe-2'>{new Date(booking.createdAt).toLocaleDateString('en-GB')}</span> : </h4>
                    <h4  className="ms-3 fw-bold"><span>{booking.createdTime}</span></h4>
                  </div>
                  {booking.isReturn ? (
                    <div  className="h5  ms-4 text-danger" style={{ cursor: 'pointer' }} onClick={() => DeleteBooked(booking.productId)}>
                      <i  className="fi fi-sr-cross-circle mb-2"></i>
                    </div>
                  ) : (
                    <div  className="me-2">{booking.mobilenumber}</div>
                  )}
                </div>
                <Link to={`/user-booking-details/${booking._id}/${booking.productId}`} key={index}>
                  <div  className="row g-0">
                    <div  className="col-lg-3 col-6">
                      <p  className="fw-bold text-light ms-2">{truncateName(booking.name)}</p>
                    </div>

                    {/* <!-- Booking and Return button --> */}
                    <div  className="col-lg-3 col-6 d-flex">
                      <h3  className="fw-bold text-light">ID : </h3>
                      <span><h5  className="small text-warning pt-2 ps-2">{booking.productId}</h5></span>
                    </div>
                    <div  className="col-lg-3 col-6 d-flex">
                      <h3 className='text-light'>Booked : </h3>
                      <span  className={`ps-2 pt-2 ${booking.isBook ? 'text-success' : 'text-danger'}`}>
                        <i  className={`fi fi-sr-${booking.isBook ? 'check-circle' : 'cross-circle'}`}></i>
                      </span>
                    </div>
                    <div  className="col-lg-3 col-6 d-flex">
                      <h3 className='text-light'>Return</h3>
                      <span  className={`ps-2 pt-2 ${booking.isReturn ? 'text-success' : 'text-danger'}`}>
                        <i  className={`fi fi-sr-${booking.isReturn ? 'check-circle' : 'cross-circle'}`}></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <AdminNavbar />
      </div>

    </>
  );
};


export default AdminPage;