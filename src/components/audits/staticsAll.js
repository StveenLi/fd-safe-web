/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';

class StaticsAll extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            option:{
                title: {
                    text: '总体趋势'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#e9f3ff'
                        }
                    }
                },
                legend: {
                    data:['邮件营销']
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
                        boundaryGap : false,
                        data : ['03-01','03-01','03-01','03-01','03-01']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {color:'#dfedff'}},
                        lineStyle:{
                            color:'#81B7FF'
                        },
                        itemStyle:{
                            color:'#81B7FF'
                        },
                        data:[120, 132, 101, 134, 90]
                    }
                ]
            }

        };
      }

    componentDidMount() {
        var dom = document.getElementById("allStatics");
        var myChart = echarts.init(dom);
        myChart.setOption(this.state.option);
    }

    render(){
        return <div id="allStatics" style={{width:600,height:300,padding:15,backgroundColor: '#fff' }}></div>

    }


}
export default StaticsAll