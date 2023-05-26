import classes from './Card.module.css';
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from 'react-icons/hi';

function Card (props) {

    const statusClass = classes.deviceStatus + ' ' +(props.deviceStatus === 'Online'? classes.online : classes.offline);

    return (
        <div className={classes.card}>
            <div className={classes.deviceName}>
                {props.deviceName}
            </div>
            <div className={statusClass}>
                {props.deviceStatus}
            </div>
            <div className={classes.status}>
                {
                    props.deviceStatus === 'Online'? 
                    <HiOutlineStatusOnline className={`${classes.icon} ${classes.onlineStatus}`}/>: 
                    <HiOutlineStatusOffline className={`${classes.icon} ${classes.offlineStatus}`}/>
                }
            </div>
        </div>
    )
}

export default Card;