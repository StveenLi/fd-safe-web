/**
 * Created by lixin on 2018/4/12.
 */


import React from 'react'
import { NavBar,Icon,Picker, List,DatePicker,Toast,InputItem} from 'antd-mobile';
import {BLUE} from '../config/style'
import {getResByUserId,getAuditsType,user,queryPlan} from '../config/api'


class StartAuditPage extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            date:new Date(),
            resOptions:[],
            typeDisable:true,
            typeOptions:[],
            sValue:'',
            transmitParam:{},
            tValue:''
        };
      }
    back = e => {
        const {history} = this.props
        history.push('/audits');
    };

    componentDidMount() {
        this.getCanTingList('');
    }


    getCanTingList(name){
        getResByUserId(name).then(data => {
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

    //根据该饭店审核类型
    getAuditsType(resId){
        getAuditsType(resId).then(data => {
            if(data.success){
                for(let op of data.list){
                    this.state.typeOptions.push({label:op.name,value:op.value})
                }
            }else{
                Toast.fail(data.msg, 1);
            }
        })
    }

    selectResTrue(v){
        this.setState({sValue: v,typeDisable:false,typeOptions:[],tValue:''})
        this.getAuditsType(v)
    }

    //TO审核类目
    toAuditQuestions(){
        const {transmitParam,sValue,tValue} = this.state
        if(sValue == '') {Toast.fail('请选择门店', 1); return;}
        if(tValue == '') {Toast.fail('请选择门店', 1); return;}
        queryPlan(tValue[0],sValue[0]).then(data => {

            if(data.success){
                transmitParam.resId = sValue;
                transmitParam.typeId = tValue;
                transmitParam.planId = data.one.id;
                localStorage.setItem('auditLocation','1');
                this.props.history.push('/auditQuestions',[{transmitParam:transmitParam}]);
            }else{
                Toast.fail(data.msg, 1); return;
            }
        })
    }

    _bindSearchRest(v){
        this.getCanTingList(v);
    }

    render(){
        const {resOptions,typeOptions,typeDisable} = this.state
         //resOptions = [{label:'设法路上的风景里',value:'1'}]

        return <div style={{display:'flex',flexDirection:'column',position:'fixed',height:'100%',width:'100%',fontSize:17}}>

                    <div><NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.back()}
                    >审核</NavBar></div>
                    <div style={{flex:1,marginTop:50}}>
                        <List>
                        <div style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',padding:15,borderBottomColor:'#eaeefe',borderBottomWidth:1,borderBottomStyle:'solid'}}>
                            <div style={{textAlign:'left'}}>审核员</div>
                            <div style={{flex:1,textAlign:'right'}}>{user.name}</div>
                        </div>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            extra="请选择日期"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                            disabled={true}
                        >
                            <List.Item>审核日期</List.Item>
                        </DatePicker>
                        <Picker
                            cols={1}
                            title={<InputItem style={{margin:5,height:30}} placeholder="输入要搜索的门店名" onChange={(v)=>this._bindSearchRest(v)} ></InputItem>}
                                data={resOptions}
                            value={this.state.sValue}
                            onOk={(v) => this.selectResTrue(v)}
                            onChange={v => this.setState({ sValue: v })}
                        >
                            <List.Item arrow="horizontal">选择门店</List.Item>
                        </Picker>

                        <Picker
                            cols={1}
                            disabled={typeDisable}
                            data={typeOptions}
                            value={this.state.tValue}
                            onOk={(v) => this.setState({ tValue: v })}
                            onChange={v => this.setState({ tValue: v })}
                        >
                            <List.Item arrow="horizontal">审核类型</List.Item>
                        </Picker>
                        </List>
                    </div>
                    <div style={{fontSize:18,color:'#fff',padding: 15,textAlign:'center',backgroundColor:BLUE}}
                        onClick={() => this.toAuditQuestions()}
                    >开始审核</div>


        </div>
    }
}
export default StartAuditPage