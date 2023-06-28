import classes from './Metrics.module.css';
import Graph from '../components/Graph';
import AlarmChart from '../components/AlarmChart';
import { BsGraphUp, BsGraphDown,  BsThermometerHigh} from 'react-icons/bs';
import {  GiBattery25 } from 'react-icons/gi';
import { MdPieChartOutline, MdOutlineOfflineBolt } from 'react-icons/md';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Metrics() {

    const navigate = useNavigate();

    useEffect(() => {
        const statusBar = document.querySelector(`.${classes.statusBarContainer}`);
        statusBar.addEventListener('click', (e) => {
            if(e.target.closest(`.${classes.statusBarItem}`)){
                const statusBarItemEl = e.target.closest(`.${classes.statusBarItem}`);
                navigate(`/metrics/${statusBarItemEl.dataset.id}`);
            }
        });
    },[]);

    return (
        <>
        <div className={classes.metrics}>
            <div className={classes.titleContainer}>
                <div className={classes.title}>
                    <h1>Overall Metrics</h1>
                    <p>View the overall metrics for all the Water MIU devices here !</p>
                </div>
                <div className={classes.deviceCountContainer}>
                    <div className={classes.statusContainer}>
                        <MdPieChartOutline className={classes.iconTotal}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}>Total</p><p>300</p></div>
                    </div>
                    <div className={classes.statusContainer}>
                        <MdOutlineOfflineBolt className={classes.iconOnline}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}>Online</p><p>276</p></div>
                    </div>
                    <div className={classes.statusContainer}>
                        <MdOutlineOfflineBolt className={classes.iconOffline}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}> Offline</p><p>24</p></div>
                    </div>
                </div>
            </div>
            <div className={classes.statusBarContainer}>
                <div className={classes.statusBarItem} data-id='High Flow'>
                    <h3>High Flow</h3>
                    <p>22</p>
                </div>
                <div className={classes.statusBarItem} data-id='Back Flow'>
                    <h3>Back Flow</h3>
                    <p>12</p>
                </div>
                <div className={classes.statusBarItem} data-id='Failed Read'>
                    <h3>Failed Read</h3>
                    <p>13</p>
                </div>
                <div className={classes.statusBarItem} data-id='Temperature'>
                    <h3>Temperature</h3>
                    <p>34</p>
                </div>
                <div className={classes.statusBarItem} data-id='Battery'>
                    <h3>Battery</h3>
                    <p>5</p>
                </div>
            </div>
            <div className={classes.bottomContainer}>
                <div className={classes.leftContainer}>
                    <div className={classes.graph}>
                        <Graph title={`Alarm data over time`} graphId={1} />
                    </div>
                    <div className={classes.graph}>
                        <Graph title={`Alarm data over time`} graphId={2} />
                    </div>
                </div>
                <div className={classes.rightContainer}>
                    <div className={classes.infoCardContainer}>
                        <div className={classes.infoCard}>
                            <h3>630</h3>
                            <BsGraphUp className={classes.infoIcon}/>
                            <p>Alarms triggered in the past 24 hours</p>
                        </div>
                        <div className={classes.infoCard}>
                            <h3>224</h3>
                            <BsGraphDown className={classes.infoIcon}/>
                            <p>Alarms cleared in the past 24 hours</p>
                        </div>
                    </div>
                    <div className={classes.batteryStatusContainer}>
                        <div className={classes.batteryStatus}>
                            <h3>Battery and Temperature Alarms (24 hours)</h3>
                            <div className={classes.countStatusContainer}>
                                <div className={classes.batteryStatusCountContainer}>
                                    <GiBattery25 className={classes.batteryStatusIconContainer}/>
                                    <p>15</p>
                                </div>
                                <div className={classes.batteryStatusCountContainer}>
                                    <BsThermometerHigh className={classes.batteryStatusIconContainer}/>
                                    <p>4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.alarmChartContainer}>
                        <AlarmChart additionalStyles={classes.alarmChart}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Metrics;
