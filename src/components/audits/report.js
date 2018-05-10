/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon,Picker, List,DatePicker,Button,InputItem} from 'antd-mobile';
import styles,{BLUE,GREY} from '../config/style'
import {RadioGroup, Radio} from 'react-radio-group';
import {getGroupName} from '../config/api'

class Report extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedValue:0,
            groups:[],
            sValue:''
        };
      }
    back = e => {
        const {history} = this.props
        history.goBack();
    };

    handleChange(value) {
        this.setState({selectedValue: value});
    }

    componentDidMount() {
        getGroupName().then(data => {
            if(data.success){
                for(let op of data.list){
                    this.state.groups.push({label:op.name,value:op.id})
                }
            }
        })
    }

    render(){
        
        const {groups} = this.state
        return <div>
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >报告查询</NavBar></div>
            <div style={{flex:1,marginTop:50,marginBottom:100}}>
                <List>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <List.Item>日期</List.Item>
                        <DatePicker
                        mode="date"
                        extra='2017-01-01'
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                        >
                                <List.Item style={{flex:1}}>
                                </List.Item>
                        </DatePicker>
                        <List.Item>-</List.Item>
                        <DatePicker
                            mode="date"
                            extra='2018-01-01'
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                            style={{flex:1}}
                        >
                            <List.Item style={{flex:1}}>
                            </List.Item>
                        </DatePicker>
                    </div>
                    <Picker
                        cols={1}
                        data={groups}
                        value={this.state.sValue}
                        onOk={(v) => this.selectResTrue(v)}
                        onChange={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal">集团</List.Item>
                    </Picker>
                    <Picker>
                        <List.Item arrow="horizontal">品牌</List.Item>
                    </Picker>
                    <Picker>
                        <List.Item arrow="horizontal">区域</List.Item>
                    </Picker>
                    <List.Item
                        extra={
                        <RadioGroup
                        name="fruit"
                        selectedValue={this.state.selectedValue}
                        onChange={() => this.handleChange()}>
                        <label>
                            <Radio value="apple" />直营
                        </label>
                        <label style={{marginLeft:10}}>
                            <Radio value="orange" />加盟
                        </label>
                    </RadioGroup>}>模式</List.Item>
                    <Picker>
                        <List.Item arrow="horizontal">品类</List.Item>
                    </Picker>
                    <List.Item
                        extra={
                        <RadioGroup
                        name="fruit"
                        selectedValue={this.state.selectedValue}
                        onChange={() => this.handleChange()}>
                        <label>
                            <Radio value="apple" />内审
                        </label>
                        <label style={{marginLeft:10}}>
                            <Radio value="orange" />外审
                        </label>
                    </RadioGroup>}>审核类型</List.Item>
                    <Picker>
                        <List.Item arrow="horizontal">门店</List.Item>
                    </Picker>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <List.Item>审核分数</List.Item>
                        <InputItem type="number" placeholder="0" style={{width:50}}></InputItem>
                        <List.Item>-</List.Item>

                        <InputItem type="number" placeholder="100" style={{width:50}}></InputItem>
                    </div>

                </List>
            </div>
            <div style={{position:'fixed',bottom:0,width:'100%',display:'block',display:'flex',flexDirection:'row'}}>
                <Button style={{flex:1}} onClick={() => this.props.history.push('/reportDetail')}>重置</Button>

                <Button style={{flex:1}} type="primary" onClick={() => this.props.history.push('/reportList')}>提交</Button>
            </div>



        </div>
    }

}

export default Report