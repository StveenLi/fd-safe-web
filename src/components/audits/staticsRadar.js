/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import {NavBar,Icon,WhiteSpace} from 'antd-mobile'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/radar';
import {GREY} from '../config/style'

class StaticsRadar extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            option : {}
        };
      }

    componentWillMount() {
        let AList = this.props.ARadarDataList
        let BList = this.props.BRadarDataList
        console.log(AList,BList)
        let indicator = [];
        let dataA = [];
        let dataB = [];
        for(let item of AList){
            indicator.push({ text: item.name, max: 100 });
            dataA.push(parseInt(item.value));
        }
        for(let item of BList){
            dataB.push(parseInt(item.value));
        }
        console.log(indicator,dataA,dataB)
        this.setState({option:{
            title: {
                text: '各类目对比'
            },
            tooltip: {},
            legend: {
                data: ['A门店', 'B门店']
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: indicator
            },
            series: [{
                name: '两店对比',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : dataA,
                        name : 'A门店'
                    },
                    {
                        value : dataB,
                        name : 'B门店'
                    }
                ]
            }]
        }})
    }
    componentDidMount() {

        console.log(JSON.stringify(this.state.option))

        var dom = document.getElementById("radar");
        var myChart = echarts.init(dom);
        myChart.setOption(this.state.option);
    }

    render(){
        return <div style={{width:'100%',textAlign:'center'}}>
            <WhiteSpace/>
            <div id="radar" style={{height:350,backgroundColor:'#fff',padding:15}}></div>
            <WhiteSpace/>

            {/*<div style={{background:'#fff',display:'flex',flexDirection:'row',height:300,marginBottom:50}}>
                <div style={{flex:1,marginTop:30}}>
                    <span style={{backgroundColor:'#0cc1a3',padding:'5px 10px',color:'#fff'}}>A</span>  - -</div>
                <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,margin:'20px 0'}}></div>
                <div style={{flex:1,marginTop:30}}>
                    <span style={{backgroundColor:'#fec032',padding:'5px 10px',color:'#fff'}}>B</span>  - -</div>
            </div>*/}




        </div>
    }
}


export default StaticsRadar