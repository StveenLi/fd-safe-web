/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Badge,Popover,Checkbox,Modal,Toast} from 'antd-mobile';
import styles,{GREY,BLUE} from '../config/style'
import {getQuestionDetail,submitAssess} from '../config/api'
import Remarks from './remarks'
const Item = Popover.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;


class QuestionDetail extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            auditId:'',
            locationState:{},
            visible: false,
            selected: '',
            questionItem:[],
            initQuestionItem:[],
            titleInfo:{},
            chooseValues:[],
            imgUrl:'',
            videoUrl:'',
            toRemarkPage:false,
            currentItem:'',
            currentQuestion:'',
            remarkList:[]
        };
      }
    back = e => {
        const {history} = this.props;
        const {locationState} = this.state;
        let transmitParam = {};
        transmitParam.resId = locationState.resId;
        transmitParam.typeId = locationState.typeId;
        transmitParam.planId = locationState.planId;
        history.push('/auditQuestions',[{transmitParam:transmitParam}]);
    };

    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        opt.props.value == 'video'?this.props.history.push('/trainVideoPage',[{videoUrl:this.state.videoUrl}]):this.props.history.push('/trainImgDetailPage',[{imgUrl:this.state.imgUrl}])
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    subQuestion(){

        this.initSubJsonController(1,false,true)

    }

    onChange = (val) => {
        let values = this.state.chooseValues;
        if(values.indexOf(val)>-1){
            values.splice(values.indexOf(val),1);
        }else{
            values.push(val);
        }
        this.setState({
            chooseValues:values
        })
    }


    componentWillMount() {
        this.setState({
            auditId:this.props.match.params.qid,
            locationState:this.props.history.location.state[0].transmitParam
        })
    }

    componentDidMount() {
        const {locationState,auditId} = this.state
        this.pageChange(locationState.planId,auditId);
    }

    //切换页面重新获取数据
    pageChange(planId,auditId){
        getQuestionDetail(planId,auditId).then(data => {
            if(data.success){
                let questions = [];
                let chooseVals = [];
                let titleInfo = {};
                let remarkList = [];
                titleInfo.secondTitle = data.one.secondTitle;
                titleInfo.thridTitle = data.one.thridTitle;
                for(let op of data.one.assessOptions){
                    if(op.ownPoint>0){
                        chooseVals.push(op.auditeId);
                    }
                    questions.push({ value: op.auditeId, label: op.title });
                    remarkList.push({itemId:op.auditeId,content:op.remarks,images:op.imgs})
                }
                
                
                this.setState({
                    initQuestionItem:data.one.assessOptions,
                    questionItem:questions,
                    titleInfo:titleInfo,
                    chooseValues:chooseVals,
                    imgUrl:data.one.imgUrl,
                    videoUrl:data.one.videoUrl,
                    remarkList:remarkList
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
        this.initSubJsonController(1,true)
    }
    
    //location控制上下题 isNoUse控制适用否
    initSubJsonController(location,isNoUse,isSubmit){
        const {locationState,chooseValues,initQuestionItem,remarkList} = this.state;
        let subArr = [];
        for(let item of initQuestionItem){
            let subJson = {}
            subJson.auditeId = item.auditeId;
            subJson.planId = locationState.planId;
            subJson.supAuditeId = item.supAuditeId;

            //如果选择了
            
            if(isNoUse){
                subJson.ownPoint = 0
            }else if(chooseValues.indexOf(item.auditeId)>-1){
                subJson.ownPoint = item.point
            }else{
                subJson.ownPoint = - item.point
            }
            subJson.point = item.point;
            if(isNoUse){
                subJson.supPoint = 0;
            }else{
                subJson.supPoint = item.supPoint;
            }
            
            for(let remark of remarkList){
                if(remark.itemId == item.auditeId){
                    subJson.remarks = remark.content;
                    subJson.imgs = remark.images;
                }
            }
            
            subJson.isKey = item.isKey;
            subArr.push(subJson)
        }
        let nextTopic = 1;
        submitAssess(JSON.stringify(subArr),nextTopic).then(data => {
            if(data.success){
                this.submitAssessSuccessFunc(location,isSubmit)
            }else{
                Toast.fail(data.msg,1);
            }
        })
    }

    submitAssessSuccessFunc(location,isSubmit,isRemark){
        const {locationState} = this.state;
        let {auditId} = this.state;
        if(isSubmit){
            const {history} = this.props;
            let transmitParam = {};
            transmitParam.resId = locationState.resId;
            transmitParam.typeId = locationState.typeId;
            transmitParam.planId = locationState.planId;
            history.push('/auditQuestions',[{transmitParam:transmitParam}]);
        }else{
            let nextAuditId = locationState.questionIds[locationState.questionIds.indexOf(parseInt(auditId))+location];
            this.props.history.push(`/questionDetail/${nextAuditId}`,[{transmitParam:locationState}]);
            
        }
        
    }

    nextQuestion(){
        let {locationState,auditId} = this.state;
        if(!locationState.questionIds){
            Toast.fail('数据不存在，请刷新重试!', 1);
            return;
        }
        if(locationState.questionIds.indexOf(parseInt(auditId)) + 1 == locationState.questionIds.length){
            Toast.fail('已经是最后一题了！', 1);
            return;
        }
        this.initSubJsonController(1);
    }
    
    
    
    

    previousQuestion(){
        const {locationState,auditId} = this.state;
        if(locationState.questionIds.indexOf(parseInt(auditId)) == 0){
            Toast.fail('这是第一题！', 1);
            return;
        }
        this.initSubJsonController(-1);
    }
    
    getCheckBoxList(questionItem){
        const {chooseValues,toRemarkPage} = this.state
        return <List>
            {
                questionItem.map((item, index) => {
                    return <CheckboxItem defaultChecked={chooseValues.indexOf(item.value)>-1} key={index} wrap key={index}
                                         onChange={() => this.onChange(item.value)}>
                        {item.label}
                        
                        {
                            this.state.chooseValues.indexOf(item.value)>-1?null:<div
                                onClick={() => this.setState({currentQuestion:item.label,currentItem:item.value,toRemarkPage:!toRemarkPage,})}
                                style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注
                            </div>
                            
                        }
                        
                    </CheckboxItem>
                })
            }
            </List>
    }


    toVideoPage(){
        this.props.history.push('/trainVideoPage');
    }
    toImgDetailPage(){
        
    }

    changePageStatus(remarkValue){
        const {toRemarkPage} = this.state
        let rArray = this.state.remarkList
        rArray.push(remarkValue);
        this.setState({toRemarkPage:!toRemarkPage,remarkList:rArray})
    }


    render(){
        const {questionItem,locationState,titleInfo,auditId,toRemarkPage} = this.state;
        return !toRemarkPage?<div style={{textAlign:'center'}}>
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
                                  (<Item onClick={() => this.toVideoPage()} key="4" value="video" data-seed="logId">
                                  <div style={{display:'flex',flexDirection:'row'}}>
                                    <div style={{margin:'1.5px 2px 0 0'}}>
                                        <img width={15} height={15} src={require('../assets/icon/ic_video@3x.png')}/>
                                    </div>
                                    <div style={{color:BLUE}}>视频详情</div>
                                    </div>
                                    </Item>),

                                  (<Item onClick={() => this.toImgDetailPage()} key="5" value="img" style={{ whiteSpace: 'nowrap' }}>
                                  <div style={{display:'flex',flexDirection:'row'}}>
                                    <div style={{margin:'1.5px 2px 0 0'}}>
                                        <img width={15} height={15} src={require('../assets/icon/ic_img@3x.png')}/>
                                    </div>
                                    <div style={{color:BLUE}}>图文详情</div>
                                    </div>
                                    </Item>),
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
                    {
                        this.getCheckBoxList(questionItem)
                        /*questionItem.map((item, index) => {
                            return <CheckboxItem defaultChecked={false}  key={index} wrap key={index} onChange={() => this.onChange(item.value)}>
                                {item.label}
                                <div
                                    onClick={() => this.props.history.push('/remarks')}
                                    style={{textAlign:'right',color:BLUE,paddingRight:15}}>备注
                                </div>
                            </CheckboxItem>
                        })*/
                    }
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'flex',backgroundColor:'#fff',paddingTop:15,paddingBottom:15}}>
                <div onClick={() => this.previousQuestion()} style={{flex:1}}>
                    <img 
                        style={{width:50}} src={require('../assets/icon/p_question.png')}></img>
                    <div style={{padding:10}}>上一题</div>
                </div>
                

                    <div
                        onClick={locationState.questionIds.indexOf(parseInt(auditId)) + 1 == locationState.questionIds.length?() => this.subQuestion():() => this.nextQuestion()}
                        style={{marginTop:10,lineHeight:'70px',background:'#fec032',borderRadius:'50%',width:70,height:70}}>提交</div>

                
                <div onClick={() => this.nextQuestion()} style={{flex:1}}>
                    <img style={{width:50}} src={require('../assets/icon/n_question.png')}></img>
                    <div style={{padding:10}} >下一题</div>
                </div>
            </div>


            </div>:<Remarks currentQuestion={this.state.currentQuestion} changePageStatus={(remarkValue) => this.changePageStatus(remarkValue)} remarkList={this.state.remarkList}  currentItem={this.state.currentItem}/>
    }
}

export default QuestionDetail
