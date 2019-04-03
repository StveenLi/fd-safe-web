/**
 * Created by lixin on 2018/4/18.
 */


import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace,Button,SearchBar, List,Toast} from 'antd-mobile';
import {getTrainDetail} from '../config/api'

import styles,{GREY,BLUE} from '../config/style'
const Item = List.Item;
const Brief = Item.Brief;
class TrainDetail extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            //titem:{},
            qid:'',
            fullWeb:{},
            ids:[],
            vid:''
        };
      }
    back = e => {
        const {history} = this.props
        history.goBack();
    };

    componentDidMount() {
        let qid = this.props.match.params.qid
        let ids = (this.props.location.state.ids)
        this.setState({
            //titem:item,
            qid:qid,
            ids:ids
        })
        getTrainDetail(qid).then(data=>{
            this.setState({
                fullWeb:data.list[0],
                vid:data.list[0].fileUrl
            })
            if(data.list[0].fuwenben!=null){
                document.getElementById('iu').innerHTML = data.list[0].fuwenben;
            }else {
                document.getElementById('iu').innerHTML = '暂无培训数据';
            }
        })
    }

    nextQuestion(){
        const {qid,titem,ids} = this.state
        if(ids.indexOf(parseInt(qid)) == ids.length-1) {
            Toast.fail('已经是最后一题了！', 1);
            return;
        }else{
            this.props.history.replace('/trainDetail/'+(ids[ids.indexOf(parseInt(qid))+1]),{ids:ids})
        }
    }


    previousQuestion(){
        const {qid,titem,ids} = this.state
        if(ids.indexOf(parseInt(qid)) == 0){
            Toast.fail('这是第一题！', 1);
            return;
        }else{
            this.props.history.replace('/trainDetail/'+(ids[ids.indexOf(parseInt(qid))-1]),{ids:ids})
        }

    }

    lastSub(){
        this.back()
    }


    render(){
        const {fullWeb} = this.state
        const {vid} = this.state
        return <div>

            <div style={{borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>


                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.back()}
                >培训</NavBar>
                <div style={{marginTop:50,background:BLUE,padding:10,fontSize:18,textAlign:'center',color:'#fff'}}>{fullWeb.fartherTitle}</div>
                <div style={{padding:15,fontSize:14}}>
                    {fullWeb.title}
                </div>
                <div style={{background:'#fff'}}>
                    {
                        vid !=null?<video style={{width:'100%'}} src={vid} controls="controls">
                        </video>:null
                    }
                <div style={{background:'#fff',padding:20,textAlign:'center'}} id="iu">

                </div>
                </div>
                <div style={{textAlign:'center',position:'fixed',bottom:0,width:'100%',display:'flex',backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}>
                    <div style={{flex:1}} onClick={() => this.previousQuestion()}>
                        <img
                            style={{width:50}} src={require('../assets/icon/p_question.png')}></img>
                        <div style={{padding:10}}>上一节</div>
                    </div>

                    <div
                        style={{marginTop:10,lineHeight:'70px',background:'#fec032',borderRadius:'50%',width:70,height:70,color:'#fff'}} onClick={()=>this.lastSub()}>完成</div>
                    <div style={{flex:1}} onClick={() => this.nextQuestion()}>
                        <img style={{width:50}} src={require('../assets/icon/n_question.png')}></img>
                        <div style={{padding:10}} >下一节</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default TrainDetail