import { useState } from 'react';
import React,{Component} from 'react'

class testDemo extends Component{



    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            inst:{}
        };
    }


    render() {
        const [count,setCount] = useState(0)

        return (

            <div>
                <p>Clicked {count} times</p>
                <button
                    onClick={() => setCount(count+1)}
                ></button>
            </div>
        );
    }


}


export default  testDemo;


