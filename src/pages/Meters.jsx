import classes from './Meters.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import DeviceCard from '../components/DeviceCard';
import waterMIUImage from '/images/WaterMIU.png';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiError } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdCancel, MdIncompleteCircle } from 'react-icons/md';


function Meters() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleFilter = (filter) => {

        const filters = document.querySelectorAll(`.${classes.filter}`);
        filters.forEach((el) => el.classList.remove(classes.filterActive));

        filter.classList.add(classes.filterActive);
        searchFilter(filter);
    };

    const searchFilter = (filter) => {
        // switch(filter.dataset.type){
        // case "All": 
        // }
    };

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

    const fetchData = (type = 'All') => {
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
    };

    useEffect(() => {
        fetchData();    
        const filterContainer = document.querySelector(`.${classes.filterContainer}`);
        filterContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.closest(`.${classes.filter}`);
            if (filter){
                toggleFilter(filter);
            }
        })

        const searchEl = document.querySelector(`.${classes.searchBar}`).children[1];
        searchEl.addEventListener('keypress', (e) => {
            if(e.key == 'Enter') {
                e.preventDefault();
                searchMeter(e.target.value);
            }
        });
        searchEl.addEventListener('input', (e) => {
            if (e.target.value==''){
                fetchData();
            }
        });
    },[]);

    return (
        <>
        <div className={classes.meters}>
            <div className={classes.leftContainer}>
                <div className={classes.coverImage}>
                </div>
                <div className={classes.meterCard}>
                    <img className={classes.waterMIUImage} src={waterMIUImage} alt="Water MIU Image" />
                    <h1>Meter List</h1>
                    <p>View  a list of the meters here !</p>
                    <div className = {classes.searchContainer}>
                        <div className={classes.searchBar}>
                            <AiOutlineSearch className={classes.searchIcon}/>
                            <input type='search' placeholder='Search..'/>
                        </div>
                    </div>
                </div>
                <div className={classes.filterContainer}>
                    <p>Filters</p>
                    <div className={`${classes.filter} ${classes.filterActive}`} data-type="All">
                        <MdIncompleteCircle className={classes.icon}/>
                        <p>All Meters</p>
                    </div>
                    <div className={classes.filter} data-type="Online">
                        <AiFillCheckCircle className={classes.icon}/>
                        <p>Online Meters</p>
                    </div>
                    <div className={classes.filter} data-type="Offline">
                        <MdCancel className={classes.icon}/>
                        <p>Offline Meters</p>
                    </div>
                </div>
            </div>
            <div className={classes.rightContainer}>
                {   <>
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
                        data.reduce((accumulator, {device_mrid} , index) => {
                            const meterListIndex = Math.floor(index / 5);
                            if (!accumulator[meterListIndex]){
                                accumulator[meterListIndex] = [];
                            }
                            accumulator[meterListIndex].push(<DeviceCard key={device_mrid} deviceName={device_mrid} deviceStatus={Math.round(Math.random())==1?"Online":"Offline"} additionalStyles={classes.card}/>);
                            return accumulator;
                        }, []).map((meterList,index) => (
                            <div key={index} className={classes.meterList}>
                                {meterList}
                            </div>
                        ))
                    }
                </>}
            </div>
        </div>
        </>
    );
}

export default Meters;