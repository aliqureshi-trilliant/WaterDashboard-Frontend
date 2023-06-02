import classes from './Tile.module.css';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdCancel, MdIncompleteCircle } from 'react-icons/md';

function Tile (props) {

    const getIcon = (title) => {
        switch(title) {
        case 'Active':
            return <AiFillCheckCircle className={classes.icon} />;
        case 'Inactive':
            return <MdCancel className={classes.icon} />;
        case 'Total':
            return <MdIncompleteCircle className={classes.icon} />;
        }
    };

    return (
        <div className={classes.tile}>
            <div className={classes.tileTextContainer}>
                <h2 className={classes.tileHeading}>{props.title}</h2>
                <p className={classes.tileText}>{props.value}</p>
            </div>
            <div className={classes.iconContainer}>
                {getIcon(props.title)}
            </div>
        </div>
    );
}

export default Tile;
