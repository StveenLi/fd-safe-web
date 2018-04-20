/**
 * Created by lixin on 2018/4/19.
 */


import React from 'react'
import {NavBar,Icon} from 'antd-mobile'
import styles,{GREY} from '../config/style'
class FuncPage extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    back = e => {
        const {history} = this.props
        history.goBack();
    };
    render(){
       return <div>
           <NavBar
               mode="light"
               icon={<Icon type="left" />}
               onLeftClick={() => this.back()}
           >功能</NavBar>

           <div style={{backgroundColor:'#fff',marginTop:50,padding:15,fontSize:16}}>
                   <div style={styles.func_item}><div>审核员</div><div style={styles.func_item_right}>李青青</div></div>
                   <div style={styles.func_item}><div>日期</div><div style={styles.func_item_right}>2017-10-31</div></div>
                   <div style={styles.func_item}><div>门店</div><div style={styles.func_item_right}>上海宝山万达</div></div>
                   <div style={styles.func_item}><div>状态</div><div style={styles.func_item_right}>审核已完成</div></div>
                   <div style={styles.func_item_noline}><div>综合评分</div><div style={styles.func_item_right}>98分</div></div>

           </div>
           <div style={{backgroundColor:'#fff',marginTop:50,padding:15,fontSize:16,marginTop:10}}>
               <div
                   onClick={()=>this.props.history.push('/signature')}
                   style={styles.func_item}><div>署名</div><div style={styles.func_item_right}> > </div></div>
               <div style={styles.func_item_noline}><div>报告生成</div><div style={styles.func_item_right}> > </div></div>
           </div>

       </div>
    }
}
export default FuncPage