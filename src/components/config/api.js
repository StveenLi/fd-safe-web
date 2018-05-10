/**
 * Created by lixin on 2018/4/27.
 */
import './config'


export const user = JSON.parse(localStorage.getItem('userInfo'));

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
        //this.host = 'http://192.168.0.158:8080/FSafe'
        this.host = 'http://foodsafety.feiqubao.com'
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

export const getNotice = () => {
    let formData = new FormData();
    formData.append('userId',user.id);
    return new Requester(_POST_(formData),'/rest/index/getNotice').do_fetch();
}

export const getResByUserId = () => {
    let formData = new FormData();
    formData.append('userId',user.id);
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