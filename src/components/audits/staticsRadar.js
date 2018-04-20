/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import {NavBar,Icon,WhiteSpace} from 'antd-mobile'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/radar';

class StaticsRadar extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            option : {
            title: {
                text: '对比雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配', '实际开销']
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: '销售', max: 6500},
                    { name: '管理', max: 16000},
                    { name: '信息技术', max: 30000},
                    { name: '客服', max: 38000},
                    { name: '研发', max: 52000},
                    { name: '市场', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配'
                    },
                    {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销'
                    }
                ]
            }]
        }
        };
      }
    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };

    componentDidMount() {
        var dom = document.getElementById("radar");
        var myChart = echarts.init(dom);
        myChart.setOption(this.state.option);
    }

    render(){
        return <div style={{textAlign:'center'}}>


            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >雷达图</NavBar>

            <WhiteSpace/>


            <div id="radar" style={{height:400,backgroundColor:'#fff',padding:15}}>


            </div>



        </div>
    }
}


export default StaticsRadar