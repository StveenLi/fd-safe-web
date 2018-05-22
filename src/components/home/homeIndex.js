/**
 * Created by lixin on 2018/4/9.
 */


import React from 'react'
import {List,NavBar,WhiteSpace,Icon,Tabs, Badge,TabBar } from 'antd-mobile'
import MainComponent from '../navbar/mainPage'
import ConsultationPage from '../navbar/consultationPage'
import PersonalIndex from '../navbar/personalIndex'
import {getNotice} from '../config/api'
import {GREY,screenWidth,FONTGREY,BLUE} from '../config/style'
import message from '../user/message'
class HomeIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: true,
            noticeList:[]
        };
    }
    componentDidMount() {
        getNotice().then(data => {
            if(data.success){
                this.setState({noticeList:data.list})
            }
        })
        this.getLocation()
    }

    getLocation(){
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.savePosition);
        }
        else{
            console.log('未被允许');
        }
    }
    savePosition(position){
        localStorage.setItem('Latitude',position.coords.latitude);
        localStorage.setItem('Longitude',position.coords.longitude);
    }

    toCall(){
        this.setState({selectedTab: 'greenTab',});
        window.location.href = "tel:021-39886223"
    }



    render() {
        const {noticeList} = this.state
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor={BLUE}
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        icon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/home.png")}) center center /  21px 21px no-repeat` }}/>}
                        selectedIcon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/home_activity.png")}) center center /  21px 21px no-repeat` }}/>}
                        title="首页"
                        key="Koubei"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {this.setState({selectedTab: 'redTab'});}}
                        data-seed="logId1"
                    >
                        <MainComponent noticeList={noticeList}></MainComponent>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/zx.png")}) center center /  21px 21px no-repeat` }}/>}
                        selectedIcon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/zx_activity.png")}) center center /  21px 21px no-repeat` }}/>}
                        title="咨询"
                        key="Friend"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => this.toCall()}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/message.png")}) center center /  21px 21px no-repeat` }}/>}
                        selectedIcon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/message_activity.png")}) center center /  21px 21px no-repeat` }}/>}
                        title="消息"
                        key="message"
                        selected={this.state.selectedTab === 'msgTab'}
                        onPress={() => {this.setState({selectedTab: 'msgTab',});}}
                    >
                        <div>
                            <List>
                                {
                                    this.state.noticeList.map((noticeItem,index) => {
                                        return <div key={index} style={{borderTopRightRadius:5,borderTopLeftRadius:5,display:'flex',flexDirection:'row',backgroundColor:'#fff',padding:15,borderBottomColor:'#eaeefe',borderBottomWidth:1,borderBottomStyle:'solid'}}>
                                            <Badge dot style={{ marginLeft: 12, padding: '3px 3px',marginTop:3, backgroundColor: GREY }} />
                                            <div style={{flex:1,textAlign:'left',marginLeft:20}}>
                                                <div>{noticeItem.title}</div>
                                                <div style={{marginTop:10,fontSize:13,color:FONTGREY}}>{noticeItem.createDate}</div>
                                            </div>
                                        </div>
                                    })
                                }
                            </List>
                        </div>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/my.png")}) center center /  21px 21px no-repeat` }}/>}
                        selectedIcon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/my_activity.png")}) center center /  21px 21px no-repeat` }}/>}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {this.setState({selectedTab: 'yellowTab',});}}
                    >
                        <PersonalIndex history={this.props.history}></PersonalIndex>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default HomeIndex