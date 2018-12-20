/**
 * Created by lixin on 2018/4/20.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Toast, NavBar, Icon, Badge, Modal } from 'antd-mobile';
import { submitQuestion, submit, buildExamine } from '../config/api'
import styles, { BLUE, GREY } from '../config/style';
// const CheckboxItem = Checkbox.CheckboxItem;
// import Radio from 'rc-radio';
// import 'rc-radio/assets/index.css';
const alert = Modal.alert;
class CheckQuestion extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value: '',
            disabled: false,
            checked: null,
            r: 'a',
            index: 0,
            list: '',
            titleAnwer: [],
            resultId: '',
            prevDisplay:false,
            nextDisplay:true,
            sunbmit:false,
            

        }
    }
    componentDidMount() {
        Toast.loading('题库正在生成中...')
        const data = this.props.location.state;
        const examineName = data[0].examineName,
            userId = data[1].userId,
            examineType = data[2].examineType;
            

        buildExamine(examineName, examineType, userId).then(data => {
            if (data.success) {
                this.setState({
                    list: data.list,
                    resultId: data.resultId
                })
                Toast.hide()
                var array = [];
                data.list.map((item,index)=>{
                    if(item.subjectType == 1){
                        array[index] = ''
                    }else{
                        array[index] = []
                    }
                })
                this.setState({
                    titleAnwer:array
                })
            }
        })
        
        Array.prototype.indexOf = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };

    }
    componentDidUpdate() {
        const { list, titleAnwer } = this.state;
        

    }


    //
    prevquestion = () => {
        const that = this;
        const { index, titleAnwer,prevDisplay,nextDisplay,sunbmit,list } = this.state;
        if (index == 1) {
            this.setState({
                prevDisplay:!prevDisplay,
            })
        }
        if(index == list.length - 1){
            this.setState({
                nextDisplay:!nextDisplay,
                sunbmit:!sunbmit
            })
        }
        
        that.setState({
            index: index - 1,
        });
        ReactDOM.findDOMNode(that.refs.move).style.left = -(index - 1) * 100 + '%'
        // that.refs.move.style.left = -(index - 1) * 100 + '%'
    }

    nextquestion = () => {
        const that = this;
        const { index, list, titleAnwer,prevDisplay,sunbmit,nextDisplay} = this.state;
        console.log(titleAnwer[index])
        
        //console.log(titleAnwer)
        
        if (titleAnwer[index].length) {
            if(index == 0){
                this.setState({
                    prevDisplay:!prevDisplay,
                })
            }
           
            if(index == list.length -2)
            this.setState({
                nextDisplay:!nextDisplay,
                sunbmit:!sunbmit
            })
            //单选判断
            var rightOrNot,
                rOption;
            var subResultId = list[index].subResultId;
            if (list[index].subjectType == 1) {
                rOption = titleAnwer[index];
                if (rOption == list[index].answer) {
                    rightOrNot = 1;
                } else {
                    rightOrNot = 0
                }

            } else {
                //多选判断
                rOption = titleAnwer[index].join(",");
                if (rOption == list[index].answer) {
                    rightOrNot = 1;
                } else {
                    rightOrNot = 0
                }
            }
            //console.log(subResultId, rightOrNot, rOption)
            submitQuestion(subResultId, rightOrNot, rOption).then(data => {
                if (data.success) {
                    that.setState({
                        index: index + 1,
                    });
                    that.refs.move.style.left = -(index + 1) * 100 + '%'
                }
            })
            
        } else {
            Toast.fail('请选择答案！');
            
            
        }
        //console.log(titleAnwer[index])

    }
    checkAnswer = (e) => {
        let { titleAnwer, index } = this.state;
        titleAnwer[index] = e.target.value;
        this.setState({
            titleAnwer:titleAnwer
        })
        
    }


    checkAnswerbox = (e) => {
        const { titleAnwer, index } = this.state;
        if (e.target.checked) {
            titleAnwer[index].push(e.target.value)
            titleAnwer[index].sort()
        } else {
            titleAnwer[index].remove(e.target.value)
        }
        this.setState({
            titleAnwer:titleAnwer
        })
        console.log(titleAnwer[index])
        
    }


    submint() {

        const { index, list, titleAnwer, resultId } = this.state;
        if (index == list.length - 1) {
            //单选判断
            var rightOrNot,
                rOption;
            var subResultId = list[index].subResultId;
            if (list[index].subjectType == 1) {
                rOption = titleAnwer[index];
                if (rOption == list[index].answer) {
                    rightOrNot = 1;
                } else {
                    rightOrNot = 0
                }

            } else {
                //多选判断
                rOption = titleAnwer[index].join(",");
                if (rOption == list[index].answer) {
                    rightOrNot = 1;
                } else {
                    rightOrNot = 0
                }

            }

            submitQuestion(subResultId, rightOrNot, rOption).then(data => {
                if (data.success) {
                    //传数据
                    submit(resultId).then(data => {
                        if (data.success) {
                            //console.log(data)
                            this.props.history.push('/PersonalBasicResult', [{ data }])
                        }
                    })
                    //this.props.history.push('/PersonalBasicResult')
                }
            })

        } else {
            Toast.fail('请答完题再提交喔');
            return;
        }



    }

    back = e => {
        alert('返回', '确定不保存该题数据直接返回吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确定', onPress: () => {
                    this.props.history.goBack();
                }
            },
        ])

    };
    render() {
        return <div style={{ backgroundColor: '#fff', width: '100vw', overflow: 'hidden' }}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
                style={{ width: '100vw' }}
            >线上考核</NavBar>
            <div style={{ position: 'absolute', top: '45px', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                <ul
                    style={{
                        position: 'absolute',
                        width: '(this.state.list.length)00%',
                        margin: 0,
                        top: 0,
                        left: 0,
                        padding: 0,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        listStyle: 'none'
                    }}
                    ref='move'>
                    {
                        this.state.list.length > 0 && this.state.list.map((itemTitle, index) => {
                            return (
                                <li key={index}
                                    style={{ position: 'relative', float: 'left', width: '100vw', height: '100vh', margin: 0, padding: 0, }}>
                                    <div style={{ margin: '5px 15px 0 15px', padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'row', fontSize: 16 }}>
                                        <span style={{ marginRight: 5 }}>
                                            <i style={{ fontStyle: 'normal', color: 'rgb(12, 81, 193)' }}>{this.state.index + 1}</i>/{this.state.list.length}
                                        </span>
                                        <div style={{ letterSpacing: 1 }}>{itemTitle.title}</div>
                                    </div>
                                    <div style={{ backgroundColor: '#fff', padding: 15, textAlign: 'left' }}>
                                        <p style={{ width: '50px', height: '20px', textAlign: 'center', borderRadius: 5, fontSize: 12, lineHeight: '20px', backgroundColor: 'rgb(12, 81, 193)', color: 'white' }}>{itemTitle.subjectType == 1 ? '单选' : '多选'}</p>
                                        <div>

                                            {
                                                itemTitle.optionList.map((item, indexOptions) => {
                                                    if (itemTitle.subjectType == 1) {
                                                        return (

                                                            <div key={indexOptions} style={{ padding: 8 }} onChange={this.checkAnswer.bind(this)} >
                                                                <label style={{ display: 'flex', letterSpacing: 1 }}>
                                                                    <input type='radio' name={itemTitle.title} value={item.optionCode} style={{ verticalAlign: 'middle' }} />
                                                                    <Badge text={item.optionCode} style={{ margin: '0 10px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                                                    {item.optionTitle}
                                                                </label>
                                                            </div>

                                                        );
                                                    } else {
                                                        return (

                                                            <div key={indexOptions} style={{ padding: 8 }}  >
                                                                {<label style={{ display: 'flex', letterSpacing: 1 }}>
                                                                    <input type='checkbox' name={itemTitle.optionTitle}
                                                                        value={item.optionCode}
                                                                        style={{ verticalAlign: 'middle' }}
                                                                        onChange={this.checkAnswerbox.bind(this)}

                                                                    />
                                                                    <Badge text={item.optionCode} style={{ margin: '0 10px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                                                    {item.optionTitle}
                                                                </label>}
                                                            </div>

                                                        );
                                                    }

                                                })
                                            }
                                        </div>
                                    </div>
                                    {/* <div style={{ textAlign: 'center', position: 'absolute', bottom: 35, width: '100vw', display: 'flex', backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15 }}>
                                        <div onClick={this.prevquestion.bind(this)} style={{ flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>上一题</div>
                                        <div onClick={this.submint.bind(this)} style={{ margin: '0 3px', flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>提交</div>
                                        <div onClick={this.nextquestion.bind(this)} style={{ flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>下一题</div>
                                    </div> */}
                                    {/* <div style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100vw', display: 'flex', backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15 }}>
                                        <div onClick={this.prevquestion.bind(this)} style={{ flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>上一题</div>
                                        <div onClick={this.submint.bind(this)} style={{ margin: '0 3px', flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>提交</div>
                                        <div onClick={this.nextquestion} style={{ flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>下一题</div>
                                    </div> */}
                                </li>
                            );
                        })
                    }

                </ul>
                <div style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100vw', display: 'flex', backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15 }}>
                    <div onClick={this.prevquestion.bind(this)} style={{ display:(this.state.prevDisplay)?'block':'none',flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>上一题</div>
                    <div onClick={this.nextquestion} style={{ display:(this.state.nextDisplay)?'block':'none',flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>下一题</div>
                    <div onClick={this.submint.bind(this)} style={{ display:(this.state.sunbmit)?'block':'none',margin: '0 3px', flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>提交</div>
                </div>
            </div>

        </div >

    }

}
export default CheckQuestion
