/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Button,Toast,InputItem} from 'antd-mobile';
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from '../signature/index.js'
import styles,{screenWidth,FONTGREY,GREY,BLUE} from '../config/style'
import {getAddressByXY,checkUnStandard,doStatistics,uploadByBase64} from '../config/api'
import Zmage from 'react-zmage'
import Sign from './sign'

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
            signText:'',
            isSignPage:false,
            url1:'',
            url2:'',
            currentSign:1,
			nd:'',
			bhh:''
        };
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    onChange = (key) => {
        console.log(key);
    }
    toDetail(auditId,firstAudit,questionIds,isJumpToRemarkId){
        let transmitParam = {};
        questionIds = [];
        const {locationState} = this.state;

        for(let fa of firstAudit.childAssess){
            questionIds.push(fa.auditeId);
        }
        transmitParam.planId = parseInt(this.state.locationState.planId);
        transmitParam.auditName = firstAudit.fristTitle;
        transmitParam.questionIds = JSON.parse(localStorage.getItem('questionIds'));
        transmitParam.resId = locationState.resId;
        transmitParam.typeId = locationState.typeId;
        transmitParam.isJumpToRemarkId = isJumpToRemarkId;
        this.props.history.push(`/questionDetail/${auditId}`,[{transmitParam:transmitParam}]);
    }

    toFuncPage(){

        const {resAuditList,reserSignUrl,auditerSignUrl,signText,url1,url2,nd,bhh} = this.state
        let that = this;
		if(resAuditList.auditeId == 338&&(nd == '' || bhh == '')){
			console.log('in')
			Toast.fail('必选项选择之后才能提交',1);
			return;
		}
		let standardDemand = nd == 'accord'?'F_0':nd == 'bfqs'?'BF_-6':nd == 'qs'?'Q_-10':nd == 'nouse'?'BSY_0':'';
		let standardAnnounce = bhh == 'accord'?'F_0':bhh == 'unaccord'?'N_-6':bhh == 'nouse'?'BSY_0':'';
		
        if(url1==''||url2==''){
            Toast.fail('双方签名确认之后才可提交',1);
        }else{
            Toast.loading('审核中……请稍后', 2, function () {
                doStatistics(that.state.locationState.planId,url2,url1,signText,standardDemand,standardAnnounce).then(data => {
                    if(data.success){
                        that.props.history.push('/auditComplete',[{planId:that.state.locationState.planId,transmitParam:data.list,resId:that.state.locationState.resId,typeId:that.state.locationState.typeId}]);
                    }else {
                        Toast.fail(data.msg,1)
                    }
                })
            }, true);
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
                                return <List.Item multipleLine wrap style={{background:'#fbfbff'}}

                                                  key={index}>
                                    <div style={{fontSize:15}}>{secondAudit.secondTitle}</div>

                                    {
                                        secondAudit.assessOptions.map((thirdItem, index) => {
                                            return <div key={index}>
                                                <div onClick={()=>this.toDetail(secondAudit.auditeId,firstAudit,questionIds,thirdItem.auditeId)}>
                                                        <div style={{fontSize:15,color:'#e41717'}}>{thirdItem.title.substr(2,thirdItem.title.length)}</div>
                                                        <div style={{fontSize:15,color:'#080808',fontWeight:'bold'}}>备注：{thirdItem.remarks}</div>
                                                </div>
                                                        <div >
                                                            {
                                                                thirdItem.imgs instanceof Array?thirdItem.imgs.map((fourthItem,index) => {
                                                                    return (index+1)%4 ==0?<span><Zmage controller={{zoom: false}} style={{margin:5,height:100}} src={fourthItem}></Zmage><br/></span>:<span><Zmage controller={{zoom: false}} style={{margin:5,height:100}} src={fourthItem}></Zmage></span>
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

    trimFinish(url,curr,text){
        this.setState({
            isSignPage:false,
            signText:text
        })
        curr==1?this.setState({url1:url}):this.setState({url2:url})


    }

    toSign(curr){
        this.setState({
            isSignPage:true,
            currentSign:curr
        })
    }
	_handleNDAccord(){
		this.setState({
			nd:'accord'
		})
	}
	
	_handleNDBfqs(){
		this.setState({
			nd:'bfqs'
		})
	}
	_handleNDQS(){
		this.setState({
			nd:'qs'
		})
	}
	_handleNDNouse(){
		this.setState({
			nd:'nouse'
		})
	}
	_handleBHHAccord(){
		this.setState({
			bhh:'accord'
		})
	}
	_handleBHHUnaccord(){
		this.setState({
			bhh:'unaccord'
		})
	}
	_handleBHHNouse(){
		this.setState({
			bhh:'nouse'
		})
	}
	
	
	
    render(){

        const {resAuditList,isSignPage,url1,url2,currentSign,nd,bhh} = this.state;
        let childAssess = [];
        if(resAuditList.childAssess instanceof Array){
            childAssess = resAuditList.childAssess;
        }
        return !isSignPage?<div>
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
			{resAuditList.auditeId == 338?
				<div>
				<div style={{padding:'10px 15px',background:'#fff',fontSize:16}}>
					<div>
						<span style={{color:'red'}}>*</span>年度报告数量是否符合规定要求(<span style={{color:'red'}}>必选</span>)			
					</div>
					<div style={{display:'flex',flexDirection:'row',fontSize:10,padding:'15px 0'}}>
						<div style={nd=='accord'?styles.no_use_blue:styles.kfx_panel} onClick={()=>this._handleNDAccord()}><span style={nd=='accord'?{color:'#fff'}:{color:'black'}}>符合标准</span><br/>不扣分</div>
						<div style={nd=='bfqs'?styles.no_use_blue:styles.kfx_panel} onClick={()=>this._handleNDBfqs()}><span style={nd=='bfqs'?{color:'#fff'}:{color:'black'}}>部分缺失</span><br/>扣6分</div>
						<div style={nd=='qs'?styles.no_use_blue:styles.kfx_panel} onClick={()=>this._handleNDQS()}><span style={nd=='qs'?{color:'#fff'}:{color:'black'}}>缺失</span><br/>扣10分</div>
						<div style={nd=='nouse'?styles.no_use_blue:styles.kfx_panel} onClick={()=>this._handleNDNouse()}><span style={nd=='nouse'?{color:'#fff'}:{color:'black'}}>不适用</span><br/>不扣分</div>
					</div>
				</div>
				<div style={{padding:'10px 15px',background:'#fff',fontSize:16}}>
					<div>
						<span style={{color:'red'}}>*</span>百合花工程看板是否按照要求制作、公示(<span style={{color:'red'}}>必选</span>)			
					</div>
					<div style={{display:'flex',flexDirection:'row',fontSize:10,padding:'15px 0'}}>
						<div style={bhh=='accord'?styles.no_use_blue:styles.kfx_panel}><span style={bhh=='accord'?{color:'#fff'}:{color:'black'}} onClick={()=>this._handleBHHAccord()}>符合标准</span><br/>不扣分</div>
						<div style={bhh=='unaccord'?styles.no_use_blue:styles.kfx_panel}><span style={bhh=='unaccord'?{color:'#fff'}:{color:'black'}} onClick={()=>this._handleBHHUnaccord()}>不符合标准</span><br/>扣6分</div>
						<div style={bhh=='nouse'?styles.no_use_blue:styles.kfx_panel}><span style={bhh=='nouse'?{color:'#fff'}:{color:'black'}} onClick={()=>this._handleBHHNouse()}>不适用</span><br/>不扣分</div>
					</div>
				</div>
				</div>:''
			}
			
			<div style={{margin:'10px 0'}}>
				<div style={{margin: '0 5px 5px 10px',display:'flex',flexDirection:'row'}}>
					<img style={{marginTop:3}} src={require('../assets/icon/signature.png')} width={20} height={20}></img>
					<div style={{margin: '5px 5px 5px 10px',flex:1}}>餐厅负责人签名:</div>
					<div style={{margin: '5px 5px 5px 10px',color:BLUE}} onClick={() => this.toSign(1)}>去签名 ></div>
				</div>
				<div>
					<img src={url1}></img>
				</div>
			</div>

			<div style={{margin:'10px 0'}}>
				<div style={{margin: '0 5px 5px 10px',display:'flex',flexDirection:'row'}}><img style={{marginTop:3}} src={require('../assets/icon/signature.png')} width={20} height={20}></img>
					<div style={{margin: '5px 5px 5px 10px',flex:1}}>审核员签名:</div>
					<div style={{margin: '5px 5px 5px 10px',color:BLUE}} onClick={() => this.toSign(2)}>去签名 ></div>

				</div>
				<div>
					<img src={url2}></img>

				</div>
			</div>

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

        </div>:<Sign trimFinish={(url,curr,text)=>this.trimFinish(url,curr,text)} currentSigner={currentSign} ></Sign>
    }
}

export default AuditQuestions