import classes from './ViewCard.module.css';
import { AiFillPlayCircle } from 'react-icons/ai';


function ViewCard () {

    return (
        <div className={classes.card}>
            <div className={classes.cardContainer}>
                <div className={classes.cardText}>
                    View All
                </div>
                <div className={classes.iconContainer}>
                    <AiFillPlayCircle className={classes.icon}/>
                </div>
            </div>
        </div>
    );
}

export default ViewCard;
