/**
 * Created by lixin on 2018/4/10.
 */
import React from 'react'
import { NavBar, Icon,Tabs, WhiteSpace, Badge,Modal } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import {
    NavLink
} from 'react-router-dom'
import styles,{GREY,FONTGREY} from '../config/style'

import {remindContract,findOrg,getNews} from '../config/api'
import {Accordion} from "antd-mobile/lib/accordion";
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class mainComponent extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modal1: false,
            remindContracts:[],
            bannerImage:'',
			news:{}
        };
      }
    renderTabBar(props) {
        return (
            <Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}>
                    </div>}
            </Sticky>
        );
    }
	
	componentDidMount(){
		this.startmarquee(20, 20, 5000);
	}


    componentWillMount() {
        let that = this;
        remindContract().then((data) => {
            if(data.success){
                let newContracts = [];
                for(let item of data.contract){
                    if(item.status == 'TX'){
                        newContracts.push(item)
                    }
                }
                if(newContracts.length>0){
                    this.setState({
                        remindContracts:newContracts,
                        modal1:true
                    })
                }
            }
        })

        findOrg().then((data) => {
            if(data.success){
                if(data.img!=null){
                    that.setState({
                        bannerImage:data.img
                    })
                }
            }
        })
		
		getNews().then((data) => {
			if(data.success){
				that.setState({
					news:data.list[0]
				})
				document.getElementById('content').innerHTML = data.list[0].content
				
			}
		})
    }
	
	
	startmarquee(lh, speed, delay) {
	    var t;  
	    var oHeight = 300;/** div的高度 **/　  
	    var p = false;  
	    var o = document.getElementById("show");  
	    var preTop = 0;  
	    o.scrollTop = 0;  
	    function start() {  
	        t = setInterval(scrolling, speed);  
	        o.scrollTop += 1;  
	    }  
	    function scrolling() {  
	        if (o.scrollTop % lh != 0  
	                && o.scrollTop % (o.scrollHeight - oHeight - 1) != 0) {  
	            preTop = o.scrollTop;  
	            o.scrollTop += 1;  
	            if (preTop >= o.scrollHeight || preTop == o.scrollTop) {  
	                o.scrollTop = 0;  
	            }  
	        } else {  
	            clearInterval(t);  
	            setTimeout(start, delay);  
	        }  
	    }  
	    setTimeout(start, delay);  
	}  

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }




    toLawPage(){
    }
    render(){
        const tabs = [
            { title: 'First Tab' },
        ];
        const {remindContracts,news} = this.state
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
                                {
                                    this.state.bannerImage == ''?<img alt="" src={require('../assets/images/banner.jpg')} height="100%" width="100%" />:<img alt="" src={this.state.bannerImage} height="100%" width="100%" />

                                }
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
                        <NavLink to="/lawIndex">
                            <img style={{maxWidth:'100%'}}  alt="" src={require('../assets/icon/nav04.png')}></img>
                            <span style={styles.home_func_item}>法律</span></NavLink>
                    </div>
                </div>
                {/*<div style={{flex:1,marginTop:'5px'}}><NavLink to="/audits"><img alt="" src={require('../assets/icon/ic_shenhe.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>审核</div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/train"><img alt="" src={require('../assets/icon/ic_peixun.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>培训</div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/check"><img alt="" src={require('../assets/icon/ic_kaohe.png')} height="30px"/><div style={{marginTop:'5px'}}>考核</div></NavLink></div>
                <div style={{flex:1,marginTop:'5px'}}><NavLink to="/law"><img alt="" src={require('../assets/icon/ic_law.png')} height="30px"/><div style={{marginTop:'5px'}}></div></NavLink>法律</div>*/}
            </div>

            {/*<div style={{display:'flex',padding:15}}>
                <div style={{marginLeft:15,marginRight:15,color:'#CD3333',fontWeight:'bold'}}>提醒:
                </div>
                <div style={{flex:1}}></div>
            </div>

            <div style={{marginLeft:15,marginRight:15,textAlign:'left',color:'#CD3333',fontWeight:'bold'}}>
                <div style={{padding:10}}>周审核每周一生成审核计划</div>
                <div style={{padding:10}}>季度审核每季度第一天生成审核计划</div>
                <div style={{padding:10}}>审核周期内只能做一次审核</div>
                <div style={{padding:10}}>审核报告可自动发送到您的邮箱，请注意查收。</div>

            </div>
*/}
			<div id="show" style={{height:300,marginLeft:15,marginRight:15,textAlign:'left',overflowY:'scroll',overflowX:'scroll'}}>
				<div style={{whiteSpace: 'pre-wrap',width:345,padding:10}} id="content">{news.content}</div>
			</div>
            <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                title="合同到期提醒"
                footer={[{ text: '知道了', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <div style={{ height: 150, overflow: 'scroll' }}>
                    {remindContracts.map((item, index) => {
                        return <div key={index}>客户：{item.name} 合同即将到期<br/></div>
                    })
                }
                </div>
            </Modal>
        </div>
    }
}


export default mainComponent