/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Badge} from 'antd-mobile';
import styles,{GREY,BLUE} from '../config/style'

class QuestionDetail extends React.Component{




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

    subQuestion(){

    }

    render(){
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            > 食品接收与存储</NavBar>

            <div style={{marginTop:45,backgroundColor:BLUE,padding:15,color:'#fff',display:'flex',flexDirection:'row'}}>
                <div style={{flex:1,fontSize:18,marginTop:5,marginLeft:70}}>1.1 食品接收</div>
                <div style={{borderColor:'#fff',borderWidth:1,borderStyle:'solid',borderRadius:5,paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15}}>不适用</div>
            </div>
            <div style={{backgroundColor:'#fff',padding:15,textAlign:'left'}}>
                <div style={{marginTop:15,fontSize:18}}>1.采购的食品相关产品等应用符合国家有关食品安
                全标准和规定的要求。</div>
                <div style={{display:'flex',flexDirection:'row',textAlign:'center',margin:15,borderBottomStyle:'solid',borderWidth:1,borderBottomColor:GREY,paddingBottom:15,color:BLUE}}>
                    <div style={{flex:1}}>视频播放</div>
                    <div style={{flex:1}}>图文详情</div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',padding:15}}>
                        <Badge text="A" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10}}>采购的食品相关产品等应用符合国家有关食品安
                            全标准和规定的要求。</div>
                    </div>
                    <div
                        onClick={() => this.props.history.push('/remarks')}
                        style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注</div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',padding:15}}>
                        <Badge text="A" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10}}>采购的食品相关产品等应用符合国家有关食品安
                            全标准和规定的要求。</div>
                    </div>
                    <div style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注</div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',padding:15}}>
                        <Badge text="A" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10}}>采购的食品相关产品等应用符合国家有关食品安
                            全标准和规定的要求。</div>
                    </div>
                    <div style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注</div>
                </div>
                <div>
                    <div style={{display:'flex',flexDirection:'row',padding:15}}>
                        <Badge text="A" hot style={{ marginLeft: 12 ,backgroundColor: BLUE,padding:5,width:18,borderRadius:15}} />
                        <div style={{marginLeft:10}}>采购的食品相关产品等应用符合国家有关食品安
                            全标准和规定的要求。</div>
                    </div>
                    <div style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注</div>
                </div>
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'flex',backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}>
                <div style={{flex:1}}>上一题</div>
                <div
                    onClick={() => this.subQuestion()}
                    style={{flex:1}}>提交</div>
                <div style={{flex:1}}>下一题</div>
            </div>


        </div>
    }
}

export default QuestionDetail
