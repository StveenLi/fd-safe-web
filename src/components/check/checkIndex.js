/**
 * Created by lixin on 2018/4/19.
 */
import React from 'react'
import {NavBar,Icon,Button,Radio,List} from 'antd-mobile'
const RadioItem = Radio.RadioItem
class CheckIndex extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value: 0,
            value2: 0,
            value3: 0,
            value4: 0,
        };
      }
    onChange = (value) => {
        console.log('checkbox');
        this.setState({
            value,
        });
    };

    toChecking(){
        this.props.history.push('/checkQuestion')
    }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){
        const { value } = this.state;

        const data = [
            { value: 0, label: '1、食安制度' },
            { value: 1, label: '2、食品接受与储存' },
            { value: 2, label: '3、食材准备' },
            { value: 3, label: '4、烹饪加工' },
            { value: 4, label: '5、餐食供应与前厅环境' },
            { value: 5, label: '6、清洁与消毒' },
            { value: 6, label: '7、个人卫生' },
            { value: 7, label: '8、消杀控制与废弃物管理' },
        ];
        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >现场考核</NavBar>
            <List renderHeader={() => '考核题目'}>
                {data.map(i => (
                    <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                        {i.label}
                    </RadioItem>
                ))}
            </List>
            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toChecking()}>开始考核</Button>
            </div>

        </div>
    }
}

export default CheckIndex
