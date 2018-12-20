/**
 * Created by lixin on 2018/4/27.
 */
import './config'


export const user = JSON.parse(localStorage.getItem('userInfo'));

const _isUndefined = (tmp) => typeof(tmp) == "undefined"?'':tmp;
//默认的GET Header
const _GET_ = () =>  {
    return {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
}

//默认的POST Header
const _POST_ = (body) => {
    return({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            contentType: "application/x-www-form-urlencoded"
        },
        body: body
    })
}


//通用的请求生成器
class Requester {

    constructor(header={}, url) {
        //this.host = 'http://192.168.0.124:8080/foodsafety'
        //this.host = 'http://api.map.baidu.com/place/v2'
        //this.host = 'http://test.linkitchen.com/'
        //this.host = 'http://lilyfoodsafety.com/'
        //this.host = 'http://localhost:8011/'
        this.host = 'http://192.168.0.100:8011/'
        this.version = '1.0.0'
        this.url = url
        this.header = header
    }
    do_fetch (url_improvement=true) {
        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => {reject("请求超时")}, 20000);
            let _url = url_improvement ? `${this.host}${this.url}` : this.url
            fetch(_url, this.header).then(
                (response) => {
                    clearTimeout(timeout);
                    if (response.status.toString().match(/^2.*/)) {
                        return response.json()
                    } else {
                        return reject(response.status)
                    }
                }).then((responseData) => {
                    if (responseData.code == 200401 ) {
                        return(reject('版本错误'))
                    }
                    return resolve(responseData)
                }).catch((error) => {
                    return reject(error)
                })
        })
    }
}


export const getUserInfo = () =>{
    return new Requester(_GET_(),'/getUser').do_fetch();
}

export const getPlanByCanting = () =>{
    return new Requester(_POST_({userId:1,cantingId:1}),'/rest/assess/getPlanByCanting').do_fetch();
}

export const login = (phone,vaildCode) => {
    let formData = new FormData();
    formData.append('phone',phone);
    formData.append('vaildCode',vaildCode);
    return new Requester(_POST_(formData),'/rest/user/login').do_fetch();
}

export const sendValidCode = (phone) => {
    let formData = new FormData();
    formData.append('phone',phone);
    return new Requester(_POST_(formData),'/rest/user/getVaildCode').do_fetch();
}

export const doAddPlan = (phone) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/user/doAddPlan').do_fetch();
}

export const getNotice = () => {
    let formData = new FormData();
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/index/getNotice').do_fetch();
}

export const getResByUserId = (name) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('name',name);
    return new Requester(_POST_(formData),'/rest/assess/getCanting').do_fetch();
}

export const getAuditsType = (resId) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('cantingId',resId);
    return new Requester(_POST_(formData),'/rest/assess/getPlanByCanting').do_fetch();
}



//获取当地手机位置信息，并判断当前手机是否在餐厅附近
export const getAddressByXY = (cantingId,x,y) => {
    let formData = new FormData();
    formData.append('cantingId',cantingId);
    formData.append('x',x);
    formData.append('y',y);
    return new Requester(_POST_(formData),'/rest/assess/getAddressByXY').do_fetch();
}

//获取审核员关联的集团列表
export const getGroupName = () => {
    let formData = new FormData();
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/common/queryGroupName').do_fetch();
}

//审核条目list
export const getAssessList = (planType,cantingId) => {
    let formData = new FormData();
    formData.append('planType',planType);
    formData.append('assessUserId',user.id);
    formData.append('cantingId',cantingId);
    return new Requester(_POST_(formData),'/rest/assess/queryAssessList').do_fetch();
}

//获取题目详情
export const getQuestionDetail = (planId,auditId) => {
    let formData = new FormData();
    formData.append('planId',planId);
    formData.append('auditeId',auditId);
    return new Requester(_POST_(formData),'/rest/assess/doAssess').do_fetch();
}

//提交题目
export const submitAssess = (subArr,nextTopic) => {
    let formData = new FormData();
    formData.append('jsonData',subArr);
    formData.append('nextTopic',nextTopic);
    return new Requester(_POST_(formData),'/rest/assess/doSubmitAssess').do_fetch();
}

export const doSubmitOption = (jsonObject) => {
    let formData = new FormData();
    formData.append('jsonObject',jsonObject);
    return new Requester(_POST_(formData),'/rest/assess/doSubmitOption').do_fetch();
}

//获得品牌列表
export const getBrandName = () => {
    let formData = new FormData();
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/common/queryBrandName').do_fetch();
}


