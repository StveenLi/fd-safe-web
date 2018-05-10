/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Badge,Popover,Checkbox,Modal} from 'antd-mobile';
import styles,{GREY,BLUE} from '../config/style'
import {getQuestionDetail} from '../config/api'

const Item = Popover.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;


class QuestionDetail extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            locationState:{},
            visible: false,
            selected: '',
            questionItem:[],
            titleInfo:{}
        };
      }
    back = e => {
        const {history} = this.props
        history.goBack();
    };

    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    subQuestion(){

        this.props.history.push('/auditComplete')

    }

    onChange = (val) => {
        console.log(val);
    }


    componentWillMount() {
        this.setState({
            locationState:this.props.history.location.state[0].transmitParam
        })
    }

    componentDidMount() {
        const {locationState,titleInfo,questionItem} = this.state
        getQuestionDetail(locationState.planId,locationState.auditId).then(data => {
            if(data.success){
                let questions = [];
                titleInfo.secondTitle = data.one.secondTitle;
                titleInfo.thridTitle = data.one.thridTitle;
                for(let op of data.one.assessOptions){
                    questions.push({ value: op.supAuditeId, label: op.title });
                }
                this.setState({
                    questionItem:questions
                })
            }
        })
    }


    noUse(){
        alert('不适用','确定该题目不适用吗？' ,[
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => this.submitNoUse() },
            ])
    }

    submitNoUse(){





    }


    nextQuestion(){

    }




    render(){
        const {questionItem,locationState,titleInfo} = this.state;
        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            > {locationState.auditName}</NavBar>

            <div style={{marginTop:45,backgroundColor:BLUE,padding:15,color:'#fff',display:'flex',flexDirection:'row'}}>
                <div style={{flex:1,fontSize:18,marginTop:5,marginLeft:70}}>{titleInfo.secondTitle}</div>
                <div
                    onClick={() => this.noUse()}
                    style={styles.no_use}>不适用</div>
            </div>
            <div style={{backgroundColor:'#fff',padding:15,textAlign:'left'}}>
                <div style={{fontSize:18,padding:'15px 15px 0 15px'}}>{titleInfo.thridTitle}</div>
                <div style={{textAlign:'right',margin:15,borderBottomStyle:'solid',borderWidth:1,borderBottomColor:GREY,paddingBottom:15,color:BLUE}}>

                    <Popover mask
                             overlayClassName="fortest"
                             overlayStyle={{ color: 'currentColor' }}
                             visible={this.state.visible}
                             overlay={[
              (<Item key="4" value="scan" data-seed="logId">视频详情</Item>),
              (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>图文详情</Item>),
            ]}
                             align={{
                                      overflow: { adjustY: 0, adjustX: 0 },
                                      offset: [-10, 0],
                                    }}
                             onVisibleChange={this.handleVisibleChange}
                             onSelect={this.onSelect}
                    >
                        <img width={20} height={20} src={require('../assets/icon/book.png')}></img>
                    </Popover>
                </div>
                <List>
                    {
                        questionItem.map((item, index) => {
                            return <CheckboxItem wrap key={index} onChange={() => this.onChange(item.value)}>
                                {item.label}
                                <div
                                    onClick={() => this.props.history.push('/remarks')}
                                    style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注
                                </div>
                            </CheckboxItem>
                        })
                    }
                </List>
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'flex',backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}>
                <div style={{flex:1}}>
                    <img style={{width:50}} src={require('../assets/icon/p_question.png')}></img>
                    <div style={{padding:10}}>上一题</div>
                </div>
                <div
                    onClick={() => this.subQuestion()}
                    style={{lineHeight:'70px',background:'#fec032',borderRadius:'50%',width:70,height:70}}>提交</div>
                <div style={{flex:1}}>
                    <img style={{width:50}} src={require('../assets/icon/n_question.png')}></img>
                    <div style={{padding:10}}>下一题</div>
                </div>
            </div>


        </div>
    }
}

export default QuestionDetail
