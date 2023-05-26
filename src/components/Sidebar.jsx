import classes from './Sidebar.module.css';
import logo from '/images/logo_trilliant.png';
import { Link } from'react-router-dom';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { MdElectricMeter } from 'react-icons/md';
import { SiGoogleanalytics } from 'react-icons/si';
import { IoMapSharp } from'react-icons/io5';
import { BiLogOut } from'react-icons/bi';

function Sidebar() {

    const toggleMenuItem = () => {
        document.getElementById('menuItem').classList.toggle(classes.active);
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.trilliantContainer}>
                <img className={classes.logo} src={logo} alt="Trilliant logo"/>
                <h3 className={classes.trilliant}>Trilliant</h3>
            </div>
            <ul className={classes.menuItems}>
                <li className={classes.menuItem} onClick={toggleMenuItem}>
                    <Link to="/home">
                        <AiFillHome  className={classes.icons}/>
                        <span>Home</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">
                        <MdElectricMeter  className={classes.icons}/>
                        <span>Meters</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">
                        <SiGoogleanalytics  className={classes.icons}/>
                        <span>Metrics</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">
                        <IoMapSharp  className={classes.icons}/>
                        <span>Maps</span>
                    </Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">
                        <AiFillSetting className={classes.icons}/>
                        <span>Settings</span>
                    </Link>
                </li>
            </ul>
            <div className={classes.logoutContainer}>
                <div className={`${classes.menuItem} ${classes.logout}`}>
                    <Link to="#">
                        <BiLogOut className={classes.icons}/>
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;