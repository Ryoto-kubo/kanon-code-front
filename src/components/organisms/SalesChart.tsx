import Box from '@material-ui/core/Box';
// import "chartjs-plugin-datalabels";
import React from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {
  labels: string[];
  salesList: number[];
  backGrounds: string[];
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  // plugins: {
  //   datalabels: {
  //     display: true,
  //     anchor: "end",
  //     align: "right",
  //   },
  // },
  scales: {
    // xAxes: [
    //   // x軸オプション
    //   {
    //     scaleLabel: {
    //       // x軸ラベルオプション
    //       display: true,
    //       labelString: "2019年",
    //     },
    //   },
    // ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: '売り上げ(¥)',
        },
        ticks: {
          beginAtZero: true,
          callback: function (value: any) {
            return `¥${value}`;
          },
        },
      },
    ],
  },
};

export const SalesChart: React.FC<Props> = React.memo(
  ({ labels, salesList, backGrounds }) => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: '売り上げ',
          data: salesList,
          backgroundColor: backGrounds,
          borderColor: backGrounds,
          borderWidth: 1,
        },
      ],
    };

    return (
      // 100%にするとレスポンシブが効かないため99%に設定
      <Box style={{ position: 'relative', height: '500px', width: '99%' }}>
        {/* <Box className="chart-wrapper"> */}
        <Bar data={data} options={options} />
      </Box>
    );
  }
);
