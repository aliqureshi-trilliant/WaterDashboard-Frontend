import classes from './ValueCard.module.css';
import { CiTempHigh } from 'react-icons/ci';
import { BiWater, BiTimeFive } from 'react-icons/bi';
import { MdOutlineUpdate } from 'react-icons/md';

function ValueCard(props) {

    const getIcon = (title) => {
        switch(title) {
        case 'Last Updated':
            return <MdOutlineUpdate className={classes.icon} />;
        case 'Temperature':
            return <CiTempHigh className={classes.icon} />;
        case 'Water Level':
            return <BiWater className={classes.icon} />;
        case 'Timestamp':
            return <BiTimeFive className={classes.icon} />;
        }
    };

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
                        {props.percent}
                    </span>
                </div>
                <div className={classes.valueContainer}>
                    {props.value}
                </div>
            </div>
        </div>
    );
}

export default ValueCard;
