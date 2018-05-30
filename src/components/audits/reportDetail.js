/**
 * Created by lixin on 2018/4/20.
 */


import React from 'react'
import {NavBar, Button,Icon,Tabs,Accordion, List,Toast} from 'antd-mobile'
import styles,{BLUE,GREY,FONTGREY} from '../config/style'
import { StickyContainer, Sticky } from 'react-sticky';
import {getAssessDetail} from '../config/api'
import Viewer from 'react-viewer';

class ReportDetail extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            assessId:'',
            reportData:{},
            visible:false,
            images:[]
        };
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };

    componentDidMount() {
        Toast.loading('加载中……', 0, true);
        getAssessDetail(this.state.assessId).then(data => {
            if(data.success){
                this.setState({reportData:data.one})
                Toast.hide();
            }
        })
    }

    componentWillMount() {
        this.setState({assessId:this.props.match.params.assessId});
    }

    async imgClick(img){

        let imgs = [img];
        await this.setState({images:imgs})
        this.setState({visible:true})
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



        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >报告浏览</NavBar>
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
                                                    <div style={{fontSize:22,color:BLUE}}>{item.preScores}<span style={{fontSize:16}}>分</span></div>
                                                    <div style={{marginTop:5}}>上次得分</div>
                                                </div>

                                                <div style={{flex:1}}>
                                                    <div style={{fontSize:28,color:BLUE}}>{item.realScores}<span style={{fontSize:16}}>分</span></div>
                                                    <div style={{marginTop:5}}>本次得分</div>
                                                </div>

                                                <div style={{flex:1}}>
                                                    <div style={{fontSize:22,color:BLUE}}>{item.diffScores}%
                                                        {item.diffScores>0?
                                                            <img width={6} height={12} style={{margin:'0 0 10px 2px'}} src={require('../assets/icon/top.png')}/>:<img width={6} height={12} style={{margin:'0 0 10px 2px'}} src={require('../assets/icon/down.png')}/>}</div>
                                                    <div style={{marginTop:5}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div style={{ display: 'flex', textAlign:'left' }}>
                            <div style={{ width:'100%' }}>
                                <Accordion activeKey={['0','1','2','3','4','5','6','7']} className="my-accordion">
                                    {

                                        childAssess.map((item,index) => {

                                            return item.childAssess.length != 0?<Accordion.Panel key={index} header={item.sort + '.' + item.fristTitle}>
                                                <List className="my-list">
                                                    {
                                                        item.childAssess.map((secondItem,index) => {

                                                            return secondItem.assessOptions.length>0?<List.Item style={{background:'#fbfbff',}} wrap={true} multipleLine={true} key={index}>
                                                                {
                                                                    secondItem.assessOptions.map((thirdItem, index) => {
                                                                        let imgs = thirdItem.imgs;
                                                                        return <div key={index}>
                                                                            <div style={{fontSize:15,color:FONTGREY}}>{`${thirdItem.sort}.${thirdItem.title}`}</div>
                                                                            <div style={{fontSize:15}}>备注：</div>
                                                                            <div>

                                                                                {
                                                                                    imgs?imgs.map((img,index) => {
                                                                                        return <div key={index}><img onClick={() => this.imgClick(img)} style={{width:'25%',height:'25%'}} key={index} src={img}></img></div>

                                                                                    }):null
                                                                                }
                                                                                </div>

                                                                        </div>
                                                                    })
                                                                }
                                                            </List.Item>:null
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
            <Viewer
                visible={this.state.visible}
                onClose={() => { this.setState({ visible: false }); } }
                images={[{src: this.state.images[0], alt: ''}]}
                noNavbar={true}
                noToolbar={true}
                noClose={false}
            />
        </div>
    }
}


export default ReportDetail