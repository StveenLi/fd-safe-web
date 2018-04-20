/**
 * Created by lixin on 2018/4/12.
 */


import React from 'react'
import { NavBar,Icon,Picker, List,DatePicker} from 'antd-mobile';
import {BLUE} from '../config/style'



class StartAuditPage extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            date:''
        };
      }
    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };

    render(){
        const district = ['肇嘉浜路小南门','体育场上上签']
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
                            <div style={{flex:1,textAlign:'right'}}>王进</div>
                        </div>
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            extra="请选择日期"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                        >
                            <List.Item arrow="horizontal">审核日期</List.Item>
                        </DatePicker>
                        <Picker data={district}>

                            <List.Item arrow="horizontal">选择门店</List.Item>
                        </Picker>

                        <Picker data={district}>
                            <List.Item arrow="horizontal">审核类型</List.Item>
                        </Picker>
                        </List>
                    </div>
                    <div style={{fontSize:18,color:'#fff',padding: 15,textAlign:'center',backgroundColor:BLUE}}
                        onClick={() => this.props.history.push('/auditQuestions')}
                    >开始审核</div>


        </div>
    }
}
export default StartAuditPage