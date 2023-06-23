import classes from './Meters.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import DeviceCard from '../components/DeviceCard';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiError } from 'react-icons/bi';


function Meters() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchMeter = (searchValue) => {
        setLoading(true);
        fetch(`http://localhost:3000/api/waterMIUs?search=${searchValue}`)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.message}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.length == 0) {
                    throw new Error(`There is no data available for ${searchValue}`);
                }
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

        const searchEl = document.querySelector(`.${classes.searchBar}`).children[1];
        searchEl.addEventListener('keypress', (e) => {
            if(e.key == 'Enter') {
                e.preventDefault();
                searchMeter(e.target.value);
            }
        });
        searchEl.addEventListener('input', (e) => {
            if (e.target.value==''){
                searchMeter('');
            }
        });
    },[]);

    return (
        <>
        <div className={classes.meters}>
            <div className={classes.topContainer}>
                <div className={classes.coverImage}>
                </div>
                <div className = {classes.searchContainer}>
                    <div className={classes.searchBar}>
                        <AiOutlineSearch className={classes.searchIcon}/>
                        <input type='search' placeholder='Search..'/>
                    </div>
                </div>
            </div>
            <div className={classes.bottomContainer}>
                {[0,1,2,3,4].map((el) => {return (<div key={el}className={classes.meterList}>
                { loading &&
                            (<SkeletonTheme baseColor='#F6F6F6' highlightColor='#EFEFEF'>
                                {[0,1,2,3,4].map((el) => {
                                    return ( <Skeleton key={el} className={classes.cardSkeleton} containerClassName={classes.cardSkeletonContainer}/>);
                                })}
                            </SkeletonTheme>)
                        }
                        { error && (<>
                        {<div className={classes.errorContainer}>
                            <div className={classes.errorCard}><BiError></BiError>Error loading data !</div>
                        </div>}</>)}
                        { data &&
                            data.map(({device_mrid}) => {
                                return ( <DeviceCard key={device_mrid} deviceName={device_mrid} deviceStatus={Math.round(Math.random())==1?"Online":"Offline"} additionalStyles={classes.card}/>);
                            })
                        }
                </div>)})}
            </div>
        </div>
        </>
    );
}

export default Meters;