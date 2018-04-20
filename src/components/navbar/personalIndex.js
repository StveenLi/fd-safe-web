/**
 * Created by lixin on 2018/4/10.
 */


import React from 'react'
import styles from '../config/style'


class PersonalIndex extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }



    render(){


        return (
            <div>
                <div style={{display:'flex',backgroundColor: '#4077f8', flexDirection: 'column'}} >
                    <div style={{padding: 10,textAlign: 'center'}}>
                        <div><img src={require('../assets/images/user4.jpg')} style={styles.lg_avatar}/></div>
                        <div style={{marginTop: 10, fontSize: 17}}>小强</div>
                        <div style={{marginTop: 10, fontSize: 17}}>审核人员</div>
                    </div>
                    <div style={{display:'flex',textAlign: 'center',flexDirection:'row',backgroundColor:"rgba(255,255,255,0.5)",padding:10,marginTop:10}}>
                        <div style={{flex:1,color:'#fff',marginTop:5}}>
                            修改密码
                        </div>
                        <div style={{flex:1,color:'#fff',marginTop:5}}>
                            修改密码
                        </div>
                        <div style={{flex:1,color:'#fff',marginTop:5}}>
                            修改密码
                        </div>
                    </div>
                </div>
                <div style={styles.personal_item}>
                    <div sytle={{display:'flex',flexDirection: 'row'}}>
                        <div>food</div>
                    </div>
                </div>
                <div style={{marginTop:10,padding: 15, alignItems: 'center', backgroundColor: 'white'}}><div>bye</div></div>
            </div>
        )


    }



}



export default PersonalIndex
