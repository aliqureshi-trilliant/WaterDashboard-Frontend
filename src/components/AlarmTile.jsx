import classes from './AlarmTile.module.css';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { CiTempHigh } from 'react-icons/ci';
import { IoArrowBackCircleOutline, IoWaterOutline } from 'react-icons/io5';
import { BsBatteryFull, BsBattery } from 'react-icons/bs';



function AlarmTile (props) {

    const alarmStyle = props.alarm? classes.alarm: '';

    const getIcon = (title) => {
        switch(title) {
        case 'Failed Read':
            return <MdOutlineSmsFailed className={classes.icon} />;
        case 'Temperature':
            return <CiTempHigh className={classes.icon} />;
        case 'Backflow':
            return <IoArrowBackCircleOutline className={classes.icon} />;
        case 'Highflow':
            return <IoWaterOutline className={classes.icon} />;
        case 'Battery':
            return <BsBatteryFull className={classes.icon} />;
        }
    };

    return (
        <div className={`${classes.tile} ${alarmStyle}`}>
            <div title={`${props.title} alarm is ${props.alarm?'active !':'inactive.'}`} className={classes.tileContainer}>
                <div className={classes.iconContainer}>
                    {getIcon(props.title)}
                </div>
                <div className={classes.textContainer}>
                    {props.title}
                </div>
            </div>
        </div>
    );
}

export default AlarmTile;
