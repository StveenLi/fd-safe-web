/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon,Picker, List,DatePicker} from 'antd-mobile';


class PlanPage extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };

    render(){


        return <div>
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核计划</NavBar></div>
            <div style={{flex:1,marginTop:5}}>


                <List>
                    <Picker>

                        <List.Item arrow="horizontal">选择报告类型</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="请选择日期"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">报告日期</List.Item>

                    </DatePicker>
                    <Picker>

                        <List.Item arrow="horizontal">选择状态</List.Item>
                    </Picker>
                </List>

                <List>

                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="请选择日期"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">审核提醒01</List.Item>

                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="请选择日期"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">审核提醒02</List.Item>

                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="请选择日期"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">审核提醒03</List.Item>

                    </DatePicker>

                </List>


            </div>



        </div>
    }

}

export default PlanPage