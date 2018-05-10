/**
 * Created by lixin on 2018/5/8.
 */


const Utils = {
    //验证手机号
    checkCellphone:(phone) => {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        return myreg.test(phone)
    }
}
export default Utils