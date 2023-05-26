import classes from './Tray.module.css';
import DeviceCard from './DeviceCard'
import ViewCard from './ViewCard'

function Tray(props) {

    const additionalStyles = props.additionalStyles? props.additionalStyles : '';

    return (
        <div className={`${classes.tray} ${additionalStyles}`}>
            <div className={classes.trayTextContainer}>
                <h2 className={classes.trayHeading}>{props.listType}</h2>
                <p className={classes.trayText}>{props.listDesc}</p>
            </div>
            <div className={classes.cardContainer}>
                {props.children}
            </div>
        </div>
    )
}

export default Tray;


