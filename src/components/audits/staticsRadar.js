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
            option : {},
            goodsForA:[],
            goodsForB:[],
        };
      }

    componentWillMount() {
        let AList = this.props.ARadarDataList
        let BList = this.props.BRadarDataList
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
        
        for(let i = 0;i<AList.length;i++){
            if(AList[i].value!=BList[i].value){
                if(AList[i].value>BList[i].value){
                    this.state.goodsForA.push(AList[i].name);
                }else{
                    this.state.goodsForB.push(AList[i].name);
                }
            }
        }
        
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
                        borderRadius: 3,
                        fontSize:10
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
                        name : 'A门店',
                        lineStyle:{
                            color:'#0cc1a3'
                        },
                        itemStyle:{
                            color:'#0cc1a3'
                        },
                        areaStyle:{
                            color:'#cef3ed'
                        }
                    },
                    {
                        value : dataB,
                        name : 'B门店',
                        lineStyle:{
                            color:'#fec032'
                        },
                        itemStyle:{
                            color:'#fec032'
                        },
                        areaStyle:{
                            color:'#fff2d6'
                        }
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

            <div style={{background:'#fff',display:'flex',flexDirection:'row',height:300,marginBottom:50}}>
                <div style={{flex:1,marginTop:30}}>
                    <div style={{marginBottom:15}}><span style={{backgroundColor:'#0cc1a3',padding:'5px 10px',color:'#fff'}}>A</span>  - -</div>
                    {
                        this.state.goodsForA.map((good,index) => {
                            return <div key={index} style={{padding:5,color:'#0cc1a3'}}>{good}</div>
                        })
                    }
                    
                </div>
                <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,margin:'20px 0'}}></div>
                <div style={{flex:1,marginTop:30}}>
                    <div style={{marginBottom:15}}><span style={{backgroundColor:'#fec032',padding:'5px 10px',color:'#fff'}}>B</span>  - -</div>
                    {
                        this.state.goodsForB.map((good,index) => {
                            return <div key={index} style={{padding:5,color:'#fec032'}}>{good}</div>
                        })
                    }
                </div>
            </div>




        </div>
    }
}


export default StaticsRadar