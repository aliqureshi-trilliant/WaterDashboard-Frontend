import classes from './Sidebar.module.css';
import logo from '/images/logo_trilliant.png';

function Sidebar(){
    return (
        <div className={classes.sidebar}>
            <div>
                <img className={classes.logo} src={logo} alt="Trilliant logo"/>
                <h3 className={classes.trilliant}>Trilliant</h3>
            </div>
            <ul className={classes.menuItems}>
                <li className={classes.menuItem}>
                    <Link to="#">Home</Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">Meters</Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">Metrics</Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">Maps</Link>
                </li>
                <li className={classes.menuItem}>
                    <Link to="#">Settings</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;