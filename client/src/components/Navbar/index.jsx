import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const NavBar = () => {
    const [menuToggler, setMenuToggler] = useState('menu__toggler');
    const [menu, setMenu] = useState('menu');

    const handleMenuToggler = () => {
        if (menuToggler === 'menu__toggler') {
            setMenuToggler('menu__toggler active');
            setMenu('menu active');
        } else {
            setMenuToggler('menu__toggler');
            setMenu('menu');
        }
    }

    return (
        <header className="header">

            <div
                onClick={handleMenuToggler}
                className={menuToggler}>
                <div className="toggler"></div>
                <div className="toggler"></div>
                <div className="toggler"></div>
            </div>

            <div className="avatar__container">
                <p className="avatar"></p>
            </div>

            <nav className={menu}>
                <ul className="list">
                    <li className="item" onClick={handleMenuToggler}>
                        <Link to="/home" className="link"> Home </Link>
                    </li>
                    <li className="item" onClick={handleMenuToggler}>
                        <Link to="/chat" className="link"> Chat </Link>
                    </li>
                    <li className="item" onClick={handleMenuToggler}>
                        <Link to="/products" className="link"> Products </Link>
                    </li>
                    <li className="item" onClick={handleMenuToggler}>
                        <Link to="/contact" className="link"> Contact </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
