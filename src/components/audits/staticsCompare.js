/**
 * Created by lixin on 2018/4/17.
 */
import React from 'react'
import {WhiteSpace,Picker,List} from 'antd-mobile'
import styles,{GREY} from '../config/style'
import SearchComponent from '../common/searchComponent'

class StaticsCompare extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            AOrB:true,
            startDate:'',
            endDate:'',
            resValue:'',
            sValue:'',
            bValue:'',
            tValue:'',
            pickerValue:{},
            groups:[],
            brands:[],
            types:[],
            resOptions:[],
            rankResList:[],
            searchDisplay:'none',
            docked:true,
            AResult:{},
            BResult:{},

        };
      }

    onDock (d){

    }

    componentDidMount() {
    }


    chooseA(){
        const {startDate,endDate,AOrB,resValue,sValue,bValue,tValue,pickerValue,AResult} = this.state;
        //选择A时保存B显示A
        if(!AOrB){
            let _BResult = {
                startDate:startDate,
                endDate:endDate,
                resValue:resValue,
                sValue:sValue,
                bValue:bValue,
                tValue:tValue,
                pickerValue:pickerValue
            }
            this.setState({
                startDate:AResult.startDate,
                endDate:AResult.endDate,
                resValue:AResult.resValue,
                sValue:AResult.sValue,
                bValue:AResult.bValue,
                tValue:AResult.tValue,
                pickerValue:AResult.pickerValue,
                AOrB:true,
                BResult:_BResult

            })
        }
    }

    chooseB(){
        const {startDate,endDate,AOrB,resValue,sValue,bValue,tValue,pickerValue,BResult} = this.state;
        if(AOrB){
            let _AResult = {
                startDate:startDate,
                endDate:endDate,
                resValue:resValue,
                sValue:sValue,
                bValue:bValue,
                tValue:tValue,
                pickerValue:pickerValue

            }
            this.setState({
                startDate:BResult.startDate,
                endDate:BResult.endDate,
                resValue:BResult.resValue,
                sValue:BResult.sValue,
                bValue:BResult.bValue,
                tValue:BResult.tValue,
                pickerValue:BResult.pickerValue,

                AOrB:false,
                AResult:_AResult

            })
        }
    }

    setGroupVal(v){
        let {AOrB,AResult,BResult} = this.state
        if(AOrB){
            AResult.sValue = v;
            this.props.setAResult(AResult)
        }else{
            BResult.sValue = v;
            this.props.setBResult(BResult)
        }
        this.setState({ sValue: v });
    }

    setBrandsValue(v){
        let {AOrB,AResult,BResult} = this.state
        if(AOrB){
            AResult.bValue = v;
            this.props.setAResult
        }else{
            BResult.bValue = v;
            this.props.setBResult(BResult)
        }
        this.setState({ bValue: v })
    }

    setCountriesValue(v){
        let {AOrB,AResult,BResult} = this.state
        if(AOrB){
            AResult.pickerValue = v;
            this.props.setAResult(AResult)
        }else{
            BResult.pickerValue = v;
            this.props.setBResult(BResult)
        }
        this.setState({ pickerValue: v })
    }

    setTypesValue(v){
        let {AOrB,AResult,BResult} = this.state
        if(AOrB){
            AResult.tValue = v;
            this.props.setAResult(AResult)
        }else{
            BResult.tValue = v;
            this.props.setBResult(BResult)
        }
        this.setState({ tValue: v })
    }

    setResValue(v){
        let {AOrB,AResult,BResult} = this.state
        if(AOrB){
            AResult.resValue = v;
            this.props.setAResult(AResult)
        }else{
            BResult.resValue = v;
            this.props.setBResult(BResult)
        }
        this.setState({ resValue: v })
    }

    render(){
        let {AOrB} = this.state
        const {groups,brands,types,resOptions} = this.props
        const {cityData} = this.props
        const sidebar = (<List style={{marginLeft:-15}}>
            <WhiteSpace/>

            <Picker
                cols={1}
                data={groups}
                value={this.state.sValue}
                onOk={(v) => this.setGroupVal(v)}
                onChange={(v) => this.setGroupVal(v)}
            >
                <List.Item arrow="horizontal">集团</List.Item>
            </Picker>
            <WhiteSpace/>

            <Picker
                cols={1}
                data={brands}
                value={this.state.bValue}
                onOk={(v) => this.setBrandsValue(v)}
                onChange={v => this.setBrandsValue(v)}
            >
                <List.Item arrow="horizontal">品牌</List.Item>
            </Picker>
            <WhiteSpace/>

            <Picker
                data={cityData}
                value={this.state.pickerValue}
                onChange={v => this.setCountriesValue(v)}
                onOk={v => this.setCountriesValue(v)}
            >
                <List.Item arrow="horizontal">区域</List.Item>
            </Picker>
            <WhiteSpace/>

            <Picker
                cols={1}
                data={types}
                value={this.state.tValue}
                onChange={v => this.setTypesValue(v)}
                onOk={v => this.setTypesValue(v)}>
                <List.Item arrow="horizontal">品类</List.Item>
            </Picker>
            <WhiteSpace/>

            <Picker
                cols={1}
                data={resOptions}
                value={this.state.resValue}
                onChange={v => this.setResValue(v)}
                onOk={v => this.setResValue(v)}>
                <List.Item arrow="horizontal">门店</List.Item>
            </Picker>
        </List>);
        return <div style={{width:'100%',textAlign:'center'}}>
                <WhiteSpace/>
                <div style={{display:'flex',flexDirection:'row ',backgroundColor:'#fff'}}>
                    <div style={AOrB?styles._Option_BULE:styles._Option_WHITE}
                        onClick={() => this.chooseA()}
                    >A条件</div>
                    <div
                        onClick={() => this.chooseB()}
                        style={!AOrB?styles._Option_yellow:styles._Option_WHITE}>B条件</div>
                </div>
                <WhiteSpace/>

            <SearchComponent
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDock={() => this.onDock()}
                sidebar={sidebar}
                docked={this.state.docked}
                setStartDate={date => this.setState({ startDate:date })}
                setEndDate={date => this.setState({ endDate:date })}
            />


            <WhiteSpace/>

            <div style={{background:'#fff',display:'flex',flexDirection:'row',height:300,marginBottom:50}}>
                <div style={{flex:1,marginTop:30}}>
                    <span style={{backgroundColor:'#0cc1a3',padding:'5px 10px',color:'#fff'}}>A</span>  - -</div>
                <div style={{borderStyle:'solid',borderWidth:1,borderColor:GREY,margin:'20px 0'}}></div>
                <div style={{flex:1,marginTop:30}}>
                    <span style={{backgroundColor:'#fec032',padding:'5px 10px',color:'#fff'}}>B</span>  - -</div>
            </div>


        </div>
    }


}
export default StaticsCompare