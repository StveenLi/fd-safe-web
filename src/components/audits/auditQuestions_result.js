/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Button,Toast,InputItem} from 'antd-mobile';
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
            unDoIds:[],
            reserSignUrl:'',
            auditerSignUrl:'',
            signText:''
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
        transmitParam.planId = parseInt(this.state.locationState.planId);
        transmitParam.auditName = firstAudit.fristTitle;
        transmitParam.questionIds = JSON.parse(localStorage.getItem('questionIds'));
        transmitParam.resId = locationState.resId;
        transmitParam.typeId = locationState.typeId;
        this.props.history.push(`/questionDetail/${auditId}`,[{transmitParam:transmitParam}]);
    }

    toFuncPage(){
        const {reserSignUrl,auditerSignUrl,signText} = this.state
        if(reserSignUrl==''||auditerSignUrl==''){
            Toast.fail('双方签名确认之后才可提交',1);
        }else if(signText == ''){
            Toast.fail('餐厅负责人签名标注不能为空',1);
        }else{
            doStatistics(this.state.locationState.planId,reserSignUrl,auditerSignUrl,signText).then(data => {
                if(data.success){
                    this.props.history.push('/auditComplete',[{planId:this.state.locationState.planId,transmitParam:data.list,resId:this.state.locationState.resId,typeId:this.state.locationState.typeId}]);
                }else {
                    Toast.fail(data.msg,1)
                }
            })
        }

    }
    clear = () => {
        this.sigPad.clear();
        this.sigPad.on();
    }
    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')})
        uploadByBase64(this.sigPad.getTrimmedCanvas().toDataURL('image/png')).then(data => {
            if(data.success){
                this.setState({reserSignUrl:data.url})
                this.sigPad.off();
            }
        })
    }

    auditerTrim = () => {
        this.setState({trimmedDataURL: this.sigPadAuditer.getTrimmedCanvas().toDataURL('image/png')})
        uploadByBase64(this.sigPadAuditer.getTrimmedCanvas().toDataURL('image/png')).then(data => {
            if(data.success){
                this.setState({auditerSignUrl:data.url})
                this.sigPadAuditer.off();
            }
        })

    }

    auditerClear = () => {
        this.sigPadAuditer.clear();
        this.sigPadAuditer.on();
    }

    
    componentWillMount() {
        Toast.loading('加载中……', 0, true);
        const {typeId,resId,planId} = this.props.history.location.state[0].transmitParam;
        this.setState({
            locationX:localStorage.getItem('Longitude'),
            locationY:localStorage.getItem('Latitude'),
            locationState:this.props.history.location.state[0].transmitParam
        })

        checkUnStandard(planId).then(data => {
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
            let {unDoIds,questionIds} = this.state;
            return <Accordion activeKey={['0','1','2','3','4','5','6','7']} className="my-accordion"
                       onChange={this.onChange}>
                {childAssess.map((firstAudit, aindex) => {
                    return <Accordion.Panel  header={firstAudit.fristTitle} className="pad"
                                            key={aindex}>
                        {
                            firstAudit.childAssess.map((secondAudit, index) => {
                                return <List.Item style={{background:'#fbfbff'}}

                                                  key={index}>
                                    <div style={{fontSize:15}} onClick={()=>this.toDetail(secondAudit.auditeId,firstAudit,questionIds)}>{secondAudit.secondTitle}</div>

                                    {
                                        secondAudit.assessOptions.map((thirdItem, index) => {
                                            return <div key={index}>
                                                <div onClick={()=>this.toDetail(secondAudit.auditeId,firstAudit,questionIds)}>
                                                        <div style={{fontSize:15,color:'#e41717'}}>{thirdItem.title.substr(2,thirdItem.title.length)}</div>
                                                        <div style={{fontSize:15,color:FONTGREY}}>备注：{thirdItem.remarks}</div>
                                                </div>
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


    refreshLocation(){
        this.getLocation();

    }


    getLocation(){
        const {locationState} = this.state;
        let self = this;
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(savePosition);
        }
        else{
            console.log('未被允许');
        }


        function savePosition(position){
            self.setState({hereAddress:'查询中……'});
            localStorage.setItem('Latitude',position.coords.latitude);
            localStorage.setItem('Longitude',position.coords.longitude);
            self.setState({
                locationX:position.coords.longitude,
                locationY:position.coords.latitude
            })
            getAddressByXY(locationState.resId[0],position.coords.longitude,position.coords.latitude).then(data => {
                if(data.success){
                    self.setState({hereAddress:data.address});
                }else{
                    self.setState({hereAddress:data.msg});
                }
            })
        }
    }
    //savePosition(position){
    //    const {locationState} = this.state;
    //    localStorage.setItem('Latitude',position.coords.latitude);
    //    localStorage.setItem('Longitude',position.coords.longitude);
    //    this.setState({
    //        locationX:position.coords.longitude,
    //        locationY:position.coords.latitude
    //    })
    //    getAddressByXY(locationState.resId[0],position.coords.longitude,position.coords.latitude).then(data => {
    //        if(data.success){
    //            this.setState({hereAddress:data.address});
    //        }else{
    //            this.setState({hereAddress:data.msg});
    //        }
    //    })
    //}
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
            <Accordion className="my-accordion" onChange={this.onChange}>
                <Accordion.Panel header="确认签名">
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
                    <InputItem
                        type='text'
                        placeholder="请输入签名"
                        clear
                        onChange={(v) => { this.setState({signText:v}) }}
                        onBlur={(v) => { this.setState({signText:v}) }}
                        keyboardAlign="right"
                        textAlign="right"
                    >签名标注</InputItem>
                    <div style={{margin:15,display:'flex',flexDirection:'row'}}>
                        <Button style={{flex:1,marginRight:5}} type="ghost" size='small'  onClick={() => this.clear()}>
                            重写
                        </Button>
                        <Button style={{flex:1,marginLeft:5}} type="ghost" size='small'  onClick={() => this.trim()}>
                            确认
                        </Button>
                    </div>
                    <div style={{margin:'10px 0'}}>
                        <div style={{margin: '0 5px 5px 10px',display:'flex',flexDirection:'row'}}><img style={{marginTop:3}} src={require('../assets/icon/signature.png')} width={20} height={20}></img>
                            <div style={{margin: '5px 5px 5px 10px'}}>审核员签名:</div>
                        </div>
                        <div></div>
                    </div>
                    <SignaturePad
                        backgroundColor="#fff"
                        canvasProps={{width:screenWidth,height:250,className: 'sigCanvas'}}
                        ref={(ref) => { this.sigPadAuditer = ref }} />

                    <div style={{margin:15,display:'flex',flexDirection:'row'}}>
                        <Button style={{flex:1,marginRight:5}} type="ghost" size='small'  onClick={() => this.auditerClear()}>
                            重写
                        </Button>
                        <Button style={{flex:1,marginLeft:5}} type="ghost" size='small'  onClick={() => this.auditerTrim()}>
                            确认
                        </Button>
                    </div>
                </Accordion.Panel>
            </Accordion>

            <div style={{marginTop:10,marginBottom:85}}>
                <div style={{margin: '5px 5px 5px 10px',display:'flex',flexDirection:'row'}}>
                    <img style={{marginTop:3}} src={require('../assets/icon/location.png')} width={20} height={20}></img>
                    <div style={{flex:1,margin: '5px 5px 5px 10px'}}>{this.state.hereAddress}</div>
                    <div style={{marginRight:20}} onClick={() => this.refreshLocation()}><img style={{marginTop:3}} src={require('../assets/icon/refresh.png')} width={20} height={20}></img></div>
                </div>
                <div></div>
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button style={{background:BLUE}} type="primary" onClick={() => this.toFuncPage()}>审核提交</Button>
            </div>

        </div>
    }
}

export default AuditQuestions