import React, { useEffect, useState } from 'react'
import './Charts.css'
import axios from 'axios';

// reachrts imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Charts = () => {
    const [barChartData, setBarChartData] = useState([]);
    
    const [month, setMonth] = useState(3);
    const [loadChart, setLoadChart] = useState(false);

    useEffect(() => {
    
            axios.get(`http://localhost:5000/getBarchart?month=${month}`).then((res) => {
                console.log(res.data)
                setBarChartData(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
        
        

    }, [month, loadChart])


    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    }


    const loadBarChart = () => {
        setLoadChart(true)
    }

    
    return (
        <div className='Charts-comp'>
            <h1>Charts Visualization</h1>

            <div className="buttons-div">
                <button onClick={loadBarChart} className='chart-btn'>BarChart</button>
                
            </div>
            <div className="statistics-month-picker-div">
                <legend>
                    Select Month
                    <select name="statistics-month-picker" id="" className="mx-2" value={month} onChange={handleMonthChange}>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option default value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                </legend>
            </div>

            {



                    <BarChart width={1280} height={500} data={barChartData} margin={{ top: 30, right: 30, left: 20, bottom: 15 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#34495E" />
                    </BarChart>

                    

                 
            }
        </div>
    )
}

export default Charts