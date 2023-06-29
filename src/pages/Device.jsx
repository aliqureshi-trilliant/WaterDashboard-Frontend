import classes from './Device.module.css';
import AlarmTile from '../components/AlarmTile';
import ValueCard from '../components/ValueCard';
import AlarmChart from '../components/AlarmChart';
import Graph from '../components/Graph';
import BarGraph from '../components/BarGraph';
import { HiOutlineStatusOnline, HiOutlineStatusOffline, HiOutlineRefresh } from 'react-icons/hi';
import { BiError } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BsFillBellFill } from 'react-icons/bs';
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useMemo } from 'react';

const formatTimeAgo = (timestamp) => {
    const currentDate = new Date();
    const oldDate = new Date(timestamp);
    const elapsed = currentDate - oldDate;
    const days = Math.floor (elapsed / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} days ago`;
    else return 'Today';
};

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
    });
    return formattedDate.split(', ').reverse().join(', ');
};

function Device(props) {

    const { deviceName } = useParams();
    const [alarm,setAlarm] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    });
    const center = useMemo(() => ({ lat: parseFloat(data?.[2].gps_location?.split(',')[0]) || 35.83162343101685, lng: parseFloat(data?.[2].gps_location?.split(',')[1]) || -78.76705964937196 }), [data]);
    const mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
    };

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

    const isActive = (alarm) => {
        switch(alarm){
        case 'Failed Read': return data[1].event_id === '24.5.48.219';
        case 'Highflow': return data[1].event_id === '24.5.48.209';
        case 'Backflow': return data[1].event_id === '24.5.48.214';
        case 'Temperature': return data[1].event_id === '24.5.48.211';
        case 'Battery': return data[1].event_id === '24.5.48.249';
        }
    };

    const fetchData = async (type) => {
        const response = await fetch(`http://localhost:3000/api/waterMIUs/${deviceName}/${type}`);
        if(!response.ok) {
            throw new Error(`Error ${response.status}: ${response.message}`);
        }
        const data = await response.json();
        if (data.length == 0) {
            throw new Error(`There is no data available for ${deviceName}`);
        }
        return data[0];
    };

    useEffect(() => {
        const toggleEl = document.querySelector(`.${classes.toggle}`);
        const refreshEl = document.querySelector(`.${classes.iconContainer}[data-refresh='${true}']`);
        toggleEl.addEventListener('click', toggle);
        refreshEl.addEventListener('click', () => setRefresh((current) => !current));

        const fetchAllData = async () => {
            try {
                const allData = await Promise.all(['reading','alarm','gps'].map(fetchData),);
                setData(allData);
                console.log(allData);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
                
            }
        };

        fetchAllData();
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
                            <div className={classes.idContainer}>
                                {loading && <p>Loading Data...</p>}
                                {error && <>
                                    <p>RPMA ID: No Data</p>
                                    <p>Meter ID: No Data</p>
                                    <p>Node ID: No Data</p>
                                </>}
                                {data && <>
                                    <p>RPMA ID: {data[2].serial_number}</p>
                                    <p>Meter ID: {data[2].serial_number}</p>
                                    <p>Node ID: {data[2].node_id}</p>
                                </>}
                            </div>
                        </div>
                        <div className={classes.buttonContainer}>
                            <div title={`Device is ${props.deviceStatus || 'offline'}`}className={`${classes.iconContainer} ${iconContainerStyle}`}>
                                {
                                    props.deviceStatus === 'Online'?
                                        <HiOutlineStatusOnline className={classes.icon}/>:
                                        <HiOutlineStatusOffline className={classes.icon}/>
                                }
                            </div>
                            <div title='Refresh' className={classes.iconContainer} data-refresh={true}>
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
                        <div className={classes.statusBarContainer}>
                            <div className={classes.statusBarTitle}>Alarms <BsFillBellFill className={classes.statusBarIcon}/></div>
                            {/* <div className={classes.statusBarIcon}></div> */}
                            <AlarmTile title="Failed Read" alarm={ data && isActive('Failed Read')}/>
                            <AlarmTile title="Backflow" alarm={data && isActive('Backflow')}/>
                            <AlarmTile title="Highflow" alarm={data &&isActive('Highflow')}/>
                            <AlarmTile title="Temperature" alarm={data && isActive('Temperature')}/>
                            <AlarmTile title="Battery" alarm={data && isActive('Battery')}/>
                        </div>
                    </div>
                    <div className={classes.firstChart}>
                        {alarm?<Graph key={Math.random()} title="Alarm data over time" graphId={1} />:<Graph title="Water level data over time" graphId={1} />}
                    </div>
                    <div className={classes.secondChart}>
                        {alarm?<BarGraph key={Math.random()} title="Alarms triggered per month" graphId={2}/>:<BarGraph title="Water level flow per month" graphId={2}/>}
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
                                    (<SkeletonTheme baseColor='#96DE95' highlightColor='#c5eac5'>
                                        {[0,1].map((el) => {
                                            return ( <Skeleton key={el} className={classes.valueCardSkeleton} containerClassName={classes.cardSkeletonContainer}/>);
                                        })}
                                        <Skeleton className={classes.mapSkeleton}/>
                                    </SkeletonTheme>)
                                }
                                { error &&
                                    (<>{[0,1].map((el) => {
                                        return ( <div key={el} className={classes.valueCardError}><BiError/>{error.message} !</div>);
                                    })}
                                    <div className={classes.mapSkeleton}><BiError/>{error.message} !</div>
                                    </>)
                                }
                                { data && isLoaded &&
                                    (<>
                                        <ValueCard title="Water Level" value={`${data[0].value.toLocaleString()} Gallons`} percent="+7%"/>
                                        <ValueCard title="Timestamp" value={getTimestamp(data[0].readingTimestamp)} percent={formatTimeAgo(data[0].readingTimestamp)}/>
                                        <GoogleMap
                                            mapContainerClassName={classes.mapContainer}
                                            center={center}
                                            zoom={10}
                                            options={mapOptions}
                                        >
                                            <MarkerF position={center} onClick={() => setSelectedMarker(center)}/>
                                            {selectedMarker && (
                                                <InfoWindow
                                                    onCloseClick={() => {
                                                        setSelectedMarker(null);
                                                    }}
                                                    position={{
                                                        lat: selectedMarker.lat,
                                                        lng: selectedMarker.lng
                                                    }}
                                                >
                                                    <>
                                                        <p>{deviceName}</p>
                                                        <p>Latitude: {parseFloat(selectedMarker.lat.toFixed(3))}</p>
                                                        <p>Longitude: {parseFloat(selectedMarker.lng.toFixed(3))}</p>
                                                    </>
                                                </InfoWindow>
                                            )}
                                        </GoogleMap>
                                    </>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Device;
