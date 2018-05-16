/**
 * Created by lixin on 2018/3/21.
 */
//import {StyleSheet} from 'react'

export const BLUE = '#0C51C1'
export const FONTGREY = '#C0C0C0'
export const GREY = '#f3f3f3'
export const ORANGE = '#fec032'
export const screenWidth = document.documentElement.clientWidth;
export const screenHeight = document.documentElement.clientHeight;
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
    },
    page_box:{
        backgroundColor: '#fbfbff',paddingBottom:15,textAlign: 'center'
    },
    home_banner:{
        display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: BLUE
    },
    home_func:{
        display:'flex',textAlign:'center',flexDirection:'column',backgroundColor:'#fff',paddingBottom:10
    },
    func_list:{
        flex:1,display:'flex',flexDirection:'row'
    },
    home_func_item:{
        position:'absolute',left:0,lineHeight:'80px',color:'#fff',fontSize: 20,paddingLeft:50
    },
    no_use:{
        borderColor:'#fff',borderWidth:1,borderStyle:'solid',borderRadius:5,paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15
    },
    no_use_blue:{
        marginRight:20,marginBottom:10,width:43,color:BLUE,borderColor:BLUE,borderWidth:1,borderStyle:'solid',borderRadius:5,paddingTop:5,paddingBottom:5,paddingLeft:15,paddingRight:15
    },
    five_rank:{
        textAlign:'center',fontSize:10,borderStyle:'solid',borderWidth:'1px 0px 1px 1px',borderColor:BLUE,color:BLUE,borderBottomLeftRadius:'50%',borderTopLeftRadius:'50%',padding:'0px 3px 0px 5px',lineHeight:'18px',height:20
    },
    five_rank_left_grey:{
        textAlign:'center',fontSize:10,borderStyle:'solid',borderWidth:'1px 0px 1px 1px',borderColor:BLUE,color:BLUE,borderBottomLeftRadius:'50%',borderTopLeftRadius:'50%',padding:'0px 3px 0px 5px',lineHeight:'18px',height:20
    },
    five_rank_back:{
        textAlign:'center',fontSize:10,borderStyle:'solid',borderWidth:'1px 1px 1px 0px',borderColor:BLUE,color:'red',borderBottomRightRadius:'50%',borderTopRightRadius:'50%',padding:'0px 5px 0px 3px',lineHeight:'18px',height:20
    },
    five_rank_back_right_blue:{
        textAlign:'center',fontSize:10,borderStyle:'solid',borderWidth:'1px 1px 1px 0px',borderColor:BLUE,color:'red',borderBottomRightRadius:'50%',borderTopRightRadius:'50%',padding:'0px 5px 0px 3px',lineHeight:'18px',height:20
    }

}
export default styles