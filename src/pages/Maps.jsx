import classes from './Maps.module.css';
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useMemo, useState, useEffect, useRef } from 'react';
import MeterInfoCard from '../components/MeterInfoCard';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiError } from 'react-icons/bi';
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from 'react-icons/hi';


function Maps() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);
    const initialData = useRef(null);

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
        map.fitBounds(bounds, {right:400});
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
        mapRef.current.panBy(175,0);
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
                initialData.current = data;
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

    useEffect(() => {
        const titleEl = document.querySelector(`.${classes.titleContainer}`).children[0];
        titleEl.addEventListener('click', (e) => {
            e.preventDefault();
            setData(initialData.current);
        });
        const onlineIcon = document.querySelector(`.${classes.iconOnline}`);
        onlineIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const onlineData = initialData.current.filter((el) => el.alarm !== 'Failed Read');
            setData(onlineData);
        });
        const offlineIcon = document.querySelector(`.${classes.iconOffline}`);
        offlineIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const offlineData = initialData.current.filter((el) => el.alarm === 'Failed Read');
            setData(offlineData);
        });
    },[initialData]);

    return (
        <>
            <div className={classes.maps}>
                <div className={classes.mapContainer}>
                    {data && isLoaded &&
                                    (<>
                                        <GoogleMap
                                            mapContainerClassName={classes.mapContainer}
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
                </div>
                <div className={classes.meterListContainer}>
                    <div className={classes.titleContainer}>
                        <h1>Meter List</h1>
                        <HiOutlineStatusOnline className={classes.iconOnline}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}>Online</p><p>{initialData && initialData.current?.reduce((accumulator, el)=> accumulator + (el.alarm === 'Failed Read'?0:1),0)}{error && '-'}</p></div>
                        <HiOutlineStatusOffline className={classes.iconOffline}/>
                        <div className={classes.deviceCount}><p className={classes.statusTitle}> Offline</p><p>{initialData && initialData.current?.reduce((accumulator, el)=> accumulator + (el.alarm === 'Failed Read'?1:0),0)}{error && '-'}</p></div>
                    </div>
                    <div className={classes.meterList}>
                        {
                            <>
                                { loading &&
                            (<SkeletonTheme baseColor='#F6F6F6' highlightColor='#EFEFEF'>
                                {[0,1,2,3,4,5].map((el) => {
                                    return ( <Skeleton key={el} className={classes.cardSkeleton} containerClassName={classes.cardSkeletonContainer}/>);
                                })}
                            </SkeletonTheme>)
                                }
                                { error && (<>{[0,1,2,3,4,5].map((el) => {
                                    return ( <div key={el} className={classes.errorCard}><BiError></BiError>Error loading data !</div>);
                                })}</>)}
                                { data &&
                                data.map(({device_mrid, alarm},index) => {
                                    return ( <MeterInfoCard key={index} deviceName={device_mrid} deviceStatus={alarm ==='Failed Read'?"Offline":"Online"} serialNo="12392" rpmaID="150122" nodeID="1301" additionalStyles={classes.meterInfoCard} onClick={() => {selectMarker(device_mrid);}}/>);
                                })
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Maps;

