import classes from './Maps.module.css';
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
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

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.MAPS_API_KEY,
      });
    
    const parseData = (data) => {
        return { device_mrid: data.device_mrid, lat: parseFloat(data.gps_location?.split(',')[0]) || 35.83162343101685, lng: parseFloat(data.gps_location?.split(',')[1]) || -78.76705964937196 }
    };

    const parsedData = useMemo(() => (data?.map((el) => parseData(el))), [data]);

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        parsedData.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds, {top:250, bottom:250, right:250});
        mapRef.current = map;
    };

    const toggleActive = (e) => {
        const meter = e.target.closest(`.${classes.meterInfoCard}`);
        
        
    };

    const selectMarker = (device_mrid) => {
        const meterInfoCards = document.querySelectorAll(`.${classes.meterInfoCard}`);
        meterInfoCards.forEach((el) => el.classList.remove(classes.active));
        const meter = document.querySelector(`[data-id='${device_mrid}']`);
        meter.classList.add(classes.active);
        const marker = parsedData.find((data) => data.device_mrid == device_mrid);
        setSelectedMarker(marker);
        mapRef.current.panTo({lat:marker.lat, lng:marker.lng});
        mapRef.current.panBy(175,0);
    }
    
    const clearMarker = () => {
        setSelectedMarker(null);
        const meterInfoCards = document.querySelectorAll(`.${classes.meterInfoCard}`);
        meterInfoCards.forEach((el) => el.classList.remove(classes.active));
    }

    const mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
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
                            <div className={classes.deviceCount}><p className={classes.statusTitle}>Online</p><p>276</p></div>
                            <HiOutlineStatusOffline className={classes.iconOffline}/>
                            <div className={classes.deviceCount}><p className={classes.statusTitle}> Offline</p><p>24</p></div>
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
                                data.map(({device_mrid},index) => {
                                    return ( <MeterInfoCard key={index} deviceName={device_mrid} deviceStatus={Math.round(Math.random())==1?"Online":"Offline"} serialNo="12392" rpmaID="150122" nodeID="1301" additionalStyles={classes.meterInfoCard} onClick={() => {selectMarker(device_mrid)}}/>);
                                })
                            }
                            </>
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Maps;

