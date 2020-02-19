

import React from 'react'
import { NavBar,Toast} from 'antd-mobile';
import {BLUE,GREY} from '../config/style'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

import {getKeyOption,toSendEmail} from '../config/api'
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
            importants:[],
			bing:[],
			standardAnnounce_name:'',
			standardDemand_name:''
        };
      }

    componentWillMount() {
        let transmitParam = [];
        let indicatorList = [];
        let dataVals = [];
		let that = this;
        if(this.props.history.location.state instanceof Array){
            transmitParam =  this.props.history.location.state[0].transmitParam;
        }
		this.setState({
			bing:transmitParam
		})

        for(let tran of transmitParam){
            if(tran.name==='SJZF'){
                this.state.sumCore = tran.value;
            }else if(tran.name!=='ZF'){
				if(tran.name != 'standardAnnounce'&&tran.name != 'standardDemand'){
					let text = '';
					tran.name.length<7?text=tran.name:text=tran.name.substr(0,7)+'\n'+tran.name.substr(7,tran.name.length)
					indicatorList.push({ text: text, max: 100 });
					dataVals.push(parseInt(tran.value))
				}
            }
			if(tran.name =='standardDemand'){
				that.setState({
					standardDemand_name : tran.value == 'BSY_0'?'不适用':tran.value == 'F_0'?'符合标准':tran.value == 'BF_-6'?'部分缺失':tran.value == 'Q_-10'?'缺失':'暂无'
				})
			}
			if(tran.name =='standardAnnounce'){
				that.setState({
					standardAnnounce_name : tran.value == 'F_0'?'符合标准':tran.value == 'N_-6'?'不符合标准':tran.value == 'BSY_0'?'不适用':'暂无'
				})
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
                                color:'red',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                margin:[0,0,0,-30]
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
                        radius: 100,
                        //startAngle: 100
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

        toSendEmail(this.props.history.location.state[0].planId).then((data) => {
            Toast.success(data.msg, 1)
        })
        var myChart = echarts.init(document.getElementById("typeStatics"));
        myChart.setOption(this.state.option);
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){
		const {standardDemand_name,standardAnnounce_name} = this.state
        let scoreColor = this.state.importants.length>3?'#ff5b5b':this.state.keys.length>0?'#ff5b5b':this.state.sumCore>=80?'#0cc1a3':'#ff5b5b'
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
            >审核结果</NavBar>

            <div style={{marginTop:55,background:'#fff',padding:15}}>
                <div style={{textAlign:'left'}}>您的本次审核得分为：</div>
                <div style={{color:scoreColor,fontSize:50,padding:'15px 0 0 0'}}>{parseInt(this.state.sumCore)}</div>
                <div style={{marginLeft:120,marginTop:-20}}>分</div>
            </div>

            {/*<div style={{background:'#fff',padding:15,color:scoreColor}}>{scoreColor === '#ff5b5b'?'本次审核未通过':'本次审核通过'}</div>*/}


            <div style={{textAlign:'left',marginTop:10}}>
                <div style={{background:'#fff',padding:15,fontSize:16}}>不符合的关键项</div>
                {this.state.importants.map((important,index) => {
                    return <div key={index} style={{background:GREY,padding:10,color:'#ff5b5b'}}>{important.name.substr(2,important.name.length)}</div>
                })}
            </div>
            <div style={{textAlign:'left',marginTop:10}}>
                <div style={{background:'#fff',padding:15,fontSize:16}}>不符合的严重项</div>
                {this.state.keys.map((key,index) => {
                    return <div key={index} style={{background:GREY,padding:10,color:'#ff5b5b'}}>{key.name.substr(2,key.name.length)}</div>
                })}
            </div>
			{standardAnnounce_name == '暂无'||standardDemand_name == '暂无'?'':<div style={{marginTop:10,display:'flex',flexDirection:'row',background:'#fff'}}>
			    <div style={{padding:15,fontSize:16}}>年度报告</div>
			    <div style={{flex:1,textAlign:'right',padding:15,fontSize:16,color:'#4876FF'}}>{standardDemand_name}</div>
			</div>}
			
			{standardAnnounce_name == '暂无'||standardDemand_name == '暂无'?'':<div style={{marginTop:10,display:'flex',flexDirection:'row',background:'#fff'}}>
			    <div style={{padding:15,fontSize:16}}>百合花工程看板</div>
			    <div style={{flex:1,textAlign:'right',padding:15,fontSize:16,color:'#4876FF'}}>{standardAnnounce_name}</div>
			</div>}
			

            <div id="typeStatics" style={{height:400,padding:-20,backgroundColor: '#fff',marginTop:10 }}></div>
            <div style={{fontSize:18,color:'#fff',padding: 15,textAlign:'center',backgroundColor:BLUE}}
                 onClick={() => this.props.history.push('/audits')}
            >完成</div>
        </div>
    }
}

export default AuditComplete