import classes from './FeatureCard.module.css';

function FeatureCard(props) {
    return (
        <>
        <div className={classes.featureCard}>
            <div className={classes.title}>
                {props.title}
            </div>
            <div className={classes.content}>
                {props.children}
            </div>
            <div className={classes.category}>
                {props.category}
            </div>
        </div>
        </>
    );
}

export default FeatureCard;