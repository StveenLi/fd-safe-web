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
            unDoIds:[]
        };
      }

    back = e => {
        const {history} = this.props
        history.push('/startAudit');
    };
    onChange = (key) => {
        console.log(key);
    }
    toDetail(auditId,firstAudit){
        let transmitParam = {};
        let questionIds = [];
        const {locationState} = this.state;

        for(let fa of firstAudit.childAssess){
            questionIds.push(fa.auditeId);
        }
        transmitParam.planId = parseInt(this.state.locationState.planId);
        transmitParam.auditName = firstAudit.fristTitle;
        transmitParam.questionIds = questionIds;
        transmitParam.resId = locationState.resId;
        transmitParam.typeId = locationState.typeId;
        this.props.history.push(`/questionDetail/${auditId}`,[{transmitParam:transmitParam}]);
    }

    toFuncPage(){
        //doStatistics(this.state.locationState.planId,'123').then(data => {
            let transmitParam = {};
            const {locationState} = this.state;

            transmitParam.planId = parseInt(this.state.locationState.planId);
            transmitParam.resId = locationState.resId;
            transmitParam.typeId = locationState.typeId;
            //if(data.success){
                this.props.history.push('/auditQuestionsResult',[{transmitParam:transmitParam}]);
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
        this.setState({
            locationX:localStorage.getItem('Longitude'),
            locationY:localStorage.getItem('Latitude'),
            locationState:this.props.history.location.state[0].transmitParam
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
            let {unDoIds} = this.state;
            return <Accordion defaultActiveKey="0" accordion openAnimation={{}} className="my-accordion"
                       onChange={this.onChange}>
                {childAssess.map((firstAudit, aindex) => {
                    return <Accordion.Panel header={firstAudit.sort + '.' + firstAudit.fristTitle} className="pad"
                                            key={aindex}>
                        {
                            firstAudit.childAssess.map((secondAudit, index) => {
                                return <List.Item style={{background:'#fbfbff'}}
                                                  onClick={()=>this.toDetail(secondAudit.auditeId,firstAudit)}
                                                  key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{aindex + 1}.{index + 1}.{secondAudit.secondTitle}</List.Item>
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
            >审核条目</NavBar>
            <div style={{ marginTop: 55, marginBottom: 5 }}>
                <div style={{margin: '0 5px 5px 10px',display:'flex',flexDirection:'row'}}><img style={{marginTop:3}} src={require('../assets/icon/audit_list.png')} width={20} height={20}></img>
                    <div style={{margin: '5px 5px 5px 10px'}}>报告类目:</div>
                </div>
                <div></div>
            </div>
            <div style={{marginTop:10,marginBottom:85}}>
                    {
                        this.setAudits(childAssess)
                    }
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button style={{background:BLUE}} type="primary" onClick={() => this.toFuncPage()}>提交</Button>
            </div>

        </div>
    }
}

export default AuditQuestions