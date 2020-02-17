import React from 'react'
import { NavBar, Icon, Picker, List, Button,Toast} from 'antd-mobile'
import {  personalpassCheckResult } from '../config/api'
class HistoryQuestionAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: JSON.parse(localStorage.getItem('userInfo')).id,
            doneName: '',
            tValue: '',
            isPass: '',
            typeOptions: [
                { label: '不合格', value: '0' },
                { label: '合格', value: '1' },

            ],
            list: ''

        }
    }

    //查询方法
    queryOptions = (userId, isPass, start, pagesize, doneName) => {
        Toast.loading('正在查询中...')
        personalpassCheckResult(userId, isPass, start, pagesize, doneName)
            .then(data => {
                if (data.success) {
                    this.setState({
                        list: data.list
                    })
                    //console.log(data.list)
                    Toast.hide()
                }
            })
    }
    componentDidMount() {
        const start = '';
        const pagesize = '';
        const userId = JSON.parse(localStorage.getItem('userInfo')).id
        this.queryOptions(userId,'',start,pagesize,'')
        //window.addEventListener('scroll', this.scrollHandler);
    }
    
    //查询
    query = () => {
        const start = '';
        const pagesize = '';
        const { userId, isPass, doneName } = this.state;
        //console.log(userId, isPass, start, pagesize, doneName)
        this.queryOptions(userId, isPass, start, pagesize, doneName);
    }
    

    // }
    getdoneName = (e) => {
        //console.log(e.target.value)
        this.setState({
            doneName: e.target.value.trim()
        })
    }
    back = e => {
        const { history } = this.props
        history.goBack();
    };
    render() {
        const { typeOptions, tValue } = this.state;
        return (<div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >线上考核</NavBar>
            <div style={{ textAlign: 'center', marginTop: '55px' }}>
                <div style={{ padding: '10px 0', backgroundColor: 'rgb(12, 81, 193)', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>考核列表</div>
                <div style={{
                    display: 'flex',
                    height: 40,
                    margin: '15px',
                    justifyContent: 'space-between'
                }}>
                    <input
                        style={{
                            felx: 1,
                            width: '40%',
                            height: 38,
                            padding: 0,
                            border: '1px solid #eee',
                            textAlign: 'center'
                        }}
                        onChange={this.getdoneName}
                        placeholder='请输入答题人名字' />
                    <Picker
                        cols={1}
                        data={typeOptions}
                        value={this.state.isPass}
                        onOk={(v) => this.setState({ isPass: v })}
                        onChange={v => this.setState({ isPass: v })}
                    >
                        <List.Item style={{
                            felx: 1,
                            height: 40,
                            lineHeight: '40px'
                        }}
                            arrow="horizontal" />
                    </Picker>
                    <Button style={{
                        felx: 1,
                        width: '63px',
                        height: 34,
                        margin:'3px 0',
                        lineHeight: '34px',
                        borderRadius:15,
                        size:'small',
                        backgroundColor: 'rgb(12,81,193)'
                    }}
                        type='primary'
                        onClick={this.query}
                    >查询</Button>
                </div>


                {/* 合格 */}
                <div style={{
                    margin: '10px 15px',
                    textAlign: 'left'


                }}>
                    {/* 合格1 */}
                    {
                        this.state.list.length > 0&& this.state.list.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => this.props.history.push('/basicResultDetail',[{resultId:item.id},{doneName:item.doneName},{order:'pass'}])}
                                    style={{
                                        marginTop: 20,
                                        padding: '10px 20px',
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                    }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid   #f3f3f3' }}>
                                        <div style={{ height: 28, lineHeight: '28px',fontWeight:'bold',fontSize:16 }}>{item.doneName}</div>
                                        <div style={{
                                            width: 60,
                                            height: 25,
                                            lineHeight: '25px',
                                            color: (item.score >= 90) ? 'green' : 'red',
                                            borderWidth: '1px',
                                            borderStyle: 'solid',
                                            borderColor: (item.score >= 90) ? 'green' : 'red',
                                            borderRadius: '25px',
                                            textAlign: 'center',
											margin:'0 0 10px 0'


                                        }}>{item.score >= 90 ? '合格' : '不合格'}</div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: 10

                                    }}>
                                        <div>
                                            <div style={{ margin: '15px 0' }}>答对题数:&nbsp;{item.sumNum}题&nbsp;(共{item.subjectType == 0 ? 30 : 40}题)</div>
                                            <div>考核题库:&nbsp;{item.subjectType == 0? '食品安全题库' : item.subjectType == 1?'百合花题库':item.subjectType == 20?'区域题库（采购）':item.subjectType == 21?'区域题库（库房）':item.subjectType == 30?'区域题库（粗加工间）':item.subjectType == 40?'区域题库（烹饪间）':item.subjectType == 50?'区域题库（专间）':item.subjectType == 60?'区域题库（前厅）':item.subjectType == 70?'区域题库（洗消间）':'其它'}</div>
                                            <div style={{ margin: '15px 0', }}>考核时间:&nbsp;<span style={{fontSize:10}}>{item.formatCreateTime}</span></div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: 70,
                                                height: 70,
                                                margin: '5px 0',
                                                lineHeight: '70px',
                                                color: 'white',
                                                fontSize: '18px',
                                                backgroundColor: 'rgb(12, 81, 193)',
                                                borderRadius: '50%'

                                            }}>{item.score}分</div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
        )
    }




}
export default HistoryQuestionAll
