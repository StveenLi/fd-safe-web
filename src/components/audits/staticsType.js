/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import {List,DatePicker,Icon,Drawer,Picker,Button,Toast} from 'antd-mobile'
import SearchComponent from '../common/searchComponent'
import {BLUE} from '../config/style'
import {queryAssessHis,queryUnitRank,queryDateRange,queryTrend} from '../config/api'
class StaticsType extends React.Component{



    // 构造
      constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              startDate:'',
              endDate:'',
              resValue:'',
              sValue:'',
              bValue:'',
              tValue:'',
              pickerValue:{},
              groups:[],
              brands:[],
              types:[],
              resOptions:[],
              open: false,
              docked: false,
              searchDisplay: 'none',
              rankResList:[],
              option: {
              },
              circleOption:{

              }
          }
      }
    onDock (d){
        this.state.searchDisplay == 'none'? this.setState({searchDisplay:''}):this.setState({searchDisplay:'none'})
        this.setState({
            docked:!this.state.docked
        });
    }

    serachResults(){

        const {startDate,endDate,sValue,bValue,tValue,pickerValue} = this.state
        let proviceId = '';
        let cityId = '';
        let countyId = '';
        if(pickerValue instanceof Array){
            proviceId = pickerValue[0];
            cityId = pickerValue[1];
            countyId = pickerValue[2];
        }
        queryUnitRank(
            startDate,endDate,sValue,bValue,proviceId,cityId,countyId,0,tValue,1
        ).then(data => {
            if(data.success){
                if(data.list.length>0){
                    let resId = data.list[0].id
                    queryTrend('','',resId).then(data => {
                        if(data.success){
                            let indicator = [];
                            let dataValues = [];
                            for(let tran of data.list){
                                indicator.push({ text: tran.name, max: 100 });
                                dataValues.push(parseInt(tran.value))
                            }
                            if(indicator.length<1){
                                indicator.push({ text: 0, max: 100 })
                            }

                            this.setState({
                                option:{
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
                                            indicator: indicator,
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
                                                    value: dataValues,
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
                                                color:BLUE
                                            },
                                            itemStyle:{
                                                color:BLUE
                                            }
                                        }
                                    ]
                                }
                            })
                            var myChart = echarts.init(document.getElementById("typeStatics"));
                            myChart.setOption(this.state.option);

                        }
                    })
                    queryDateRange(startDate,endDate,resId).then(data => {
                        if(data.success){
                            this.setOptionState(data.list)
                        }
                    });
                }
                this.setState({
                    rankResList:data.list
                })


            }
        })


    }


    setOptionState(list){
        let dates = [];
        let finalDatas = [];

        list.forEach(function (item,index) {
            dates.push(item.name);
            finalDatas.push(item.value)
        })
        this.setState({
            circleOption:{
                title: {
                    text: '历史趋势'
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
                    data:['']
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
                        data : dates
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {color:'#dfedff'}},
                        lineStyle:{
                            color:'#81B7FF'
                        },
                        itemStyle:{
                            color:'#81B7FF'
                        },
                        data:finalDatas
                    }
                ]
            }
        })
        var myCircleChart = echarts.init(document.getElementById("typeCircleStatics"));
        myCircleChart.setOption(this.state.circleOption);
    }

    componentWillMount() {
        const {groups,brands,types,resOptions} = this.props
        this.setState({
            groups:groups,
            brands:brands,
            types:types,
            resOptions:resOptions,
        })
    }
    componentDidMount() {
        this.serachResults();
    }
    render(){
        const {groups,brands,types,rankResList} = this.state
        const {cityData,resOptions} = this.props

        const sidebar = (<List style={{marginLeft:-15}}>
            <Picker
                cols={1}
                data={groups}
                value={this.state.sValue}
                onOk={(v) => this.setState({ sValue: v })}
                onChange={v => this.setState({ sValue: v })}
            >
                <List.Item arrow="horizontal">集团</List.Item>
            </Picker>
            <Picker
                cols={1}
                data={brands}
                value={this.state.bValue}
                onOk={(v) => this.setState({ bValue: v })}
                onChange={v => this.setState({ bValue: v })}
            >
                <List.Item arrow="horizontal">品牌</List.Item>
            </Picker>
            <Picker
                data={cityData}
                value={this.state.pickerValue}
                onChange={v => this.setState({ pickerValue: v })}
                onOk={v => this.setState({ pickerValue: v })}
            >
                <List.Item arrow="horizontal">区域</List.Item>
            </Picker>
            <Picker
                cols={1}
                data={types}
                value={this.state.tValue}
                onChange={v => this.setState({ tValue: v })}
                onOk={v => this.setState({ tValue: v })}>
                <List.Item arrow="horizontal">品类</List.Item>
            </Picker>
            <Picker
                cols={1}
                data={resOptions}
                value={this.state.resValue}
                onChange={v => this.setState({ resValue: v })}
                onOk={v => this.setState({ resValue: v })}>
                <List.Item arrow="horizontal">门店</List.Item>
            </Picker>
            <div style={{width:'100%',display:'block',display:'flex',flexDirection:'row'}}>
                <Button style={{flex:1}}>重置</Button>
                <Button style={{flex:1}} onClick={() => this.serachResults()} type="primary">提交</Button>
            </div>
        </List>);
        return <div style={{width:'100%'}}>
            <SearchComponent
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDock={() => this.onDock()}
                searchDisplay={this.state.searchDisplay}
                sidebar={sidebar}
                docked={this.state.docked}
                setStartDate={date => this.setState({ startDate:date })}
                setEndDate={date => this.setState({ endDate:date })}
            />
            <div id="typeStatics" style={{height:400,padding:15,backgroundColor: '#fff',marginTop:10,textAlign:'center' }}>
                {rankResList.length>0?null:'暂无数据'}
            </div>
            <div id="typeCircleStatics" style={{marginTop:10,marginBottom:100,height:300,padding:15,backgroundColor: '#fff',textAlign:'center' }}>
                {rankResList.length>0?null:'暂无数据'}

            </div>
        </div>
    }


}
export default StaticsType