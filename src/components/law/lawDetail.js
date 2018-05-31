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
        this.state = {
            data: this.props.location.state
        }
        ;
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };

    componentDidMount() {
        document.getElementById('iu').innerHTML = this.state.data.fsContent;
    }

    render(){

        const {data} = this.state

        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >详情</NavBar>

             <div style={{marginTop:45,backgroundColor:'#fff',padding:15}}>

                 <div>
                     <div style={{fontSize:16,padding:10}}>{data.title}</div>
                     <div style={{color:'#CFCFCF',padding:5}}>日期 : {data.creatTime}</div>
                 </div>

                 <div style={{borderStyle:'solid',borderColor:GREY,borderWidth:1}}></div>

                 <div id="iu" style={{marginTop:15,color:'#515151',textIndent:25,letterSpacing:2,lineHeight:2}}>

                 </div>

             </div>
        </div>
    }
}


export default LawDetail
