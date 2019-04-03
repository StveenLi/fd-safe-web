import React from 'react'
import ReactDOM from 'react-dom'
import { Toast, NavBar, Icon, Badge, Modal } from 'antd-mobile';
import styles, { BLUE, GREY } from '../config/style';
// const CheckboxItem = Checkbox.CheckboxItem;
// import Radio from 'rc-radio';
// import 'rc-radio/assets/index.css';
const alert = Modal.alert;
class checkQuestionUpGrade extends React.Component {

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
            name: ''
        }

    }
    componentWillMount() {
        
    }
    handleChange = (e) => {
        this.setState({
            r: e.target.value,
        });
        
    }

    componentDidMount() {
        let name = this.props.location.state.name;
        this.setState({
            name
        })
    }

    onChange = (e) => {
        // if (e.target.checked) {
        console.log(e);
        // }

    }
    prevquestion = () => {
        const that = this;
        if (that.state.index == 0) {
            Toast.fail('这是第一题！');
            return;
        }
        that.setState({
            index: (that.state.index) - 1
        });
        ReactDOM.findDOMNode(that.refs.move).style.left = -(this.state.index - 1) * 100 + '%'
        ReactDOM

    }
    nextquestion = () => {
        const that = this;
        if (that.state.index == 24) {
            Toast.fail('已经是最后一题了！');
            return;
        }
        that.setState({
            index: (that.state.index) + 1
        });

        ReactDOM.findDOMNode(that.refs.move).style.left = -(this.state.index + 1) * 100 + '%'
        
    }


    submint() {
        this.props.history.push('/PersonalBasicResult')
        // if(this.state.index == 24){
        //     this.props.history.push('/PersonalBasicResult')
        // }else{
        //     Toast.fail('请答完题再提交喔');
        //     return;
        // }

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
            <div style={{ position: 'absolute', top: '45px', width: '100vw', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
                <ul
                    style={{
                        position: 'absolute',
                        width: '2500%',
                        margin: 0,
                        top: 0,
                        left: 0,
                        padding: 0,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        listStyle: 'none'
                    }}
                    ref='move'>
                    {/* 第一题 */}
                    <li style={{ float: 'left', width: '100vw', height: '100vh', margin: 0, padding: 0, }}>
                        <div style={{ margin: '5px 15px 0 15px', padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'row', fontSize: 16 }}>
                            <span style={{ marginRight: 5 }}>
                                <i style={{ fontStyle: 'normal', color: 'rgb(12, 81, 193)' }}>{this.state.index + 1}</i>/25
                            </span>
                            <div style={{ letterSpacing: 1 }}>请问当餐厅出现蟑螂怎么办请问当餐厅出当餐厅出现蟑螂怎么办?</div>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: 15, textAlign: 'left' }}>
                            <p style={{ width: '50px', height: '20px', textAlign: 'center', borderRadius: 5, fontSize: 12, lineHeight: '20px', backgroundColor: 'rgb(12, 81, 193)', color: 'white' }}>单选题</p>
                            <div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='A' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        请问当餐厅出请问当出现蟑螂请螂请螂现蟑螂请螂现蟑螂请螂现蟑螂请螂现蟑螂请螂
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='B' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        请问当餐厅出现蟑螂出现蟑餐厅出现蟑螂出现蟑螂请问当餐厅出现蟑螂
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='C' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        请问当餐厅出现蟑出现蟑螂出现蟑螂出现蟑螂请问当餐厅出现蟑螂
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='D' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        请问当餐厅出现蟑螂请
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 第二题 */}
                    <li style={{ float: 'left', width: '100vw', height: '100vh', margin: 0, padding: 0, }}>
                        <div style={{ margin: '5px 15px 0 15px', padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'row', fontSize: 16 }}>
                            <span style={{ marginRight: 5 }}>
                                <i style={{ fontStyle: 'normal', color: 'rgb(12, 81, 193)' }}>{this.state.index + 1}</i>/25
                            </span>
                            <div style={{ letterSpacing: 1 }}>食品检验由食品( )指定的检验人独立进行?</div>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: 15, textAlign: 'left' }}>
                            <p style={{ width: '50px', height: '20px', textAlign: 'center', borderRadius: 5, fontSize: 12, lineHeight: '20px', backgroundColor: 'rgb(12, 81, 193)', color: 'white' }}>多选题</p>
                            <div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='A' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        政府机构
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='B' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        行政机关
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='C' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        监督机构
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='D' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        检验机构
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 第三题 */}
                    <li style={{ float: 'left', width: '100vw', height: '100vh', margin: 0, padding: 0, }}>
                        <div style={{ margin: '5px 15px 0 15px', padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'row', fontSize: 16 }}>
                            <span style={{ marginRight: 5 }}>
                                <i style={{ fontStyle: 'normal', color: 'rgb(12, 81, 193)' }}>{this.state.index + 1}</i>/25
                            </span>
                            <div style={{ letterSpacing: 1 }}>食品生产经营者应当建立并执行从业人员健康管理制度。患有( )不得从事接触直接入口食品的工作?</div>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: 15, textAlign: 'left' }}>
                            <p style={{ width: '50px', height: '20px', textAlign: 'center', borderRadius: 5, fontSize: 12, lineHeight: '20px', backgroundColor: 'rgb(12, 81, 193)', color: 'white' }}>单选题</p>
                            <div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='A' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        痢疾、伤寒、病毒性肝炎
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='B' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        活动性肺结核、化脓性皮肤病
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='C' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        化脓性皮肤病
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='radio' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='D' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        活动性肺结核、化脓性皮肤病
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* 第四题 */}
                    <li style={{ float: 'left', width: '100vw', height: '100vh', margin: 0, padding: 0, }}>
                        <div style={{ margin: '5px 15px 0 15px', padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'row', fontSize: 16 }}>
                            <span style={{ marginRight: 5 }}>
                                <i style={{ fontStyle: 'normal', color: 'rgb(12, 81, 193)' }}>{this.state.index + 1}</i>/25
                            </span>
                            <div style={{ letterSpacing: 1 }}>国家对食品生产经营实行许可制度，从事食品安全应当依法取得食品( )?</div>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: 15, textAlign: 'left' }}>
                            <p style={{ width: '50px', height: '20px', textAlign: 'center', borderRadius: 5, fontSize: 12, lineHeight: '20px', backgroundColor: 'rgb(12, 81, 193)', color: 'white' }}>多选题</p>
                            <div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='A' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        生产许可
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='B' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        食品流通许可
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='C' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        餐饮服务许可
                                    </label>
                                </div>
                                <div style={{ marginBottom: 8, }}>
                                    <label style={{ display: 'flex', letterSpacing: 1 }}>
                                        <input type='checkbox' name='inline' style={{ verticalAlign: 'middle' }} />
                                        <Badge text='D' style={{ margin: '0 2px 0 5px', backgroundColor: 'rgb(12, 81, 193)', borderRadius: '50%' }} />
                                        卫生许可
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style={{ textAlign: 'center', position: 'absolute', bottom: 0, width: '100vw', display: 'flex', backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15 }}>
                <div onClick={this.prevquestion.bind(this)} style={{ flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>上一题</div>
                <div onClick={this.submint.bind(this)} style={{ margin: '0 3px', flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>提交</div>
                <div onClick={this.nextquestion.bind(this)} style={{ flex: 1, backgroundColor: 'rgb(12, 81, 193)', color: 'white', lineHeight: '35px', borderRadius: 15 }}>下一题</div>
            </div>
        </div >

    }

}
export default checkQuestionUpGrade
