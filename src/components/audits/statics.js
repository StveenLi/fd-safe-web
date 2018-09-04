/**
 * Created by lixin on 2018/4/16.
 */

import React from 'react'
import { NavBar,Icon,Tabs,Button,Toast} from 'antd-mobile';

import { StickyContainer, Sticky } from 'react-sticky';
import {GREY,BLUE} from '../config/style'
import StaticsAll from '../audits/staticsAll'
import StaticsType from '../audits/staticsType'
import StaticsCompare from '../audits/staticsCompare'
import StaticsRadar from '../audits/staticsRadar'
import {queryTrend,getReportOption} from '../config/api'

class StaticsPage extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            groups:[],
            brands:[],
            types:[],
            resOptions:[],
            bottomDisplay:'none',
            comparing:false,
            AResult:{},
            BResult:{},
            ARadarDataList:[],
            BRadarDataList:[],
            cityData:[],
            leimus:[]

        };
      }

    async componentWillMount() {
        await this.setAllOptions()
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    async toRadarPage(){
        const {AResult,BResult} = this.state
         if(AResult.resValue){
             await queryTrend('','',AResult.resValue).then(data => {
                if(data.success){
                    this.setState({ARadarDataList:data.list})
                }
            })
        }else{
            Toast.fail('还未选择A条件门店',1);
            return;
        }
        if(BResult.resValue){
            await queryTrend('','',BResult.resValue).then(data => {
                if(data.success){
                    this.setState({BRadarDataList:data.list})
                }
            })
        }else{
            Toast.fail('还未选择B条件门店',1);
            return;
        }

        this.setState({
            comparing:true
        })
    }

    toComparePage(){
        this.setState({
            comparing:false
        })
    }

    setAResult(AResult){
        this.setState({AResult:AResult});
    }

    setBResult(BResult){
        this.setState({BResult:BResult});
    }

    setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue){
        getReportOption(
            startDate,
            endDate,
            sValue,
            bValue,
            typeof(pickerValue) !== "undefined"?pickerValue[0]:'',
            typeof(pickerValue) !== "undefined"&&typeof(pickerValue[1]) !== "undefined"?pickerValue[1]:'',
            typeof(pickerValue) !== "undefined"&&typeof(pickerValue[2]) !== "undefined"?pickerValue[2]:'',
            typeValue,
            resValue,'','').then(data => {
            if(data.success){
                let brands = [{label:'不限',value:''}];
                let groups=[{label:'不限',value:''}];
                let types=[{label:'不限',value:''}];
                let resOptions=[{label:'不限',value:null}];
                let cityData=[{label:'不限',value:''}]
                let leimus=[{label:'不限',value:''}]
                for(let op of data.brands){
                    brands.push({label:op,value:op})
                }
                for(let op of data.groups){
                    groups.push({label:op,value:op})
                }
                for(let op of data.types){
                    types.push({label:op,value:op})
                }
                for(let op of data.rest){
                    resOptions.push({label:op.name,value:op.id})
                }
                for(let province in data.qy){
                    let cities = [{label:'不限',value:''}];
                    for(let city in data.qy[province].childs){
                        let countries = [{label:'不限',value:''}];
                        for(let country in data.qy[province].childs[city].childs){
                            countries.push({
                                label:data.qy[province].childs[city].childs[country].value,
                                value:data.qy[province].childs[city].childs[country].name,
                            })
                        }
                        cities.push({
                            label:data.qy[province].childs[city].value,
                            value:data.qy[province].childs[city].name,
                            children:countries
                        })
                    }
                    cityData.push({
                        label:data.qy[province].value,
                        value:data.qy[province].name,
                        children:cities
                    })
                }
                for(let op of data.leimu){
                    leimus.push({label:op.name,value:op.id})
                }


                this.setState({
                    brands:brands,
                    groups:groups,
                    types:types,
                    resOptions:resOptions,
                    cityData:cityData,
                    leimus:leimus
                })
            }
        })
    }
    render(){
        const tabs = [
            { title: '门店排名' },
            { title: '趋势分析' },
            { title: '数据对比' },
        ];

        const {groups,brands,types,resOptions,cityData,leimus} = this.state


        return <div>
            <div style={{borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >数据分析</NavBar>
            </div>
            <StickyContainer style={{marginTop:45}}>
                        <Tabs tabs={tabs}
                              initialPage={0}
                              onChange={(tab, index) => {this.setAllOptions() }}
                              onTabClick={(tab, index) => {index === 2?this.setState({bottomDisplay:''}):this.setState({bottomDisplay:'none'})}}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsAll leimus={leimus} setAllOptions={(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue) => this.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue)} cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsAll>
                                {/*
                                <StaticsCompare
                                    setBResult = {(BResult) => this.setBResult(BResult)}
                                    setAResult = {(AResult) => this.setAResult(AResult)} cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsCompare>
                                 */}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsType setAllOptions={(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue) => this.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue)} cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsType>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                {!this.state.comparing?<StaticsCompare
                                    setAllOptions={(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue) => this.setAllOptions(startDate,endDate,sValue,bValue,pickerValue,typeValue,resValue)}
                                    setBResult = {(BResult) => this.setBResult(BResult)}
                                    setAResult = {(AResult) => this.setAResult(AResult)}
                                    cityData={cityData}
                                    groups={groups}
                                    brands={brands}
                                    types={types}
                                    resOptions={resOptions}></StaticsCompare>:
                                <StaticsRadar ARadarDataList={this.state.ARadarDataList} BRadarDataList={this.state.BRadarDataList}></StaticsRadar>}
                            </div>
                        </Tabs>

                    </StickyContainer>

            <div style={{position:'fixed',bottom:0,width:'100%',display:this.state.bottomDisplay,flexDirection:'row',}}>
                {!this.state.comparing?
                <Button style={{flex:1,background:BLUE}} onClick={() => {this.toRadarPage()}}  type="primary">对比</Button>:
                <Button style={{flex:1,background:BLUE}} onClick={() => {this.toComparePage()}}  type="primary">返回</Button>}

            </div>
            {/*<div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toRadarPage()}>对比</Button>
            </div>*/}
        </div>
    }
}

export default StaticsPage
