/**
 * Created by lixin on 2018/4/10.
 */


import React from 'react'
import { NavBar,Icon,List,DatePicker,Drawer} from 'antd-mobile';



class SearchComponent extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    render(){
        return <div>
                    <List>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <List.Item>日期</List.Item>
                            <DatePicker
                                mode="date"
                                extra='2018-05-01'
                                value={this.props.startDate}
                                onChange={this.props.setStartDate}
                            >
                                <List.Item style={{flex:1}}>
                                </List.Item>
                            </DatePicker>
                            <List.Item>-</List.Item>
                            <DatePicker
                                mode="date"
                                extra='2018-05-16'
                                value={this.props.endDate}
                                onChange={this.props.setEndDate}
                                style={{flex:1}}
                            >
                                <List.Item style={{flex:1}}>
                                </List.Item>
                            </DatePicker>
                            <List.Item onClick={this.props.onDock}>
                                <Icon style={{marginTop:3}} type="ellipsis" />
                            </List.Item>
                        </div>
                            <List.Item style={{height:this.props.panelHeight,display:this.props.searchDisplay}}>
                            <Drawer
                                style={{ minHeight: document.documentElement.clientHeight }}
                                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                                sidebar={this.props.sidebar}
                                docked={this.props.docked}
                                position={'top'}
                            >
                            </Drawer>
                        </List.Item>
                    </List>
                </div>
    }
}

export default SearchComponent
