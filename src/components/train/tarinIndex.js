/**
 * Created by lixin on 2018/4/18.
 */


import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace,Button,SearchBar, List} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import styles,{GREY,BLUE} from '../config/style'
const Item = List.Item;
const Brief = Item.Brief;
class TrainIndex extends React.Component{
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
        const tabs = [
            { title: '操作规范' },
            { title: '审核细则' },
        ];

        return <div>

            <div style={{borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>


                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.back()}
                >培训</NavBar>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initialPage={0}
                          onChange={(tab, index) => { console.log('onChange', index, tab); }}
                          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                            <div style={{width:'100%'}}>
                                <SearchBar
                                    placeholder="搜索内容"
                                    ref={ref => this.manualFocusInst = ref}
                                />
                                <List>
                                    <Item multipleLine onClick={() => {}} style={{display:'flex',flexDirection:'row'}}>
                                        互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                                        利益,保护公民、法人和其他组织的合法权益,</Brief>
                                        <Brief>2018-04-12</Brief>
                                    </Item>
                                    <Item multipleLine onClick={() => {}}>
                                        互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                                        利益,保护公民、法人和其他组织的合法权益,</Brief>
                                        <Brief>2018-04-12</Brief>
                                    </Item>
                                    <Item multipleLine onClick={() => {}}>
                                        互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                                        利益,保护公民、法人和其他组织的合法权益,</Brief>
                                        <Brief>2018-04-12</Brief>
                                    </Item>
                                </List>
                            </div>

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%'}}>
                                <SearchBar
                                    placeholder="搜索内容"
                                    ref={ref => this.manualFocusInst = ref}
                                />
                                <List>
                                    <Item multipleLine onClick={() => {}} style={{display:'flex',flexDirection:'row'}}>
                                        互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                                        利益,保护公民、法人和其他组织的合法权益,</Brief>
                                        <Brief>2018-04-12</Brief>
                                    </Item>
                                    <Item multipleLine onClick={() => {}}>
                                        互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                                        利益,保护公民、法人和其他组织的合法权益,</Brief>
                                        <Brief>2018-04-12</Brief>
                                    </Item>
                                    <Item multipleLine onClick={() => {}}>
                                        互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                                        利益,保护公民、法人和其他组织的合法权益,</Brief>
                                        <Brief>2018-04-12</Brief>
                                    </Item>
                                </List>
                            </div>
                        </div>

                    </Tabs>

                </StickyContainer>
            </div>
        </div>
    }
}

export default TrainIndex