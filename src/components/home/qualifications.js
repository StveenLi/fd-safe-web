/**
 * Created by lixin on 2019/01/11.
 */


import React from 'react'
import {List,WhiteSpace,Icon,Button,SearchBar,Picker} from 'antd-mobile'
import {getResQualifications} from '../config/api'
import {GREY,screenWidth,FONTGREY,BLUE} from '../config/style'

import ReactWatermark from 'react-watermark-module'
const imagePath = require('../assets/images/baihequali.png')

class Qualifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files:[],
            currImgIndex:0,
            keywords:'',
            resData:[],
            resDataIndex:null,
            requestData:[]

        };
    }
    componentDidMount() {
        //this.addSY()
    }

    addSY(v){

        const {requestData} = this.state
        let v1 = v;
        var img = new Image();

        //为新建的img赋值src
        var mImg = document.getElementById("img");
        img.src = mImg.getAttribute('src');

        // img加载完成
        img.onload=function(){
            //准备canvas
            var canvas=document.getElementById("myCanvas");
            var context=canvas.getContext("2d");
            // 绘制图片
            context.drawImage(img,0,0);
            // 绘制水印
            context.font="10px microsoft yahei";
            context.fillStyle = "#3f5b9c";
            context.fillText("证书编号:"+requestData[v1].code,190,30);
            context.font="12px microsoft yahei";
            context.fillText(requestData[v1].ccTname,120,355);
            context.font="10px microsoft yahei";
            context.fillText("有效期至 "+requestData[v1].effectiveDate,120,425);
        }

    }


    imgClick(index,fs){
        //console.log(index)
        this.setState({
            currImgIndex:index
        })
    }

    searchChange(v){
        this.setState({
            keywords:v,
            resDataIndex:null
        })
    }

    searchSub(){
        let that = this;
        getResQualifications(this.state.keywords).then((data) => {
            if(data.success){
                let resData = []
                for(let i=0;i<data.list.length;i++){
                    resData.push({'value':i,'label':data.list[i].ccTname})
                }
                that.setState({
                    resData:resData,
                    requestData:data.list

                })
            }
        })
    }

    chooseRes(v){
        //console.log(v[0])
        this.setState({
            resDataIndex:v[0]
        })
        this.addSY(v[0]);
    }




    render() {
        let {resData,requestData,resDataIndex} = this.state

        return (

            <div style={{textAlign:'center',background:'#fff'}}>
                <div class="d-linegradient" style={{padding:30,fontSize:25,color:'#fff',textAlign:'center',textShadow:'5px 2px 6px #000'}}>百合花放心餐厅资质认证</div>
                <div style={{display:'flex',flexDirection:'row',background:'#efeff4'}}>
                    <SearchBar style={{flex:1}} placeholder="餐厅编号或证书编号搜索" onChange={(v) => this.searchChange(v)}/>
                    <Picker onOk={(v) => this.chooseRes(v)} data={resData} itemStyle={{textAlign:'center'}} cols="1" extra="搜索" ><Button onClick={() => this.searchSub()} style={{height:28,lineHeight:'28px',margin:'8px 0',fontSize:14,padding:'0 12px'}}>搜索</Button></Picker>
                </div>
                {requestData.length>0&&resDataIndex!=null?
                    <div>
                        <div style={{fontSize:20,padding:10}}>{requestData[resDataIndex].ccTname}</div>
                        <div style={{padding:5,color:'rgb(12, 81, 193)'}}>证书编号:{requestData[resDataIndex].code}</div>
                        <div style={{padding:5,color:'rgb(12, 81, 193)'}}>有效期至 {requestData[resDataIndex].effectiveDate}</div>
                    </div>:<div style={{padding:30,fontSize:20}}>暂无证书数据</div>

                }
                <div style={{borderBottom:'1px solid #EBEBEB',margin:'10px 20px 0 20px'}}></div>
                {requestData.length>0&&resDataIndex!=null?

                <canvas id="myCanvas" width={320} height={500} style={{marginTop:20}}>您的浏览器不支持Canvas</canvas>:null
                    }
                <img id="img" src={imagePath} style={{display:'none'}}/>
                {/*<div>
                    {files.length>0&&files[currImgIndex]?<img src={files[currImgIndex].url} alt=""/>:null}
                </div>*/}
            </div>
        );
    }
}

export default Qualifications

