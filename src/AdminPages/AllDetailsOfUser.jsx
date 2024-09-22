import React, { useState, useEffect } from 'react';
import ProfileImg from '../Images/boy.webp';
import { useParams } from 'react-router-dom';
import Config from '../utils/Config';
import './Admin.css';
import AdminNavbar from '../Components/Common/AdminNavbar';


function AllDetailsOfUser() {
    const [fetchData, setfetchData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { _id, productId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/payment/${_id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setfetchData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };




    const bookings = Array.isArray(fetchData) ? fetchData : [fetchData];
    return (
        <>

            {bookings.map((booking, index) => (
                <div key={index} className='container-fluid g-0 design'>
                    {/*  details of ADMIN */}
                    <div className="row g-0">
                    <div className="col-lg-6 col-12 ">
                            <div className="relative z-10 ">
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


                            {/* Close  of details of admin */}

                            {/*  3d user information section start */}

                            <div className="card p-2 m-1">
                                <div className=" ">
                                    {/* Gradient Overlay */}
                                    <div className="text-center mb-2 ">
                                        <h1 className="fw-bold my-3 text-secondary">User Information...</h1>
                                    </div>

                                    <div className=" z-10">

                                        <div className="my-4 rounded-6 border ">

                                            <div className="d-flex align-items-center justify-content-evenly border-bottom ">
                                                <span className="fw-bold text-warning">Name : </span>
                                                <span >{booking.user.name}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom">
                                                <span className="fw-bold text-warning">Mobile Number : </span>
                                                <span >{booking.user.mobileNumber}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom">
                                                <span className="fw-bold text-warning">Email : </span>
                                                <span>{booking.user.email}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom">
                                                <span className="fw-bold text-warning">Login Count : </span>
                                                <span >{booking.user.LoginCount}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly ">
                                                <span className="fw-bold text-warning">Created At : </span>
                                                <span>{new Date(booking.user.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="col-lg-6 col-12">
                            {/* 3d user information details end */}

                            <div className='fw-bold text-center mt-5'>
                                <h1>Booking and Payment Details... </h1>
                            </div>
                            {/*  booking details */}

                            <div className="d-flex align-items-center justify-content-center card p-3 my-2">
                                <div className=" w-100 "> 
                                    <div className="text-center mb-2 shadow-lg py-4">
                                        <h1 className="text-3xl font-bold text-secondary">Booking Details...</h1>
                                    </div>

                                    <div className=" z-10 pb-4">

                                        <div className="pt-4  pl-1 ">

                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">ProductId:</span>
                                                <span className="fw-bold">{productId}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">Quantity:</span>
                                                <span className="fw-bold">{booking.userProduct.quantity}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">Date:</span>
                                                <span className="fw-bold">{formatDate(booking.userProduct.date)}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">Time:</span>
                                                <span className="fw-bold">{booking.userProduct.time}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">Duration:</span>
                                                <span className="fw-bold">{booking.userProduct.duration}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">Location:</span>
                                                <span className="fw-bold">{booking.userProduct.location}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">Name:</span>
                                                <span className="fw-bold">{booking.userProduct.name}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between rounded-8 p-3 mb-3  border shadow-6">
                                                <span className="fw-bold">WhatsApp No:</span>
                                                <span className="fw-bold">{booking.userProduct.mobilenumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className=" shadow-lg  text-center py-4">
                                <h2 className="text-2xl font-bold">Payment History...</h2>
                            </div>



                            <div className="card p-3 mt-3">

                                <div className='d-flex justify-content-between '>
                                    <span className=" fw-bold">{booking.name} : </span>
                                    <span className='me-4 fw-bold'>{booking.productId}</span>

                                </div>

                                <div className='p-1'>

                                    <div className="d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Product ID:</span>
                                        <span className='fw-bold'>{booking.productId}</span>
                                    </div>

                                    <div className=" d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Booking Payment Mode:</span>
                                        <span className='fw-bold'>{booking.bookingPaymentMode}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Total Amount:</span>
                                        <span className='fw-bold'>₹{booking.totalAmount}</span>
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Advance Amount:</span>
                                        <span className='fw-bold'>₹{booking.advanceAmount}</span>
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Return Payment Mode:</span>
                                        <span className='fw-bold'>{booking.returnPaymentMode}</span>
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-between  bg-danger rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Remaining Amount:</span>
                                        <span className='fw-bold'>₹</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Booking Status:</span>
                                        <span className='fw-bold'>{booking.isBook.toString()}</span>

                                    </div>
                                    <div className="d-flex align-items-center justify-content-between rounded-8 p-2 mb-3  border shadow-6">
                                        <span className="fw-bold">Return Status:</span>
                                        <span className='fw-bold'>{booking.isReturn.toString()}</span>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

 
                    <AdminNavbar />
                </div>
            ))}

        </>
    )
}


export default AllDetailsOfUser;
