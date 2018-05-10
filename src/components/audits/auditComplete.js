

import React from 'react'
import { NavBar,Icon,SearchBar} from 'antd-mobile';
import styles,{BLUE,FONTGREY} from '../config/style'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
class AuditComplete extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            option: {

                title: {
                    text: '类目平均分'
                },
                legend: {
                    data: ['']
                },
                radar: [
                    {
                        center: ['50%'],
                        radius: 120,
                        startAngle: 90,
                        splitNumber: 4,
                        shape: 'circle',
                        name: {
                            formatter:'【{value}】',
                            textStyle: {
                                color:'#72ACD1'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['rgba(114, 172, 209, 1)'],
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    },
                    {
                        indicator: [
                            { text: '虫害控制与废弃物管理', max: 150 },
                            { text: '食品接收', max: 150 },
                            { text: '用餐区域卫生', max: 150 },
                            { text: '食品加工与服务', max: 120 },
                            { text: '个人卫生', max: 108 },
                            { text: '服务', max: 72 }
                        ],
                        center: ['50%', '50%'],
                        radius: 120
                    }
                ],
                series: [
                    {
                        name: '成绩单',
                        type: 'radar',
                        radarIndex: 1,
                        data: [
                            {
                                value: [120, 118, 130, 100, 99, 70],
                                name: '张三',
                                label: {
                                    normal: {
                                        show: true,
                                        formatter:function(params) {
                                            return params.value;
                                        }
                                    }
                                }
                            },

                        ],
                        lineStyle:{
                            color:BLUE
                        },
                        itemStyle:{
                            color:BLUE
                        }
                    }
                ]
            },
        };
      }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById("typeStatics"));
        myChart.setOption(this.state.option);
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核结果</NavBar>

            <div style={{marginTop:55,background:'#fff',padding:15}}>
                <div style={{textAlign:'left'}}>您的本次审核得分为：</div>
                <div style={{color:BLUE,fontSize:50,padding:'15px 0 0 0'}}>88</div>
                <div style={{marginLeft:90,marginTop:-20}}>分</div>
            </div>
            <div id="typeStatics" style={{height:400,padding:15,backgroundColor: '#fff',marginTop:10 }}></div>


        </div>
    }
}

export default AuditComplete