//提交审核
export const doStatistics = (planId,signUrl,ownSignUrl,signCn) => {
    let formData = new FormData();
    formData.append('planId',planId);
    formData.append('signUrl',signUrl);
    formData.append('ownSignUrl',ownSignUrl);
    formData.append('signCn',signCn);
    return new Requester(_POST_(formData),'/rest/assess/doStatistics').do_fetch();
}

//获取省市区
export const queryCity = (id) => {
    let formData = new FormData();
    formData.append('id',id)

    return new Requester(_POST_(formData),'/rest/common/queryCity').do_fetch();

}

export const queryPlanType = () => {
    return new Requester(_POST_(),'/rest/common/queryPlanType').do_fetch();
}
//获取品类
export const queryTypes = () => {
    return new Requester(_POST_(),'/rest/common/queryTypes').do_fetch();
}


export const queryUnitRank = (sstartDate,sendDate,groups,brand,proviceId,cityId,countyId,townId,types,ascs,cantingId,category) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('sstartDate',sstartDate);
    formData.append('sendDate',sendDate);
    formData.append('groups',groups);
    formData.append('brand',brand);
    formData.append('proviceId',_isUndefined(proviceId));
    formData.append('cityId',_isUndefined(cityId));
    formData.append('countyId',_isUndefined(countyId));
    formData.append('cantingId',_isUndefined(cantingId));
    formData.append('types',types);
    formData.append('category',_isUndefined(category));
    formData.append('ascs',ascs);
    return new Requester(_POST_(formData),'/rest/assessAnalysis/queryUnitRank').do_fetch();
}



export const queryAssessHis = (sstartDate,sendDate,groups,brand,proviceId,cityId,countyId,models,types,cantingId,startNums,endNums) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('sstartDate',_isUndefined(sstartDate));
    formData.append('sendDate',_isUndefined(sendDate));
    formData.append('groups',_isUndefined(groups));
    formData.append('brand',_isUndefined(brand));
    formData.append('proviceId',_isUndefined(proviceId));
    formData.append('cityId',_isUndefined(cityId));
    formData.append('countyId',_isUndefined(countyId));
    formData.append('types',_isUndefined(types));
    formData.append('models',_isUndefined(models));
    formData.append('cantingId',_isUndefined(cantingId));
    formData.append('startNums',startNums);
    formData.append('endNums',endNums);
    formData.append('start',0);
    formData.append('pagesize',100);
    return new Requester(_POST_(formData),'/rest/assessHisSearch/queryAssessHis').do_fetch();
}

export const getAssessDetail = (assessId) =>{
    let formData = new FormData();
    formData.append('assessId',assessId);
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/assessHisSearch/getAssessDetail').do_fetch();
}


export const queryDateRange = (sstartDate,sendDate,resId,category,groups,brand,proviceId,cityId,countyId,townId,types) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('sstartDate',sstartDate);
    formData.append('sendDate',sendDate);
    formData.append('groups',_isUndefined(groups));
    formData.append('brand',_isUndefined(brand));
    formData.append('proviceId',_isUndefined(proviceId));
    formData.append('cityId',_isUndefined(cityId));
    formData.append('countyId',_isUndefined(countyId));
    formData.append('townId',_isUndefined(townId));
    formData.append('types',_isUndefined(types));
    formData.append('cantingId',_isUndefined(resId));
    formData.append('category',_isUndefined(category));
    return new Requester(_POST_(formData),'/rest/assessAnalysis/queryDateRange').do_fetch();
}

//rest/assessAnalysis/queryTrend
export const queryTrend = (sstartDate,sendDate,resId,groups,brand,proviceId,cityId,countyId,townId,types) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('sstartDate',_isUndefined(sstartDate));
    formData.append('sendDate',_isUndefined(sendDate));
    formData.append('groups',_isUndefined(groups));
    formData.append('brand',_isUndefined(brand));
    formData.append('proviceId',_isUndefined(proviceId));
    formData.append('cityId',_isUndefined(cityId));
    formData.append('countyId',_isUndefined(countyId));
    formData.append('townId',_isUndefined(townId));
    formData.append('types',_isUndefined(types));
    formData.append('cantingId',_isUndefined(resId));
    return new Requester(_POST_(formData),'/rest/assessAnalysis/queryTrend').do_fetch();

}

//查询是否审核过
export const queryPlan = (planType,cantingId) => {
    let formData = new FormData();
    formData.append('planType',planType);
    formData.append('assessUserId',user.id);
    formData.append('cantingId',cantingId);
    return new Requester(_POST_(formData),'/rest/assess/queryPlan').do_fetch();
}

export const upload = (file) => {
    let formData = new FormData();
    formData.append('ufile',file);
    return new Requester(_POST_(formData),'/rest/common/upload').do_fetch();
}

