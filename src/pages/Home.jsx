import classes from './Home.module.css';
import Tray from '../components/Tray';
import DeviceCard from '../components/DeviceCard';
import ViewCard from '../components/ViewCard';
import Summary from '../components/Summary';
import Tile from '../components/Tile';
import MetricCard from '../components/MetricCard';

function Home() {
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
                        <Tile title="Active" value="276"/>
                        <Tile title="Inactive" value="24"/>
                        <Tile title="Total" value="300"/>
                    </div>
                </div>
                <div className={classes.summaryContainer}>
                    <Summary />
                </div>
            </div>
            <div className={classes.middleContainerOne}>
            <Tray listType="View Maps" listDesc="View a map of all the active Water MIUs" trayMap={true}>
                <ViewCard />
            </Tray>
            </div>
            <div className={classes.middleContainerTwo}>
            <Tray listType="Meter List" listDesc="View a list of meters for the Water MIU">
                <DeviceCard deviceName="Canary 188" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 198" deviceStatus="Offline" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 148" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 128" deviceStatus="Online" additionalStyles={classes.card}/>
                <DeviceCard deviceName="Canary 169" deviceStatus="Offline" additionalStyles={classes.card}/>
                <ViewCard />
            </Tray>
            </div>
            <div className={classes.bottomContainer}>
            <Tray listType="KPI List" listDesc="View a list of KPIs for the Water MIU">
                <MetricCard title="Alarm" additionalStyles={classes.card}/>
                <MetricCard title="Water Level" additionalStyles={classes.card}/>
                <MetricCard title="Metric 3" additionalStyles={classes.card}/>
                <MetricCard title="Metric 4" additionalStyles={classes.card}/>
                <MetricCard title="Metric 5" additionalStyles={classes.card}/>
                <ViewCard />
            </Tray>
            </div>
        </div>
        </>
    )
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