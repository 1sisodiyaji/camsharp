import React, { useState, useEffect, useRef } from 'react';
import ProfileImg from '../Images/boy.webp';
import './Admin.css';  // Import the CSS file
import Config from '../utils/Config';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Components/Common/AdminNavbar';

function UserPaymentDetails() {

    const [expandedPaymentId, setExpandedPaymentId] = useState(null); // State to track the expanded payment
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const detailsRef = useRef(null);

    const toggleDetails = (id) => {
        setExpandedPaymentId(prevId => (prevId === id ? null : id)); // Toggle the payment details
    };

    useEffect(() => {
        if (expandedPaymentId && detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [expandedPaymentId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/admin/payment`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPaymentData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const bookings = Array.isArray(paymentData) ? paymentData : [paymentData];
    const sortedBookings = [...bookings].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <>
            <div className="container-fluid design g-0 py-lg-5">
                <div className="text-center mb-4 pt-4">
                    <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
                </div>

                <div className="row g-0">
                    <div className="col-lg-6 col-12">
                        <div className="relative z-10">
                            {/* Admin Profile Section */}
                            <div className="d-flex align-items-center justify-content-center mb-6">
                                <div className="card p-3 m-1">
                                    <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                        <h1 className="text-2xl fw-bold">CamSharp</h1>
                                        <p className="text-warning text-sm mt-2">Your premier destination for photography</p>
                                    </div>
                                    <div className="text-center mb-6 pt-2">
                                        <div className="  bg-secondary shadow-lg shadow-black w-36 h-36 ms-8" style={{ borderRadius: '100%' }}></div>
                                        <div className=" mt-2 ms-3 w-40 h-40 overflow-hidden drop-shadow-xl shadow-inner shadow-blue-500" style={{ borderRadius: '100%' }}>
                                            <img src={ProfileImg} alt="Profile" className="Image-Boy" style={{ height: '100px' }} />
                                        </div>
                                        <h1 className="text-xl md:text-2xl fw-bold text-white mt-2">ROSHAN SINGH DEO</h1>
                                        <p className="text-sm md:text-base text-warning">Your journey to success starts here, with ownCamSharp.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        {/* Payment details for admin */}
                        <div className="text-center py-4">
                            <h2 className="text-2xl fw-bold">Payment History...</h2>
                        </div>
                        {sortedBookings.map((booking, index) => (
                            <div key={index} className="card mt-3 m-1">
                                <div className="text-center py-4" style={{ cursor: 'pointer' }} onClick={() => toggleDetails(booking._id)}>
                                    <h2 className="text-xl font-bold">{booking.name} : <span className='ml-4'>{booking.productId}</span></h2>
                                </div>
                                <div ref={detailsRef} className={`ps-4 pe-4 pt-2 border m-1 rounded-8 pb-1 ${expandedPaymentId === booking._id ? 'd-block' : 'd-none'}`}>
                                    <div className="d-flex align-items-center justify-content-between border bg-warning rounded-8 p-2 mb-3">
                                        <span className="fw-semibold">Product ID:</span>
                                        <span className='fw-semibold'>{booking.productId}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border bg-success rounded-8 p-2 mb-3">
                                        <span className="fw-semibold">Booking Payment Mode:</span>
                                        <span>{booking.bookingPaymentMode}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border bg-success rounded-8 p-2 mb-3">
                                        <span className="fw-semibold">Total Amount:</span>
                                        <span className='fw-semibold'>₹{booking.totalAmount}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border bg-success rounded-8 p-2 mb-3">
                                        <span className="fw-semibold">Advance Amount:</span>
                                        <span className='fw-semibold'>₹{booking.advanceAmount}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border bg-success rounded-8 p-2 mb-3">
                                        <span className="fw-semibold">Return Payment Mode:</span>
                                        <span className='fw-semibold'>{booking.returnPaymentMode}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border bg-danger rounded-8 p-2 mb-3">
                                        <span className="fw-semibold">Remaining Amount:</span>
                                        <span className='fw-semibold'>₹{booking.remainingAmount}</span>
                                    </div>
                                    <div className={`d-flex align-items-center justify-content-between border bg-${booking.isBook.toString() === "true" ? 'success' : 'danger'} rounded-8 p-2 mb-3`}>
                                        <span className="fw-semibold">Booking Status:</span>
                                        <span className='fw-semibold'>{booking.isBook.toString()}</span>
                                    </div>
                                    <div className={`d-flex align-items-center justify-content-between border bg-${booking.isReturn.toString() === "true" ? 'success' : 'danger'} rounded-8 p-2 mb-4`}>
                                        <span className="fw-semibold">Return Status:</span>
                                        <span className='fw-semibold'>{booking.isReturn.toString()}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2 p-1 mt-4 m-1">
                                    <span className="fw-semibold text-black">All Information about User</span>
                                    <Link to={`/payment/${booking._id}/${booking.productId}`}> <span className='btn btn-sm text-capitalize'> User Details</span></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <AdminNavbar />
            </div>
        </>
    );
}

export default UserPaymentDetails;
