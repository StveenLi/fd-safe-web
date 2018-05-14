/**
 * Created by lixin on 2018/4/16.
 */

import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace,Button,Toast} from 'antd-mobile';

import { StickyContainer, Sticky } from 'react-sticky';
import styles,{GREY} from '../config/style'
import StaticsAll from '../audits/staticsAll'
import StaticsType from '../audits/staticsType'
import StaticsStore from '../audits/staticsStore'
import StaticsCompare from '../audits/staticsCompare'
import cityData from '../config/cityData'
import {getGroupName,getBrandName,queryTypes,getResByUserId} from '../config/api'

class StaticsPage extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            groups:[],
            brands:[],
            types:[],
            resOptions:[]
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

        console.log(history)
        history.goBack();
    };
    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    toRadarPage(){
        this.props.history.push('/radar')
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
                              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsAll cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsAll>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsType cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsType>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsCompare cityData={cityData} groups={groups} brands={brands} types={types} resOptions={resOptions}></StaticsCompare>
                            </div>
                        </Tabs>

                    </StickyContainer>
            {/*<div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toRadarPage()}>对比</Button>
            </div>*/}
        </div>
    }
}

export default StaticsPage
