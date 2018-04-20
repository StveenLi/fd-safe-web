/**
 * Created by lixin on 2018/4/20.
 */

import React from 'react'
import { Accordion, List,NavBar,Icon,Badge,ImagePicker, WingBlank, SegmentedControl} from 'antd-mobile';
import styles,{screenWidth} from '../config/style'

const data = [];

class Remarks extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            files: data,
            multiple: false,
        };
      }
    back = e => {
        const {history} = this.props

        console.log(history)
        history.goBack();
    };
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }

    render(){
        const { files } = this.state;

        return <div>

            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            > 备注</NavBar>
            <div>
                问题:1.1.1采购的食品相关产品等应用符合
                国家有关食品安全标准和规定的要求。
            </div>

            <div style={{backgroundColor:'#fff'}}>
                <textarea style={{fontSize:16,padding:15,width:screenWidth,height:300}}>
                </textarea>
                <div style={{width:'100%',backgroundColor:'#fff'}}>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 5}
                        multiple={this.state.multiple}
                    />
                </div>
            </div>
        </div>
    }
}
export default Remarks