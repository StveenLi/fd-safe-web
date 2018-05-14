/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon,Picker, List,DatePicker,Button,InputItem,Toast} from 'antd-mobile';
import styles,{BLUE,GREY} from '../config/style'
import {RadioGroup, Radio} from 'react-radio-group';
import {getGroupName,getBrandName,queryCity,queryPlanType,queryTypes,getResByUserId,queryAssessHis} from '../config/api'
import cityData from '../config/cityData'
class Report extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedValue:0,
            groups:[],
            brands:[],
            types:[],
            sValue:'',
            bValue:'',
            typeValue:'',
            areas:[],
            pickerValue:'',
            resOptions:[],
            resValue:'',
            startDate:'',
            endDate:'',
            startNums:'',
            endNums:'',
            selectedAuditValue:'',
            transmitParam:{},
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

    componentWillMount() {

    }

    //获取城市JSON
    getP_C_County(){
        queryCity('').then(data => {
            let province = [];
            if(data.success){
                for(let area of data.list){
                    let cities = [];

                    queryCity(area.id).then(data => {
                        for(let area of data.list){
                            let counties = [];
                            queryCity(area.id).then(data => {
                                for(let area of data.list){
                                    counties.push({
                                        label:area.name,
                                        value:area.id,
                                    })
                                }
                                cities.push({
                                    label:area.name,
                                    value:area.id,
                                    children:counties
                                })
                                //console.log(JSON.stringify(province))
                            })
                        }
                        province.push({
                            label:area.name,
                            value:area.id,
                            children:cities
                        })

                    });
                }
            }
        })
    }


    serachReport(){
        const {startDate,endDate,sValue,bValue,pickerValue,selectedValue,tValue,resValue,startNums,endNums} = this.state

        queryAssessHis(
            startDate,endDate,sValue,bValue,pickerValue[0],pickerValue[1],pickerValue[2],selectedValue,tValue,resValue,startNums,endNums
        ).then(data => {
            console.log(data)
            if(data.success){
                this.props.history.push('/reportList',[{transmitParam:data.list}])
            }
        })

    }

    render(){
        
        const {groups,brands,types,resOptions} = this.state
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
                        value={this.state.startDate}
                        onChange={date => this.setState({startDate: date })}
                        >
                                <List.Item style={{flex:1}}>
                                </List.Item>
                        </DatePicker>
                        <List.Item>-</List.Item>
                        <DatePicker
                            mode="date"
                            extra='2018-01-01'
                            value={this.state.endDate}
                            onChange={date => this.setState({endDate: date })}
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
                        onOk={(v) => this.setState({ sValue: v })}
                        onChange={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal">集团</List.Item>
                    </Picker>
                    <Picker
                        cols={1}
                        data={brands}
                        value={this.state.bValue}
                        onOk={(v) => this.setState({ bValue: v })}
                        onChange={v => this.setState({ bValue: v })}
                    >
                        <List.Item arrow="horizontal">品牌</List.Item>
                    </Picker>
                    <Picker
                        data={cityData}
                        value={this.state.pickerValue}
                        onChange={v => this.setState({ pickerValue: v })}
                        onOk={v => this.setState({ pickerValue: v })}
                    >
                        <List.Item arrow="horizontal">区域</List.Item>
                    </Picker>
                    <List.Item
                        extra={
                        <RadioGroup
                        name="fruit"
                        selectedValue={this.state.selectedValue}
                        onChange={() => this.handleChange()}>
                            <label>
                                <Radio value="0" />直营
                            </label>
                            <label style={{marginLeft:10}}>
                                <Radio value="1" />加盟
                            </label>
                        </RadioGroup>}>
                    模式</List.Item>
                    <Picker
                        cols={1}
                        data={types}
                        value={this.state.tValue}
                        onChange={v => this.setState({ tValue: v })}
                        onOk={v => this.setState({ tValue: v })}
                    >
                        <List.Item arrow="horizontal">品类</List.Item>
                    </Picker>
                    <List.Item
                        extra={
                        <RadioGroup
                        name="audit"
                        selectedValue={this.state.selectedAuditValue}
                        onChange={(val) => this.setState({selectedAuditValue: val})}>
                        <label>
                            <Radio value="0" />内审
                        </label>
                        <label style={{marginLeft:10}}>
                            <Radio value="1" />外审
                        </label>
                    </RadioGroup>}>审核类型</List.Item>
                    <Picker
                        cols={1}
                        data={resOptions}
                        value={this.state.resValue}
                        onChange={v => this.setState({ resValue: v })}
                        onOk={v => this.setState({ resValue: v })}
                    >

                        <List.Item arrow="horizontal">门店</List.Item>
                    </Picker>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <List.Item>审核分数</List.Item>
                        <InputItem type="number" placeholder="0" onChange={val => this.setState({startNums:val})} style={{width:50}}></InputItem>
                        <List.Item>-</List.Item>

                        <InputItem type="number" placeholder="100" onChange={val => this.setState({endNums:val})} style={{width:50}}></InputItem>
                    </div>

                </List>
            </div>
            <div style={{position:'fixed',bottom:0,width:'100%',display:'block',display:'flex',flexDirection:'row'}}>
                <Button style={{flex:1}} onClick={() => this.props.history.push('/reportDetail')}>重置</Button>

                <Button style={{flex:1}} type="primary" onClick={() => this.serachReport()}>提交</Button>
            </div>



        </div>
    }

}

export default Report