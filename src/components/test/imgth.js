import {
	useState
} from 'react';
import React, {
	Component
} from 'react'
const imagePath = require('../assets/images/baihequali.png')
const iconPath = require('../assets/icon/audit_list.png')
class imgth extends Component {



	constructor(props) {
		super(props);
		// 初始状态
		this.state = {

		};
	}
	componentDidMount() {
	    this.addth_2()
	}
	
	

	addth() {
		var img = new Image();

		//为新建的img赋值src
		var mImg = document.getElementById("img");
		img.src = mImg.getAttribute('src');

		// img加载完成
		img.onload = function() {
			//准备canvas
			var canvas = document.getElementById("myCanvas");
			var context = canvas.getContext("2d");
			// 绘制图片
			context.drawImage(img, 0, 0);
		}
	}
	
	
	addth_2(){
		var canvas = document.getElementById("myCanvas");
		    canvas.width = 300;
			canvas.height = 700;
		    var context = canvas.getContext("2d");
		
		    context.rect(0 , 0 , canvas.width , canvas.height);
		    context.fillStyle = "#fff";
		    context.fill();
		
		    var myImage2 = document.getElementById("img2");
		    myImage2.onload = function(){
		    	context.drawImage(myImage2 , 200 , 200 , 225 , 225);
		    		// var base64 = canvas.toDataURL("../assets/icon/audit_plan.png");  //"image/png" 这里注意一下
		    		// var img = document.getElementById('avatar');
		    }
		    // myImage.src = "../assets/images/baihequali.png";    //背景图片  你自己本地的图片或者在线图片
		    // myImage.crossOrigin = 'Anonymous';
			setTimeout(aa,500);
			function aa(){
				var myImage = document.getElementById("img");
				myImage.onload = function(){
					context.drawImage(myImage , 0 , 0 );
				    // myImage2.src = "./1.png";   //你自己本地的图片或者在线图片
				    // myImage2.crossOrigin = 'Anonymous';
				}
			}
			
			
	}


	render() {
		return (

			<div>
			<canvas id = "myCanvas" width = {320}
			height = {500} > 您的浏览器不支持Canvas </canvas> 
			
			<img id="img" src={imagePath} style={{display:'none'}}/>
			
			<img id="img2" src={iconPath} style={{display:'none'}}/>
			</div>
			
			
			
			
		);
	}


}


export default imgth;
