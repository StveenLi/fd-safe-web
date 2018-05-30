/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon, List} from 'antd-mobile';
import {queryPlanList} from '../config/api'
import {BLUE} from '../config/style'
const Item = List.Item;


class PlanPage extends React.Component{



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

    componentWillMount() {
        queryPlanList().then(data => {
            if(data.success){
                this.setState({
                    dataList:data.list
                })
            }
        })
    }


    toDetail(item){
        if(item.status === '已审核'){
            this.props.history.push(`/reportDetail/${item.planId}`)
        }
        if(item.status === '未审核'){
            let transmitParam = {};
            transmitParam.resId = [item.restId];
            transmitParam.typeId = item.planType;
            transmitParam.planId = item.planId;
            localStorage.setItem('auditLocation','1');
            this.props.history.push('/auditQuestions',[{transmitParam:transmitParam}]);
        }
    }

    render(){

        const {dataList} = this.state

        return <div>
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核计划</NavBar></div>
            <div style={{flex:1,marginTop:5}}>

                <List style={{marginTop:55}}>

                    {
                        dataList.map((item,index) => {
                            return <Item key={index} onClick={() => this.toDetail(item)}>
                                <div style={{display:'flex',flexDirection:'row',padding:'10px'}}>
                                    <div  style={{flex:1,}}>
                                        <div style={{fontSize:18,fontWeight:'bold'}}>{item.planCode}</div>
                                        <div style={{fontSize:14,color:'grey',paddingBottom:10}}>{item.restName}</div>
                                        <div style={{fontSize:14,color:'grey'}}>{item.buildDate}</div>
                                    </div>
                                    <div>
                                        <div style={{fontSize:20,fontWeight:'bold',color:'#e41717',textAlign:'center'}}></div>
                                        <div style={{textAlign:'right',margin:'20px 0 0 0'}}><span style={{width:16,fontSize:16,backgroundColor:item.status==='已审核'?BLUE:'#ff5b5b',color:'#fff',borderRadius:4,padding:'2px 10px'}}>{item.status}</span></div>
                                    </div>
                                </div>
                            </Item>
                        })

                    }
                </List>

            </div>



        </div>
    }

}

export default PlanPage