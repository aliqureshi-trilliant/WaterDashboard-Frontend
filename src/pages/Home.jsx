import classes from './Home.module.css';
import Tray from '../components/Tray';
import DeviceCard from '../components/DeviceCard';
import ViewCard from '../components/ViewCard';
import Summary from '../components/Summary';
import Tile from '../components/Tile';
import MetricCard from '../components/MetricCard';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiError } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { HiOutlineRefresh } from 'react-icons/hi';

function Home() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const navigate = useNavigate();

    const fetchData = () => {
        fetch('http://localhost:3000/api/waterMIUs?count=5')
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
    }

    useEffect(() => {
        fetchData();    
        const meterTrayEl = document.querySelector(`.${classes.middleContainerTwo}`).children[0];
        const metricTrayEl = document.querySelector(`.${classes.bottomContainer}`).children[0];
        meterTrayEl.addEventListener('click', (e) => {
            if (e.target.closest(`.${classes.card}`)) return;
            navigate('/meters');
        });
        metricTrayEl.addEventListener('click', (e) => {
            if (e.target.closest(`.${classes.card}`)) return;
            navigate('/metrics');
        });
        const refreshEl = document.querySelector(`.${classes.iconContainer}[data-refresh='${true}']`);
        refreshEl.addEventListener('click', () => setRefresh((r) => !r));
    },[]);

    useEffect(() => {
        fetchData();
    },[refresh]);

    return (
        <>
            <div className={classes.home}>
                <div className= {classes.topContainer}>
                    <div className={classes.titleTileContainer}>
                        <div className= {classes.pageTitle}>
                            <h1>Water Dashboard</h1>
                            <p>View metrics for the water dashboard here !</p>
                        </div>
                        <div className={classes.tileContainer}>
                            <Tile title="Total" value="300"/>
                            <Tile title="Active" value="276"/>
                            <Tile title="Inactive" value="24"/>
                            <button title='Refresh' className={classes.iconContainer} data-refresh={true}>
                                <HiOutlineRefresh className={classes.icon} />
                            </button>
                        </div>
                    </div>
                    <div className={classes.summaryContainer}>
                        <Summary />
                    </div>
                </div>
                <div className={classes.middleContainerOne}>
                    <Tray listType="View Maps" listDesc="View a map of all the active Water MIUs" trayMap={true}>
                        {[...Array(5)].map((_,hiddenIndex) => (
                            <div key={hiddenIndex} className={`${classes.cardSkeleton} ${classes.hiddenCard}`}/>
                        ))}
                        <ViewCard title="View Map"/>
                    </Tray>
                </div>
                <div className={classes.middleContainerTwo}>
                    <Tray listType="Meter List" listDesc="View a list of meters for the Water MIU">
                        { loading &&
                            (<SkeletonTheme baseColor='#F6F6F6' highlightColor='#EFEFEF'>
                                {[0,1,2,3,4].map((el) => {
                                    return ( <Skeleton key={el} className={classes.cardSkeleton} containerClassName={classes.cardSkeletonContainer}/>);
                                })}
                            </SkeletonTheme>)
                        }
                        { error && (<>{[0,1,2,3,4].map((el) => {
                            return ( <div key={el} className={classes.errorCard}><BiError></BiError>Error loading data !</div>);
                        })}</>)}
                        { data &&
                            data.map(({device_mrid}) => {
                                return ( <DeviceCard key={device_mrid} deviceName={device_mrid} deviceStatus={Math.round(Math.random())==1?'Online':'Offline'} additionalStyles={classes.card}/>);
                            })
                        }
                        <ViewCard title="View All"/>
                    </Tray>
                </div>
                <div className={classes.bottomContainer}>
                    <Tray listType="KPI List" listDesc="View a list of KPIs for the Water MIU">
                        <MetricCard title="High Flow" value="15" additionalStyles={classes.card}/>
                        <MetricCard title="Back Flow" value="12" additionalStyles={classes.card}/>
                        <MetricCard title="Failed Read" value="22" additionalStyles={classes.card}/>
                        <MetricCard title="Temperature" value="3" additionalStyles={classes.card}/>
                        <MetricCard title="Battery" value="9" additionalStyles={classes.card}/>
                        <ViewCard title="View KPIs"/>
                    </Tray>
                </div>
            </div>
        </>
    );
}

export default Home;



/* <Tray listType="Meter List" listDesc="View a  list of meters for Water MIU" additionalStyle={classes.tray}>
                <DeviceCard deviceName="Canary 188" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 198" deviceStatus="Offline" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 148" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 128" deviceStatus="Online" additionalStyles={classes.card}/>
                <ViewCard />
            </Tray>
            <Tray listType="KPI List" listDesc="View a  list of KPIs for Water MIU" additionalStyles={classes.tray}>
                <DeviceCard deviceName="Canary 188" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 198" deviceStatus="Offline" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 148" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 128" deviceStatus="Online" additionalStyles={classes.card}/>
                <ViewCard />
            </Tray> */
