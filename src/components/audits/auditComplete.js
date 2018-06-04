

import React from 'react'
import { NavBar} from 'antd-mobile';
import {BLUE,GREY} from '../config/style'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

import {getKeyOption} from '../config/api'
class AuditComplete extends React.Component{


    // 构造
      constructor(props) {

          super(props);
        // 初始状态
        this.state = {
            sumCore:'',
            option : {},
            //不符合的关键项
            keys:[],
            //严重不符合
            importants:[]
        };
      }

    componentWillMount() {
        let transmitParam = [];
        let indicatorList = [];
        let dataVals = [];
        if(this.props.history.location.state instanceof Array){
            transmitParam =  this.props.history.location.state[0].transmitParam;
        }

        for(let tran of transmitParam){
            if(tran.name==='SJZF'){
                this.state.sumCore = tran.value;
            }
            else if(tran.name!=='ZF'){
                indicatorList.push({ text: tran.name, max: 100 });
                dataVals.push(parseInt(tran.value))
            }
        }

        this.setState({
            option:{

                title: {
                    text: '类目得分'
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
                        indicator: indicatorList,
                        center: ['50%', '50%'],
                        radius: 120
                    }
                ],
                series: [
                    {
                        name: '食品安全',
                        type: 'radar',
                        radarIndex: 1,
                        data: [
                            {
                                value: dataVals,
                                name: '食品安全',
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
                        areaStyle: {normal: {color:'#dfedff'}},

                        lineStyle:{
                            color:'#81B7FF'
                        },
                        itemStyle:{
                            color:'#81B7FF'
                        }
                    }
                ]
            }
        })

    }


    componentDidMount() {
        getKeyOption(this.props.history.location.state[0].planId).then((data) => {
            if(data.success){
                this.setState({
                    keys:data.keys,
                    importants:data.important
                })
            }
        })
        var myChart = echarts.init(document.getElementById("typeStatics"));
        myChart.setOption(this.state.option);
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){

        let scoreColor = this.state.importants.length>3?'#ff5b5b':this.state.keys.length>0?'#ff5b5b':this.state.sumCore>80?'#0cc1a3':'#ff5b5b'
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
            >审核结果</NavBar>

            <div style={{marginTop:55,background:'#fff',padding:15}}>
                <div style={{textAlign:'left'}}>您的本次审核得分为：</div>
                <div style={{color:scoreColor,fontSize:50,padding:'15px 0 0 0'}}>{parseInt(this.state.sumCore)}</div>
                <div style={{marginLeft:120,marginTop:-20}}>分</div>
            </div>

            <div style={{background:'#fff',padding:15,color:scoreColor}}>{scoreColor === '#ff5b5b'?'本次审核未通过':'本次审核通过'}</div>


            <div style={{textAlign:'left',marginTop:10}}>
                <div style={{background:'#fff',padding:15,fontSize:16}}>不符合的严重项</div>
                {this.state.importants.map((important,index) => {
                    return <div key={index} style={{background:GREY,padding:10,color:'#ff5b5b'}}>{important.name}</div>
                })}
            </div>
            <div style={{textAlign:'left',marginTop:10}}>
                <div style={{background:'#fff',padding:15,fontSize:16}}>不符合的关键项</div>
                {this.state.keys.map((key,index) => {
                    return <div key={index} style={{background:GREY,padding:10,color:'#ff5b5b'}}>{key.name}</div>
                })}
            </div>

            <div id="typeStatics" style={{height:400,padding:15,backgroundColor: '#fff',marginTop:10 }}></div>
            <div style={{fontSize:18,color:'#fff',padding: 15,textAlign:'center',backgroundColor:BLUE}}
                 onClick={() => this.props.history.push('/audits')}
            >完成</div>



        </div>
    }
}

export default AuditComplete