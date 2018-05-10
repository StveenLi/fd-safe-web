/**
 * Created by lixin on 2018/4/10.
 */


import React from 'react'
import { NavBar,Icon,List} from 'antd-mobile';
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
        this.props.history.push('/startAudit',[{name:'sdf',query:
        'haha'}]);
    }
    render(){
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核</NavBar>
            <div
                onClick={()=> this.toStartAuditPage()}
                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:55,padding:'0 15px'}}>
                <div><img style={{width:120,height:120}} src={require('../assets/icon/audit_start.png')}></img></div>
                <div style={{flex:1,textAlign:'center',fontSize:18,marginLeft:10,marginTop:2,lineHeight:6}}>开始审核</div>
            </div>
            <div
                onClick={()=>this.props.history.push('/report')}

                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:10,padding:'0 15px'}}>
                <div><img style={{width:120,height:120}} src={require('../assets/icon/audit_search.png')}></img></div>
                <div style={{flex:1,textAlign:'center',fontSize:18,marginLeft:10,marginTop:2,lineHeight:6}}>报告查询</div>
            </div>
            <div
                onClick={()=>this.props.history.push('/auditsStatics')}
                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:10,padding:'0 15px'}}>
                <div><img style={{width:120,height:120}} src={require('../assets/icon/audit_statics.png')}></img></div>
                <div style={{flex:1,textAlign:'center',fontSize:18,marginLeft:10,marginTop:2,lineHeight:6}}>数据分析</div>
            </div>
            <div
                onClick={()=>this.props.history.push('/auditsPlan')}
                style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',marginTop:10,padding:'0 15px'}}>
                <div><img style={{width:120,height:120}} src={require('../assets/icon/audit_plan.png')}></img></div>
                <div style={{flex:1,textAlign:'center',fontSize:18,marginLeft:10,marginTop:2,lineHeight:6}}>审核计划</div>
            </div>

        </div>
    }
}

export default AuditPage
