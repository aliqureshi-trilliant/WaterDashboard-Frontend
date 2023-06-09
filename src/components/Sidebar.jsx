import classes from './Sidebar.module.css';
import logo from '/images/logo_trilliant.png';
import { useEffect } from 'react';
import { Link, useLocation } from'react-router-dom';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { MdElectricMeter } from 'react-icons/md';
import { SiGoogleanalytics } from 'react-icons/si';
import { IoMapSharp } from'react-icons/io5';
import { BiLogOut } from'react-icons/bi';

function Sidebar() {

    const location = useLocation();

    const toggleMenuItem = (event) => {

        const menuItems = document.querySelectorAll(`.${classes.menuItem}`);
        menuItems.forEach((el) => el.classList.remove(classes.active));

        const clickedItem = event.target.closest(`.${classes.menuItem}`);
        clickedItem.classList.add(classes.active);

    };

    const selectMenuItem = (name) => {
        for (const a of document.querySelectorAll('a')) {
            if (a.textContent.includes(name)) {
                toggleMenuItem({target: a});
            }
        }
    };

    useEffect(() => {
        switch (location.pathname) {
        case '/home': selectMenuItem('Home'); break;
        case '/meters' : selectMenuItem('Meters'); break;
        case '/metrics' : selectMenuItem('Metrics'); break;
        case '/maps' : selectMenuItem('Maps'); break;
        case '/about' : selectMenuItem('About'); break;
        default : document.querySelectorAll(`.${classes.menuItem}`).forEach((el) => el.classList.remove(classes.active));
        }
    }, [location]);

    return (
        <div className={classes.sidebar}>
            <div className={classes.trilliantContainer}>
                <img className={classes.logo} src={logo} alt="Trilliant logo"/>
                <h3 className={classes.trilliant}>Trilliant</h3>
            </div>
            <ul className={classes.menuItems}>
                <li className={classes.menuItem}>
                    <Link to="/home" onClick={toggleMenuItem}>
                        <AiFillHome className={classes.icons}/>
                        <span>Home</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="/meters" onClick={toggleMenuItem}>
                        <MdElectricMeter className={classes.icons}/>
                        <span>Meters</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="/metrics" onClick={toggleMenuItem}>
                        <SiGoogleanalytics className={classes.icons}/>
                        <span>Metrics</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="/maps" onClick={toggleMenuItem}>
                        <IoMapSharp className={classes.icons}/>
                        <span>Maps</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="/about" onClick={toggleMenuItem}>
                        <AiFillSetting className={classes.icons}/>
                        <span>About</span>
                    </Link>
                </li>
            </ul>
            <div className={classes.logoutContainer}>
                <div className={`${classes.menuItem} ${classes.logout}`}>
                    <Link to="/logout" onClick={toggleMenuItem}>
                        <BiLogOut className={classes.icons}/>
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
