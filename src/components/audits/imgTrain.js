/**
 * Created by lixin on 2018/5/11.
 */



import React from 'react'
import {NavBar,Icon} from 'antd-mobile'
class ImgDetailTrain extends React.Component{



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            imgUrl:''
        };
    }

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    componentWillMount() {
        this.setState({imgUrl:this.props.history.location.state[0].imgUrl})
    }

    componentDidMount() {
        //var parser = new DOMParser();
        //var doc=parser.parseFromString(this.state.imgUrl, "text/xml");
        document.getElementById('iu').innerHTML = this.state.imgUrl;
    }

    render(){
        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >图文规范</NavBar>
            <div style={{marginTop:55,background:'#fff'}} id="iu">

                {this.state.imgUrl}

            </div>

        </div>
    }
}

export default ImgDetailTrain
