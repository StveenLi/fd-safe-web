/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon,Picker, List,DatePicker,Button,InputItem} from 'antd-mobile';
import styles,{BLUE,GREY} from '../config/style'

class Report extends React.Component{



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
            >报告查询</NavBar></div>
            <div style={{flex:1,marginTop:50}}>
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
                    <Picker>

                        <List.Item arrow="horizontal">选择区域</List.Item>
                    </Picker>
                    <InputItem
                        placeholder="请输入账户"
                        clear
                        onChange={(v) => { console.log('onChange', v); }}
                        onBlur={(v) => { console.log('onBlur', v); }}
                    >账户名称</InputItem>

                </List>
            </div>
            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.props.history.push('/reportDetail')}>提交</Button>
            </div>



        </div>
    }

}

export default Report