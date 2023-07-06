import classes from './AlarmChart.module.css';
import { BsFillBellFill } from 'react-icons/bs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BiError } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const plugins = [{
    beforeDraw: function(chart) {
        var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + 'em Reem Kufi';
        ctx.textBaseline = 'top';
        var text = 'Total Alarms',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
    },
    onHover: (e, activeElements, chart) => {
        if (activeElements[0]) {
            let ctx = activeElements[0].element.$context;
            let label = chart.data.labels[ctx.dataIndex];
            let value = chart.data.datasets[0].data[ctx.dataIndex];
            console.log(label + ': ' + value);
        }
    },
}];

const options = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            titleFont: {
                family: 'Reem Kufi'
            },
            bodyFont: {
                family: 'Nunito'

            },
            footerFont: {
                family: 'Nunito'
            }
        }
    },
};

function AlarmChart(props){
    
    const { deviceName } = useParams();
    const [alarmData, setAlarmData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartReference = useRef(null);

    const additionalStyles = props.additionalStyles? props.additionalStyles : '';

    const fetchData = () => {
        fetch(`http://localhost:3000/api/waterMIUs/${deviceName}/KPIs/alarms?days=1`)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.message}`);
                }
                return response.json();
            })
            .then((data) => {
                setAlarmData(formatData(data));
                setError(null);
            })
            .catch((error) => {
                setError(error);
                setAlarmData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const formatData = (data) => {
        const dataArray = [0,0,0,0,0];
        data.forEach((el) => {
            switch(el.event_id) {
            case '24.21.87.47': dataArray[2]++;break;
            case '24.5.48.93': dataArray[0]++;break;
            case '24.5.48.219': dataArray[1]++;break;
            case '24.35.0.40': dataArray[4]++;break;
            case '24.2.22.150': dataArray[3]++;break;
            }
        })
        return dataArray;
    };

    const updateChart = (formattedData) => {
        const chart = chartReference.current;
        chart.data.datasets[0].data = formattedData;
        chart.update();
    }

    const data = {
        labels: ['High Flow','Back Flow','Failed Reads','Battery','Temperature'],
        datasets: [
            {
                label: '',
                data: alarmData,
                backgroundColor: [
                    'rgb(120, 178, 119)',
                    'rgb(150, 222, 149)',
                    'rgb(42, 101, 42)',
                    'rgb(214, 237, 212)',
                    'rgb(40, 45, 41)',
                ],
                borderColor: [
                    'rgb(120, 178, 119)',
                    'rgb(150, 222, 149)',
                    'rgb(42, 101, 42)',
                    'rgb(214, 237, 212)',
                    'rgb(40, 45, 41)',
                ],
                borderWidth: 1,
                cutout: '80%'
            },
        ],
    };

    const calculatePercentage = (data, index) => {
        const total = data.reduce((acc, el) => acc + el, 0);
        const percentage = isNaN((data[index] / total) * 100) ? 0 : Math.round(data[index] * 100/ total);
        return `${percentage}%`;
      };

    useEffect(() => {
        fetchData();
    },[props.refresh]);

    useEffect(() => {
        if (alarmData){
            updateChart(alarmData);
        }
    },[alarmData]);

    return (<>
        {loading &&
            <SkeletonTheme baseColor='#C5EAC5' highlightColor='#D6EDD4'>
                <Skeleton className={classes.card} containerClassName={classes.cardSkeletonContainer}/>
            </SkeletonTheme>
        }
        { error &&
            <div className={classes.errorCard}><BiError></BiError>Error loading data!</div>
        }
        {alarmData && 
            <div className={`${classes.card} ${additionalStyles}`}>
            <div className={classes.headingContainer}>
                <div className={classes.titleContainer}>
                    <h1>Active Alarms</h1>
                    <p>Alarm data for the last 24 hours.</p>
                </div>
                <div className={classes.iconContainer}>
                    <BsFillBellFill />
                </div>
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.piechart}>
                    {alarmData && <Doughnut data={data} plugins={plugins} options={options} ref={chartReference}/>}
                </div>
                <div className={classes.dataContainer}>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Back Flow
                        </div>
                        <div className={classes.dataNumber}>
                            {alarmData && calculatePercentage(alarmData, 1)}
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            High Flow
                        </div>
                        <div className={classes.dataNumber}>
                            {alarmData && calculatePercentage(alarmData, 0)}
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Failed Read
                        </div>
                        <div className={classes.dataNumber}>
                            {alarmData && calculatePercentage(alarmData, 2)}
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Battery
                        </div>
                        <div className={classes.dataNumber}>
                            {alarmData && calculatePercentage(alarmData, 3)}
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Temperature
                        </div>
                        <div className={classes.dataNumber}>
                            {alarmData && calculatePercentage(alarmData, 4)}
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        </>);
}

export default AlarmChart;
