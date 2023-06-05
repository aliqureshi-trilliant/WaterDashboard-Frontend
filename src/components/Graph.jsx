import classes from './Graph.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

function Graph(props){

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const fontSize = window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size');
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Failed Reads',
                data: labels.map(() => Math.round(Math.random() * labels.length)),
                borderColor: '#52DBB2',
                backgroundColor: '#52DBB2',
            },
            {
                label: 'High Flow',
                data: labels.map(() => Math.round(Math.random() * labels.length)),
                borderColor: '#71c36f',
                backgroundColor: '#71c36f',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Reem Kufi',
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        family: 'Reem Kufi',
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.title || '',
                font: {
                    family: 'Reem Kufi',
                    weight: 400,
                    size: fontSize,
                    color: '#6C7172'
                }
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
        responsive:true,
        maintainAspectRatio:false
    };

    function changeData() {
        let data;
        const chart = chartReference.current;
        switch(this.value) {
        case '7 days': data = labels.map(() => Math.round(Math.random() * labels.length)); break;
        case '1 month': data = labels.map(() => Math.round(Math.random() * labels.length) * 3); break;
        case '3 months': data = labels.map(() => Math.round(Math.random() * labels.length) * 8); break;
        }
        chart.data.datasets[0].data = data;
        chart.update();
    }

    const chartReference = useRef(null);

    useEffect( () => {
        const select = document.querySelector(`.${classes.select}[data-id='${props.graphId}']`);
        select.addEventListener('change', changeData);
    },[]);

    return (
        <div className={classes.graphCard}>
            <div className={classes.graph}>
                <div className={classes.selectBox}>
                    <select name="Time" className={classes.select} data-id={props.graphId}>
                        <option value="7 days" className={classes.options}>7 days</option>
                        <option value="1 month" className={classes.options}>1 month</option>
                        <option value="3 months" className={classes.options}>3 months</option>
                    </select>
                </div>
                <Line options={options} data={data} ref={chartReference}/>
            </div>
        </div>);
}

export default Graph;
