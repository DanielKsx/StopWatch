import styles from './TimeDisplay.module.scss';

const TimeDisplay = props => {
    return (<div className={styles.display}>{props.value}</div>
    );
};

export default TimeDisplay;