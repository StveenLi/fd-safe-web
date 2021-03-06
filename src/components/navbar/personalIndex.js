/**
 * Created by lixin on 2018/4/10.
 */


import React from 'react'
import styles,{BLUE} from '../config/style'
import {Button} from 'antd-mobile'
import {user} from '../config/api'
class PersonalIndex extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    logout(){


        localStorage.setItem('isLogin',false);
        let loginWay = localStorage.getItem('loginWay');
        if(loginWay == 'baihehua'){
            this.props.history.push('/')
        }
        else if (loginWay == 'diversey'){
            this.props.history.push('/diverseyLogin')
        }else{
            this.props.history.push('/')
        }
    }


    toContractPage(){
        this.props.history.push('/contractPage')
    }


    render(){


        return (
            <div>
                <div style={{display:'flex',backgroundColor: '#4077f8', flexDirection: 'column'}} >
                    <div style={{padding: 10,textAlign: 'center'}}>
                        <div style={{marginTop:30}}><img alt="" src={require('../assets/images/user4.jpg')} style={styles.lg_avatar}/></div>
                        <div style={{marginTop: 10, fontSize: 17,color:'#fff'}}>{user.name}</div>
                        <div style={{marginTop: 10, fontSize: 17,color:'#fff'}}>审核人员</div>
                    </div>
                    <div style={{display:'flex',textAlign: 'center',flexDirection:'row',backgroundColor:"rgba(255,255,255,0.5)",padding:10,marginTop:10}}>
                        <div style={{flex:1,color:'#fff',marginTop:5}}>
                            <div style={{fontSize:30}}>10</div>
                            <div style={{padding:5}}>已审核</div>
                        </div>
                        <div style={{flex:1,color:'#fff',marginTop:5}}>
                            <div style={{fontSize:30}}>3</div>
                            <div style={{padding:5}}>未审核</div>
                        </div>
                    </div>
                </div>

                <div style={styles.personal_item}>
                    <div sytle={{display:'flex',flexDirection: 'row'}} onClick={() => this.toContractPage()}>
                        <div>合同信息</div>
                    </div>
                </div>
                <div style={{marginTop:10,padding: 15, alignItems: 'center', backgroundColor: 'white'}}>
                    <div sytle={{display:'flex',flexDirection: 'row'}}>
                        <div>分享</div>
                    </div>
                </div>
                <div style={{marginTop:10,padding: 15, alignItems: 'center', backgroundColor: 'white'}}><div>设置</div></div>
                    <div style={{marginTop:30}}>
                            <Button onClick={() => this.logout()} type="primary" style={{margin:'15px 30px',backgroundColor:BLUE}}
                            >退出</Button>
                    </div>
            </div>
        )
    }
}



export default PersonalIndex
