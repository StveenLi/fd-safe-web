/**
 * Created by lixin on 2018/4/18.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Button} from 'antd-mobile';


class AuditQuestions extends React.Component{




    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };
    onChange = (key) => {
        console.log(key);
    }
    toDetail(){
        this.props.history.push('/questionDetail');
    }

    toFuncPage(){
        this.props.history.push('/func');
    }

    render(){

        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >审核条目</NavBar>

            <div style={{ marginTop: 55, marginBottom: 10 }}>
                <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="1.食品接收与储存">
                        <List className="my-list">
                            <List.Item onClick={()=>this.toDetail()}>1.1食品接收</List.Item>
                            <List.Item>1.1食品接收</List.Item>
                        </List>
                    </Accordion.Panel>
                    <Accordion.Panel header="2.食品加工与服务" className="pad">
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                    </Accordion.Panel>
                    <Accordion.Panel header="3.餐用具清洁消毒" className="pad">
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                    </Accordion.Panel>
                    <Accordion.Panel header="3.餐用具清洁消毒" className="pad">
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                    </Accordion.Panel>
                    <Accordion.Panel header="3.餐用具清洁消毒" className="pad">
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                        <List.Item>1.1食品接收</List.Item>
                    </Accordion.Panel>
                </Accordion>
            </div>

            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toFuncPage()}>功能键</Button>
            </div>

        </div>
    }
}

export default AuditQuestions