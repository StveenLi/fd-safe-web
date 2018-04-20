/**
 * Created by lixin on 2018/4/19.
 */

import React from 'react'
import {NavBar,Icon,Button} from 'antd-mobile'
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from '../signature/index.js'
import {screenWidth} from '../config/style'
class Signature extends React.Component{




    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            trimmedDataURL:null,
            screenWidth:screenWidth
      };
      }
    sigPad = {};

    back = e => {
        const {history} = this.props
        history.goBack();
    };
    clear = () => {
        this.sigPad.clear()
    }
    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png')})
    }

    componentDidMount() {
        //console.log(document.documentElement.clientWidth);
    }

    render(){
        let {trimmedDataURL} = this.state

        return <div style={{width:'100%'}}>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >签名版</NavBar>
            <div style={{marginLeft:15,marginRight:15,marginTop:60}}>
                <SignaturePad
                    backgroundColor="#fff"
                    canvasProps={{width:screenWidth-30,height:450,className: 'sigCanvas'}}
                              ref={(ref) => { this.sigPad = ref }} />

            </div>

            <div style={{margin:15,display:'flex',flexDirection:'row'}}>
                <Button style={{flex:1,marginRight:15}} type="primary"  onClick={() => this.clear()}>
                    重写
                </Button>
                <Button style={{flex:1,marginLeft:15}} type="primary" onClick={() => this.trim()}>
                    完成
                </Button>
            </div>
            {trimmedDataURL
                ? <img
                       src={trimmedDataURL} />
                : null}
        </div>
    }
}


export default Signature
