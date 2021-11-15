import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logoWhite from "../../assets/acoustica-logo-white.png";

export default function Navbar() {
    return (
        <div className={`${styles.navOuter}`}>

            <div className="container row items-center">
                <NavLink to="/" className={`h-full ${styles.logoContainer}`}>
                    <span className={styles.logoText}>Acoustica Shop</span>
                </NavLink>

                <div className="row ml-auto">
                    <button
                        className={`btn btn-simple mx-0`}
                    >
                        Log In
                    </button>

                    <NavLink to="/wishlist">
                        <button className={`btn btn-simple mx-0`}> 
                            <span className="wishlist-with-badge">
                                <span className="material-icons md-24"> favorite_border </span>
                                <span className={`${styles.badgeNumber}`}>3</span>
                            </span>
                        </button>
                    </NavLink>

                    
                    <NavLink to="/cart">
                        <button className={`btn btn-simple`}>
                            <span className="cart-with-badge">
                                <span className="material-icons-outlined md-24"> shopping_cart </span>
                                <span className={`${styles.badgeNumber}`}>9</span>
                            </span>
                        </button>
                    </NavLink>
                    
                </div>

            </div>
        </div>
      );
}