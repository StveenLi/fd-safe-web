/**
 * Created by lixin on 2018/4/19.
 */
import {getTrainDetail} from '../config/api'
import React from 'react'
import {NavBar,Icon,Button,Toast} from 'antd-mobile'
import {
    NavLink,Link
} from 'react-router-dom'
class CheckIndex extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            examineName:'',
            // options:''
        }
        
      }
      componentDidMount(){
        

      }
    onChange(){
        this.setState({
            examineName:this.refs.name.value.trim()
        })
        
        // this.refs.name.value = '';

    }
    toBasicChecking(){
        const {examineName} = this.state;
        var userId = JSON.parse(localStorage.getItem('userInfo')).id;
        if(examineName){
            this.props.history.push('/checkQuestion',[{examineName:examineName},{userId:userId},{examineType:0}])
        }else{
            Toast.fail('请输入答题人名字！');
            return;
        }
    }
    toUpgradeChecking(){
        const {examineName} = this.state;
        var userId = JSON.parse(localStorage.getItem('userInfo')).id;
        if(examineName){
            this.props.history.push('/checkQuestion',[{examineName:examineName},{userId:userId},{examineType:1}])
        }else{
            Toast.fail('请输入答题人名字！');
            return;
        }
    }
    back = e => {
        const {history} = this.props
        history.push('home')
    };
    render(){
        const Height = document.documentElement.clientHeight
        const { value } = this.state;
        const styleCheck = {
            ansname:{
                display:'inline-block',
                width:'20%',
                height:'45px',
                fontSize:14,
                lineHeight:'45px',
                color:'white',
                backgroundColor:'rgb(12, 81, 193)',
                textAlign:'center',
            },
            inputstyle:{
                display:'inline-block',
                width:'80%',
                height:'45px',
                margin:0,
                padding:0,
                border:'none',
                fontSize:14,
                textAlign:'center',
            }
        }
        
         return <div style={{textAlign:'center',backgroundColor:'white',height:Height}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >创建考核</NavBar>
            <div style={{textAlign:'center'}}>
                <div>
                    <img src={require('../assets/images/baihehua.jpeg')} alt='百合花' style={{width:150,height:100,marginTop:50,}} />
                    <p >百合花餐饮业食品安全</p>
                    <p style={{fontSize:12,paddingTop:3,margin:0}}>现场考核系统</p>
                </div>
                <div style={{backgroundColor:'white'}}>
                    <div style={{overflow:'hidden',margin:'35px 15px',fontSize:0,border:'1px solid rgb(12, 81, 193)',borderRadius:5,}}>
                        <div style={styleCheck.ansname}>答题人</div>
                        <input style={styleCheck.inputstyle} ref='name' placeholder="请输入答题人姓名"  onChange={this.onChange.bind(this)} />
                    </div>
                    <Button 
                        type='primary'
                        block='true' 
                        onClick={this.toBasicChecking.bind(this)}
                        style={{margin:'20px 15px',backgroundColor:'rgb(12, 81, 193)'}}
                    >基础题库</Button>
                    <Button 
                        type='primary' 
                        block='true' 
                        style={{margin:15,backgroundColor:'rgb(12, 81, 193)'}}
                        onClick={this.toUpgradeChecking.bind(this)}
                    >升级题库</Button>
                </div>
            </div> 

        
            {/* <Link to='/historyQuestionAll'> */}
                <div 
                onClick={()=>this.props.history.push('/historyQuestionAll')}
                style={{position:'absolute',top:'50px',right:'15px',width:60,height:24,border:'1px solid rgb(12, 81, 193)',fontSize:'12px',textAlign:'center',lineHeight:'24px',color:'rgb(12, 81, 193)'}}>历史考核</div>
            {/* </Link> */}
            {/* <List renderHeader={() => '考核题目'}>
                {data.map(i => (
                    <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                        {i.label}
                    </RadioItem>
                ))}
            </List>
            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toChecking()}>开始考核</Button>
            </div> */}
            </div>
            
    }
}

export default CheckIndex
