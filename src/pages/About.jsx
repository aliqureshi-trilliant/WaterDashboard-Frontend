import classes from './About.module.css';
import waterMIUImage from '/images/WaterMIU.png';
import waterMIUMount from '/images/WaterMIUMount.png';
import FeatureCard from '../components/FeatureCard';
import { IoCaretForwardCircleSharp , IoCaretBackCircleSharp } from 'react-icons/io5';
import { useRef, useEffect } from 'react';

function About() {

    const currentSlide = useRef(0);

    const goToSlide = (slides, slide) => {
        slides.forEach((s,i) =>s.style.transform = `translateX(${107 * (i - slide)}%`);
    };
    const nextSlide = (slides) => {
        if (currentSlide.current === slides.length - 1) currentSlide.current = 0;
        else currentSlide.current++;

        goToSlide(slides, currentSlide.current);
    };

    const prevSlide = (slides) => {
        if (currentSlide.current === 0) currentSlide.current = slides.length - 1;
        else currentSlide.current--;

        goToSlide(slides, currentSlide.current);
    };

    useEffect(() => {
        const slides = document.querySelectorAll(`.${classes.slide}`);
        const buttonForward = document.querySelector(`.${classes.forwardIcon}`);
        const buttonBackward = document.querySelector(`.${classes.backwardIcon}`);
        buttonForward.addEventListener('click',() => nextSlide(slides));
        buttonBackward.addEventListener('click', () => prevSlide(slides));

        const imageContainer = document.querySelector(`.${classes.imageContainer}`);

        if (imageContainer) {
 
            const rotateCard = () => {
                imageContainer.style.transform = 'rotateY(0.5turn)';
                setTimeout(() => {
                    imageContainer.style.transform = 'rotateY(0)';
                }, 7*1000)
            };
            
            setTimeout(rotateCard, 3 * 1000);
            setInterval(rotateCard, 17 * 1000);
        }

    },[]);

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
                    <div className={classes.cardCarousel}>
                        <div className={classes.cardCarouselContainer}>
                            <IoCaretBackCircleSharp className={`${classes.icon} ${classes.backwardIcon}`}/>
                            <div className={`${classes.slide} ${classes.slide0}`}>
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
                            </div>
                            <div className={`${classes.slide} ${classes.slide1}`}>
                                <FeatureCard title="Alarming" category="Features">
                                    <ul>
                                        <li>Configurable alarm conditions</li>
                                        <li>High,low and outside threshold alarms</li>
                                    </ul>
                                </FeatureCard>
                                <FeatureCard title="Deployment and Maintenance" category="Features">
                                    <ul>
                                        <li>Easy to install and configure</li>
                                        <li>Monitoring and sampling intervals</li>
                                        <li>Data logging for redundancy</li>
                                    </ul>
                                </FeatureCard>
                                <FeatureCard title="Applications" category="Features">
                                    <ul>
                                        <li>Bolt on device for new and existing meters</li>
                                        <li>NEMA 250 Rated</li>
                                    </ul>
                                </FeatureCard>
                            </div>
                            <div className={`${classes.slide} ${classes.slide2}`}>
                                <FeatureCard title="Radio Performance" category="Specifications">
                                    <ul>
                                        <li>Sensitivity: -143 dBm</li>
                                        <li>Transmit Power: +20 dBm (NA), +10 dBm (EU)</li>
                                        <li>Data Throughput: 60kbps</li>
                                        <li>Access Point Capacity: 64,000 Nodes</li>

                                    </ul>
                                </FeatureCard>
                                <FeatureCard title="Radio Performance" category="Specifications">
                                    <ul>
                                        <li>Security: 128/256 bit encryption</li>
                                        <li>Protocol: RPMA Network in 2.4 GHz ISM Band</li>
                                        <li>Modulation: 1MHz Bandwidth</li>
                                        <li>Diversity Support: Yes</li>
                                    </ul>
                                </FeatureCard>
                                <FeatureCard title="Dimensions" category="Specifications">
                                    <ul>
                                        <li>Size: 94   x  74 x  49mm</li>
                                        <li>Weight: 400g (excluding cable)</li>
                                    </ul>
                                </FeatureCard>
                            </div>
                            <div className={`${classes.slide} ${classes.slide3}`}>
                                <FeatureCard title="Environmental" category="Specifications">
                                    <ul>
                                        <li>IEC 60529 (IP 68 to 1 meter for 30 days)</li>
                                        <li>Operating Temperature:  -30 to +65&deg;C</li>
                                        <li>Storage Temperature:  -30 to +85&deg;C</li>
                                        <li>Humidity:  0% to 100  %</li>
                                    </ul>
                                </FeatureCard>
                                <FeatureCard title="Regulatory Compliance" category="Specifications">
                                    <ul>
                                        <li>IEC 60068-1-1, -2,  -6,  -11,    -14,    -27,    -30</li>
                                        <li>MIL  -STD-810G</li>
                                        <li>NEMA 250 (Rating 6P)</li>
                                        <li>EN/UL/CSA 60950-1</li>
                                        <li>EN 60950-22</li>
                                        <li>EN/UL 62368-1</li>
                                    </ul>
                                </FeatureCard>
                                <FeatureCard title="Regulatory Compliance" category="Specifications">
                                    <ul>
                                        <li>EN 63000:2018, EN 62311:2019</li>
                                        <li>EN 55035, EN 55032</li>
                                        <li>EN 301 489-17, EN 300 440</li>
                                        <li>RSS-102, RSS-247</li>
                                        <li> 47 CFR Part 247 - Subpart B Class B</li>
                                        <li>47 CFR Part 2 - 1091, 47 CFR Part 247</li>
                                    </ul>
                                </FeatureCard>
                            </div>
                            <IoCaretForwardCircleSharp className={`${classes.icon} ${classes.forwardIcon}`}/>
                        </div>
                    </div>
                </div>
                <div className= {classes.sideContainer}>
                    <div className={classes.imageContainer}>
                        <div className={classes.cardFaceFront}>
                            <img className={classes.waterMIUImage} src={waterMIUImage} alt="Water MIU Image" />
                        </div>
                        <div className={classes.cardFaceBack}>
                            <img className={classes.waterMIUMountImage} src={waterMIUMount} alt="Water MIU Image" />
                            Water MIU: P/N SC7240<br/>
                            Optional Wall Mount Bracket: P/N SC7240-31<br/>
                            &copy;Trilliant Networks Inc.
                        </div>
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
