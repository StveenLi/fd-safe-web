/**
 * Created by lixin on 2018/4/18.
 */


import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace,Button,SearchBar, List} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import {getLawTrainData, getTrainIndex,getAllContent} from '../config/api'
import styles,{GREY,BLUE} from '../config/style'
const Item = List.Item;
const Brief = Item.Brief;
class TrainIndex extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tlist:[],
            lawTrainList:[]
        };
      }
    back = e => {
        const {history} = this.props
        history.goBack();
    };

    toListPage(item){
        this.props.history.push('/trainList',[{item:JSON.stringify(item)}])
    }

    componentDidMount() {
		getAllContent('PX').then((data) => {
			if(data.success){
				this.setState({
                    lawTrainList:data.list
                })
			}
		})
    }

    toLawDetailPage(data){
        this.props.history.push('/lawDetail',data);
    }


    render(){
        const {tlist,lawTrainList} = this.state
        return <div>

            <div style={{borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.back()}
                >培训</NavBar>
                <div style={{marginTop:50}}></div>

                {tlist.map((item,i) =>{
                    return <div key={i} style={{background:'#fff',position:'relative',borderBottomStyle:'solid',borderColor:GREY}}
                         onClick={(it) => this.toListPage(item)}>
                        <div style={{padding:20,fontSize:18}}>{item.title}
                        </div>
                        <div style={{padding:'0 20px 20px 20px',display:'flex',flexDirection:'row',color:BLUE}}>
                            <div>
                                <img style={{width:20,marginRight:10}} src={require('../assets/icon/train_icon.png')}></img>
                            </div>
                            <div style={{marginLeft:20}}>{item.leimuSize}大类目</div>
                        </div>
                        <div style={{position:'absolute',bottom:0,right:0}}>
                            <img style={{width:100}} src={require('../assets/icon/train_item.png')}></img>
                        </div>
                    </div>
                    })
                }

                {lawTrainList.map((item,i) =>{
                    return <div key={i} style={{background:'#fff',position:'relative',borderBottomStyle:'solid',borderColor:GREY}}
                                onClick={() => {this.props.history.push('/trainNodes',item)}}>
                        <div style={{padding:20,fontSize:18}}>{item.title}
                        </div>
                        <div style={{padding:'0 20px 20px 20px',display:'flex',flexDirection:'row',color:BLUE}}>
                            <div>
                                <img style={{width:20,marginRight:10}} src={require('../assets/icon/train_icon.png')}></img>
                            </div>
                            <div style={{marginLeft:20}}></div>
                        </div>
                        <div style={{position:'absolute',bottom:0,right:0}}>
                            <img style={{width:100}} src={require('../assets/icon/train_item.png')}></img>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    }
}

export default TrainIndex