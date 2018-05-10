/**
 * Created by lixin on 2018/4/9.
 */


import React from 'react'
import { TabBar } from 'antd-mobile';
import MainComponent from '../navbar/mainPage'
import ConsultationPage from '../navbar/consultationPage'
import PersonalIndex from '../navbar/personalIndex'
import {getNotice} from '../config/api'
import {BLUE} from '../config/style'
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
                        onPress={() => {this.setState({selectedTab: 'greenTab',});}}
                    >
                        <ConsultationPage></ConsultationPage>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/message.png")}) center center /  21px 21px no-repeat` }}/>}
                        selectedIcon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/message_activity.png")}) center center /  21px 21px no-repeat` }}/>}
                        title="消息"
                        key="message"
                        selected={this.state.selectedTab === 'msgTab'}
                        onPress={() => {this.setState({selectedTab: 'msgTab',});}}
                    >
                        <div></div>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/my.png")}) center center /  21px 21px no-repeat` }}/>}
                        selectedIcon={<div style={{width: '22px',height: '22px',background: `url(${require("../assets/icon/my_activity.png")}) center center /  21px 21px no-repeat` }}/>}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {this.setState({selectedTab: 'yellowTab',});}}
                    >
                        <PersonalIndex></PersonalIndex>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default HomeIndex