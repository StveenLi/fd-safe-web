/**
 * Created by lixin on 2018/4/19.
 */

import React from 'react'
import {List,NavBar,WhiteSpace,Icon,Tabs, Badge } from 'antd-mobile'

import {getNotice} from '../config/api'
import {BLUE} from '../config/style'
import { StickyContainer, Sticky } from 'react-sticky';
import {
    NavLink
} from 'react-router-dom'
import styles,{GREY,screenWidth,FONTGREY} from '../config/style'

const Item = List.Item;
const Brief = Item.Brief;
class Message extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            noticeList:[]
        };
      }
    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };

    componentDidMount() {
        getNotice().then(data => {
            if(data.success){
                this.setState({noticeList:data.list})
            }
        })
    }
    render(){


        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >消息</NavBar>

            <WhiteSpace/>
            <List style={{marginTop:55}}>
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
    }
}

export default Message
