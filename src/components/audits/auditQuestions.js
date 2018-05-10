/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Button} from 'antd-mobile';
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from '../signature/index.js'
import {screenWidth,FONTGREY,GREY} from '../config/style'
import {getAddressByXY,getAssessList} from '../config/api'
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
            questionIds:[]
        };
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    onChange = (key) => {
        console.log(key);
    }
    toDetail(auditId,auditName){
        let transmitParam = {};
        let questionIds = [];
        this.state.resAuditList.childAssess
        questionIds.push()
        transmitParam.planId = parseInt(this.state.locationState.typeId[0]);
        transmitParam.auditId = auditId;
        transmitParam.auditName = auditName;
        transmitParam.questionIds =
        this.props.history.push('/questionDetail',[{transmitParam:transmitParam}]);
    }

    toFuncPage(){
        //this.props.history.push('/func');
        this.props.history.push('/auditComplete');
    }
    clear = () => {
        this.sigPad.clear()
    }
    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png')})
    }

    
    componentWillMount() {
        const {typeId,resId} = this.props.history.location.state[0].transmitParam;
        this.setState({
            locationX:localStorage.getItem('Longitude'),
            locationY:localStorage.getItem('Latitude'),
            locationState:this.props.history.location.state[0].transmitParam
        })

        getAssessList(typeId[0],resId[0]).then(data => {
            console.log(data)
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

            <div style={{ marginTop: 55, marginBottom: 10 }}>
                <Accordion defaultActiveKey="0" accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                    {
                        childAssess.map((firstAudit,aindex) => {
                            return <Accordion.Panel header={firstAudit.sort + '.'+firstAudit.fristTitle} className="pad" key={aindex}>
                                    {
                                        firstAudit.childAssess.map((secondAudit,index) => {
                                            return <List.Item style={{background:'#fbfbff'}} onClick={()=>this.toDetail(secondAudit.auditeId,firstAudit.fristTitle)} key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{aindex+1}.{index+1}.{secondAudit.thridTitle}</List.Item>
                                        })
                                    }
                            </Accordion.Panel>
                        })
                    }
                    {/*<Accordion.Panel header="1.食品接收与储存">
                        <List className="my-list">
                            <List.Item onClick={()=>this.toDetail()} style={{background:'#fbfbff'}}>
                                <div style={{padding:'10px 0 10px 10px'}}>1.1食品接收</div>
                                <div style={{padding:'0px 0 10px 10px',fontSize:14,color:FONTGREY}}>&nbsp;&nbsp;1.1.2接收到的原来应分类摆放和搬运,防止食物在
                                    接收过程中来自环境及食品之间的交叉污染。</div>
                                <div style={{marginTop:5,padding:'0px 0 10px 10px'}}>&nbsp;&nbsp;备注:接收区域门未关闭,易引起鼠害。</div>
                                <div><img style={{width:100,height:100,margin:'5px 0 5px 50px'}} src={require('../assets/images/cf.jpg')}></img></div>
                            </List.Item>
                            <List.Item>1.1食品接收</List.Item>
                        </List>
                    </Accordion.Panel>*/}
                </Accordion>
            </div>
            <div>
                <div style={{margin: '0 5px 5px 10px',display:'flex',flexDirection:'row'}}><img src={require('../assets/icon/signature.svg')} width={30} height={30}></img>
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
            </div>
            <div style={{marginTop:10,marginBottom:65}}>
                <div style={{margin: '5px 5px 5px 10px',display:'flex',flexDirection:'row'}}>
                    <img src={require('../assets/icon/location.svg')} width={25} height={25}></img>
                    <div style={{margin: '5px 5px 5px 10px'}}>{this.state.hereAddress==''?this.state.hereAddress:'暂无位置数据'}</div>
                </div>
                <div></div>
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toFuncPage()}>提交</Button>
            </div>

        </div>
    }
}

export default AuditQuestions