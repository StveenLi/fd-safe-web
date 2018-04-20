/**
 * Created by lixin on 2018/4/10.
 */
import React from 'react'
import { NavBar, Icon,Tabs, WhiteSpace, Badge ,List} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import {
    NavLink
} from 'react-router-dom'
import {GREY,BLUE} from '../config/style'

const Item = List.Item;
const Brief = Item.Brief;
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
        console.log(this.props.history)
    }

    toLawPage(){

    }


    render(){
        const tabs = [
            { title: 'First Tab' },
        ];
        return <div style={{ backgroundColor: '#fbfbff', paddingBottom:50,textAlign: 'center' }}>
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
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#21a9fd' }}>
                                <img src={require('../assets/images/banner.jpg')} height="100%" width="100%" />
                            </div>
                        </Tabs>
                    </StickyContainer>
                <WhiteSpace />
            </div>
            <div style={{display:'flex',alignItems: 'center', justifyContent: 'center',flexDirection:'row',backgroundColor:'#fff',paddingBottom:10}}>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/audits"><img src={require('../assets/icon/ic_shenhe.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>审核</div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/train"><img src={require('../assets/icon/ic_peixun.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>培训</div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/check"><img src={require('../assets/icon/ic_kaohe.png')} height="30px"/><div style={{marginTop:'5px'}}>考核</div></NavLink></div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/law"><img src={require('../assets/icon/ic_law.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>法律</div>
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
                <div style={{borderTopRightRadius:5,borderTopLeftRadius:5,display:'flex',flexDirection:'row',backgroundColor:'#fff',padding:15,borderBottomColor:'#eaeefe',borderBottomWidth:1,borderBottomStyle:'solid'}}>
                    <Badge text="N" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                    <div style={{flex:1}}>
                        <div>恭喜你，您的审核通过了</div>
                        <div>2018-04-08</div>
                    </div>
                </div>
                <div style={{borderBottomRightRadius:5,borderBottomLeftRadius:5,display:'flex',flexDirection:'row',backgroundColor:'#fff',padding:15,borderBottomColor:'#707070',borderWidth:1}}>
                    <Badge text="N" style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                    <div style={{flex:1}}>
                        <div>恭喜你，您的审核通过了</div>
                        <div>2018-04-08</div>
                    </div>
                </div>
            </div>

            <div style={{display:'flex',padding:15}}>
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
            </div>

        </div>
    }
}


export default mainComponent