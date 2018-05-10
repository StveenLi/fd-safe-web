

import React from 'react'
import { NavBar,Icon,SearchBar, Button, List ,} from 'antd-mobile';
import styles,{BLUE,FONTGREY} from '../config/style'
const Item = List.Item;
const Brief = Item.Brief;

class ReportList extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };

    toDetail(){
        this.props.history.push('/reportDetail')
    }

    render(){


        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >搜索结果</NavBar>

            <List style={{marginTop:50}}>
                <Item onClick={() => this.toDetail()}>
                    <div style={{display:'flex',flexDirection:'row',padding:'10px'}}>
                        <div  style={{flex:1,}}>
                            <div style={{fontSize:18,fontWeight:'bold'}}>2018042793854</div>
                            <div style={{fontSize:14,color:FONTGREY,paddingBottom:10}}>望湘园徐泾店(21101)</div>
                            <div style={{fontSize:14,color:FONTGREY}}>2018-04-27</div>
                        </div>
                        <div>
                            <div style={{fontSize:20,fontWeight:'bold',color:'#e41717',textAlign:'center'}}>75</div>
                            <div style={{fontSize:16,backgroundColor:BLUE,color:'#fff',borderRadius:4,padding:'2px 10px',margin:'20px 0 0 0'}}>内审</div>
                        </div>
                    </div>
                </Item>
            </List>

        </div>
    }
}

export default ReportList