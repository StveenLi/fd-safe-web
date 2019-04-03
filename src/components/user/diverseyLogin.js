import React, { Component } from 'react';
import {InputItem, Button,Toast} from 'antd-mobile';
import {screenHeight,GREY,ORANGE,BLUE} from '../config/style'
import CountDown from 'react-codedown'
import {sendValidCode,login,user} from '../config/api'
import Utils from '../config/utils'

class DiverseyLogin extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            phone:'',
            vaildCode:''
        };
    }

    delay = (time) => new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })

    handleClick = async () => {
        const {phone} = this.state

        let delayTime = 60000;
        if(!Utils.checkCellphone(phone)){
            Toast.fail('手机号码格式不正确!', 1);
            this.countdown.reset();
            return;
        }
        sendValidCode(phone).then(data => {
            data.success?Toast.success('验证码发送成功!', 1):Toast.fail(data.msg, 1);
        });
        await this.delay(delayTime)
        this.countdown.reset()
    }

    componentWillMount() {
        let loginWay = localStorage.getItem('loginWay');
        if(loginWay == 'baihehua'){
            localStorage.clear();
        }else if(loginWay == 'diversey'){
            if(JSON.parse(localStorage.getItem('isLogin'))){
                this.props.history.push('/home')
            }
        }

    }


    userLogin(){
        const {phone,vaildCode} = this.state
        if(!Utils.checkCellphone(phone)){
            Toast.fail('手机号码格式不正确!', 1);
            return;
        }
        login(phone,vaildCode).then(data => {
            if(data.success){
                localStorage.setItem('isLogin',true);
                localStorage.setItem('loginWay','diversey');
                localStorage.setItem('userInfo',JSON.stringify(data.one));
                this.props.history.push('/home')
            }else{
                Toast.fail(data.msg, 1);
            }
        });
    }

    toCall(){
        window.location.href = "tel:13801325113"
    }


    render(){
        return <div style={{display:'flex',flexDirection:'column',background:"#fff",textAlign:'center',padding:'0 15px',height:screenHeight}}>

            <div>
                <div style={{padding:'60px 0 0px 0'}}><img style={{width:200}} src={require('../assets/images/diversey.jpg')}/></div>
                <div style={{fontSize:24,padding:15}}>泰华施食品安全管理系统</div>
            </div>
            <div style={{marginTop:30}}>
                <div style={{borderBottomStyle:'solid',borderBottomWidth:1,borderBottomColor:GREY}}>
                    <InputItem
                        type="number"
                        style={{padding:15}}
                        placeholder="手机号"
                        onChange={(val) => this.setState({phone:val})}
                    />
                </div>
                <div style={{display:'flex',flexDirection:'row',marginTop:10,borderBottomStyle:'solid',borderBottomWidth:1,borderBottomColor:GREY}}>
                    <InputItem
                        type="number"
                        placeholder="验证码"
                        style={{padding:15}}
                        onChange={(val) => this.setState({vaildCode:val})}

                    />
                    <div style={{padding:15,width:100}}>

                        <CountDown
                            initialRemaining={60}
                            initialContent="获取验证码"
                            style={{ width: 100,color:BLUE,background:'#fff',border:0}}
                            className="myClass"
                            onClick={this.handleClick}
                            ref={ref => this.countdown = ref}
                            interval={1000}
                        />

                    </div>
                </div>
                <div

                    onClick={() => this.toCall()}
                    style={{textAlign:'left',marginLeft:20,marginTop:20,color:ORANGE}}>收不到验证码？</div>
            </div>

            <div style={{marginTop:30}}>
                <Button
                    onClick={()=>this.userLogin()}
                    type="primary" style={{margin:'15px 30px',backgroundColor:BLUE}}>登录</Button>
            </div>
            <div style={{marginTop:30}}>没有账号？找<span style={{color:ORANGE}} onClick={() => this.toCall()}>客服</span></div>
        </div>
    }
}
export default DiverseyLogin