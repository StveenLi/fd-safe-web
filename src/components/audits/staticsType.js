/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

class StaticsType extends React.Component{



    // 构造
      constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              option: {
                  color: ['#3398DB'],
                  tooltip : {
                      trigger: 'axis',
                      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  xAxis : [
                      {
                          type : 'category',
                          data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          axisTick: {
                              alignWithLabel: true
                          }
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value'
                      }
                  ],
                  series : [
                      {
                          name:'直接访问',
                          type:'bar',
                          barWidth: '60%',
                          data:[10, 52, 200, 334, 390, 330, 220]
                      }
                  ]
              },
              circleOption:{
                  tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      x: 'left',
                      data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                  },
                  series: [
                      {
                          name:'访问来源',
                          type:'pie',
                          radius: ['50%', '70%'],
                          avoidLabelOverlap: false,
                          label: {
                              normal: {
                                  show: false,
                                  position: 'center'
                              },
                              emphasis: {
                                  show: true,
                                  textStyle: {
                                      fontSize: '30',
                                      fontWeight: 'bold'
                                  }
                              }
                          },
                          labelLine: {
                              normal: {
                                  show: false
                              }
                          },
                          data:[
                              {value:335, name:'直接访问'},
                              {value:310, name:'邮件营销'},
                              {value:234, name:'联盟广告'},
                              {value:135, name:'视频广告'},
                              {value:1548, name:'搜索引擎'}
                          ]
                      }
                  ]
              }
          }
      }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById("typeStatics"));
        var myCircleChart = echarts.init(document.getElementById("typeCircleStatics"));
        myChart.setOption(this.state.option);
        myCircleChart.setOption(this.state.circleOption);
    }
    render(){
        return <div style={{width:'100%'}}>
            <div id="typeStatics" style={{height:300,padding:15,backgroundColor: '#fff' }}></div>
            <div id="typeCircleStatics" style={{marginTop:10,marginBottom:100,height:300,padding:15,backgroundColor: '#fff' }}></div>
        </div>
    }


}
export default StaticsType