import classes from './Metrics.module.css';
import Graph from '../components/Graph';
import AllAlarmChart from '../components/AllAlarmChart';
import { BsGraphUp, BsGraphDown,  BsThermometerHigh} from 'react-icons/bs';
import { GiBattery25 } from 'react-icons/gi';
import { MdPieChartOutline, MdOutlineOfflineBolt } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Metrics() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [refresh,setRefresh] = useState(false);
    const clearAlarms = ['24.21.87.49','24.5.48.293','24.5.48.216','24.2.22.37','24.35.0.74'];

    const fetchData = async (type) => {
        const response = await fetch(`http://localhost:3000/api/waterMIUs${type}`);
        if(!response.ok) {
            throw new Error(`Error ${response.status}: ${response.message}`);
        }
        const data = await response.json();
        if (data.length == 0) {
            throw new Error(`There is no data available for ${deviceName}`);
        }
        return data;
    };

    const fetchAllData = async () => {
        try {
            const allData = await Promise.all(['/alarms','','/KPIs/alarms?days=1'].map(fetchData),);
            setData(allData);
        } catch(err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const statusBar = document.querySelector(`.${classes.statusBarContainer}`);
        statusBar.addEventListener('click', (e) => {
            if(e.target.closest(`.${classes.statusBarItem}`)){
                const statusBarItemEl = e.target.closest(`.${classes.statusBarItem}`);
                navigate(`/metrics/${statusBarItemEl.dataset.id}`);
            }
        });
        const refreshEl = document.querySelector(`.${classes.iconContainer}[data-refresh='${true}']`);
        refreshEl.addEventListener('click', () => setRefresh((r) => !r));
    },[]);

    useEffect(() => {
        fetchAllData();
    },[refresh])

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
                        <div className={classes.deviceCount}><p className={classes.statusTitle}>Total</p><p>{data && data[1].length}{error && '-'}</p></div>
                    </div>
                    <div className={classes.statusContainer}>
                        <MdOutlineOfflineBolt className={classes.iconOnline}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}>Online</p><p>{data && data[1].length - (data[0].Failed_Read || 0)}{error && '-'}</p></div>
                    </div>
                    <div className={classes.statusContainer}>
                        <MdOutlineOfflineBolt className={classes.iconOffline}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}> Offline</p><p>{data && (data[0].Failed_Read || 0)}{error && '-'}</p></div>
                    </div>
                    <div title='Refresh' className={classes.iconContainer} data-refresh={true}>
                        <HiOutlineRefresh className={classes.icon} />
                    </div>
                </div>
            </div>
            <div className={classes.statusBarContainer}>
                <div className={classes.statusBarItem} data-id='High Flow'>
                    <h3>High Flow</h3>
                    <p>{data && (data[0].High_Flow || 0)}{error && '-'}</p>
                </div>
                <div className={classes.statusBarItem} data-id='Back Flow'>
                    <h3>Back Flow</h3>
                    <p>{data && (data[0].Back_Flow || 0)}{error && '-'}</p>
                </div>
                <div className={classes.statusBarItem} data-id='Failed Read'>
                    <h3>Failed Read</h3>
                    <p>{data && (data[0].Failed_Read || 0)}{error && '-'}</p>
                </div>
                <div className={classes.statusBarItem} data-id='Temperature'>
                    <h3>Temperature</h3>
                    <p>{data && (data[0].Temperature || 0)}{error && '-'}</p>
                </div>
                <div className={classes.statusBarItem} data-id='Battery'>
                    <h3>Battery</h3>
                    <p>{data && (data[0].Battery || 0)}{error && '-'}</p>
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
                            <h3>{data && data[2].length}{error && '-'}</h3>
                            <BsGraphUp className={classes.infoIcon}/>
                            <p>Alarms triggered in the past 24 hours</p>
                        </div>
                        <div className={classes.infoCard}>
                            <h3>{data && data[2].filter((el)=> clearAlarms.includes(el.event_id)).length}{error && '-'}</h3>
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
                                    <p>{data && data[2].filter((el) => el.event_id === '24.2.22.150').length}{error && '-'}</p>
                                </div>
                                <div className={classes.batteryStatusCountContainer}>
                                    <BsThermometerHigh className={classes.batteryStatusIconContainer}/>
                                    <p>{data && data[2].filter((el) => el.event_id === '24.35.0.40').length}{error && '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.alarmChartContainer}>
                        <AllAlarmChart additionalStyles={classes.alarmChart} refresh={refresh}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Metrics;
