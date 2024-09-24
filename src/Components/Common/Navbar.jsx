import React, { useState, useEffect } from 'react';
import Config from "../../utils/Config";
import { Link, useLocation } from "react-router-dom";
import "./searchbar.css"

function Navbar() {
    const [user, setUser] = useState(null);
    const [darkmode, setDarkmode] = useState(false);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSearchBar, setIsSearchBar] = useState(false);

    const isNavLinkActive = (path) => {
        return location.pathname.includes(path);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch(`${Config.BASE_URL}/api/users/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                 
                    setUser(data);
                } catch (error) {
                    console.error("Error fetching user information:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const storedDarkMode = localStorage.getItem('darkmode');
        if (storedDarkMode) {
            const isDarkMode = JSON.parse(storedDarkMode);
            setDarkmode(isDarkMode);
            document.body.classList.toggle('dark-theme', isDarkMode);
        }
    }, []);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    const toggleDarkMode = () => {
        const isDarkMode = !darkmode;
        setDarkmode(isDarkMode);

        // Toggle dark theme class on body
        const body = document.body;
        localStorage.setItem('darkmode', JSON.stringify(isDarkMode));
        body.classList.toggle('dark-theme', isDarkMode);
    };

    const toggleMode = () => {
        setSidebarOpen(!sidebarOpen);
    }
    const toogleSearch = () => {
        setIsSearchBar(!isSearchBar);
    }

    const logout = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <>

            <nav className="navbar navbar-expand-lg  fixed-top d-lg-none d-md-none d-sm-block  shadow-0">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand text-center text-decoration-none"
                        to="/"
                    >
                        <img
                            src="../img/logo.png"
                            height="35"
                            title="Cam-Sharp"
                            alt="Cam-sharp  Logo"
                            loading="lazy"
                        />
                    </Link>
                    <div className='d-flex'>
                        {isSearchBar &&
                            <div >
                                <input type="text" className='search-container mx-1 rounded-6 ps-2' placeholder="Search..." />
                            </div>
                        }
                        <i className="fi fi-rs-search me-4" onClick={toogleSearch}></i>
                        <i className="fi fi-sr-chart-simple-horizontal iconColor pe-2" style={{ fontSize: '1.2rem' }} onClick={toggleMode}></i>
                    </div>
                </div>
            </nav>

            {/* sidebaar */}
            <div
                style={{ zIndex: "99" }}
                className={`sidebar ${sidebarOpen ? "show" : ""
                    } d-lg-none d-md-none d-sm-block`}
            >
                <div className="pt-5 mt-2">
                    <ul className="nav flex-column text-start ms-4">
                        {!user ?
                            <>
                                <li className="nav-item ">
                                    <Link
                                        className={`nav-link ${isNavLinkActive("/signup") ? "active" : ""
                                            }`}
                                        to="/signup"
                                    >
                                        <i className="fi fi-rs-rocket-lunch pe-2"></i>
                                        Create Account
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${isNavLinkActive("/login") ? "active" : ""
                                            }`}
                                        to="/login"
                                    >
                                        <i className="fi fi-br-sign-in-alt pe-2"></i>
                                        Log in
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${isNavLinkActive("/profile") ? "active" : ""
                                            }`}
                                        to="/profile"
                                    >
                                        {" "}
                                        <i className="fi fi-ss-user iconColor  pe-2"></i>
                                        Profile
                                    </Link>
                                </li>
                            </>
                        }

                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isNavLinkActive("/about") ? "active" : ""
                                    }`}
                                to="/about"
                            >
                                {" "}
                                <i className="fi fi-sr-info pe-2 "></i>
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${isNavLinkActive("/products") ? "active" : ""
                                    }`}
                                to="/products"
                            >
                                {" "}
                                <i className="fi fi-sr-camera-viewfinder pe-2"></i>
                                Product
                            </Link>
                        </li>
                         

                        <li className="nav-item my-1" onClick={toggleDarkMode}  >
                            <i className="fi fi-sr-moon-stars ps-3 pe-2"></i>      Dark Mode
                        </li>


                        {user && <>
                            <li className="nav-item my-2">
                                <Link
                                    className={`nav-link ${isNavLinkActive("/user-booking") ? "active" : ""
                                        }`}
                                    to="/user-booking"
                                >
                                    <i className="fi fi-rr-memo-circle-check pe-2"></i>
                                     Booking Details
                                </Link>
                            </li>
                            <li className="nav-item ps-3">
                                <Link
                                    onClick={logout} 
                                    className='iconColor'
                                    to="/"
                                >
                                    <i className="fi fi-br-sign-in-alt pe-2"></i>
                                    logout
                                </Link>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>

            {/* <!-- Navbar For big screen--> */}
            <nav className="navbar navbar-expand-lg sticky sticky-top p-0 d-lg-block d-md-block d-none  shadow-6"
                style={{ zIndex: "100000!important" }} >
                <div
                    className="container-fluid "
                    style={{
                        zIndex: "1000!important",
                    }}
                >
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Navbar brand */}
                        <Link className="navbar-brand text-center ms-4 text-warning" to="/">
                            <img
                                src="img/logo.png"
                                alt="logo"
                                title="camsharp logo"
                                className="img-fluid"
                                style={{ height: "35px" }}
                            />
                            <h1 style={{ fontSize: "24px" }} className="mb-0 ms-2">
                                camSharp
                            </h1>
                        </Link>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav mx-auto d-flex justify-content-center">

                                <li className="nav-item">
                                    <Link className={`nav-link  ${isNavLinkActive("/products") ? "active" : ""
                                        }`} to="/products">
                                        Product
                                    </Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link className={`nav-link  ${isNavLinkActive("/about") ? "active" : ""
                                        }`} to="/about">
                                        About us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm rounded-8  me-2"
                        onClick={toggleDarkMode}
                    >
                        <i className="fi fi-ss-moon-stars"></i>
                    </button>

                    <div className="d-lg-block d-md-block d-none d-flex justify-content-center align-items-center">
                        {user ? (
                            <>
                                <div className="d-flex align-items-center">
                                    <div className="nav-item " style={{ zIndex: "9999" }}>
                                        <button className="btn btn-floating">
                                            {user ? (
                                                <>
                                                    <Link to="/profile">
                                                        <img
                                                            src={user.image}
                                                            className="rounded-circle border"
                                                            height="28"
                                                            alt="."
                                                            loading="lazy"
                                                        />
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to="/profile">
                                                        <div className="rounded-circle pt-2">
                                                            <i className="fi fi-ss-user text-primary"></i>
                                                        </div>
                                                    </Link>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-sm     text-capitalize">
                                        Log in
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;