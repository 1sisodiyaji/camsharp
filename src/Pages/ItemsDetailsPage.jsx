import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CamData from '../Alldata/CamData';
import LensData from '../Alldata/LensData';
import AcceriossData from '../Alldata/AccessoriesData';
import BookingForm from '../Components/Core/BookingForm';

function ItemsDetails() {
    const { itemId, type } = useParams();
    const [booking , setBooking] = useState(false);
    const itemIdNumber = parseInt(itemId);

    const handleBookingShow = () =>{ 
        setBooking(!booking);
    }

    let item;
    if (type === 'camera') {
        item = CamData.find(item => parseInt(item.id) === itemIdNumber);
    } else if (type === 'lens') {
        item = LensData.find(item => parseInt(item.id) === itemIdNumber);
    } else if (type === 'accessiores') {
        item = AcceriossData.find(item => parseInt(item.id) === itemIdNumber);
    }

    if (!item) {
        return (
            <div className="vh-100 design">
                <div className="text-center mt-5">
                    <h2 className="text-center mb-4">Item not found</h2>
                    <p className="text-danger mb-4">We couldn't find the item you're looking for.</p>
                </div>
            </div>
        );
    }

    const renderProductDetails = () => (
        <div className=" row py-lg-5 g-0">

            <div className="col-lg-6 col-12 py-2  d-flex justify-content-center align-items-center" style={{minHeight: '65vh'}}>
                
                    <img src={item.ImgSrc} alt="Product" className="img-fluid mx-auto" loading='lazy' title={item.Name} />
                
            </div>
            <div className="col-lg-6 col-12 py-lg-5 ps-lg-2">
                <div className="card p-3">
                    <h2 className="fw-bold"><span>{item.Name}</span></h2>
                    <h4 className='text-success'><i className="fi fi-br-indian-rupee-sign"></i> <span>{item.Amount}</span> </h4>

                    <div>
                        <div>
                            <h2 className="fw-bold">Details:</h2>
                            <div className="  my-3">
                                <h4 >BRAND : {item.Name} </h4>
                            </div>
                        </div>
                        <div id="accessoriesSection">
                            <h2 className="pl-4 mt-4 text-blue-500 text-lg font-semibold">With:</h2>
                            <div className="d-flex justify-around mt-2 ml-3">
                                {type === 'camera' && (
                                    <>
                                        <div className="mb-2">
                                            <div className='badge badge-warning m-2'> <h4>Battery</h4></div>
                                            <div className='badge badge-warning m-2'><h4>Lens</h4></div>
                                            <div className='badge badge-warning m-2'><h4>Memory</h4></div>
                                            <div className='badge badge-success m-2'><h4>Charger</h4></div>
                                        </div>

                                    </>
                                )}
                                {type === 'lens' && (
                                    <div className="mb-2">
                                        <div className='badge badge-warning m-2'><h4>UV Lens</h4></div>
                                    </div>
                                )}
                                {type === 'accessiores' && (
                                    <>
                                        <div className="mb-2">
                                            <div className='badge badge-warning m-2'> <h4>100 watt</h4></div>
                                            <div className='badge badge-warning m-2'><h4>stand</h4></div>
                                            <div className='badge badge-warning m-2'><h4>wire</h4></div>
                                            <div className='badge badge-success m-2'><h4>Charger</h4></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>


                    <a href = "#BookingForm" className="btn w-100 text-capitalize rounded-6" onClick={handleBookingShow}> <h4>Rent it now</h4></a>
                    
                </div>
            </div>

        </div>
    );


    return (
        <>
            <div style={{ minHeight: '100vh' }} className='design container-fluid'>
                <div className="container">
                    {renderProductDetails()}
                    {booking &&  <BookingForm />}
                </div>
            </div>
        </>
    );
}


export default ItemsDetails;

