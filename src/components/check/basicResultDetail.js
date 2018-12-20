import React from 'react'
import ReactDom from 'react-dom'
import { NavBar, Icon, Tabs, Badge, check, cross,Toast } from 'antd-mobile'
import { getOneCheckResult } from '../config/api'

class BasicResultDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultId: this.props.location.state[0].resultId,
            doneName: this.props.location.state[1].doneName,
            list: ''
        }
    };
    componentDidMount() {
        Toast.loading('正在加载中...')
        const { resultId, doneName } = this.state;
        getOneCheckResult(resultId).then(data => {
            if (data.success) {
                this.setState({
                    list: data.list
                })
            }
            Toast.hide()
        })
    }
    back = e => {
        const { history } = this.props
        history.push('/home');
    };

    render() {
        const tabs = [
            { title: '全部题目', sub: '1' },
            { title: '错题集', sub: '2' },
        ];
        return (<div style={{ width: '100vw', overflow: 'hidden' }}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
                style={{ width: '100vw' }}
            >线上考核</NavBar>

            <div style={{ textAlign: 'center', marginTop: '55px' }}>
                <div style={{ padding: '10px 0', backgroundColor: 'rgb(12, 81, 193)', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{this.state.doneName}考核详情</div>
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    swipeable='false'
                    tabBarActiveTextColor='rgb(12, 81, 193)'
                    tabBarUnderlineStyle='rgb(12, 81, 193)'
                    renderTab={tab => <span>{tab.title}</span>}
                >

                    <div style={{ width:'calc(100% - 30px)',margin: '15px', padding: '8px', backgroundColor: 'white', borderRadius: '10px', whiteSpace: 'wrap' }}>
                        {/* 全部题目第二题 */}
                        {
                            this.state.list.length > 0 && this.state.list.map((item, index) => {
                                return (
                                    <div key={index} style={{width:'calc(100% - 16px)', padding: '8px', borderBottom: '1px solid #f3f3f3' }}>
                                        <div style={{padding:'10px 0', textAlign: 'left', whiteSpace: 'wrap', letterSpacing: 1 }}>{index + 1}、{item.subjectTitle}</div>
                                        <div style={{ display: 'flex', margin: '5px 0' }}>
                                            <div style={{ width: '31%' }}>您的回答:&nbsp;</div>
                                            <div style={{ width: '100%', whiteSpace: 'wrap' }}>
                                                {
                                                    item.actualOptionList.length && item.actualOptionList.map((itemactual, indexactual) => {
                                                        return (
                                                            <div key={indexactual} style={{ textAlign: 'left' }}>
                                                                <Badge style={{ display: 'inline-block', backgroundColor: 'rgb(12, 81, 193)' }} text={itemactual.optionCode} />
                                                                <div style={{ display: 'inline-block', width: '78%', marginLeft: '5px', wordBreak: 'break-all', verticalAlign: 'top', letterSpacing: 1 }}>{itemactual.optionTitle}</div>
                                                                <Icon size='sm' style={{ display: 'inline-block', verticalAlign: 'middle' }} type={item.rOption == item.answer ? 'check' : 'cross'} color={item.rOption == item.answer ? 'green' : 'red'} />
                                                            </div>
                                                        )
                                                    })



                                                }

                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', margin: '8px 0 5px 0' }}>
                                            <div style={{ width: '31%' }}>正确答案:&nbsp;</div>
                                            <div style={{ width: '100%', whiteSpace: 'wrap' }}>
                                                {
                                                    item.answerOptionList.length && item.answerOptionList.map((itemanswer, indexanswer) => {
                                                        return (

                                                            <div key={indexanswer} style={{ textAlign: 'left', marginBottom: '3px' }}>
                                                                <Badge text={itemanswer.optionCode} style={{ display: 'inline-block', backgroundColor: 'rgb(12, 81, 193)' }} />
                                                                <div style={{ display: 'inline-block', width: '78%', marginLeft: '5px', wordBreak: 'break-all', verticalAlign: 'top', color: 'red', letterSpacing: 1 }}>{itemanswer.optionTitle}</div>
                                                            </div>

                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        }

                    </div>

                    <div style={{ width:'calc(100% - 30px)',margin: '15px', padding: '8px', backgroundColor: 'white', borderRadius: '10px', whiteSpace: 'wrap' }}>
                        {/* 错题集第一题 */}
                        {
                            this.state.list.length && this.state.list.map((item, index) => {
                                if (item.answer !== item.rOption) {
                                    return (
                                        <div key={index} style={{width:'calc(100% - 16px)', padding:8,borderBottom: '1px solid #f3f3f3' }}>
                                            <div style={{padding:'10px 0', textAlign: 'left', whiteSpace: 'wrap', letterSpacing: 1 }}>{index + 1}、{item.subjectTitle}</div>
                                            <div style={{ display: 'flex', margin: '5px 0' }}>
                                                <div style={{ width: '31%' }}>您的回答:&nbsp;</div>
                                                <div style={{ width: '100%', whiteSpace: 'wrap' }}>
                                                {
                                                    item.actualOptionList.length && item.actualOptionList.map((itemactual, indexactual) => {
                                                        return (
                                                            <div key={indexactual} style={{ textAlign: 'left' }}>
                                                                <Badge style={{ display: 'inline-block', backgroundColor: 'rgb(12, 81, 193)' }} text={itemactual.optionCode} />
                                                                <div style={{ display: 'inline-block', width: '78%', marginLeft: '5px', wordBreak: 'break-all', verticalAlign: 'top', letterSpacing: 1 }}>{itemactual.optionTitle}</div>
                                                                <Icon size='sm' style={{ display: 'inline-block', verticalAlign: 'middle' }} type='cross' color='red' />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                   

                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', margin: '8px 0 5px 0' }}>
                                                <div style={{ width: '31%' }}>正确答案:&nbsp;</div>
                                                <div style={{ width: '100%', whiteSpace: 'wrap' }}>
                                                {
                                                    item.answerOptionList.length && item.answerOptionList.map((itemanswer, indexanswer) => {
                                                        return (

                                                            <div key={indexanswer} style={{ textAlign: 'left', marginBottom: '3px' }}>
                                                                <Badge text={itemanswer.optionCode} style={{ display: 'inline-block', backgroundColor: 'rgb(12, 81, 193)' }} />
                                                                <div style={{ display: 'inline-block', width: '78%', marginLeft: '5px', wordBreak: 'break-all', verticalAlign: 'top', color: 'red', letterSpacing: 1 }}>{itemanswer.optionTitle}</div>
                                                            </div>

                                                        )
                                                    })
                                                }

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                        
                    </div>
                </Tabs>
            </div>
        </div>
        )
    }


}
export default BasicResultDetail