/**
 * Created by lixin on 2018/4/18.
 */


import React from 'react'
import { NavBar,Icon, List,Accordion} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import {getTrainList} from '../config/api'

import styles,{GREY,BLUE} from '../config/style'
const Item = List.Item;
const Brief = Item.Brief;
class TrainList extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            titem:{},
            tlist:[]
        };
      }
    back = e => {
        const {history} = this.props
        history.goBack();
    };

    toDetailPage(id,item,ids){
        this.props.history.push('/trainDetail/'+id,{ids:ids})

    }

    componentDidMount() {
        let item = JSON.parse(this.props.location.state[0].item);
        this.setState({
            titem:item
        })

        getTrainList(item.auditeId).then((data) => {
            if(data.success){
                this.setState({
                    tlist:data.one.childs
                })
            }
        })
    }
    render(){
        const {titem,tlist} = this.state;
        let ids = [];

        return <div>

            <div style={{borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>


                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.back()}
                >培训</NavBar>
                <div style={{marginTop:50,background:BLUE,padding:10,fontSize:18,textAlign:'center',color:'#fff'}}>{titem.title}</div>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion defaultActiveKey="0" className="my-accordion">

                        {tlist.map((item,index)=>{
                            return <Accordion.Panel header={item.title} key={index}>
                                <List className="my-list">
                                    {item.childs.map((citem,index)=>{
                                        ids.push(citem.auditeId);
                                        return <List.Item key={index} onClick={(id) => this.toDetailPage(citem.auditeId,citem,ids)}>{citem.title}</List.Item>
                                        })}
                                </List>
                            </Accordion.Panel>
                            })}

                    </Accordion>
                </div>
            </div>
        </div>
    }
}

export default TrainList