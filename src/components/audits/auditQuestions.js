/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Button,Toast} from 'antd-mobile';
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from '../signature/index.js'
import {screenWidth,FONTGREY,GREY,BLUE} from '../config/style'
import {getAddressByXY,getAssessList,doStatistics} from '../config/api'
class AuditQuestions extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            locationState:{},
            locationX:'',
            locationY:'',
            hereAddress:'',
            resAuditList:{},
            questionIds:[],
            unDoIds:[],
            auditLocation:0
        };
      }

    back = e => {

        const {history} = this.props
        history.push('/startAudit');
    };
    onChange = (key) => {
        console.log(key);
    }
    toDetail(auditId,firstAudit,questionIds){

        let transmitParam = {};
        const {locationState} = this.state;

        //for(let fa of firstAudit.childAssess){
        //    questionIds.push(fa.auditeId);
        //}
        transmitParam.planId = parseInt(this.state.locationState.planId);
        transmitParam.auditName = firstAudit.fristTitle;
        transmitParam.questionIds = questionIds;
        transmitParam.resId = locationState.resId;
        transmitParam.typeId = locationState.typeId;
        console.log(transmitParam.questionIds)
        this.props.history.push(`/questionDetail/${auditId}`,[{transmitParam:transmitParam}]);
    }

    async toFuncPage(){

        const {typeId,resId} = this.props.history.location.state[0].transmitParam;
        let dolast = true;

        Toast.loading('查询中……', 0, true);
        await getAssessList(typeId[0],resId[0]).then(data => {
            if(data.success){
                for(let first of data.one.childAssess){
                    for(let second of first.childAssess){
                        if(second.isDo!=1){
                            Toast.hide();
                            Toast.fail('还未做完所有检查！',1);
                            dolast = false;
                            return false;
                        }
                    }
                }
            }
        })

        //doStatistics(this.state.locationState.planId,'123').then(data => {
        if(dolast){
            let transmitParam = {};
            const {locationState} = this.state;

            transmitParam.planId = parseInt(this.state.locationState.planId);
            transmitParam.resId = locationState.resId;
            transmitParam.typeId = locationState.typeId;
            //if(data.success){
            this.props.history.push('/auditQuestionsResult',[{transmitParam:transmitParam}]);
        }
            //}else {
            //    Toast.fail(data.msg,1)
            //}
        //})
    }
    clear = () => {
        this.sigPad.clear()
    }
    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png')})
    }

    
    componentWillMount() {
        Toast.loading('加载中……', 0, true);
        const {typeId,resId} = this.props.history.location.state[0].transmitParam;
        let auditLocation = localStorage.getItem('auditLocation').substring(0,1);
        this.setState({
            locationX:localStorage.getItem('Longitude'),
            locationY:localStorage.getItem('Latitude'),
            locationState:this.props.history.location.state[0].transmitParam,
            auditLocation:auditLocation
        })

        getAssessList(typeId[0],resId[0]).then(data => {
            if(data.success){
                this.setState({resAuditList:data.one});
                Toast.hide();

            }
        })
    }

    componentDidMount() {
        const {locationState,locationX,locationY} = this.state
        getAddressByXY(locationState.resId[0],locationX,locationY).then(data => {
            if(data.success){
                this.setState({hereAddress:data.address});
            }else{
                this.setState({hereAddress:data.msg});
            }
        })
    }
    
    
    setAudits(childAssess){
            let {unDoIds,auditLocation} = this.state;
            let questionIds = [];
            return <Accordion defaultActiveKey={(auditLocation-1).toString()} accordion openAnimation={{}} className="my-accordion"
                       onChange={this.onChange}>
                {childAssess.map((firstAudit, aindex) => {
                    let dos = 0;
                    firstAudit.childAssess.forEach((item,index)=>{if(item.isDo == 1){dos++;}})
                    return <Accordion.Panel header={<div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{flex:1}}>{firstAudit.fristTitle}</div>
                    <div style={{color:'#e41717',marginRight:10}}>{dos != firstAudit.childAssess.length?`${dos}/${firstAudit.childAssess.length}`:<img style={{width:20,marginTop:11}} src={require('../assets/icon/yes_green.svg')}/>}</div>
                    </div>}
                                            className="pad"
                                            key={aindex}>
                        {
                            firstAudit.childAssess.map((secondAudit, index) => {
                                if(questionIds.indexOf(secondAudit.auditeId)==-1){
                                        questionIds.push(secondAudit.auditeId);
                                }
                                return <List.Item style={{background:'#fbfbff'}}
                                                  onClick={()=>this.toDetail(secondAudit.auditeId,firstAudit,questionIds)}
                                                  key={index}><div style={{display:'flex',flexDirection:'row'}}><div style={{flex:1}}>&nbsp;&nbsp;&nbsp;&nbsp;{secondAudit.secondTitle}</div>{secondAudit.isDo==1?<div><img style={{width:15}} src={require('../assets/icon/yes.svg')}/></div>:null}</div></List.Item>
                            })
                        }
                    </Accordion.Panel>
                })
                }
            </Accordion>
        }


    render(){

        const {resAuditList} = this.state;
        let childAssess = [];
        if(resAuditList.childAssess instanceof Array){
            childAssess = resAuditList.childAssess;
        }
        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核目录</NavBar>
            <div style={{ marginTop: 55, marginBottom: 5 }}>

                <div></div>
            </div>
            <div style={{marginTop:10,marginBottom:85}}>
                    {
                        this.setAudits(childAssess)
                    }
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button style={{background:BLUE}} type="primary" onClick={() => this.toFuncPage()}>审核确认</Button>
            </div>

        </div>
    }
}

export default AuditQuestions