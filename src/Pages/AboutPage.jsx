import React from 'react'; 
import FooterBar from '../Components/Common/FooterBar';

function About (){
    return (
        <> 
            <FooterBar/>
            <div>
                <div className='design container-fluid py-lg-5'>
                    <h1 className="text-center">About Us</h1>

                    <div className="row">
                        <div className="col-lg-4 col-12">
                        <img src="img/logo.png" alt="logo" title='camSharp Logo' className='img-fluid' />
                        </div>
                        <div className="col-lg-8 col-12 d-flex justify-content-center align-items-center">
                        <h2 className="heading2 ">
                        Welcome to <span className="font-bold">CamSharp</span>, your premier destination for camera, lens, and equipment rentals. At <span className="font-bold">CamSharp</span>, we're passionate about photography and videography, and we understand the importance of having the right gear to bring your vision to life.
                    </h2>
                        </div>
                    </div>
                    
                    <div className="row mobileViewDashboard">
                        <div className="col-lg-8 col-12 d-flex justify-content-center align-items-center">
                        <h2 className="heading2">
                        Our mission is to provide photographers and filmmakers with access to high-quality equipment at affordable prices. Whether you're a professional in need of specialized gear or an enthusiast exploring new creative avenues, we've got you covered.
                         </h2>
                        </div>
                        <div className="col-lg-4 col-12"><img src="img/aboutMission.png" className='img-fluid' alt="" /></div>
                    </div>
                   

                   <div className="row">
                    <div className="col-lg-4 col-12">
                        <img src="img/11.png" alt="camera pic" title='camera image' className='img-fluid' />
                    </div>
                    <div className="col-lg-8 col-12 d-flex justify-content-center align-items-center">
                    <h2 className="heading2 mb-3">
                        With our extensive selection of cameras, lenses, and accessories, you'll find everything you need to capture stunning images and videos. Plus, our team of experts is here to offer guidance and support, ensuring that you have a seamless rental experience from start to finish.
                     <br />
                        And if you're in the market to purchase your own gear, be sure to check out our inventory of cameras for sale. We're committed to offering competitive prices on top-of-the-line equipment, so you can invest in the tools you need without breaking the bank.
                    </h2>
                    </div>
                   </div>
                   
                    <h1 className="heading  mb-6">
                       <span className='text-success'> Thank you <span role="img" aria-label="heart">💖</span> </span>for choosing<span className="font-bold text-warning mx-1">CamSharp</span> for all of your camera rental and sales needs. We look forward to helping you bring your creative vision to life!
                    </h1>
                </div>
            </div> 
        </>
    );
}
 
export default About;