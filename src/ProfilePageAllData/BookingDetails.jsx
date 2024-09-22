import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import Config from '../utils/Config';


function BookingDetails() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.log('No token found, redirecting to login');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${Config.BASE_URL}/api/users/user-booking`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch booking data');
                }

                const data = await response.json();
                setUserData(data);

                setLoading(false);

                if (data.length > 0) {
                    setUserName(data[0].name);  // assuming name is part of each booking entry
                }
            } catch (error) {
                console.log('Error:', error);
                navigate('/profile');
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Sort userData by createdAt date in descending order
    const sortedUserData = [...userData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
            <div className="container-fluid design g-0" style={{minHeight: '100vh'}}>
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-6 col-12"> 
                                <div className="d-flex justify-content-center">
                                    <img src={ProfileImg} alt="Profile_image" className="image-fluid" style={{height: '300px'}} loading='lazy'/>
                                </div>
                                {/* Details box */}
                                <div className="text-center">
                                    <h1 className="fw-bold">{greeting}, <span>{userName.toUpperCase()}</span></h1>
                                    <p>Your best choice is <span className="text-success"> CamSharp </span> .</p>
                                </div> 
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className='mt-2 mb-2 text-center fw-bold'>
                                <h3 className='border  bg-warning'>Booking History</h3>
                            </div>

                            {sortedUserData.length === 0 ? (
                                <div className="text-center text-danger fw-bold">No Bookings Found</div>
                            ) : (
                                sortedUserData.map((booking, index) => (
                                    <div key={index} className="card my-2 p-3">
                                        <div className='d-flex '>
                                            <h2 className='fw-bold'>Booking Date :-</h2>
                                            <p className='fw-bold ms-3 pt-2'>{new Date(booking.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className=" d-flex justify-content-around align-items-center">
                                            <div className="d-flex justify-content-center">
                                                <div className="flex items-center">
                                                    <div>
                                                        <img src={booking.productImageUrl} alt="Product" className="img-fluid" loading='lazy' />
                                                    </div>
                                                    <p className="fw-bold">{booking.ProductName}</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="d-flex">
                                                    <h3 className="me-3  fw-bold">ID :- </h3>
                                                    <h5 className='pt-1'>{booking.productId}</h5>
                                                </div>
                                                <div className="d-flex">
                                                    <h3 className='fw-bold me-3'>Booked</h3>
                                                    {booking.isBook ? (
                                                        <span className="mt-2"><i className="fi fi-sr-check-circle text-success"></i></span>
                                                    ) : (
                                                        <span className="mt-2"><i className="fi fi-sr-cross-circle text-danger"></i></span>
                                                    )}
                                                </div>
                                                <div className="d-flex">
                                                    <h3 className='fw-bold me-3'>Return</h3>
                                                    {booking.isReturn ? (
                                                        <span className="mt-2"><i className="fi fi-sr-check-circle text-success"></i></span>
                                                    ) : (
                                                        <span className="mt-2"><i className="fi fi-sr-cross-circle text-danger"></i></span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}


export default BookingDetails;
