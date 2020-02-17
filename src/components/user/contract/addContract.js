/**
 * Created by lixin on 2018/4/9.
 */
import React, { Component } from 'react';
import {InputItem, Button, Toast, NavBar, Icon ,DatePicker,List} from 'antd-mobile';
import {screenHeight,GREY,ORANGE,BLUE} from '../../config/style'
import CountDown from 'react-codedown'
import {addContract,updateContract} from '../../config/api'
import Utils from '../../config/utils'

class AddContract extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            infoDate:'',
            contractName:'',
            date:'',
            isUpdate:false,
            contractItem:{}
        };
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };

    componentWillMount() {
        const {history} = this.props
        let that = this;
        if(history.location.state){
            let contractItem = history.location.state[0].contract
            that.setState({
                contractItem:contractItem,
                contractName:contractItem.name,
                date:new Date(contractItem.expirationDate),
                infoDate:new Date(contractItem.effectiveDate),
                isUpdate:true
            })
        }
    }

    addContract(){
        const {contractName,date,infoDate} = this.state
        addContract(contractName,date,infoDate).then((data) => {
            if(data.success){
                Toast.success('添加合同成功！', 1)
                this.props.history.goBack();
            }
        })
    }


    updateContract(){
        const {contractItem,contractName,date,infoDate} = this.state
        updateContract(contractItem.id,contractName,date,infoDate).then((data) => {
            if(data.success){
                Toast.success('修改合同成功！', 1)
                this.props.history.goBack();
            }
        })
    }


    nameOnChange = (value) => {
        this.setState({
            contractName:value
        })
    }


    render(){
        return <div style={{display:'flex',flexDirection:'column',background:"#F8F8FF",textAlign:'center',height:screenHeight}}>
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >新增合同</NavBar></div>
            <div style={{width:'100%',marginTop:55}}>

                <InputItem
                    clear
                    placeholder="请输入合同名称"
                    ref={el => this.inputRef = el}
                    onChange={this.nameOnChange}
                    value={this.state.contractName}
                >合同名称</InputItem>
                    <div style={{border:'0.5px solid #e2e2e2',margin:'0 8px'}}></div>
                <DatePicker
                    mode="date"

                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                >
                    <List.Item arrow="horizontal">到期时间</List.Item>
                </DatePicker>

                <div style={{border:'0.5px solid #e2e2e2',margin:'0 8px'}}></div>

                <DatePicker
                    mode="date"

                    value={this.state.infoDate}
                    onChange={date => this.setState({ infoDate:date })}
                >
                    <List.Item arrow="horizontal">设置提醒时间</List.Item>
                </DatePicker>
            </div>




            <div style={{marginTop:30}}>
                {this.state.isUpdate?<Button onClick={() => this.updateContract()} type="primary" style={{margin:'15px 30px',backgroundColor:BLUE}}
                >修改</Button>:<Button onClick={() => this.addContract()} type="primary" style={{margin:'15px 30px',backgroundColor:BLUE}}
                >添加</Button>}

            </div>


        </div>
    }
}
export default AddContract