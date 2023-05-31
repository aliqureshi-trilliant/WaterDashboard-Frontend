import classes from './ValueCard.module.css';
import { CiTempHigh } from 'react-icons/ci';
import { IoWaterOutline } from 'react-icons/io5';

function ValueCard(props) {

    const getIcon = (title) => {
        switch(title) {
            case 'Failed Read':
                return <MdOutlineSmsFailed className={classes.icon} />
            case 'Temperature':
                return <CiTempHigh className={classes.icon} />
            case 'Backflow':
                return <IoArrowBackCircleOutline className={classes.icon} />
            case 'Value':
                return <IoWaterOutline className={classes.icon} />
            case 'Battery':
                return <BsBatteryFull className={classes.icon} />
        }
    }

    return (
        <div className={classes.card}>
            <div className={classes.cardContainer}>
                <div className={classes.headingContainer}>
                    <span className={classes.iconContainer}>
                        {getIcon(props.title)}
                    </span>
                    <span className={classes.titleContainer}>
                    {props.title}
                    </span>
                    <span className={classes.percentChange}>
                        +{props.percent}%
                    </span>
                </div>
                <div className={classes.valueContainer}>
                    {props.value}
                </div>
            </div>
        </div>
    )
}

export default ValueCard;