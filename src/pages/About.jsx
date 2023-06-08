import classes from './About.module.css';
import waterMIUImage from '/images/WaterMIU.png';
import FeatureCard from '../components/FeatureCard';
import { IoCaretForwardCircleSharp , IoCaretBackCircleSharp } from 'react-icons/io5';

function About() {

    return (
        <>
            <div className={classes.about}>
                <div className={classes.mainContainer}>
                    <div className={classes.descContainer}>
                        <div className={classes.description}>
                            <div className={classes.coverImage}>
                            </div>
                            <div className={classes.titleCard}>
                                <div className={classes.title}>Water MIU</div>
                                <div className={classes.subTitle}>View information for the  water MIU right here!</div>
                            </div>
                            <div className={classes.descriptionText}>
                                <div className={classes.descriptionHeading}>About Me</div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.<br />
                                <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                            </div>
                        </div>
                    </div>
                    <div className={classes.cardCarouselContainer}>
                        <IoCaretBackCircleSharp className={`${classes.icon} ${classes.backwardIcon}`}/>
                        <FeatureCard title="Wireless Connectivity" category="Features">
                            <ul>
                                <li>RPMA Network</li>
                                <li>Over 160dB Link Budget</li>
                                <li>GPS Synchronization</li>
                            </ul>
                        </FeatureCard>
                        <FeatureCard title="Meter Input" category="Features">
                            <ul>
                                <li>Sensus UI-1203</li>
                                <li>Neptune E-Coder</li>
                            </ul>
                        </FeatureCard>
                        <FeatureCard title="Indoor Outdoor Use" category="Features">
                            <ul>
                                <li>Robust Enclosure</li>
                                <li>NEMA 250 Rated</li>
                                <li>Pit and Wall Mount</li>
                                <li>15-20 Year Life</li>
                            </ul>
                        </FeatureCard>
                        <IoCaretForwardCircleSharp className={`${classes.icon} ${classes.forwardIcon}`}/>
                    </div>
                </div>
                <div className= {classes.sideContainer}>
                    <div className={classes.imageContainer}>
                        <img className={classes.waterMIUImage} src={waterMIUImage} alt="Water MIU Image" />
                    </div>
                    <div className={classes.summaryContainer}>
                        <div className={classes.summaryHeading}>Summary</div>
                        <hr></hr>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>Device</p>
                            <p className={classes.itemText}>Water Meter Interfacing Unit</p>
                        </div>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>Range</p>
                            <p className={classes.itemText}>Excellent Sensitivity and Range</p>
                        </div>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>Battery</p>
                            <p className={classes.itemText}>15-20 Year Stand Alone Internal Battery</p>
                        </div>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>Temperature</p>
                            <p className={classes.itemText}>Wide  Operating Temperature Range</p>
                        </div>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>GPS</p>
                            <p className={classes.itemText}>Synchronized Time Tagging of Data   </p>
                        </div>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>Alerts</p>
                            <p className={classes.itemText}>Threshold and Alarming Functions</p>
                        </div>
                        <div className={classes.summaryItem}>
                            <p className={classes.itemHeading}>Communication</p>
                            <p className={classes.itemText}>Internal Diversity Antennae</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;