/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import {List,DatePicker,Icon,Drawer,Picker} from 'antd-mobile'
import {screenWidth,BLUE,FONTGREY} from '../config/style'
import SearchComponent from '../common/searchComponent'

class StaticsAll extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            startDate:'',
            endDate:'',
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
            }

        };
      }

    onOpenChange(...args){
        console.log(args);
        this.setState({ open: !this.state.open });
    }

    componentDidMount() {
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

    render(){
        const sidebar = (<List style={{marginLeft:-15}}>
            <Picker>
                <List.Item arrow="horizontal">集团</List.Item>
            </Picker>
            <Picker>
                <List.Item arrow="horizontal">品牌</List.Item>
            </Picker>
            <Picker>
                <List.Item arrow="horizontal">区域</List.Item>
            </Picker>
            <Picker>
                <List.Item arrow="horizontal">品类</List.Item>
            </Picker>
            <Picker>
                <List.Item arrow="horizontal">门店</List.Item>
            </Picker>
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
                            <div style={{fontSize:10,marginTop:5,padding:2}}>望湘园1(中山公园)</div>
                            <div style={{fontSize:10,marginTop:5,padding:2}}>望湘园13(中山公园)</div>
                            <div style={{fontSize:10,marginTop:5,padding:2}}>望湘园11213(中山公园)</div>
                            <div style={{fontSize:10,marginTop:5,padding:2}}>(中山公园)</div>
                            <div style={{fontSize:10,marginTop:5,padding:2}}>望湘园1213()</div>
                        </div>
                        <div style={{flex:1}}>
                            <div style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'90%',color:'#fff'}}>90</div>
                            <div style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'80%',color:'#fff'}}>80</div>
                            <div style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'70%',color:'#fff'}}>70</div>
                            <div style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'60%',color:'#fff'}}>60</div>
                            <div style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'50%',color:'#fff'}}>50</div>
                        </div>



                        {/*<div style={{display:'flex',flexDirection:'row'}}>
                            <div style={{padding:2,overflow:'hidden',textOverflow:'ellipsis',width:'40%'}}>望湘园(中山公园)</div>
                            <div style={{textAlign:'right',backgroundColor:BLUE,padding:2,marginLeft:10,width:'90%',color:'#fff'}}>1</div>
                        </div>*/}
                    </div>


                </div>
            </div>
            <div id="allStatics" style={{width:screenWidth,height:300,padding:15,backgroundColor: '#fff',marginTop:10 }}></div>
            <div style={{flex:1,textAlign:'right',padding:15,fontSize:16,marginBottom:50}}>统计门店数量 10</div>
        </div>

    }


}
export default StaticsAll

