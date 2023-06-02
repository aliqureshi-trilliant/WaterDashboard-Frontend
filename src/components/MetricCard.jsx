import classes from './MetricCard.module.css';
import { FcAlarmClock, FcDam, FcEngineering, FcBusinessContact, FcCloseUpMode} from 'react-icons/fc';

function MetricCard (props) {

    const additionalStyles = props.additionalStyles? props.additionalStyles : '';

    const getIcon = (title) => {
        switch(title) {
        case 'Alarm':
            return <FcAlarmClock className={classes.icon} />;
        case 'Water Level':
            return <FcDam className={classes.icon} />;
        case 'Metric 3':
            return <FcCloseUpMode className={classes.icon} />;
        case 'Metric 4':
            return <FcEngineering className={classes.icon} />;
        case 'Metric 5':
            return <FcBusinessContact className={classes.icon} />;
        }
    };

    return (
        <div className={`${classes.card} ${additionalStyles}`}>
            <div className={classes.cardText}>
                {props.title}
            </div>
            <div className={classes.iconContainer}>
                {getIcon(props.title)}
            </div>
        </div>
    );
}

export default MetricCard;
