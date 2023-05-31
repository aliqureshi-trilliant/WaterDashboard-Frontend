import classes from './Device.module.css';
import AlarmTile from '../components/AlarmTile';
import ValueCard from '../components/ValueCard';
import AlarmChart from '../components/AlarmChart';

function Device() {
    return (
        <>
            <div className={classes.device}>
                <AlarmTile title="Failed Read"/>
                <AlarmTile title="Temperature"/>
                <AlarmTile title="Highflow"/>
                <AlarmTile title="Backflow"/>
                <AlarmTile title="Battery"/>
                <ValueCard title="Value" value="2019301 Gallons" percent={2}/>
                <AlarmChart />
            </div>
        </>
    );
}

export default Device;