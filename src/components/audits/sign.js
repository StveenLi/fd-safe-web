/**
 * Created by lixin on 2018/07/30.
 */



import React from 'react'
import {NavBar,Icon,Button,InputItem,Toast} from 'antd-mobile'
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from '../signature/index.js'
import {screenWidth,FONTGREY,GREY,BLUE} from '../config/style'
import {uploadByBase64} from '../config/api'

class Sign extends React.Component{



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            reserSignUrl:'',
            signText:''
        };
    }

    back = e => {
    };
    clear = () => {
        this.sigPad.clear();
        this.sigPad.on();
    }
    trim = () => {
        if(this.state.signText==''&&this.props.currentSigner==1){
            Toast.fail('餐厅负责人签名标注不能为空',1);
            return;
        }
        let self = this;
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')})
        uploadByBase64(this.sigPad.getTrimmedCanvas().toDataURL('image/png')).then(data => {
            if(data.success){
                this.setState({reserSignUrl:data.url})
                this.sigPad.off();
                self.props.trimFinish(data.url,self.props.currentSigner,self.state.signText);
            }
        })
    }
    componentWillMount() {
    }

    render(){
        return <div>
            <NavBar
                mode="light"
            >签字</NavBar>
            <div style={{marginTop:65}}>
                <SignaturePad
                    backgroundColor="#fff"
                    canvasProps={{width:screenWidth,height:250,className: 'sigCanvas'}}
                    ref={(ref) => { this.sigPad = ref }} />
                {this.props.currentSigner==1?<InputItem
                    type='text'
                    placeholder="请输入签名"
                    clear
                    onChange={(v) => { this.setState({signText:v}) }}
                    onBlur={(v) => { this.setState({signText:v}) }}
                    keyboardAlign="right"
                    textAlign="right"
                >签名标注</InputItem>:null}

                <div style={{margin:15,display:'flex',flexDirection:'row'}}>
                    <Button style={{flex:1,marginRight:5}} type="ghost" size='small'  onClick={() => this.clear()}>
                        重写
                    </Button>
                    <Button style={{flex:1,marginLeft:5}} type="ghost" size='small'  onClick={() => this.trim()}>
                        确认
                    </Button>
                </div>
            </div>
        </div>
    }
}

export default Sign
