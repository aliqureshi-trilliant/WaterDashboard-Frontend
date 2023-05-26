import classes from './MetricCard.module.css';
import { AiFillPlayCircle } from 'react-icons/ai'


function MetricCard () {

    return (
        <div className={classes.card}>
                <div className={classes.cardText}>
                    View All
                </div>
                <div className={classes.iconContainer}>
                    <AiFillPlayCircle className={classes.icon}/>
                </div>
        </div>
    )
}

export default MetricCard;