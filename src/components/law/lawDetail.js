/**
 * Created by lixin on 2018/4/20.
 */

import React from 'react'
import { NavBar,Icon,SearchBar, Button, List ,} from 'antd-mobile';
import styles,{GREY} from '../config/style'


class LawDetail extends React.Component{



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
            >详情</NavBar>

             <div style={{marginTop:45,backgroundColor:'#fff',padding:15}}>

                 <div>
                     <div style={{fontSize:16,padding:10}}>互联网群组信息服务管理规定</div>
                     <div style={{color:'#CFCFCF',padding:5}}>日期 : 2017-11-28</div>
                 </div>

                 <div style={{borderStyle:'solid',borderColor:GREY,borderWidth:1}}></div>

                 <div style={{marginTop:15,color:'#515151',textIndent:25,letterSpacing:2,lineHeight:2}}>
                        本规定所称互联网群组,是指互联网用户通过
                     互联网站、移动互联网应用程序等建立的,用于群
                     体在线交流信息的网络空间。本规定所称互联网群
                     有道云笔记¤务提供者,是指提供互联网群组信息服务
                     的平台。本规定所称互联网群组信息服务使用者,
                     包括群组建立者、管理者和成员。
                     第三条国家互联网信息办公室负责全国互联网
                     群组信息服务的监督管理执法工作。地方互联网信
                     息办公室依据职责负责本行政区域内的互联网群组
                     信息服务的监督管理执法工作。
                     第四条互联网群组信息服务提供者和使用者,
                     应当坚持正确导向,弘扬社会主义核心价值观,培
                     育积极健康的网络文化,维护良好网络生态。
                 </div>

             </div>
        </div>
    }
}


export default LawDetail
