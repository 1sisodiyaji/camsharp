import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import CamData from "../Alldata/CamData";
import LensData from "../Alldata/LensData";
import AccessData from "../Alldata/AccessoriesData"; 


function ItemsPage (){
    let { type } = useParams();
 
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {

        if (type === "camera") {
            setFilteredProducts(CamData);
        } else if (type === "lens") {
            setFilteredProducts(LensData);
        } else if (type === "accessiores") {
            setFilteredProducts(AccessData);
        }
    }, [type]);

    return (
        <>
            <div className="container-fluid g-0 design">

                <div id="item-list" className="container">
                    <h1 className="text-center text-capitalize">{type}</h1>
                    <div className="row">
                        {filteredProducts.map((item, index) => (
                            <div key={index} className="col-lg-6 col-12 my-2">
                                <div className="card p-3">
                                    <div className="d-flex justify-content-center align-item-center">
                                        <img className="img-fluid" src={item.ImgSrc} alt="Item" style={{ height: '200px', width: '200px' }} />
                                    </div>
                                    <div className="">
                                        <h2 className={`text-center`}>{item.Name}</h2>
                                        <small className={` ms-2`}>{item.Day}</small>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6"> <div className="btn btn-block rounded-6 disabled" > <h5 className="text-success fw-bold">₹ {item.Amount} </h5> </div>  </div>
                                        <div className="col-6"> 
                                        <Link to={{
                                            pathname: `/items/${type}/${item.id}/${item.Name}`,
                                            state: {
                                                type: type,
                                                itemId: item.id,
                                                name: item.Name,
                                                day: item.Day,
                                                amount: item.Amount,
                                                imgSrc: item.ImgSrc
                                            }
                                        }}>
                                            <div className="btn btn-block text-capitalize rounded-6 bg-warning"> <h5>  Continue <i className="fi fi-br-sign-out-alt mt-3 ms-1"></i> </h5>  </div>
                                         
                                        </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemsPage;