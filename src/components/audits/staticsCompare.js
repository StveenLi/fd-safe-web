/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import {WhiteSpace,InputItem,Picker,Button} from 'antd-mobile'
import styles,{GREY} from '../config/style'
class StaticsCompare extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }



    render(){
        return <div style={{width:'100%',textAlign:'center'}}>
                <WhiteSpace/>
                <div style={{display:'flex',flexDirection:'row ',backgroundColor:'#fff',padding:15}}>
                    <div style={{marginTop:5}}>日期</div>
                    <div style={{display:'flex',flex:1,marginLeft:15,flexDirection:'row '}}>
                        <div style={{flex:1,borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5}}>
                            <Picker data={[1,2]} cols={1}>
                                <div style={{color:GREY}}>年/月/日</div>
                            </Picker>
                        </div>
                        <div style={{marginTop:5,marginLeft:20,marginRight:20}}>-</div>
                        <div style={{flex:1,borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5}}>
                            <Picker data={[1,2]} cols={1}>
                                <div style={{color:GREY}}>年/月/日</div>
                            </Picker>
                        </div>
                    </div>
                </div>
                <WhiteSpace/>
                <div style={{display:'flex',flexDirection:'row ',backgroundColor:'#fff',}}>
                    <div style={{backgroundColor:'#108ee9',width:30,height:30,lineHeight:'30px',color:'#fff',marginTop:10}}>A</div>
                    <div style={{flex:1, padding:15,marginTop:10}}>
                        <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,marginTop:10}}>集团</div>
                        <div style={{display:'flex',flexDirection:'row ',marginTop:10}}>
                            <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,flex:1,marginRight:5}}>品牌</div>
                            <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,flex:1,marginLeft:5}}>模式</div>
                        </div>
                        <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,marginTop:10}}>区域</div>
                        <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,marginTop:10}}>门店</div>

                        <div style={{marginTop:10,textAlign:'right'}}>
                            <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>重置</Button>
                        </div>
                    </div>
                </div>
                <WhiteSpace/>
                <div style={{display:'flex',flexDirection:'row ',backgroundColor:'#fff',marginBottom:100}}>
                    <div style={{backgroundColor:'#108ee9',width:30,height:30,lineHeight:'30px',color:'#fff',marginTop:10}}>A</div>
                    <div style={{flex:1, padding:15,marginTop:10}}>
                        <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,marginTop:10}}>集团</div>
                        <div style={{display:'flex',flexDirection:'row ',marginTop:10}}>
                            <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,flex:1,marginRight:5}}>品牌</div>
                            <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,flex:1,marginLeft:5}}>模式</div>
                        </div>
                        <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,marginTop:10}}>区域</div>
                        <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,padding:5,marginTop:10}}>门店</div>

                        <div style={{marginTop:10,textAlign:'right'}}>
                            <Button type="primary" inline size="small" style={{ marginRight: '4px' }}
                            >重置</Button>
                        </div>
                    </div>
                </div>


        </div>
    }


}
export default StaticsCompare