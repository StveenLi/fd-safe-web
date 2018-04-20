/**
 * Created by lixin on 2018/4/20.
 */


import React from 'react'
import {NavBar, Button,Icon,Tabs} from 'antd-mobile'
import styles,{BLUE,GREY} from '../config/style'
import { StickyContainer, Sticky } from 'react-sticky';


class ReportDetail extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){
        const tabs = [
            { title: '账户信息' },
            { title: '审计信息' },
            { title: '审计类别汇总' },
            { title: '关键项' },
        ];
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >详情</NavBar>
            <div style={{marginTop:45}}>

                <div style={{backgroundColor:BLUE,padding:15,fontSize:16,color:'#fff'}}>
                    白百合餐饮卫生和安全审核报告
                </div>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initialPage={0}
                          onChange={(tab, index) => { console.log('onChange', index, tab); }}
                          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%',backgroundColor:'#fff',padding:15,fontSize:16}}>
                                <div style={styles.func_item}><div>账户ID</div><div style={styles.func_item_right}>CN-CYX-JN001</div></div>
                                <div style={styles.func_item}><div>账户</div><div style={styles.func_item_right}>2017-10-31</div></div>
                                <div style={styles.func_item}><div>地址</div><div style={styles.func_item_right}>Chaorixing Dayi001</div></div>
                                <div style={styles.func_item}><div>地址2</div><div style={styles.func_item_right}>济徳路济南大学老西门对过</div></div>
                                <div style={styles.func_item}><div>城市/国家</div><div style={styles.func_item_right}>-</div></div>
                                <div style={styles.func_item}><div>邮政编码</div><div style={styles.func_item_right}>-</div></div>
                                <div style={styles.func_item}><div>电话</div><div style={styles.func_item_right}>-</div></div>
                                <div style={styles.func_item_noline}><div>email</div><div style={styles.func_item_right}>-</div></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%',backgroundColor:'#fff',padding:15,fontSize:16}}>
                                <div style={styles.func_item}><div>账户ID</div><div style={styles.func_item_right}>CN-CYX-JN001</div></div>
                                <div style={styles.func_item}><div>账户</div><div style={styles.func_item_right}>2017-10-31</div></div>
                                <div style={styles.func_item}><div>地址</div><div style={styles.func_item_right}>Chaorixing Dayi001</div></div>
                                <div style={styles.func_item}><div>地址2</div><div style={styles.func_item_right}>济徳路济南大学老西门对过</div></div>
                                <div style={styles.func_item}><div>城市/国家</div><div style={styles.func_item_right}>-</div></div>
                                <div style={styles.func_item}><div>邮政编码</div><div style={styles.func_item_right}>-</div></div>
                                <div style={styles.func_item}><div>电话</div><div style={styles.func_item_right}>-</div></div>
                                <div style={styles.func_item_noline}><div>email</div><div style={styles.func_item_right}>-</div></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%',backgroundColor:'#fff',padding:15,fontSize:14}}>
                                <div style={{marginTop:20,paddingBottom:15,borderBottomStyle:'solid',borderBottomColor:GREY,borderBottomWidth:1}}>
                                    <div>1.食品接收与存储</div>
                                    <div style={{display:'flex',flexDirection:'row',marginTop:15}}>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop:20,paddingBottom:15,borderBottomStyle:'solid',borderBottomColor:GREY,borderBottomWidth:1}}>
                                    <div>1.食品接收与存储</div>
                                    <div style={{display:'flex',flexDirection:'row',marginTop:15}}>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop:20,paddingBottom:15,borderBottomStyle:'solid',borderBottomColor:GREY,borderBottomWidth:1}}>
                                    <div>1.食品接收与存储</div>
                                    <div style={{display:'flex',flexDirection:'row',marginTop:15}}>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                        <div style={{flex:1}}>
                                            <div style={{fontSize:24,color:BLUE}}>50%</div>
                                            <div style={{marginTop:5}}>实际得分</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%',backgroundColor:'#fff',padding:15,fontSize:14}}>备注</div>
                            </div>
                    </Tabs>

                </StickyContainer>
            </div>
        </div>
    }
}


export default ReportDetail