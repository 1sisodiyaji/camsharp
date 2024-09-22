import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Config from '../../utils/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookingForm = () => {

    const { itemId } = useParams();
    const { name } = useParams();
    const ItemidNumber = parseInt(itemId);
    const [loading , setLoading] = useState(false);
    const initialFormData = {
        ProductName: name,
        ItemId: ItemidNumber,
        quantity: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        Name: "",
        whatsappNo: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = sessionStorage.getItem('token');  
        try {


            const response = await fetch(`${Config.BASE_URL}/api/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token // Include the token in the request headers
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setFormData(initialFormData); 
                setLoading(false);
                toast.success("Booking data send in database successfully", { theme: "dark" });  

            }

        } catch (error) {
            console.error('Error submitting booking form:', error);
            setLoading(false);
            toast.error("Failed to Book .", { theme: "dark" }); 

        }
    };
    return (
        <> 
         <ToastContainer />
        <div className="row g-0">
            <div className="col-lg-6 col-12">
            <section id='BookingForm'>
                <div className="mt-2 mb-12">
                    <h1 className="text-center fw-bold">Booking Details</h1>

                    <div className="container">
                        <form onSubmit={onHandleSubmit} className="card p-3">
                            <small>Please Enter the Details ...</small>
                            <div className="d-flex px-2 py-1 mt-2">
                                <i className="fi fi-br-tally pe-2 pt-2"></i>

                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder='Quantity'
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    className="form-control w-100"
                                />
                            </div>
                            <div className="d-flex px-2 py-1 mt-2">
                                <i className="fi fi-sr-calendar pt-2 pe-2"></i>
                                <input type="date" id="date" name="date" placeholder='Date' value={formData.date} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="d-flex  px-2 py-1 mt-2">
                                <i className="fi fi-sr-clock pt-2 pe-2"></i>
                                <input type="time" id="time" name="time" placeholder='Time' value={formData.time} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="d-flex px-2 py-1 mt-2">
                                <span className='pt-2 pe-2' role="img" aria-label="loading">⏳</span>
                                <input type="text" id="duration" name="duration" placeholder='Duration in Hrs.' value={formData.duration} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="d-flex px-2 py-1 mt-2">
                                <i className="fi fi-ss-land-layer-location pe-2 pt-2"></i>
                                <input type="text" id="location" name="location" placeholder='Your Location' value={formData.location} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="d-flex px-2 py-1 mt-2">
                                <i className="fi fi-sr-id-card-clip-alt pt-2 pe-2"></i>
                                <input type="text" id="Name" name="Name" placeholder='Name' value={formData.Name} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="d-flex px-2 py-1 mt-2">
                                <i className="fi fi-brands-whatsapp pe-2 pt-2"></i>
                                <input type="text" id="whatsappNo" name="whatsappNo" placeholder='WhatsApp No' value={formData.whatsappNo} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="my-3 ">
                                <button type="submit" className="btn btn-block rounded-6">
                                    {loading? 
                                    <> Booking... <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </>
                                    : 
                                     <h4>Book <i className="fi fi-sr-arrow-circle-right pt-2 ps-2"></i></h4> }
                                </button>



                            </div>

                        </form>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className=" bg-dark my-3 p-4   rounded-6 text-light">
                                    Check Out Your Booking Details
                                    <Link to={`/user-booking/${itemId}`} className="m-2">View Booking Details</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            </div>
            <div className="col-lg-6 col-0 d-lg-block d-md-block d-none">
                <img src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1726974367/Camsharp/Booking_Form_tq3afm.png" alt="Booking form" className='img-fluid mx-auto' loading='lazy' title='Book your camera'/>
            </div>
        </div>
            
        </>
    );
}

export default BookingForm;
