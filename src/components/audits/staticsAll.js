/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import {List,DatePicker,Icon,Drawer,Picker,Button,Toast} from 'antd-mobile'
import {screenWidth,BLUE,FONTGREY} from '../config/style'
import SearchComponent from '../common/searchComponent'
import {queryAssessHis,queryUnitRank,queryDateRange} from '../config/api'

class StaticsAll extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            open: false,
            docked: false,
            searchDisplay:'none',
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
            },
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
            rankResList:[]
        };
      }

    onOpenChange(...args){
        this.setState({ open: !this.state.open });
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
        var dom = document.getElementById("allStatics");
        var myChart = echarts.init(dom);
        myChart.setOption(this.state.option);
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
                this.setState({
                    rankResList:data.list
                })
            }
        })
    }

    queryDateRange(item){
        const {startDate,endDate} = this.state

        queryDateRange(startDate,endDate,item.id).then(data => {
            if(data.success){
                this.setOptionState(data.list)
            }
        });
    }


    setOptionState(list){
        let dates = [];
        let finalDatas = [];

        list.forEach(function (item,index) {
            dates.push(item.name);
            finalDatas.push(item.value)
        })
        this.setState({
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
                        data:finalDatas
                    }
                ]
            }
        })
        var dom = document.getElementById("allStatics");
        var myChart = echarts.init(dom);
        myChart.setOption(this.state.option);
    }




    render(){
        const {groups,brands,types,resOptions,rankResList} = this.state
        const {cityData} = this.props
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
        return <div>
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
            <div style={{padding:15,background:'#fff',marginTop:10}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{fontSize:16,padding:5}}>门店</div>
                    <div style={{flex:1,display:'flex',flexDirection:'row',marginTop:5}}>
                        <div style={{textAlign:'center',fontSize:10,borderStyle:'solid',borderWidth:'1px 0px 1px 1px',borderColor:BLUE,color:BLUE,borderBottomLeftRadius:'50%',borderTopLeftRadius:'50%',padding:'0px 3px 0px 5px',lineHeight:'18px',height:20}}>前五名</div>
                        <div style={{textAlign:'center',fontSize:10,borderStyle:'solid',borderWidth:'1px 1px 1px 0px',borderColor:BLUE,color:FONTGREY,borderBottomRightRadius:'50%',borderTopRightRadius:'50%',padding:'0px 5px 0px 3px',lineHeight:'18px',height:20}}>后五名</div>
                    </div>
                    <div style={{fontSize:16,padding:5}}>得分</div>
                </div>
                <div style={{marginTop:10}}>
                    <div style={{marginTop:5,display:'flex'}}>
                        <div>
                            {
                                rankResList.map((item,index) => {
                                    return <div key={index} style={{fontSize:10,marginTop:5,padding:2}}>{item.name}</div>
                                })
                            }
                        </div>
                        <div style={{flex:1}}>
                            {
                                rankResList.map((item,index) => {
                                    return <div onClick={() => this.queryDateRange(item)} style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'90%',color:'#fff'}}>{item.value}</div>

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="allStatics" style={{width:screenWidth,height:300,padding:15,backgroundColor: '#fff',marginTop:10 }}></div>
            <div style={{flex:1,textAlign:'right',padding:15,fontSize:16,marginBottom:50}}>统计门店数量 {this.state.rankResList.length}</div>
        </div>

    }


}
export default StaticsAll

