

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
        this.state = {
            dataList:[]
        };
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };

    toDetail(item){
        this.props.history.push(`/reportDetail/${item.assessId}`)
    }

    componentWillMount() {
        this.setState({dataList:this.props.history.location.state[0].transmitParam})
    }

    render(){

        const {dataList} = this.state

        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >搜索结果</NavBar>

            <List style={{marginTop:50}}>
                {
                    dataList.map((item,index) => {
                        return <Item key={index} onClick={() => this.toDetail(item)}>
                            <div style={{display:'flex',flexDirection:'row',padding:'10px'}}>
                                <div  style={{flex:1,}}>
                                    <div style={{fontSize:18,fontWeight:'bold'}}>{item.nr}</div>
                                    <div style={{fontSize:14,color:FONTGREY,paddingBottom:10}}>{item.title}</div>
                                    <div style={{fontSize:14,color:FONTGREY}}>{item.assessDate}</div>
                                </div>
                                <div>
                                    <div style={{fontSize:20,fontWeight:'bold',color:'#e41717',textAlign:'center'}}>{item.scores>80?<span style={{color:'#1bb789'}}>{item.scores}</span>:<span>{item.scores}</span>}<span style={{fontSize:12,color:'black'}}>&nbsp;&nbsp;分</span></div>
                                    <div style={{fontSize:16,backgroundColor:BLUE,color:'#fff',borderRadius:4,padding:'2px 10px',margin:'20px 0 0 0'}}>{item.assessType}</div>
                                </div>
                            </div>
                        </Item>
                    })

                }
            </List>

        </div>
    }
}

export default ReportList