export const uploadByBase64 = (file) => {
    let formData = new FormData();
    formData.append('fileStr',file);
    return new Requester(_POST_(formData),'/rest/common/uploadByBase64').do_fetch();
}


export const checkUnStandard = (planId) => {
    let formData = new FormData();
    formData.append('planId',planId);
    return new Requester(_POST_(formData),'/rest/assess/checkUnStandard').do_fetch();
}

export const getKeyOption = (planId) => {
    let formData = new FormData();
    formData.append('planId',planId);
    return new Requester(_POST_(formData),'/rest/assess/getKeyOption').do_fetch();
}

export const getReportOption = (sstartDate,sendDate,groups,brand,proviceId,cityId,countyId,types,cantingId,startNums,endNums,restaurantName) => {
    let formData = new FormData();
    formData.append('userId',user.id);
    formData.append('sstartDate',_isUndefined(sstartDate));
    formData.append('sendDate',_isUndefined(sendDate));
    formData.append('groups',_isUndefined(groups));
    formData.append('brand',_isUndefined(brand));
    formData.append('proviceId',_isUndefined(proviceId));
    formData.append('cityId',_isUndefined(cityId));
    formData.append('countyId',_isUndefined(countyId));
    formData.append('types',_isUndefined(types));
    formData.append('cantingId',_isUndefined(cantingId));
    formData.append('startNums',_isUndefined(startNums));
    formData.append('endNums',_isUndefined(endNums));
    formData.append('restaurantName',_isUndefined(restaurantName));
    //console.log(`userId=${user.id}&sstartDate=${sstartDate}&sendDate=${sendDate}&groups=${groups}&brand=${brand}&proviceId=${proviceId}&cityId=${cityId}&countyId=${countyId}&types=${types}&cantingId=${cantingId}&startNums=${startNums}&endNums=${endNums}&restaurantName=${restaurantName}`)
    return new Requester(_POST_(formData),'/rest/common/queryReport').do_fetch();
}

export const getLowNotice = () => {
    return new Requester(_POST_(),'rest/notice/LowNotice').do_fetch();
}

export const queryPlanList = () => {
    let formData = new FormData();
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/common/queryPlanList').do_fetch();
}

export const restResult = (planId,subjectId) => {
    let formData = new FormData();
    formData.append('planId',planId);
    formData.append('subjectId',subjectId);
    return new Requester(_POST_(formData),'/rest/assess/restResult').do_fetch();
}

export const getTrainIndex = () => {
    return new Requester(_POST_(),'/rest/assess/queryAuditeList').do_fetch();
}

export const getTrainList = (id) => {
    let formData = new FormData();
    formData.append('auditeId',id);
    return new Requester(_POST_(formData),'/rest/assess/queryAuditeInfo').do_fetch();
}

export const getTrainDetail = (id) => {
    let formData = new FormData();
    formData.append('auditeId',id);
    return new Requester(_POST_(formData),'/rest/notice/queryTrain').do_fetch();
}


export const getTop10 = (restIds,sstartDate,sendDate) => {
    let formData = new FormData();
    formData.append('restIds',restIds);
    formData.append('sstartDate',sstartDate);
    formData.append('sendDate',sendDate);
    return new Requester(_POST_(formData),'/rest/assessAnalysis/queryOptionTop10').do_fetch();
}

export const doCancelOption = (planId,auditeId) => {
    let formData = new FormData();
    formData.append('planId',planId);
    formData.append('auditeId',auditeId);
    return new Requester(_POST_(formData),'/rest/assess/doCancelOption').do_fetch();
}

export const submitQuestion = (subResultId,rightOrNot,rOption) =>{
    return new Requester(_POST_(),('/rest/subject/doQuestion?subResultId='+subResultId+'&rightOrNot='+rightOrNot+'&rOption='+rOption)).do_fetch();
}
export const submit = (resultId) =>{
    return new Requester(_POST_(),('/rest/subject/submitQuestion?resultId='+resultId)).do_fetch();
}
export const buildExamine = (examineName,examineType,userId) =>{
    return new Requester(_POST_(),('/rest/subject/buildExamine?examineName='+examineName+'&examineType='+examineType+'&userId='+userId)).do_fetch();
}

export const getCheckResults = () => {
    return new Requester(_POST_(),'/rest/subject/getCheckResults').do_fetch();
}
export const getOneCheckResult = (resultId) => {
    return new Requester(_GET_(),('/rest/subject/getOneCheckResult?resultId='+resultId)).do_fetch();
}


export const personalpassCheckResult = (userId,isPass,start,pagesize,doneName) => {
    return new Requester(_POST_(),('/rest/subject/getCheckResults?userId='+userId+'&isPass='+isPass+'&start='+start+'&pagesize='+pagesize+'&doneName='+doneName)).do_fetch();
}
