/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import {List,DatePicker,Icon,Drawer,Picker} from 'antd-mobile'
import SearchComponent from '../common/searchComponent'
import {BLUE} from '../config/style'
class StaticsType extends React.Component{



    // 构造
      constructor(props) {
          super(props);
          // 初始状态
          this.state = {
              startDate: '',
              endDate: '',
              open: false,
              docked: false,
              searchDisplay: 'none',
              option: {

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
                          indicator: [
                              { text: '虫害控制与废弃物管理', max: 150 },
                              { text: '食品接收', max: 150 },
                              { text: '用餐区域卫生', max: 150 },
                              { text: '食品加工与服务', max: 120 },
                              { text: '个人卫生', max: 108 },
                              { text: '服务', max: 72 }
                          ],
                          center: ['50%', '50%'],
                          radius: 120
                      }
                  ],
                  series: [
                      {
                          name: '成绩单',
                          type: 'radar',
                          radarIndex: 1,
                          data: [
                              {
                                  value: [120, 118, 130, 100, 99, 70],
                                  name: '张三',
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
                          lineStyle:{
                              color:BLUE
                          },
                          itemStyle:{
                              color:BLUE
                          }
                      }
                  ]
              },
              circleOption:{
                  title: {
                      text: '总体平均分趋势'
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
          }
      }
    onDock (d){
        this.state.searchDisplay == 'none'? this.setState({searchDisplay:''}):this.setState({searchDisplay:'none'})
        this.setState({
            docked:!this.state.docked
        });
    }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById("typeStatics"));
        var myCircleChart = echarts.init(document.getElementById("typeCircleStatics"));
        myChart.setOption(this.state.option);
        myCircleChart.setOption(this.state.circleOption);
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
            <div id="typeStatics" style={{height:400,padding:15,backgroundColor: '#fff',marginTop:10 }}>
            </div>
            <div id="typeCircleStatics" style={{marginTop:10,marginBottom:100,height:300,padding:15,backgroundColor: '#fff' }}></div>
        </div>
    }


}
export default StaticsType