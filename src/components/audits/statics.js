/**
 * Created by lixin on 2018/4/16.
 */

import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace,Button,Toast} from 'antd-mobile';

import { StickyContainer, Sticky } from 'react-sticky';
import styles,{GREY,BLUE} from '../config/style'
import StaticsAll from '../audits/staticsAll'
import StaticsType from '../audits/staticsType'
import StaticsStore from '../audits/staticsStore'
import StaticsCompare from '../audits/staticsCompare'
import StaticsRadar from '../audits/staticsRadar'
import cityData from '../config/cityData'
import {getGroupName,getBrandName,queryTypes,getResByUserId,queryTrend} from '../config/api'

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
            BRadarDataList:[]
        };
      }

    componentDidMount() {
        getGroupName().then(data => {
            if(data.success){
                for(let op of data.list){
                    this.state.groups.push({label:op.name,value:op.name})
                }
            }
        })
        getBrandName().then(data => {
            if(data.success){
                for(let op of data.list){
                    this.state.brands.push({label:op.name,value:op.name})
                }
            }
        })
        queryTypes().then(data => {
            if(data.success){
                for(let op of data.list){
                    this.state.types.push({label:op.name,value:op.name})
                }
            }
        })
        getResByUserId().then(data => {
            if(data.success){
                let arr = [];
                for(let op of data.list){
                    arr.push({label:op.name,value:op.id});
                }
                this.setState({
                    resOptions:arr
                })
            }else{
                Toast.fail(data.msg, 1);
            }
        })
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

    toRadarPage(){
        const {AResult,BResult} = this.state
        if(AResult.resValue){
            queryTrend('','',AResult.resValue).then(data => {
                if(data.success){
                    this.setState({ARadarDataList:data.list})
                }
            })
        }else{
            Toast.fail('还未选择A条件门店',1);
            return;
        }
        if(BResult.resValue){
            queryTrend('','',BResult.resValue).then(data => {
                if(data.success){
                    this.setState({BRadarDataList:data.list})
                }
            })
        }else{
            Toast.fail('还未选择B条件门店',1);
            return;
        }

        if(this.state.ARadarDataList.length>0&&this.state.BRadarDataList.length>0){
            this.setState({
                comparing:true
            })
        }
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
    render(){
        const tabs = [
            { title: '门店排名' },
            { title: '趋势分析' },
            { title: '数据对比' },
        ];

        const {groups,brands,types,resOptions} = this.state


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
                              onChange={(tab, index) => { console.log('onChange', index, tab); }}
                              onTabClick={(tab, index) => {index == 2?this.setState({bottomDisplay:''}):this.setState({bottomDisplay:'none'})}}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsAll cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsAll>
                                {/*
                                <StaticsCompare
                                    setBResult = {(BResult) => this.setBResult(BResult)}
                                    setAResult = {(AResult) => this.setAResult(AResult)} cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsCompare>
                                 */}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsType cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsType>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                {!this.state.comparing?<StaticsCompare
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
