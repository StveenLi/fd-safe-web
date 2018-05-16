/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Button,Toast} from 'antd-mobile';
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from '../signature/index.js'
import {screenWidth,FONTGREY,GREY,BLUE} from '../config/style'
import {getAddressByXY,checkUnStandard,doStatistics,uploadByBase64} from '../config/api'
import Zmage from 'react-zmage'

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
        history.goBack();
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
        transmitParam.planId = parseInt(this.state.locationState.typeId[0]);
        transmitParam.auditName = firstAudit.fristTitle;
        transmitParam.questionIds = questionIds;
        transmitParam.resId = locationState.resId;
        this.props.history.push(`/questionDetail/${auditId}`,[{transmitParam:transmitParam}]);
    }

    toFuncPage(){
        doStatistics(this.state.locationState.planId,'123').then(data => {
            if(data.success){
                this.props.history.push('/auditComplete',[{transmitParam:data.list}]);
            }else {
                Toast.fail(data.msg,1)
            }
        })
    }
    clear = () => {
        this.sigPad.clear()
    }
    trim = () => {


        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')})
        uploadByBase64(this.sigPad.getTrimmedCanvas().toDataURL('image/png')).then(data => {
            console.log(data)
        })

    }

    
    componentWillMount() {
        const {typeId,resId,planId} = this.props.history.location.state[0].transmitParam;
        this.setState({
            locationX:localStorage.getItem('Longitude'),
            locationY:localStorage.getItem('Latitude'),
            locationState:this.props.history.location.state[0].transmitParam
        })

        checkUnStandard(planId).then(data => {
            if(data.success){
                this.setState({resAuditList:data.one});
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
                                                  key={index}>

                                    {
                                        secondAudit.assessOptions.map((thirdItem, index) => {
                                            return <div>
                                                <div style={{fontSize:15,color:FONTGREY}}>{`${secondAudit.secondTitle}.${thirdItem.sort}.${thirdItem.title}`}</div>
                                                <div style={{fontSize:15,color:'#e41717'}}>备注：{thirdItem.remarks}</div>
                                                <div>
                                                    {
                                                        thirdItem.imgs instanceof Array?thirdItem.imgs.map((fourthItem,index) => {
                                                            return <Zmage style={{width:'25%',height:'25%'}} src={fourthItem}></Zmage>
                                                        }):null
                                                    }
                                                </div>

                                            </div>
                                        })
                                    }
                                </List.Item>
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
            <div>
                    {
                        this.setAudits(childAssess)
                    }
            </div>
            <div style={{margin:'10px 0'}}>
                <div style={{margin: '0 5px 5px 10px',display:'flex',flexDirection:'row'}}><img style={{marginTop:3}} src={require('../assets/icon/signature.png')} width={20} height={20}></img>
                    <div style={{margin: '5px 5px 5px 10px'}}>餐厅负责人签名:</div>
                </div>
                <div></div>
            </div>
            <SignaturePad
                backgroundColor="#fff"
                canvasProps={{width:screenWidth,height:250,className: 'sigCanvas'}}
                ref={(ref) => { this.sigPad = ref }} />
            <div style={{margin:15,display:'flex',flexDirection:'row'}}>
                <Button style={{flex:1}} type="ghost" size='small'  onClick={() => this.clear()}>
                    重写
                </Button>
                <Button style={{flex:1}} type="ghost" size='small'  onClick={() => this.trim()}>
                    确认
                </Button>
            </div>
            <div style={{marginTop:10,marginBottom:85}}>
                <div style={{margin: '5px 5px 5px 10px',display:'flex',flexDirection:'row'}}>
                    <img style={{marginTop:3}} src={require('../assets/icon/location.png')} width={20} height={20}></img>
                    <div style={{flex:1,margin: '5px 5px 5px 10px'}}>{this.state.hereAddress==''?this.state.hereAddress:'暂无位置数据'}</div>
                    <div style={{marginRight:20}}><img style={{marginTop:3}} src={require('../assets/icon/refresh.png')} width={20} height={20}></img></div>
                </div>
                <div></div>
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button style={{background:BLUE}} type="primary" onClick={() => this.toFuncPage()}>提交</Button>
            </div>

        </div>
    }
}

export default AuditQuestions