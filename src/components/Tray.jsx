import classes from './Tray.module.css';

function Tray(props) {

    const mapStyles = props.trayMap? classes.trayMap : classes.tray;
    const cardContainerStyle = props.trayMap? classes.cardContainerMap: classes.cardContainer;
    const trayTextContainerStyle = props.trayMap? classes.trayTextContainerMap: classes.trayTextContainer;
    
    return (
        <div className={mapStyles}>
            <div className={trayTextContainerStyle}>
                <h2 className={classes.trayHeading}>{props.listType}</h2>
                <p className={classes.trayText}>{props.listDesc}</p>
            </div>
            <div className={cardContainerStyle}>
                {props.children}
            </div>
        </div>
    )
}

export default Tray;


