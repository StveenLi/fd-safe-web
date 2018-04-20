/**
 * Created by lixin on 2018/4/19.
 */

import React from 'react'
import {List,NavBar,WhiteSpace,Icon} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;

class Message extends React.Component{


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


        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >消息</NavBar>

            <WhiteSpace/>
            <List style={{marginTop:60}}>
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
                <Item multipleLine onClick={() => {}}>
                    互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                    利益,保护公民、法人和其他组织的合法权益,</Brief>
                    <Brief>2018-04-12</Brief>
                </Item>
            </List>


        </div>
    }
}

export default Message
