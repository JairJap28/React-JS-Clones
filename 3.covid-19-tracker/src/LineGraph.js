import React, {
    useState,
    useEffect
} from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
}


const LineGraph = ({ casesType = "cases" }) => {
    const [data, setData] = useState({});

    const buildCharData = (data) => {
        const charData = [];
        let lastDataPoint;

        for(let date in data[casesType]) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                charData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }

        return charData;
    }

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(response => response.json())
                .then(data => {
                    const charData = buildCharData(data);
                    setData(charData);
                })
        }

        fetchData();
    }, [casesType]);

    return (
        <div>
            { data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.3)",
                                borderColor: "#CC1034",
                                borderWidth: 1,
                                data: data
                            }
                        ]
                    }}
                    options={options}
                />
            )}
        </div>
    )
}

export default LineGraph
