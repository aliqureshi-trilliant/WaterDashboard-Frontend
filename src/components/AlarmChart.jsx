import classes from './AlarmChart.module.css';
import { BsFillBellFill } from 'react-icons/bs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['High Flow','Back Flow','Failed Reads','Battery','Temperature'],
    datasets: [
        {
            label: '',
            data: [12, 19, 13, 6, 4],
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

    const additionalStyles = props.additionalStyles? props.additionalStyles : '';

    return (
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
                    <Doughnut data={data} plugins={plugins} options={options}/>
                </div>
                <div className={classes.dataContainer}>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Back Flow
                        </div>
                        <div className={classes.dataNumber}>
                            14%
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            High Flow
                        </div>
                        <div className={classes.dataNumber}>
                            39%
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Failed Read
                        </div>
                        <div className={classes.dataNumber}>
                            47%
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Battery
                        </div>
                        <div className={classes.dataNumber}>
                            16%
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.dataText}>
                            Temperature
                        </div>
                        <div className={classes.dataNumber}>
                            14%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlarmChart;
