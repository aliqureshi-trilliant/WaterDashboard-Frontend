import classes from './IndividualKPI.module.css';
import { useParams } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useMemo, useState, useEffect, useRef } from 'react';
import MeterInfoCard from '../components/MeterInfoCard';
import Graph from '../components/Graph';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiError } from 'react-icons/bi';
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from 'react-icons/hi';


function IndividualKPI(props) {

    const {kpiName} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    });

    const parseData = (data) => {
        return { device_mrid: data.device_mrid, lat: parseFloat(data.gps_location?.split(',')[0]) || 35.83162343101685, lng: parseFloat(data.gps_location?.split(',')[1]) || -78.76705964937196 };
    };

    const parsedData = useMemo(() => (data?.map((el) => parseData(el))), [data]);

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        parsedData.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
        mapRef.current = map;
    };

    const selectMarker = (device_mrid) => {
        const meterInfoCards = document.querySelectorAll(`.${classes.meterInfoCard}`);
        meterInfoCards.forEach((el) => el.classList.remove(classes.active));
        const meter = document.querySelector(`[data-id='${device_mrid}']`);
        meter.classList.add(classes.active);
        meter.scrollIntoView({behavior:'smooth', block:'start',inline:'nearest'})
        const marker = parsedData.find((data) => data.device_mrid == device_mrid);
        setSelectedMarker(marker);
        mapRef.current.panTo({lat:marker.lat, lng:marker.lng});
    };

    const clearMarker = () => {
        setSelectedMarker(null);
        const meterInfoCards = document.querySelectorAll(`.${classes.meterInfoCard}`);
        meterInfoCards.forEach((el) => el.classList.remove(classes.active));
    };

    const mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        maxZoom: 17,
    };

    const fetchData = (type = 'All') => {
        fetch('http://localhost:3000/api/waterMIUs?gps=true')
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.message}`);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setData(null);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <>
            <div className={classes.individualKPI}>
                <div className={classes.leftContainer}>
                    <div className={classes.meterListContainer}>
                        <div className={classes.titleContainer}>
                            <h1>{kpiName}</h1>
                            <HiOutlineStatusOnline className={classes.iconOnline}/>
                            <div className={classes.deviceCount}><p className={classes.statusTitle}>Online</p><p>276</p></div>
                            <HiOutlineStatusOffline className={classes.iconOffline}/>
                            <div className={classes.deviceCount}><p className={classes.statusTitle}> Offline</p><p>24</p></div>
                        </div>
                        <div className={classes.meterList}>
                            {
                                <>
                                    { loading &&
                                (<SkeletonTheme baseColor='#F6F6F6' highlightColor='#EFEFEF'>
                                    {[...Array(7)].map((_,index) => {
                                        return ( <Skeleton key={index} className={classes.cardSkeleton} containerClassName={classes.cardSkeletonContainer}/>);
                                    })}
                                </SkeletonTheme>)
                                    }
                                    { error && (<>{[...Array(7)].map((_,index) => {
                                        return ( <div key={index} className={classes.errorCard}><BiError></BiError>Error loading data !</div>);
                                    })}</>)}
                                    { data &&
                                    data.map(({device_mrid},index) => {
                                        return ( <MeterInfoCard key={index} deviceName={device_mrid} deviceStatus={Math.round(Math.random())==1?'Online':'Offline'} serialNo="12392" rpmaID="150122" nodeID="1301" additionalStyles={classes.meterInfoCard} onClick={() => {selectMarker(device_mrid);}}/>);
                                    })
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className={classes.rightContainer}>
                    <div className={classes.topRightContainer}>
                        <div className={classes.mapContainer}>
                        {data && isLoaded &&
                            (<>
                                <GoogleMap
                                    mapContainerClassName={classes.map}
                                    onLoad={onLoad}
                                    options={mapOptions}
                                >
                                    {
                                        parsedData.map((data,index) => (<MarkerF key={index} position={{ lat:data.lat, lng:data.lng }} onClick={() => selectMarker(data.device_mrid)}/>))
                                    }

                                    {selectedMarker && (
                                        <InfoWindow
                                            onCloseClick={() => {
                                                clearMarker();
                                            }}
                                            position={{
                                                lat: selectedMarker.lat,
                                                lng: selectedMarker.lng
                                            }}
                                        >
                                            <>
                                                <p>{selectedMarker?.device_mrid}</p>
                                                <p>Latitude: {parseFloat(selectedMarker.lat.toFixed(3))}</p>
                                                <p>Longitude: {parseFloat(selectedMarker.lng.toFixed(3))}</p>
                                            </>
                                        </InfoWindow>
                                    )}
                                </GoogleMap>
                            </>)}
                            {loading &&
                                <Skeleton className={classes.errorMap} containerClassName={classes.cardSkeletonContainer}/>
                            }
                            { error &&
                                <div className={classes.errorMap}><BiError></BiError>Error loading data !</div>
                            }
                        </div>
                    </div>
                    <div className={classes.bottomRightContainer}>
                        <div className={classes.graph}>
                            {loading &&
                                <Skeleton className={classes.errorMap} containerClassName={classes.cardSkeletonContainer}/>
                            }
                            { data &&
                                <Graph title={`${kpiName} data over time`} graphId={1} />
                            }
                            { error &&
                                <div className={classes.errorMap}><BiError></BiError>Error loading data !</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IndividualKPI;