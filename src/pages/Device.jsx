import classes from './Device.module.css';
import AlarmTile from '../components/AlarmTile';
import ValueCard from '../components/ValueCard';
import AlarmChart from '../components/AlarmChart';
import Graph from '../components/Graph';
import { HiOutlineStatusOnline, HiOutlineStatusOffline, HiOutlineRefresh } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Device(props) {

    const { deviceName } = useParams();
    const [alarm,setAlarm] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const formatTimeAgo = (timestamp) => {
        const currentDate = new Date();
        const oldDate = new Date(timestamp);
        const elapsed = currentDate - oldDate;
        const days = Math.floor (elapsed / (1000 * 60 * 60 * 24));

        if (days > 0) return `${days} days ago`;
        else return 'today';
    }

    const getTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString('en-US',{
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        })
        return formattedDate.split(', ').reverse().join(', ');
    }

    useEffect(() => {
        const toggleEl = document.querySelector(`.${classes.toggle}`);
        const refreshEl = document.querySelector(`.${classes.iconContainer}[data-refresh='${true}']`);
        toggleEl.addEventListener('click', toggle);
        refreshEl.addEventListener('click', () => setRefresh((current) => !current));

        fetch(`http://localhost:3000/api/waterMIUs/${deviceName}/reading`)
        .then((response) => {
             if(!response.ok) {
                 throw new Error(`Error ${response.status}: ${response.message}`);
             }
             return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
             setData(data);
             setError(null);
             console.log(data);
            }
            else {
                throw new Error(`Error ${response.status}: ${response.message}`);
            }
        })
        .catch((error) => {
             setError(error);
             setData(null);
        })
        .finally(() => setLoading(false));
     },[]);

    return (
        <>
            <div className={classes.device}>
                <div className={classes.mainContainer}>
                    <div className={classes.headingContainer}>
                        <div className={classes.titleContainer}>
                            <h1 className={classes.title}>
                                {deviceName}
                            </h1>
                            <p>View data for {deviceName} water MIU here !</p>
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
                                    <div className={`${classes.waterToggle} ${classes.active} `}>
                                        Water Level
                                    </div>
                                    <div className={classes.alarmToggle}>
                                        Alarm
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.statusBar}>
                        <AlarmTile title="Failed Read"/>
                        <AlarmTile title="Backflow"/>
                        <AlarmTile title="Highflow" alarm={true}/>
                        <AlarmTile title="Temperature"/>
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
                                { loading && 
                                    (<SkeletonTheme baseColor='#96DE95' highlightColor='#EFEFEF'>
                                        {[0,1,2,3].map((el) => {
                                            return ( <Skeleton key={el} className={classes.valueCardSkeleton} containerClassName={classes.cardSkeletonContainer} w/>)
                                        })}
                                    </SkeletonTheme>)
                                }
                                { data && (<><ValueCard title="Water Level" value={`${data[0].value.toLocaleString()} Gallons`} percent="7"/>
                                <ValueCard title="Timestamp" value={getTimestamp(data[0].readingTimestamp)} percent="1"/>
                                <ValueCard title="Last Updated" value={formatTimeAgo(data[0].readingTimestamp)} percent="3"/>
                                <ValueCard title="Temperature" value="150 °C" percent="4"/></>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Device;
