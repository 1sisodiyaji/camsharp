import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContainerData from "../Alldata/MainContainerData";


const ProductPage = () => {

    const [cameras, setCameras] = useState([]);
    const [lenses, setLenses] = useState([]);
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        const camerasData = MainContainerData.filter(item => item.Name === "Camera");
        const lensesData = MainContainerData.filter(item => item.Name === "Lens");
        const accessoriesData = MainContainerData.filter(item => item.Name === "Accessiores");

        setCameras(camerasData);
        setLenses(lensesData);
        setAccessories(accessoriesData);
    }, []);


    return (
        <>
            <div className="conatiner-fluid design">
                <div className="container">
                    {/* Camera Section */}
                    {cameras.map((item) => (
                        <div className="row my-2" key={item.id}>
                            <div className="col-lg-8   d-flex justify-content-center align-items-center">
                                <div className="row g-0">
                                    <div className="col-lg-8 col-12">
                                        <h2>Camera</h2>{item.Name}
                                        <p>Dive into the world of cutting-edge camera technology with CamSharp. Discover unparalleled precision and performance in every shot. From high-resolution sensors to advanced autofocus systems, our cameras redefine clarity and detail. Whether you're capturing landscapes, portraits, or action shots, CamSharp ensures every frame exceeds expectations. Experience the art of photography with unmatched quality and reliability.
                                        </p>
                                        <Link to={`/items/${item.Name.toLowerCase()}`}>
                                            <div className="btn text-capitalize rounded-8">know More</div>
                                        </Link>
                                    </div>
                                    <div className="col-lg-4 col-12 my-2">
                                        <div className="card p-lg-3 p-1">
                                            <h5 className='text-center'>Camera</h5>
                                            {[item.ImgSrc2].map((imgSrc, index) => (
                                                <img src={imgSrc} alt={`${item.Name} ${index + 1}`} key={index} className="img-fluid mx-auto" loading="lazy" data-src={imgSrc} />
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 col-12 d-lg-block d-md-block d-none">
                                <div className="container-fluid">
                                    <div className="row g-0">

                                        <div className="col-12">
                                            <img src="img/7.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Lens Section */}
                    {lenses.map((item) => (
                        <div className="row my-2" key={item.id}>
                            <div className="col-lg-4 col-12 d-lg-block d-md-block d-none">
                                <img src="img/10.png" alt="" />
                            </div>

                            <div className="col-lg-8 col-12 d-flex justify-content-center align-items-center">
                                <div className="row mobileViewDashboard">
                                    <div className="col-lg-4 col-12">
                                        <div className="card p-lg-3 p-1">
                                            <h5 className='text-center'>{item.Name}</h5>
                                            {[item.ImgSrc2].map((imgSrc, index) => (
                                                <img src={imgSrc} alt={`${item.Name} ${index + 1}`} key={index} className="img-fluid mx-auto" loading="lazy" data-src={imgSrc} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-lg-8 my-2  col-12">
                                        <h2>{item.Name}</h2>
                                        <p>  Delve into the art of photography with CamSharp lenses. Crafted for precision and clarity, our lenses capture every detail with breathtaking clarity and depth. From wide-angle vistas to intimate close-ups, explore a world of optical excellence. Designed for professionals and enthusiasts alike, CamSharp lenses redefine visual storytelling. Elevate your photography with lenses that deliver unmatched sharpness, contrast, and color accuracy. Discover a new perspective with CamSharp.
                                        </p>
                                        <Link to={`/items/${item.Name.toLowerCase()}`}>
                                            <div className="btn text-capitalize rounded-6">Get a Trial</div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                    {/* Accessories Section */}
                    {accessories.map((item) => (
                        <div className="row my-2" key={item.id}>
                            <div className="col-lg-8 d-flex justify-content-center align-items-center">
                                <div className="row g-0">
                                    <div className="col-lg-8 col-12">
                                        <h2>{item.name}</h2>
                                        <p>Enhance every shot with CamSharp accessories designed to empower your creativity. From versatile tripods that stabilize your frame to high-capacity memory cards that capture every moment, our range of accessories ensures you never miss a beat. Whether you're a seasoned photographer or a budding enthusiast, CamSharp accessories are your trusted companions in capturing life's most memorable moments. Discover the perfect complement to your photography journey with CamSharp.</p>
                                        <Link to={`/items/${item.Name.toLowerCase()}`}><div className="btn text-capitalize rounded-6">try it</div></Link>
                                    </div>
                                    <div className="col-lg-4 col-12 my-2">
                                        <div className="card p-lg-3 p-1">
                                            <h5 className='text-center'>{item.name}</h5>
                                            {[item.ImgSrc2].map((imgSrc, index) => (
                                                <img src={imgSrc} alt={`${item.Name} ${index + 1}`} key={index} className="img-fluid mx-auto" loading="lazy" data-src={imgSrc} />
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 col-12 d-lg-block d-md-block d-none">
                                <div className="container-fluid">
                                    <div className="row g-0">

                                        <div className="col-12">
                                            <img src="img/4.png" alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}

export default ProductPage