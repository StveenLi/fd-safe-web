/**
 * Created by lixin on 2018/4/20.
 */

import React from 'react'
import {NavBar,ImagePicker,Button,Toast} from 'antd-mobile';
import styles,{screenWidth} from '../config/style'
import {uploadByBase64} from '../config/api'
import {BLUE} from '../config/style'
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import lrz from 'lrz';
const data = [];

class Remarks extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            files: data,
            multiple: false,
            images:[],
            textValue:'',
            visible: false,
            chooseIndex:0
        };
      }


    componentDidMount() {
        let fileDatas = [];
        for(let remark of this.props.remarkList){
            if(remark.itemId == this.props.currentItem){
                if(remark.images instanceof Array){
                    for(let img of remark.images){
                        fileDatas.push({url:img,id:remark.images.indexOf(img)})
                    }
                    this.setState({
                        images:remark.images,
                        files:fileDatas
                    })
                }
                document.getElementById("textVal").value = remark.content
                break;
            }

        }

    }

    onChange = (files, type, index) => {

        this.setState({
            files,
        });
        if(type === 'add'){
            Toast.loading('压缩上传中……', 0, true);
            let _file;
            if((typeof(index) == "undefined")){
                index = 0
            }
            if(files instanceof Array){
                //_file = files[files.length-1].file;
                lrz(files[files.length-1].url, {quality:0.1})
                    .then((rst)=>{
                        // 处理成功会执行
                        uploadByBase64(rst.base64).then((data) => {
                            if(data.success){
                                Toast.hide();
                                this.state.images.push(data.url);
                            }else{
                                Toast.hide();
                                Toast.fail(data.msg,1);
                            }
                        })
                    })

            }
        }
        if(type === 'remove'){
            this.state.images.splice(index);
        }
    }
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }


    _onSure(isNoUse){

        let remarkValue = {};
        remarkValue.itemId = this.props.currentItem
        remarkValue.content = document.getElementById('textVal').value;
        remarkValue.images = this.state.images
        if(isNoUse){
            remarkValue.isKey = 4
        }
        this.props.changePageStatus(remarkValue)
    }


    render(){
        const { files } = this.state;

        return <div>

            <NavBar
                mode="light"

            > 备注</NavBar>
            <div></div>
            <div style={{marginTop:50,padding:15,fontSize:16}}>
                {this.props.currentQuestion}

            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{flex:1}}></div>

                <div
                    onClick={() => this._onSure(true)}
                    style={styles.no_use_blue}>不适用</div>
            </div>
            <div style={{backgroundColor:'#fff'}}>
                <textarea id="textVal" style={{fontSize:16,padding:15,width:screenWidth-50,height:200}}>

                </textarea>
                <div style={{width:'100%',backgroundColor:'#fff'}}>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => this.setState({ visible: true ,chooseIndex:index})}
                        selectable={files.length < 5}
                        multiple={this.state.multiple}
                    />
                </div>
            </div>
            <div style={{marginTop:30}}>
                <Button
                    onClick={() => this._onSure()}
                    type="primary" style={{margin:'15px 30px',backgroundColor:BLUE}}>确定</Button>
            </div>
            <Viewer
                visible={this.state.visible}
                onClose={() => { this.setState({ visible: false }); } }
                images={[{src: this.state.images[this.state.chooseIndex], alt: ''}]}
                noNavbar={true}
                noToolbar={true}
                noClose={false}
            />
        </div>
    }
}
export default Remarks