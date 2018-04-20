/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace} from 'antd-mobile';
import styles,{GREY} from '../config/style'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';

class StaticsStore extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            option : {
                color: ['#3398DB'],
                title: {
                    text: '门店/分数',
                    subtext: '华东区域',
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            }
        };
      }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById("storeStatics"));
        myChart.setOption(this.state.option);
    }
    render(){
        return <div style={{width:'100%',textAlign:'center'}}>
                    <div style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>
                        <div style={{flex:1,padding:15}}>
                            <Picker data={[1,2]} cols={1}>
                                <div>区域</div>
                            </Picker>
                        </div>
                        <div style={{flex:1,padding:15}}>
                            <Picker data={[1,2]} cols={1}>
                                <div>门店</div>
                            </Picker>
                        </div>
                    </div>
                    <div id="storeStatics" style={{height:300,padding:15,backgroundColor: '#fff' }}></div>
        </div>
    }


}
export default StaticsStore