import classes from './Tile.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';

function Tile (props) {
    return (
        <div className={classes.tile}>
            <div className={classes.tileTextContainer}>
                <h2 className={classes.tileHeading}>{props.title}</h2>
                <p className={classes.tileText}>{props.value}</p>
            </div>
            <div className={classes.iconContainer}>
                <AiFillCheckCircle className={classes.icon} />
            </div>
        </div>
    )
}

export default Tile;