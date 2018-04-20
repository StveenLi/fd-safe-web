/**
 * Created by lixin on 2018/4/20.
 */


import React from 'react'
import { Accordion, List,NavBar,Icon,Badge} from 'antd-mobile';
import styles,{BLUE,GREY} from '../config/style'


class CheckQuestion extends React.Component{

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
    render(){

        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >线上考核</NavBar>

            <div style={{marginTop:45,backgroundColor:BLUE,paddingTop:15,paddingLeft:15,paddingBottom:70,color:'#fff',display:'flex',flexDirection:'row',fontSize:16}}>
                01、请问当餐厅出现蟑螂怎么办?
            </div>
            <div style={{backgroundColor:'#fff',padding:15,textAlign:'left'}}>
                <div>
                    <div style={{display:'flex',flexDirection:'row',paddingTop:15,paddingBottom:15}}>
                        <Badge text="A" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10,padding:5}}>立即报警</div>
                    </div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',paddingTop:15,paddingBottom:15}}>
                        <Badge text="B" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10,padding:5}}>洒水</div>
                    </div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',paddingTop:15,paddingBottom:15}}>
                        <Badge text="C" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10,padding:5}}>撒蟑螂药。</div>
                    </div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',paddingTop:15,paddingBottom:15}}>
                        <Badge text="D" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10,padding:5}}>找人捕捉</div>
                    </div>
                </div>
            </div>

            <div style={{textAlign:'center',position:'fixed',bottom:0,width:'100%',display:'flex',backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}>
                <div style={{flex:1}}>上一题</div>
                <div
                    style={{flex:1}}>提交</div>
                <div style={{flex:1}}>下一题</div>
            </div>
        </div>
    }

}


export default CheckQuestion
