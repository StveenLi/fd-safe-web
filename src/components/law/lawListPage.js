/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon,SearchBar, Button, List ,} from 'antd-mobile';
import {getLowNotice} from '../config/api'
const Item = List.Item;
const Brief = Item.Brief;

class LawList extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataList:[]
        };
      }


    componentWillMount() {
        getLowNotice().then(data => {
            if(data.success){
                this.setState({
                    dataList:data.list
                })
            }

        })
    }

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){


        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >法律法规</NavBar>
             {/*<SearchBar


                placeholder="搜索内容"
                ref={ref => this.manualFocusInst = ref}
            />*/}
            <List style={{marginTop:55}}>

                {
                    this.state.dataList.map((data,index) => {
                        return <Item multipleLine onClick={() => {this.props.history.push('/lawDetail',data)}}>
                                {data.title}<Brief>{data.type}</Brief>
                            <Brief>{data.creatTimetp}</Brief>
                        </Item>
                    })
                }

            </List>


        </div>
    }
}

export default LawList