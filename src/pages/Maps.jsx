import classes from './Maps.module.css';
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";

function Maps() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/waterMIUs')
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
    },[]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.MAPS_API_KEY,
      });
    const center = useMemo(() => ({ lat: parseFloat(data?.[2].gps_location?.split(',')[0]) || 35.83162343101685, lng: parseFloat(data?.[2].gps_location?.split(',')[1]) || -78.76705964937196 }), [data]);
    const mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
    };

    return (
        <>
            <div className={classes.maps}>
                <div className={classes.mapContainer}>
                    {data && isLoaded && 
                                    (<>
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
                                            <p>{selectedMarker.mrid}</p>
                                            <p>Latitude: {parseFloat(selectedMarker.lat.toFixed(3))}</p>
                                            <p>Longitude: {parseFloat(selectedMarker.lng.toFixed(3))}</p>
                                            </>
                                        </InfoWindow>
                                        )}
                                        </GoogleMap>
                                    </>)}
                </div>
            </div>
        </>
    );
};

export default Maps;

