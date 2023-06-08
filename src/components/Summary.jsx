import classes from './Summary.module.css';
import summaryImage from '/images/WaterMIU.png';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Summary () {

    const navigate = useNavigate();

    useEffect(() => {
        const cardEl = document.querySelector(`.${classes.summary}`);
        cardEl.addEventListener('click', () => navigate(`/about`));
    }, []);

    return (
        <div className={classes.summary}>
            <div className={classes.summaryTextContainer}>
                <h2 className={classes.summaryHeading}>Water MIU</h2>
                <p className={classes.summaryText}>A small water meter with the capabilites of a water meter.</p>
            </div>
            <div className={classes.imageContainer}>
                <img className={classes.summaryImage} src={summaryImage} alt="Water MIU Image" />
            </div>
        </div>
    );
}

export default Summary;
