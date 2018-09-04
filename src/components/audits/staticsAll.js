/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import {List,DatePicker,Icon,Picker,Button,Toast,InputItem} from 'antd-mobile'
import styles,{screenWidth,BLUE,FONTGREY} from '../config/style'
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

            },
            startDate:'',
            endDate:new Date(),
            resValue:'',
            sValue:'',
            bValue:'',
            tValue:'',
            leimuValue:'',
            pickerValue:{},
            groups:[],
            brands:[],
            types:[],
            resOptions:[],
            rankResList:[],
            fiveController:true,
            staticsLineColor:'#81B7FF',

        };
      }

    onOpenChange(...args){
        this.setState({ open: !this.state.open });
    }

    componentWillMount() {
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth()-3);
        this.setState({startDate:startDate})
    }



    componentDidMount() {
        const {groups,brands,types,resOptions} = this.props
        this.setState({
            groups:groups,
            brands:brands,
            types:types,
            resOptions:resOptions,
        })
        this.serachResults(1);
    }

    onDock (d){
        this.state.searchDisplay == 'none'? this.setState({searchDisplay:''}):this.setState({searchDisplay:'none'})
        this.setState({
            docked:!this.state.docked
        });
    }

    async queryReport_groups(v){
        await this.setState({ sValue: v });
        const {startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue} = this.state

        this.props.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue);
    }

    async queryReport_brands(v){
        await this.setState({ bValue: v });
        const {startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue} = this.state

        this.props.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue);
    }
    async queryReport_types(v){
        await this.setState({ tValue: v });
        const {startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue} = this.state

        this.props.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue);
    }
    async queryReport_resOptions(v){
        await this.setState({ resValue: v });
        const {startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue} = this.state

        this.props._bindSearchRest(startDate,endDate,sValue,bValue,pickerValue,typeValue,v);
    }
    async queryReport_P_C_C(v){
        await this.setState({ pickerValue: v });
        const {startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue} = this.state
        this.props.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue);
    }
    async queryReport_leimus(v){
        await this.setState({ leimuValue: v });
        const {startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue} = this.state
        this.props.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue);
    }


    serachResults(ascs){
        const {startDate,endDate,sValue,bValue,tValue,pickerValue,resValue,leimuValue} = this.state
        let proviceId = '';
        let cityId = '';
        let countyId = '';
        if(pickerValue instanceof Array){
            proviceId = pickerValue[0];
            cityId = pickerValue[1];
            countyId = pickerValue[2];
        }
        queryUnitRank(
            startDate.format('yyyy-MM-dd'),endDate.format('yyyy-MM-dd'),sValue,bValue,proviceId,cityId,countyId,0,tValue,ascs,resValue,leimuValue
        ).then(data => {
            if(data.success){
                    this.queryDateRange(data.list[0])
                this.setState({
                    rankResList:data.list
                })
            }
        })
    }

    queryDateRange(item){
        const {startDate,endDate,leimuValue} = this.state
        if(item){
            queryDateRange(startDate.format('yyyy-MM-dd'),endDate.format('yyyy-MM-dd'),item.id,leimuValue).then(data => {
                if(data.success){
                    this.setOptionState(data.list)
                }
            });
        }

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
                    text: '历史趋势'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: dates
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    lineStyle:{
                        color:this.state.staticsLineColor
                    },
                    itemStyle:{
                        color:this.state.staticsLineColor
                    },
                    data:finalDatas,
                    type: 'line',
                    areaStyle: {normal: {color:this.state.staticsLineColor == '#81B7FF'?'#dfedff':'#ffeeee'}},
                }],

            }
        })
        var dom = document.getElementById("allStatics");
        var myChart = echarts.init(dom);
        myChart.setOption(this.state.option);
    }


    beforeFiveClick(){
        this.setState({
            fiveController:true,
            staticsLineColor:'#81B7FF'
        })
        this.serachResults(1)
    }

    afterFiveClick(){
        this.setState({
            fiveController:false,
            staticsLineColor:'#ff5b5b'

        })
        this.serachResults(0)
    }


    render(){
        const {startDate,endDate,rankResList,fiveController,staticsLineColor} = this.state
        const {groups,brands,types,resOptions,cityData,leimus} = this.props
        const sidebar = (<List style={{marginLeft:-15}}>
            <Picker
                cols={1}
                data={groups}
                value={this.state.sValue}
                onChange={v => this.queryReport_groups(v)}
                onOk={v => this.queryReport_groups(v)}
            >
                <List.Item arrow="horizontal">集团</List.Item>
            </Picker>
            <Picker
                cols={1}
                data={brands}
                value={this.state.bValue}
                onChange={v => this.queryReport_brands(v)}
                onOk={v => this.queryReport_brands(v)}
            >
                <List.Item arrow="horizontal">品牌</List.Item>
            </Picker>
            <Picker
                data={cityData}
                value={this.state.pickerValue}
                onChange={v => this.queryReport_P_C_C(v)}
                onOk={v => this.queryReport_P_C_C(v)}
            >
                <List.Item arrow="horizontal">区域</List.Item>
            </Picker>
            <Picker
                cols={1}
                data={types}
                value={this.state.tValue}
                onChange={v => this.queryReport_types(v)}
                onOk={v => this.queryReport_types(v)}>
                <List.Item arrow="horizontal">品类</List.Item>
            </Picker>
            <Picker
                cols={1}
                data={leimus}
                value={this.state.leimuValue}
                onChange={v => this.queryReport_leimus(v)}
                onOk={v => this.queryReport_leimus(v)}
            >
                <List.Item arrow="horizontal">类目</List.Item>
            </Picker>
            <Picker
                title={<InputItem style={{margin:5,height:30}} placeholder="输入要搜索的门店名" onChange={(v)=>this.props._bindSearchRest(startDate,endDate,v)} ></InputItem>}
                cols={1}
                data={resOptions}
                value={this.state.resValue}
                onChange={v => this.queryReport_resOptions(v)}
                onOk={v => this.queryReport_resOptions(v)}>
                <List.Item arrow="horizontal">门店</List.Item>
            </Picker>
            <div style={{width:'100%',display:'block',display:'flex',flexDirection:'row'}}>
                <Button style={{flex:1}}>重置</Button>
                <Button style={{flex:1}} onClick={() => this.serachResults(1)} type="primary">提交</Button>
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
                panelHeight={310}
            />
            <div style={{padding:15,background:'#fff',marginTop:10}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{fontSize:16,padding:5}}>门店</div>
                    <div style={{flex:1,display:'flex',flexDirection:'row',marginTop:5}}>
                        <div
                            onClick={() => this.beforeFiveClick()}

                            style={fiveController?styles.five_rank:styles.five_rank_left_grey}>前五名</div>
                        <div
                            onClick={() => this.afterFiveClick()}
                            style={fiveController?styles.five_rank_back:styles.five_rank_back_right_blue}>后五名</div>
                    </div>
                    <div
                        onClick={() => this.afterFiveClick()}
                        style={{fontSize:16,padding:5}}>得分</div>
                </div>
                <div style={{marginTop:10}}>
                    {

                        rankResList.length>0?<div style={{marginTop:5,display:'flex'}}>
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
                                        return <div onClick={() => this.queryDateRange(item)} style={{fontSize:10,marginTop:5,textAlign:'right',backgroundColor:staticsLineColor,padding:2,marginLeft:10,width:`${item.value}%`,color:'#fff'}}>{item.value}</div>

                                    })
                                }
                            </div>
                        </div>:<div style={{textAlign:'center'}}>暂无数据</div>
                    }

                </div>
            </div>
            <div style={{flex:1,textAlign:'right',padding:15,fontSize:16,marginBottom:10}}>统计门店数量 {this.state.rankResList.length}</div>

            <div id="allStatics" style={{width:screenWidth,height:300,backgroundColor: '#fff',marginTop:10,textAlign:'center' }}>

                {rankResList.length>0?null:'暂无数据'}
            </div>
        </div>

    }


}
export default StaticsAll

