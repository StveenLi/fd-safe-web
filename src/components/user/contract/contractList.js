/**
 * Created by lixin on 2018/4/9.
 */
import React, { Component } from 'react';
import {InputItem, Button, Toast, NavBar, Icon, Accordion} from 'antd-mobile';
import {screenHeight,GREY,ORANGE,BLUE} from '../../config/style'
import CountDown from 'react-codedown'
import { queryContractList} from '../../config/api'
import Utils from '../../config/utils'

class ContractList extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            contracts:[]
        };
      }

    toAddPage(){
        this.props.history.push('/addContract')
    }

    toUpdatePage(contract){
        this.props.history.push('/addContract',[{contract:contract}])
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    componentWillMount() {
        let that = this;
        queryContractList().then((data) => {
            if(data.success){
                that.setState({
                    contracts:data.contract
                })
            }
        })
    }


    render(){
        const {contracts} = this.state
        return <div style={{display:'flex',flexDirection:'column',background:"#F8F8FF",textAlign:'center',height:screenHeight}}>
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >我的合同</NavBar></div>
            <div style={{width:'100%',marginTop:55}}>
                <Button style={{flex:1,background:BLUE}}  type="primary" onClick={() => this.toAddPage()}>新增合同</Button>
            </div>

            <div>

                {contracts.map((item, index) => {
                    return <div style={{display: 'flex', flexDirection: 'column', background: '#fff', marginTop: 10}} key={index} onClick={() => this.toUpdatePage(item)}>
                        <div style={{
                            borderBottom: '1px solid #e1e1e1',
                            textAlign: 'left',
                            padding: 15,
                            fontSize: 17,
                            fontWeight: 'bold'
                        }}>合同{index+1}{item.status=='TX'?<span style={{color:'rgb(205, 51, 51)'}}>(即将到期)</span>:null}
                        </div>


                        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'left'}}>
                            <div style={{flex: 1, fontSize: 15, color: '#C2C2C2', padding: 10}}>合同名称</div>
                            <div style={{fontSize: 15, padding: 10}}>{item.name}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'left'}}>
                            <div style={{flex: 1, fontSize: 15, color: '#C2C2C2', padding: 10}}>到期时间</div>
                            <div style={{fontSize: 15, padding: 10}}>{new Date(item.expirationDate).format('yyyy-MM-dd')}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', textAlign: 'left'}}>
                            <div style={{flex: 1, fontSize: 15, color: '#C2C2C2', padding: 10}}>提醒时间</div>
                            <div style={{fontSize: 15, padding: 10}}>{new Date(item.effectiveDate).format('yyyy-MM-dd')}</div>
                        </div>
                    </div>
                })
            }



            </div>
        </div>
    }
}
export default ContractList