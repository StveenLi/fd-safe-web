/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar,Icon,SearchBar, Button, List ,} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class LawList extends React.Component{


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){


        return <div style={{textAlign:'center'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >法律法规</NavBar>
            <SearchBar

                style={{marginTop:55}}
                placeholder="搜索内容"
                ref={ref => this.manualFocusInst = ref}
            />
            <List>
                <Item multipleLine onClick={() => {this.props.history.push('/lawDetail')}}>
                    互联网群组信息服务管理规定 <Brief>为规范互联网群组信息服务,维护国家安全和公共
                    利益,保护公民、法人和其他组织的合法权益,</Brief>
                    <Brief>2018-05-12</Brief>
                </Item>
                <Item multipleLine onClick={() => {}}>
                    食品添加剂 <Brief>供食用的源于农业的初级产品（以下称食用农产品）的质量安全管理，遵守《中华人民共和国农产品质量安全法》的规定。但是，食用农产品的市场销售、有关质量安全标准的制定、有关安全信息的公布和本法对农业投入品作出规定的，应当遵守本法的规定。</Brief>
                    <Brief>2018-05-12</Brief>
                </Item>
                <Item multipleLine onClick={() => {}}>
                    监督管理制度 <Brief>食品安全工作实行预防为主、风险管理、全程控制、社会共治，建立科学、严格的监督管理制度。</Brief>
                    <Brief>2018-05-12</Brief>
                </Item>
            </List>


        </div>
    }
}

export default LawList