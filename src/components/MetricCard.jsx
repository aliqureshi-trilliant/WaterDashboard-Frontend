import classes from './MetricCard.module.css';
import { FcHighPriority, FcDam, FcChargeBattery, FcBusinessContact, FcGenericSortingAsc} from 'react-icons/fc';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MetricCard (props) {

    const additionalStyles = props.additionalStyles? props.additionalStyles : '';
    const navigate = useNavigate();

    const getIcon = (title) => {
        switch(title) {
        case 'High Flow':
            return <FcDam className={classes.icon} />;
        case 'Back Flow':
            return <FcGenericSortingAsc className={classes.icon} />;
        case 'Battery':
            return <FcChargeBattery className={classes.icon} />;
        case 'Temperature':
            return <FcHighPriority className={classes.icon} />;
        case 'Failed Read':
            return <FcBusinessContact className={classes.icon} />;
        }
    };

    useEffect(() => {
        const cardEl = document.querySelector(`.${classes.card}[data-id='${props.title}']`);
        cardEl.addEventListener('click', () => navigate(`/metrics/${props.title}`));
    }, []);

    return (
        <div className={`${classes.card} ${additionalStyles}`} data-id={props.title}>
            <div className={classes.cardText}>
                {props.title}
            </div>
            <div className={classes.cardValue}>
                {props.value}
            </div>
            <div className={classes.iconContainer}>
                {getIcon(props.title)} Active Alarms
            </div>
        </div>
    );
}

export default MetricCard;
