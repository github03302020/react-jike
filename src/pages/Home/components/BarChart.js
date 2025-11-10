import * as echarts from 'echarts';
import { useEffect, useRef} from 'react';

const BarChart = ({title}) => {
  const chartRef = useRef(null)
  
  useEffect(()=>{
    // const chartDom = document.getElementById('main');
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['vue', 'react', 'angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [40, 70, 20],
          type: 'bar'
        }
      ]
    };
    option && myChart.setOption(option);
  },[title])

  return (
    <>
      <div ref={chartRef} style={{width:'500px', height:'400px'}}> </div>
    </>
  )
}

export default BarChart