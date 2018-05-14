/**
 * Created by lixin on 2018/5/11.
 */



import React from 'react'
import {NavBar,Icon} from 'antd-mobile'

class VideoTrain extends React.Component{



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            videoUrl:''
        };
    }

    back = e => {
        const {history} = this.props
        history.goBack();
    };

    componentWillMount() {
        this.setState({videoUrl:this.props.history.location.state[0].videoUrl})
    }

    render(){
        return <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >视频规范</NavBar>

            <div style={{marginTop:55,textAlign:'center',background:'#fff'}}>
                <video style={{width:'100%'}} src={'http://foodsafety.feiqubao.com/'+this.state.videoUrl} controls="controls">
                    your browser does not support the video tag
                </video>

            </div>
        </div>
    }
}

export default VideoTrain
