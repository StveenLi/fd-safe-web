/**
 * Created by lixin on 2018/4/13.
 */


import React from 'react'
import { NavBar, Icon, Picker, List, DatePicker, Button, InputItem, Toast } from 'antd-mobile';
import styles, { BLUE, GREY } from '../config/style'
import { RadioGroup, Radio } from 'react-radio-group';
import { queryCity, queryAssessHis, getReportOption } from '../config/api'
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';



class Report extends React.Component {



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedValue: '0',
            groups: [],
            brands: [],
            types: [],
            sValue: '',
            bValue: '',
            typeValue: '',
            areas: [],
            pickerValue: '',
            resOptions: [],
            resValue: '',
            startDate: '',
            endDate: new Date(),
            startNums: '',
            endNums: '',
            selectedAuditValue: '0',
            transmitParam: {},
            cityData: []
        }
            ;
    }
    back = e => {
        const { history } = this.props
        history.goBack();
    };

    handleChange(value) {
        this.setState({ selectedValue: value });
    }

    componentDidMount() {


        this.setAllOptions();
        //getGroupName().then(data => {
        //    this.state.groups.push({label:'不限',value:''})
        //    if(data.success){
        //        for(let op of data.list){
        //            this.state.groups.push({label:op.name,value:op.name})
        //        }
        //    }
        //})
        //getBrandName().then(data => {
        //    if(data.success){
        //        this.state.brands.push({label:'不限',value:''})
        //        for(let op of data.list){
        //            this.state.brands.push({label:op.name,value:op.name})
        //        }
        //    }
        //})
        //queryTypes().then(data => {
        //    if(data.success){
        //        this.state.types.push({label:'不限',value:''})
        //        for(let op of data.list){
        //            this.state.types.push({label:op.name,value:op.name})
        //        }
        //    }
        //})
        //getResByUserId().then(data => {
        //    if(data.success){
        //        let arr = [];
        //        arr.push({label:'不限', value:''})
        //        for(let op of data.list){
        //            arr.push({label:op.name,value:op.id});
        //        }
        //        this.setState({
        //            resOptions:arr
        //        })
        //    }else{
        //        Toast.fail(data.msg, 1);
        //    }
        //})


    }

    setAllOptions() {
        const { endDate, sValue, bValue, pickerValue, typeValue, resValue, startNums, endNums } = this.state;
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
        this.setState({ startDate: startDate })
        getReportOption(
            startDate.format('yyyy-MM-dd'), endDate.format('yyyy-MM-dd'),
            sValue,
            bValue,
            pickerValue[0],
            pickerValue[1] ? pickerValue[1] : '',
            pickerValue[2] ? pickerValue[2] : '',
            typeValue,
            resValue, startNums, endNums).then(data => {
                if (data.success) {
                    let brands = [{ label: '不限', value: '' }];
                    let groups = [{ label: '不限', value: '' }];
                    let types = [{ label: '不限', value: '' }];
                    let resOptions = [{ label: '不限', value: null }];
                    let cityData = [{ label: '不限', value: '' }]
                    for (let op of data.brands) {
                        brands.push({ label: op, value: op })
                    }
                    for (let op of data.groups) {
                        groups.push({ label: op, value: op })
                    }
                    for (let op of data.types) {
                        types.push({ label: op, value: op })
                    }
                    for (let op of data.rest) {
                        resOptions.push({ label: op.name, value: op.id })
                    }
                    for (let province in data.qy) {
                        let cities = [{ label: '不限', value: '' }];
                        for (let city in data.qy[province].childs) {
                            let countries = [{ label: '不限', value: '' }];
                            for (let country in data.qy[province].childs[city].childs) {
                                countries.push({
                                    label: data.qy[province].childs[city].childs[country].value,
                                    value: data.qy[province].childs[city].childs[country].name,
                                })
                            }
                            cities.push({
                                label: data.qy[province].childs[city].value,
                                value: data.qy[province].childs[city].name,
                                children: countries
                            })
                        }
                        cityData.push({
                            label: data.qy[province].value,
                            value: data.qy[province].name,
                            children: cities
                        })
                    }


                    this.setState({
                        brands: brands,
                        groups: groups,
                        types: types,
                        resOptions: resOptions,
                        cityData: cityData
                    })
                }
            })
    }

    setRestaurantList(v) {
        const { startDate, endDate } = this.state;
        let self = this;
        getReportOption(startDate.format('yyyy-MM-dd'), endDate.format('yyyy-MM-dd'), '', '', '', '', '', '', '', '', '', v).then(data => {
            if (data.success) {
                let resOptions = [{ label: '不限', value: null }];
                for (let op of data.rest) {
                    resOptions.push({ label: op.name, value: op.id })
                }

                self.setState({
                    resOptions: resOptions
                })
            }
        })
    }



    async queryReport_groups(v) {
        await this.setState({ sValue: v });
        this.setAllOptions();
    }

    async queryReport_brands(v) {
        await this.setState({ bValue: v });
        this.setAllOptions();
    }
    async queryReport_types(v) {
        await this.setState({ typeValue: v });
        this.setAllOptions();
    }
    async queryReport_resOptions(v) {
        await this.setState({ resValue: v });
        this.setAllOptions();
    }
    async queryReport_P_C_C(v) {
        await this.setState({ pickerValue: v });
        this.setAllOptions();
    }

    componentWillMount() {

        //this.getP_C_County()
    }

    //获取城市JSON
    getP_C_County() {
        queryCity('').then(data => {
            let province = [];
            province.push({ "label": "不限", "value": 0 })
            if (data.success) {
                for (let area of data.list) {
                    let cities = [];
                    cities.push({ "label": "不限", "value": 0 });
                    queryCity(area.id).then(data => {
                        for (let area of data.list) {
                            let counties = [];
                            counties.push({ "label": "不限", "value": 0 })
                            queryCity(area.id).then(data => {
                                for (let area of data.list) {
                                    counties.push({
                                        label: area.name,
                                        value: area.id,
                                    })
                                }
                                cities.push({
                                    label: area.name,
                                    value: area.id,
                                    children: counties
                                })
                            })
                        }
                        province.push({
                            label: area.name,
                            value: area.id,
                            children: cities
                        })

                    });
                }
            }
        })
    }


    serachReport() {
        Toast.loading('查询中，请稍后……', 0, true);
        const { startDate, endDate, sValue, bValue, pickerValue, selectedValue, tValue, resValue, startNums, endNums } = this.state
        queryAssessHis(
            startDate.format('yyyy-MM-dd'), endDate.format('yyyy-MM-dd')
            , sValue, bValue, pickerValue[0],
            pickerValue[1] ? pickerValue[1] : '',
            pickerValue[2] ? pickerValue[2] : '', '', tValue, resValue, startNums, endNums
        ).then(data => {
            if (data.success) {
                Toast.hide();
                this.props.history.push('/reportList', [{ transmitParam: data.list }])
            }
        })

    }

    onModChange(e) {

        this.setState({
            selectedValue: e.target.value
        })

    }

    onAuditChange(e) {

        this.setState({
            selectedAuditValue: e.target.value
        })

    }
    _bindSearchRest(v) {
        this.setRestaurantList(v)
    }


    render() {

        const { groups, brands, types, resOptions, cityData } = this.state
        return <div>
            <div><NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.back()}
            >报告查询</NavBar></div>
            <div style={{ flex: 1, marginTop: 50, marginBottom: 100 }}>
                <List>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List.Item>日期</List.Item>
                        <DatePicker
                            mode="date"
                            extra='2018-05-01'
                            value={this.state.startDate}
                            onOk={date => this.setState({ startDate: date })}
                            onChange={date => this.setState({ startDate: date })}
                        >
                            <List.Item style={{ flex: 1 }}>
                            </List.Item>
                        </DatePicker>
                        <List.Item>-</List.Item>
                        <DatePicker
                            mode="date"
                            extra='2018-05-16'
                            value={this.state.endDate}
                            onChange={date => this.setState({ endDate: date })}
                            style={{ flex: 1 }}
                        >
                            <List.Item style={{ flex: 1 }}>
                            </List.Item>
                        </DatePicker>
                    </div>
                    {
                        groups.length > 0 ? <Picker
                            cols={1}
                            data={groups}
                            value={this.state.sValue}
                            onChange={v => this.queryReport_groups(v)}
                            onOk={v => this.queryReport_groups(v)}
                        >
                            <List.Item arrow="horizontal">集团</List.Item>
                        </Picker> : null
                    }

                    {
                        brands.length > 0 ? <Picker
                            cols={1}
                            data={brands}
                            value={this.state.bValue}
                            onChange={v => this.queryReport_brands(v)}
                            onOk={v => this.queryReport_brands(v)}
                        >
                            <List.Item arrow="horizontal">品牌</List.Item>
                        </Picker> : null
                    }

                    <Picker
                        data={cityData}
                        value={this.state.pickerValue}
                        onChange={v => this.queryReport_P_C_C(v)}
                        onOk={v => this.queryReport_P_C_C(v)}
                        extra="不限"
                    >
                        <List.Item arrow="horizontal">区域</List.Item>
                    </Picker>
                    {
                        types.length > 0 ? <Picker
                            cols={1}
                            data={types}
                            value={this.state.typeValue}
                            onChange={v => this.queryReport_types(v)}
                            onOk={v => this.queryReport_types(v)}
                            extra="不限"
                        >
                            <List.Item arrow="horizontal">品类</List.Item>
                        </Picker> : null
                    }

                    <List.Item
                        extra={
                            <div>
                                <label style={{ margin: 10 }}>
                                    <Checkbox
                                        defaultChecked
                                        value={0}
                                        onChange={(e) => this.onModChange(e)} />&nbsp;直营
                            </label>
                                <label >
                                    <Checkbox
                                        defaultChecked
                                        value={1}
                                        onChange={(e) => this.onModChange(e)} />&nbsp;加盟
                            </label>
                            </div>
                        }>
                        模式</List.Item>

                    <List.Item
                        extra={
                            <div>
                                <label style={{ margin: 10 }}>
                                    <Checkbox
                                        defaultChecked
                                        value={0}
                                        onChange={(e) => this.onAuditChange(e)} />&nbsp;内审
                            </label>
                                <label>
                                    <Checkbox
                                        defaultChecked
                                        value={1}
                                        onChange={(e) => this.onAuditChange(e)} />&nbsp;外审
                            </label>

                            </div>}>审核类型</List.Item>


                    {
                        resOptions.length > 0 ? <Picker
                            title={<InputItem style={{ margin: 5, height: 30 }} placeholder="输入要搜索的门店名" onChange={(v) => this._bindSearchRest(v)} ></InputItem>}
                            cols={1}
                            data={resOptions}
                            value={this.state.resValue}
                            onChange={v => this.queryReport_resOptions(v)}
                            onOk={v => this.queryReport_resOptions(v)}
                            extra="不限"
                        >

                            <List.Item arrow="horizontal">门店</List.Item>
                        </Picker> : null
                    }

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List.Item>审核分数</List.Item>
                        <InputItem type="number" placeholder="0" onChange={val => this.setState({ startNums: val })} style={{ width: 50 }}></InputItem>
                        <List.Item>-</List.Item>

                        <InputItem type="number" placeholder="100" onChange={val => this.setState({ endNums: val })} style={{ width: 50 }}></InputItem>
                    </div>

                </List>
            </div>
            <div style={{ position: 'fixed', bottom: 0, width: '100%', display: 'block', display: 'flex', flexDirection: 'row' }}>
                {/*<Button style={{flex:1}} onClick={() => this.props.history.push('/reportDetail')}>重置</Button>*/}

                <Button style={{ flex: 1, background: BLUE }} type="primary" onClick={() => this.serachReport()}>提交</Button>
            </div>



        </div>
    }

}

export default Report