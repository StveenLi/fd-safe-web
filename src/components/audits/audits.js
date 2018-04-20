/**
 * Created by lixin on 2018/4/10.
 */


import React from 'react'
import { NavBar,Icon} from 'antd-mobile';
import {BLUE} from '../config/style'
class AuditPage extends React.Component{
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

    componentWillMount() {
        console.log(this.props.history)
    }

    toStartAuditPage(){

    }
    render(){
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核</NavBar>

            <div
                onClick={()=>this.props.history.push('/startAudit')}
                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:55,padding:15,color:BLUE}}>
                <div><Icon key="0" type="search"/></div>
                <div style={{flex:1,textAlign:'left',marginLeft:10,marginTop:2}}>开始审核</div>
                <div> ></div>
            </div>
            <div
                onClick={()=>this.props.history.push('/report')}

                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:10,padding:15,color:BLUE}}>
                <div><Icon key="0" type="search"/></div>
                <div style={{flex:1,textAlign:'left',marginLeft:10,marginTop:2}}>报告查询</div>
                <div> ></div>
            </div>
            <div
                onClick={()=>this.props.history.push('/auditsStatics')}
                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:10,padding:15,color:BLUE}}>
                <div><Icon key="0" type="search"/></div>
                <div style={{flex:1,textAlign:'left',marginLeft:10,marginTop:2}}>数据分析</div>
                <div> ></div>
            </div>
            <div
                onClick={()=>this.props.history.push('/auditsPlan')}
                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:10,padding:15,color:BLUE}}>
                <div><Icon key="0" type="search"/></div>
                <div style={{flex:1,textAlign:'left',marginLeft:10,marginTop:2}}>审核计划</div>
                <div> ></div>
            </div>

        </div>
    }
}

export default AuditPage
