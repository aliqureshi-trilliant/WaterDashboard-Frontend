import classes from './Device.module.css';
import AlarmTile from '../components/AlarmTile';
import ValueCard from '../components/ValueCard';
import AlarmChart from '../components/AlarmChart';
import Graph from '../components/Graph';
import { HiOutlineStatusOnline, HiOutlineStatusOffline, HiOutlineRefresh } from 'react-icons/hi';
import { useEffect, useState } from 'react';

function Device(props) {

    const [alarm,setAlarm] = useState(true);
    const [refresh,setRefresh] = useState(false);
    const iconContainerStyle = props.deviceStatus? classes.online:classes.offline;

    const toggle = (event) => {
        const alarmToggle = document.querySelector(`.${classes.alarmToggle}`);
        const waterToggle = document.querySelector(`.${classes.waterToggle}`);

        if(event.target.classList.contains(`${classes.alarmToggle}`)){
            alarmToggle.classList.add(classes.active);
            waterToggle.classList.remove(classes.active);
            setAlarm(true);
        }
        else if(event.target.classList.contains(`${classes.waterToggle}`)){
            alarmToggle.classList.remove(classes.active);
            waterToggle.classList.add(classes.active);
            setAlarm(false);
        }
    };



    useEffect(() => {
        const toggleEl = document.querySelector(`.${classes.toggle}`);
        const refreshEl = document.querySelector(`.${classes.iconContainer}[data-refresh='${true}']`);
        toggleEl.addEventListener('click', toggle);
        refreshEl.addEventListener('click', () => setRefresh(!refresh));
    },[]);

    return (
        <>
            <div className={classes.device}>
                <div className={classes.mainContainer}>
                    <div className={classes.headingContainer}>
                        <div className={classes.titleContainer}>
                            <h1 className={classes.title}>
                                Canary 188
                            </h1>
                            <p>View data for Canary 188 water MIU here !</p>
                        </div>
                        <div className={classes.buttonContainer}>
                            <div title={`Device is ${props.deviceStatus || 'offline'}`}className={`${classes.iconContainer} ${iconContainerStyle}`}>
                                {
                                    props.deviceStatus === 'Online'?
                                        <HiOutlineStatusOnline className={classes.icon}/>:
                                        <HiOutlineStatusOffline className={classes.icon}/>
                                }
                            </div>
                            <div title={'Refresh'} className={classes.iconContainer} data-refresh={true}>
                                <HiOutlineRefresh className={classes.icon} />
                            </div>
                            <div className={classes.tabContainer}>
                                <div className={classes.toggle}>
                                    <div className={`${classes.alarmToggle} ${classes.active} `}>
                                        Alarm
                                    </div>
                                    <div className={classes.waterToggle}>
                                        Water Level
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.statusBar}>
                        <AlarmTile title="Failed Read"/>
                        <AlarmTile title="Temperature"/>
                        <AlarmTile title="Highflow" alarm={true}/>
                        <AlarmTile title="Backflow"/>
                        <AlarmTile title="Battery" alarm={true}/>
                    </div>
                    <div className={classes.firstChart}>
                        {alarm?<Graph title="Alarm data over time" graphId={1} />:<Graph title="Water level data over time" graphId={1} />}
                    </div>
                    <div className={classes.secondChart}>
                        {alarm?<Graph title="Alarms triggered per month" graphId={2}/>:<Graph title="Water level flow per month" graphId={2}/>}
                    </div>
                </div>
                <div className={classes.sideContainer}>
                    <div className={classes.contentContainer}>
                        <div className={classes.alarmChartContainer}>
                            <AlarmChart />
                        </div>
                        <div className={classes.valueContainer}>
                            <div className={classes.valueTray}>
                                <ValueCard title="Last Updated" value="45 mins ago" percent="3"/>
                                <ValueCard title="Water Level" value="15,123 Gallons" percent="7"/>
                                <ValueCard title="Temperature" value="150 °C" percent="4"/>
                                <ValueCard title="Timestamp" value="11:45:24AM" percent="1"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Device;
