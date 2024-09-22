import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileImg from '../Images/boy.webp';
import AdminNavbar from '../Components/Common/AdminNavbar';
import Config from '../utils/Config';
import './Admin.css';

function UserBookingDetails() {
    const { _id, productId } = useParams();
    const [bookingDetails, setBookingDetails] = useState();

    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    const [bookButtonVisible, setBookButtonVisible] = useState(false);
    const [payFormVisible, setPayFormvisible] = useState(true);
    const [BookButtonVisible, setbookButtonVisible] = useState(true);
    const [RPayBuuttonVisibble, setRPayButtonVisible] = useState(true);
    const [returnbuttonvisible, setreturnbuttonVisible] = useState(false);
    const [otpInputVisibble, setOtpInputVisible] = useState(false);


    const [AmountValue, setAmountValue] = useState({
        Total_Amount: " ",
        Advance_Amount: " "

    })
    const OnChangePayInput = (e) => {
        const { name, value } = e.target;
        setAmountValue({
            ...AmountValue,
            [name]: value
        },
        )
    }

    const [RemaingAmount, setRemaingAmount] = useState({
        Remaning_Amount: " "

    })
    const OnChangeRPayInput = (e) => {
        const { name, value } = e.target;
        setRemaingAmount({
            ...RemaingAmount,
            [name]: value,
        })
    }

    const [OTPValue, setOTPValue] = useState(
        {
            OTP: " "
        })

    const OnChangeOTPInput = (e) => {
        const { name, value } = e.target;
        setOTPValue({
            ...OTPValue,
            [name]: value
        })
    }

    //fetch booking details 
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`${Config.BASE_URL}/api/user-booking-details/${_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await response.json();

                setBookingDetails(data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, [_id]);






    const onsubmitPayButton = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Config.BASE_URL}/api/process-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    _id,



                })
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }
            setOtpInputVisible(true);

            setBookButtonVisible(true);
            setPayFormvisible(false);

        } catch (error) {
            console.log('payment error:', error);
        }
    };


    const onBookingButtonSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Config.BASE_URL}/api/boooking-otp-validation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    BookingOTP: OTPValue.OTP,
                    productId: productId,
                    _id,
                    totalAmount: AmountValue.Total_Amount,
                    advanceAmount: AmountValue.Advance_Amount,
                    mode: selectedPaymentMode,

                })
            });


            if (!response.ok) {
                throw new Error('Failed to process OTP-Validation');
            }
            setOtpInputVisible(false);
            setbookButtonVisible(false);
            setOTPValue({
                OTP: " "
            })



            setAmountValue({
                Total_Amount: " ",
                Advance_Amount: " "

            })
            setSelectedPaymentMode('');


        } catch (error) {
            console.log('payment error:', error);
            console.log(productId);
        }

    };

    const onsubmitRpayButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${Config.BASE_URL}/api/return-process-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    _id,

                })
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }
            setOtpInputVisible(true);
            setRPayButtonVisible(false);
            setreturnbuttonVisible(true);

        } catch (error) {
            console.log('payment error:', error);
        }


    };

    const onReturnButtonSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${Config.BASE_URL}/api/return-otp-validation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    returnOTP: OTPValue.OTP,
                    productId: productId,
                    _id,
                    remaingAmount: RemaingAmount.Remaning_Amount,
                    mode: selectedPaymentMode, // Assuming you want to send the payment amount as well
                })
            });

            if (!response.ok) {
                throw new Error('Failed to process return  OTP-Validation');
            }

            setOtpInputVisible(false);

            setOTPValue({
                OTP: ""
            })
            setRemaingAmount({
                Remaning_Amount: " "
            })
            setSelectedPaymentMode('');



        } catch (error) {
            console.log('payment error:', error);
        }



    };

    const onSelectedCashPaymentMode = () => {
        setSelectedPaymentMode('Cash');

    }

    const onSelectedOnlinePaymentMode = () => {
        setSelectedPaymentMode('Online');

    }

    if (!bookingDetails) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const bookings = Array.isArray(bookingDetails) ? bookingDetails : [bookingDetails];

    return (
        <>


            {/*  yaha pe use krna  */}
            {bookings.map((booking, index) => (
                <div key={index} className='container-fluid design g-0 py-lg-5'>
                    <div className="text-center mb-4">
                        <h1 className=" fw-bold ">Admin</h1>
                    </div>
                    {/*  details of ADMIN */}
                    <div className="row g-0">

                        {/* Admin Details Section */}
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
                            <div className=' text-center text-decoration-underline  '>
                                <h1>Booking and Payment Details... </h1>
                            </div>
                            {/*  booking details */}

                            <div className="d-flex align-items-center justify-content-center">
                                <div className=" my-3 card p-3 m-1 w-100 ">
                                    {/* Gradient Overlay */}
                                    <div className="text-center mb-2 ">
                                        <h1 className=" fw-bold text-secondary">Booking Details...</h1>
                                    </div>

                                    <div className=" z-10  h-auto rounded-8 border pb-3 mb-3">

                                        <div className="pt-3 ">

                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">ProductId : </span>
                                                <span>{booking.productId}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">Quantity :</span>
                                                <span>{booking.quantity}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">Date :</span>
                                                <span>{formatDate(booking.date)}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">Time :</span>
                                                <span>{booking.time}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">Duration :</span>
                                                <span>{booking.duration}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">Location :</span>
                                                <span>{booking.location}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly border-bottom py-2">
                                                <span className="fw-bold text-warning">Name :</span>
                                                <span>{booking.name}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-evenly  ">
                                                <span className="fw-bold text-warning">WhatsApp No : </span>
                                                <span>{booking.mobilenumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 3d user information details end */}


                    <div className='container'>
                        <div className="row">
                            <div className="col-lg-4 col-12">
                            {booking.isReturn ? ' ' : (<div className='card p-3'>
                            <h3 className='font-bold  text-center'>Payment Mode: </h3>
                            <button className={`p-2 rounded-8 ${selectedPaymentMode === 'Cash' ? 'bg-success' : 'bg-white'}`} onClick={onSelectedCashPaymentMode}>Cash</button>
                            <button className={`p-2 rounded-8 ${selectedPaymentMode === 'Online' ? 'bg-success' : 'bg-white'}`} onClick={onSelectedOnlinePaymentMode}>Online</button>
                        </div>)}
                            </div>
                        </div>
                      
                        {booking.isReturn && (
                            <div className="bg-success  text-light px-4 py-3 rounded-4 relative mt-2 text-center" role="alert">
                                <span className="block sm:inline"> "The product has been returned.":</span>
                                <span className="block sm:inline"> " सामग्री वापस कर दिया गया है।":</span>

                            </div>
                        )}

                        {selectedPaymentMode && !booking.isBook && payFormVisible && (
                            <div className='card text-center mt-4 p-3'>
                                <h1 className='font-bold text-black text-2xl'>First Payment...</h1>
                                <form className='rounded-8  p-3' action="" onSubmit={onsubmitPayButton}>

                                    <div class="d-flex">
                                        Total_Amount:
                                        <input className='form-control w-100' type="text" name="Total_Amount" placeholder='Total-Amount' required value={AmountValue.Total_Amount} onChange={OnChangePayInput} /> 
                                    </div>
                                    <div class="d-flex my-3 ">
                                        Adv_Payment:
                                        <input className='w-100 form-control' type="text" name="Advance_Amount" placeholder='Advance-Amount' required value={AmountValue.Advance_Amount} onChange={OnChangePayInput} /></div>
                                    <button className='btn btn-sm text-capitalize'>Pay </button>
                                </form>
                            </div>
                        )}

                        {selectedPaymentMode && !booking.isReturn && booking.isBook && RPayBuuttonVisibble && (
                            <div className='card my-2 p-3'>
                                <h1 className="fw-bold text-center">Remaining Payment...</h1>
                                <form className='row' action="" onSubmit={onsubmitRpayButton}>
                                    <div className="col-2">Remaining Payment : </div>
                                    <div className="col-10"> <input className='form-control' type="text" name="Remaning_Amount" placeholder='Remaining-Amount' required value={RemaingAmount.Remaning_Amount} onChange={OnChangeRPayInput} /></div>
                                   
                                    <button className='btn my-2 text-capitalize'>RePay</button>
                                </form>
                            </div>
                        )}



                        
                            
                            {otpInputVisibble && (
                                <div className='card my-2 p-3'>
                            <h1 className='text-center'>OTP</h1>
                            <div className='fw-bold d-flex'>
                                OTP:<input className='w-100 form-control' type="text" name="OTP" placeholder='OTP' required value={OTPValue.OTP} onChange={OnChangeOTPInput} />
                            </div>
                            {bookButtonVisible && !booking.isBook && BookButtonVisible && (
                                <button className='btn my-3  text-capitalize' onClick={onBookingButtonSubmit}>Book</button>
                            )}
                            {selectedPaymentMode && booking.isBook && !booking.isReturn && returnbuttonvisible && (
                                <button className=' btn my-3 text-capitalize' onClick={onReturnButtonSubmit}>Return</button>
                            )}
                           </div>
                            )}
                            
                        </div>

                    </div>


            ))}
            <AdminNavbar />

        </>
    );
};

export default UserBookingDetails;
