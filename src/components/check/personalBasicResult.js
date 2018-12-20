import React from 'react'

import { NavBar,Icon,SearchBar, Button, List ,} from 'antd-mobile';
import styles,{GREY} from '../config/style'

import { submitQuestion, submit, buildExamine } from '../config/api'


class PersonalBasicResult extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            resultScorl:this.props.location.state[0].data.one
        }
    }
    componentDidMount(){
        console.log(this.props.location.state[0].data.one)
       
    }
    // back = e => {
    //     const {history} = this.props
    //     history.goBack();
    // };
    getOneCheckResult = ()=>{
       const {resultScorl} = this.state
        this.props.history.push('/basicResultDetail',[{resultId:resultScorl.id},{doneName:resultScorl.doneName}])
    }
     
    render(){
        return (
            <div style={{ 
                marginTop:'60px'
             }}>

                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.props.history.push('/check')}
                // style={{ width: '100vw' }}
            >线上考核</NavBar>
            <div style={{ 
                display:'flex',
                justifyContent:'space-between',
                backgroundColor:'white',
                margin:'0 15px',
                padding:'20px 10px',
                borderRadius:'10px',
                
                
            }}>
                <div>
                    <div>答题人:&nbsp;{this.state.resultScorl.doneName}</div>
                    <div style={{ margin:'10px 0'}}>答对题数:&nbsp;{this.state.resultScorl.sumNum}题&nbsp;(共{this.state.resultScorl.subjectType == 0?30:40}题)</div>
                    <div>考核题库:&nbsp;{this.state.resultScorl.subjectType == 0?'基础题库':'升级题库'}</div>
                    <div style={{ margin:'10px 0'}}>考核时间:&nbsp;{this.state.resultScorl.createTime}</div>
                </div>
                <div style={{textAlign:'center'}}>
                    <div>考核结果</div>
                    <div style={{
                        width:70,
                        height:70,
                        margin:'5px 0',
                        lineHeight:'70px',
                        color:'white',
                        fontSize:'18px',
                        backgroundColor:'rgb(12, 81, 193)',
                        borderRadius:'50%'
                
                    }}>{this.state.resultScorl.score}分</div>
                    <div style={{
                        display:'inline-block',
                        width:66,
                        height:25,
                        lineHeight:'25px',
                        color:(this.state.resultScorl.score >= 90)?'green':'red',
                        borderWidth:'1px' ,
                        borderStyle:'solid',
                        borderColor:(this.state.resultScorl.score >= 90)?'green':'red',
                        borderRadius:'25px'

                        }}>{this.state.resultScorl.score >= 90?'合格':'不合格'}</div>
                </div>
            </div>
            <div style={{
                height:'45px',
                margin:'10px 15px',
                padding:'0 10px',
                backgroundColor:'white',
                lineHeight:'45px',
                
            }}>
                <div onClick={this.getOneCheckResult} style={{padding:'0 20px',textAlign:'right'}}>查看考核详情 <span style={{color:'rgb(12, 81, 193)'}}>&gt;&gt;</span></div>
            </div>
            



            </div>
        )
    }


}
export default PersonalBasicResult