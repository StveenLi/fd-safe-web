

import React from 'react'
import { NavBar,Icon,SearchBar, Button, List ,} from 'antd-mobile';
import styles,{BLUE,FONTGREY} from '../config/style'
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
const Item = List.Item;
const Brief = Item.Brief;


class ReportList extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataList:[],

            dataListUnGood:[],
            selectedValue:false
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
        let dataList = this.props.history.location.state[0].transmitParam;
        let dataListUnGood = [];
        for(let data of dataList){
            if(data.scores < 80){
                dataListUnGood.push(data);
            }
        }
        this.setState({dataList:dataList,dataListUnGood:dataListUnGood})

    }

    onModChange(e){

        const {dataList,dataListUnGood} = this.state


        console.log(e)
        this.setState({
            selectedValue:!this.state.selectedValue
        })

        if(this.state.selectedValue){
            let middleList = [];
            middleList = dataList
            this.setState({
                dataList:dataListUnGood,
                dataListUnGood:middleList
            })
        }else{
            let middleList = [];
            middleList = dataListUnGood
            this.setState({
                dataList:middleList,
                dataListUnGood:dataList
            })
        }



    }
    render(){

        const {dataList} = this.state

        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >搜索结果</NavBar>
            <div style={{margin:'60px 20px 0 0',textAlign:'right'}}>
            <label style={{margin:10,color:BLUE}}>
                <Checkbox
                    value={0}
                    onChange={(e) => this.onModChange(e)}/>&nbsp;&nbsp;仅显示不合格报告
            </label>
                </div>
            <List style={{marginTop:10}}>

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
                                    <div style={{fontSize:20,fontWeight:'bold',color:'#e41717',textAlign:'center'}}>{!item.isSign?item.scores>80?<span style={{color:'#1bb789'}}>{item.scores}</span>:<span>{item.scores}</span>:item.isSign ==0 ?<span style={{color:'#1bb789'}}>{item.scores}</span>:<span>{item.scores}</span>}<span style={{fontSize:12,color:'black'}}>&nbsp;&nbsp;分</span></div>
                                    <div style={{textAlign:'right',margin:'20px 0 0 0'}}><span style={{width:16,fontSize:16,backgroundColor:BLUE,color:'#fff',borderRadius:4,padding:'2px 10px'}}>{item.assessType}</span></div>
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