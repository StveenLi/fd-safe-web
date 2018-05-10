/**
 * Created by lixin on 2018/4/10.
 */
import React from 'react'
import { NavBar, Icon,Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import {
    NavLink
} from 'react-router-dom'
import styles,{GREY,BLUE,screenWidth,FONTGREY} from '../config/style'

class mainComponent extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    renderTabBar(props) {
        return (
            <Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}>
                    </div>}
            </Sticky>
        );
    }
    componentDidMount() {
    }
    toLawPage(){
    }
    render(){
        const tabs = [
            { title: 'First Tab' },
        ];
        return <div style={styles.page_box}>
            <NavBar
                mode="light"
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
        <Icon key="1" type="ellipsis" />,
      ]}
            >食品安全</NavBar>
            <div style={{marginTop:45}}>
                <WhiteSpace />
                    <StickyContainer>
                        <Tabs tabs={tabs}
                              initalPage={'t2'}
                              renderTabBar={this.renderTabBar}
                        >
                            <div style={styles.home_banner}>
                                <img alt="" src={require('../assets/images/banner.jpg')} height="100%" width="100%" />
                            </div>
                        </Tabs>
                    </StickyContainer>
            </div>
            <div style={styles.home_func}>
                <div style={styles.func_list}>
                    <div style={{padding:10,position: 'relative'}}>
                        <NavLink to="/audits">
                        <img style={{maxWidth:'100%'}}  alt="" src={require('../assets/icon/nav01.png')}></img>
                        <span style={styles.home_func_item}>审核</span></NavLink>
                    </div>
                    <div style={{padding:10,position: 'relative'}}>
                        <NavLink to="/train">
                            <img style={{maxWidth:'100%'}}  alt="" src={require('../assets/icon/nav02.png')}></img>
                            <span style={styles.home_func_item}>培训</span></NavLink>
                    </div>
                </div>
                <div style={{flex:1,display:'flex',flexDirection:'row'}}>
                    <div style={{padding:'0px 10px 10px 10px',position: 'relative'}}>
                        <NavLink to="/check">
                            <img style={{maxWidth:'100%'}}  alt="" src={require('../assets/icon/nav03.png')}></img>
                            <span style={styles.home_func_item}>考核</span></NavLink>
                    </div>
                    <div style={{padding:'0px 10px 10px 10px',position: 'relative'}}>
                        <NavLink to="/law">
                            <img style={{maxWidth:'100%'}}  alt="" src={require('../assets/icon/nav04.png')}></img>
                            <span style={styles.home_func_item}>法律</span></NavLink>
                    </div>
                </div>
                {/*<div style={{flex:1,marginTop:'5px'}}><NavLink to="/audits"><img alt="" src={require('../assets/icon/ic_shenhe.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>审核</div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/train"><img alt="" src={require('../assets/icon/ic_peixun.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>培训</div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/check"><img alt="" src={require('../assets/icon/ic_kaohe.png')} height="30px"/><div style={{marginTop:'5px'}}>考核</div></NavLink></div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/law"><img alt="" src={require('../assets/icon/ic_law.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>法律</div>*/}
            </div>

            <div style={{display:'flex',padding:15}}>
                <div style={{marginLeft:15,marginRight:15}}>通知</div>
                <div style={{flex:1}}></div>
                <NavLink to="/message"
                         activeStyle={{color: 'black'}}
                >
                    <div style={{marginLeft:15,marginRight:15}}>查看更多 ></div>
                </NavLink>
            </div>

            <div style={{marginLeft:15,marginRight:15}}>

                {
                    this.props.noticeList.map((noticeItem,index) => {
                        return <div key={index} style={{borderTopRightRadius:5,borderTopLeftRadius:5,display:'flex',flexDirection:'row',backgroundColor:'#fff',padding:15,borderBottomColor:'#eaeefe',borderBottomWidth:1,borderBottomStyle:'solid'}}>
                            <Badge dot style={{ marginLeft: 12, padding: '3px 3px',marginTop:3, backgroundColor: GREY }} />
                            <div style={{flex:1,textAlign:'left',marginLeft:20}}>
                                <div>{noticeItem.title}</div>
                                <div style={{marginTop:10,fontSize:13,color:FONTGREY}}>{noticeItem.createDate}</div>
                            </div>
                        </div>
                    })
                }


            </div>

            {/*<div style={{display:'flex',padding:15}}>
                <div style={{marginLeft:15,marginRight:15}}>咨询</div>
                <div style={{flex:1}}></div>
                <div style={{marginLeft:15,marginRight:15}}>查看更多 ></div>
            </div>

            <div style={{marginLeft:15,marginRight:15,marginBottom:50}}>
                <div style={{display:'flex',flexDirection:'column',width:'100%',borderRadius:5,display:'flex',backgroundColor:'#fff',padding:15,borderBottomColor:'#eaeefe',borderBottomWidth:1,borderBottomStyle:'solid'}}>
                    <div style={{borderBottomStyle:'solid',borderBottomColor:GREY,borderBottomWidth:1,paddingTop:10,paddingBottom:10,width:'100%',display:'flex',flexDirection:'row'}}>
                        <div style={{flex:1,textAlign:'left'}}>
                            <div style={{padding:5,fontSize:16}}>互联网群组信息</div>
                            <div style={{padding:5,fontSize:14}}>互联网群组信息服务管理规定</div>
                            <div style={{ padding:5,color:'grey'}}>2017-09-10</div>
                        </div>
                        <div>
                            <img src={require('../assets/icon/group.png')} width="120px"/>
                        </div>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10,width:'100%',display:'flex',flexDirection:'row'}}>
                        <div style={{flex:1,textAlign:'left'}}>
                            <div style={{padding:5,fontSize:16}}>互联网群组信息</div>
                            <div style={{padding:5,fontSize:14}}>互联网群组信息服务管理规定</div>
                            <div style={{ padding:5,color:'grey'}}>2017-09-10</div>
                        </div>
                        <div>
                            <img src={require('../assets/icon/group.png')} width="120px"/>
                        </div>
                    </div>

                </div>
            </div>*/}

        </div>
    }
}


export default mainComponent