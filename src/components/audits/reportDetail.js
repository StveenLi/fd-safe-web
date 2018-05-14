/**
 * Created by lixin on 2018/4/20.
 */


import React from 'react'
import {NavBar, Button,Icon,Tabs,Accordion, List} from 'antd-mobile'
import styles,{BLUE,GREY,FONTGREY} from '../config/style'
import { StickyContainer, Sticky } from 'react-sticky';
import {getAssessDetail} from '../config/api'

class ReportDetail extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            assessId:'',
            reportData:{}
        };
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };

    componentDidMount() {

        getAssessDetail(this.state.assessId).then(data => {
            console.log(data)
            if(data.success){
                this.setState({reportData:data.one})
            }
        })



    }

    componentWillMount() {
        this.setState({assessId:this.props.match.params.assessId});
    }
    render(){
        const tabs = [
            { title: '审计信息' },
            { title: '审核类目' },
            { title: '报告明细' },
        ];

        const {reportData} = this.state
        let compares = [];
        let childAssess = [];
        if(reportData.compares instanceof Array){
            compares = reportData.compares
        }
        if(reportData.keyAssesses){
            if(reportData.keyAssesses.childAssess instanceof Array){
                childAssess = reportData.keyAssesses.childAssess
            }
        }


        console.log(JSON.stringify(reportData.keyAssesses));

        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >详情</NavBar>
            <div style={{marginTop:45}}>

                <div style={{backgroundColor:BLUE,padding:15,fontSize:16,color:'#fff'}}>
                    {reportData.assessNames}卫生和安全审核报告
                </div>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initialPage={0}
                          onChange={(tab, index) => { console.log('onChange', index, tab); }}
                          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%',backgroundColor:'#fff',padding:15,fontSize:16}}>
                                <div style={styles.func_item}><div>门店名称</div><div style={styles.func_item_right}>{reportData.restName}</div></div>
                                <div style={styles.func_item}><div>门店ID</div><div style={styles.func_item_right}>{reportData.accountId}</div></div>
                                <div style={styles.func_item}><div>地址</div><div style={styles.func_item_right}>{reportData.citys}</div></div>
                                <div style={styles.func_item}><div>电话</div><div style={styles.func_item_right}>{reportData.phones}</div></div>
                                <div style={styles.func_item}><div>电子邮件</div><div style={styles.func_item_right}>{reportData.emails}</div></div>
                                <div style={styles.func_item}><div>审核名称</div><div style={styles.func_item_right}>{reportData.assessNames}</div></div>
                                <div style={styles.func_item}><div>开始时间</div><div style={styles.func_item_right}>{reportData.startDate}</div></div>
                                <div style={styles.func_item}><div>结束时间</div><div style={styles.func_item_right}>{reportData.endDate}</div></div>
                                <div style={styles.func_item}><div>审核员</div><div style={styles.func_item_right}>{reportData.assessUserName}</div></div>
                                <div style={styles.func_item}><div>本次得分</div><div style={styles.func_item_right}>{reportData.scores}</div></div>
                                <div style={styles.func_item}><div>上次审核时间</div><div style={styles.func_item_right}>{reportData.preDate}</div></div>
                                <div style={styles.func_item}><div>上次审核得分</div><div style={styles.func_item_right}>{reportData.preDate}</div></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <div style={{width:'100%',backgroundColor:'#fff',padding:15,fontSize:14}}>
                                {
                                    compares.map((item,index) => {
                                        return <div style={{marginTop:20,paddingBottom:15,borderBottomStyle:'solid',borderBottomColor:GREY,borderBottomWidth:1}}>
                                            <div>{item.title}</div>
                                            <div style={{display:'flex',flexDirection:'row',marginTop:15}}>
                                                <div style={{flex:1}}>
                                                    <div style={{fontSize:24,color:BLUE}}>{item.realScores}%</div>
                                                    <div style={{marginTop:5}}>实际得分</div>
                                                </div>
                                                <div style={{flex:1}}>
                                                    <div style={{fontSize:24,color:BLUE}}>{item.preScores}%</div>
                                                    <div style={{marginTop:5}}>上次得分</div>
                                                </div>
                                                <div style={{flex:1}}>
                                                    <div style={{fontSize:24,color:BLUE}}>{item.diffScores}%</div>
                                                    <div style={{marginTop:5}}>Difference</div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div style={{ display: 'flex', textAlign:'left' }}>
                            <div style={{ width:'100%' }}>
                                <Accordion defaultActiveKey="0" className="my-accordion">
                                    {

                                        childAssess.map((item,index) => {

                                            return item.childAssess.length != 0?<Accordion.Panel key={index} header={item.sort + '.' + item.fristTitle}>
                                                <List className="my-list">
                                                    {
                                                        item.childAssess.map((secondItem,index) => {
                                                            return <List.Item style={{background:'#fbfbff',}} wrap={true} multipleLine={true} key={index}>
                                                                <div style={{fontSize:15,color:FONTGREY}}>{secondItem.thridTitle}</div>
                                                                {
                                                                    secondItem.assessOptions.map((thirdItem, index) => {
                                                                        return <div>
                                                                            <div style={{fontSize:15,color:FONTGREY}}>{`${secondItem.secondTitle}.${thirdItem.sort}.${thirdItem.title}`}</div>
                                                                            <div style={{fontSize:15}}>备注：</div>
                                                                            <div>
                                                                                {
                                                                                    thirdItem.length>0?thirdItem.imgs.map((fourthItem,index) => {
                                                                                        return <img src={require(thirdItem)}></img>
                                                                                    }):null
                                                                                }
                                                                                </div>

                                                                        </div>
                                                                    })
                                                                }
                                                            </List.Item>
                                                        })
                                                    }

                                                </List>
                                            </Accordion.Panel>:null
                                        })


                                    }
                                </Accordion>
                            </div>


                        </div>
                    </Tabs>

                </StickyContainer>
            </div>
        </div>
    }
}


export default ReportDetail