import classes from './MeterInfoCard.module.css';

function MeterInfoCard(props) {

    const statusClass = classes.deviceStatus + ' ' +(props.deviceStatus === 'Online'? classes.online : classes.offline);
    const additionalStyles = props.additionalStyles? props.additionalStyles : '';

    return (<>
        <div className={`${classes.card} ${additionalStyles}`} onClick={props.onClick} data-id={props.deviceName}>
            <div className={classes.titleContainer}>
                <h4>{props.deviceName}</h4>
                <div className={statusClass}>
                    {props.deviceStatus}
                </div>
            </div>
            <div className={classes.contentContainer}>
                <div className= {classes.content}>
                    <p>Serial No.: {props.serialNo}</p>
                    <p>RPMA: {props.rpmaID}</p>
                </div>
                <div className= {classes.content}>
                    <p>Node Id: {props.nodeID}</p>
                    <p>Class: {props.serialNo}</p>
                </div>
            </div>
        </div>
    </>);
}

export default MeterInfoCard;