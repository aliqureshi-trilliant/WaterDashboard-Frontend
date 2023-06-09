import { useEffect } from 'react';
import classes from './DeviceCard.module.css';
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function DeviceCard (props) {

    const navigate = useNavigate();

    const statusClass = classes.deviceStatus + ' ' +(props.deviceStatus === 'Online'? classes.online : classes.offline);
    const additionalStyles = props.additionalStyles? props.additionalStyles : '';

    useEffect(() => {
        const cardEl = document.querySelector(`.${classes.card}[data-id='${props.deviceName}']`);
        cardEl.addEventListener('click', () => navigate(`/meters/${props.deviceName}`));
    }, []);

    return (
        <div className={`${classes.card} ${additionalStyles}`} data-id={props.deviceName}>
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
    );
}

export default DeviceCard;
