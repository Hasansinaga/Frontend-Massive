import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(null);

  const generateMonthlyData = (year) => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  };

  const generateWeeklyData = (year, month) => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 50));
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setMonth(null);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const data = month === null
    ? {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: `Data for Year ${year}`,
            data: generateMonthlyData(year),
            borderColor: '#7AB434',
            backgroundColor: 'rgba(122, 180, 52, 0.2)',  
            fill: true, 
            tension: 0.4,
          },
        ],
      }
    : {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: `Data for ${month} ${year}`,
            data: generateWeeklyData(year, month),
            borderColor: '#7AB434',
            backgroundColor: 'rgba(122, 180, 52, 0.2)', 
            fill: true, 
            tension: 0.4,
          },
        ],
      };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <h1>Grafik Penjualan</h1> <br /><br /><br />

      <div>
        <label>
          Year:
          <select value={year} onChange={handleYearChange}>
            {[2022, 2023, 2024, 2025].map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </label>

        <label>
          Month:
          <select value={month} onChange={handleMonthChange}>
            <option value={null}>Select Month</option>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((monthOption, index) => (
              <option key={index} value={monthOption}>
                {monthOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ height: '300px', width: '100%' }}> {/* Lebar penuh dan tinggi tetap */}
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default ChartComponent;
