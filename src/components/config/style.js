/**
 * Created by lixin on 2018/3/21.
 */
//import {StyleSheet} from 'react'

export const BLUE = '#3c8df9'

export const GREY = '#f3f3f3'
export const screenWidth = document.documentElement.clientWidth;
const styles = {
    lg_avatar:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    text_white:{
        color: 'white'
    },
    personal_item:{
        flexDirection: 'row', padding: 15, alignItems: 'flex-start', backgroundColor: 'white'
    },
    all_center:{
        justifyContent:'center',
        alignItems:'center',
    },
    func_item:{
        display:'flex',flexDirection:'row',paddingTop:15,paddingBottom:15,borderBottomStyle:'solid',borderBottomColor:GREY,borderBottomWidth:1
    },
    func_item_noline:{
        display:'flex',flexDirection:'row',paddingTop:15,paddingBottom:15
    },
    func_item_right:{
        flex:1,textAlign:'right'
    }

}
export default styles