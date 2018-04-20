/**
 * Created by lixin on 2018/4/16.
 */

import React from 'react'
import { NavBar,Icon,Picker,Tabs, WhiteSpace,Button} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import styles,{GREY} from '../config/style'
import StaticsAll from '../audits/staticsAll'
import StaticsType from '../audits/staticsType'
import StaticsStore from '../audits/staticsStore'
import StaticsCompare from '../audits/staticsCompare'
class StaticsPage extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
      }

    componentDidMount() {

    }
    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };
    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    toRadarPage(){
        this.props.history.push('/radar')
    }
    render(){
        const tabs = [
            { title: '总体' },
            { title: '分类' },
            { title: '门店' },
            { title: '对比' },
        ];
        return <div>

            <div style={{borderBottomColor:GREY,borderWidth:1,borderBottomStyle:'solid'}}>


                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >数据分析</NavBar>
            </div>

            <StickyContainer style={{marginTop:45}}>
                        <Tabs tabs={tabs}
                              initialPage={0}
                              onChange={(tab, index) => { console.log('onChange', index, tab); }}
                              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

                                <StaticsAll></StaticsAll>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsType></StaticsType>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsStore></StaticsStore>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <StaticsCompare></StaticsCompare>
                            </div>
                        </Tabs>

                    </StickyContainer>
            <div style={{position:'fixed',bottom:0,width:'100%',display:'block'}}>
                <Button type="primary" onClick={() => this.toRadarPage()}>对比</Button>
            </div>
        </div>
    }
}

export default StaticsPage
