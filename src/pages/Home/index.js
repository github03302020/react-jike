import * as echarts from 'echarts';
import { useEffect, useRef} from 'react';

const option = {
  xAxis: {
    type: 'category',
    data: ['vue','react','angular']
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


const Home = () => {
  const chartRef = useRef(null)
  
  useEffect(()=>{
    // const chartDom = document.getElementById('main');
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  },[])

  return (
    <>
      <div id='main' ref={chartRef} style={{width:'500px', height:'400px'}}> </div>
    </>
  )
}

export default Home