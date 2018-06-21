var tween = (function () {
	
	/**
	 * 封装一个线性运动的函数
	 * t表示time:已经运动的时间
	 * b表示beginLocation:开始运动时的位置
	 * c表示运动的总距离
	 * d表示duration:总共运动多长时间
	 * 返回值为运动时间为time时所在的位置
	 */
	function Linear(b,c,t,d) {
		return (c * t / d + b);
	}
	
	/**
	  * 实现多方向的匀速运动
	  * curEle:当前要操作的元素
	  * target：要运动到的目标位置，存储的是每一个方向的目标位置，接受一个对象。
	  * duration:当前动画运动的总时间
	 */
	function move(curEle,target,duration) {
		//根据target获取每一个方向的起始值begin和总距离change
		var begin = {},change = {},Loc = {};
		for (var key in target) {
			if (target.hasOwnProperty(key)) {
				begin[key] = parseInt(curEle.css(key));
				change[key] = target[key] - begin[key];
			}
		}
		var time = 0
		curEle.timer = setInterval(function () {
			time += 10;
			if (time >= duration) {
				curEle.css(target);
				clearInterval(curEle.timer);
				return;
			}
			for (var key in target) {
				if (target.hasOwnProperty(key)) {
					var curP = Linear(begin[key],change[key],time,duration);
					Loc[key] = curP;
					//curEle.css(key,curP);
					//思考一下为什么不在这一步渲染样式到页面，而要在for循环结束后再统一渲染页面
				}		
			}
			curEle.css(Loc);
			//为什么在这里渲染页面，而不在for循环内渲染页面。
			//操作DOM的代价是昂贵的，每次渲染都可能会造成重绘或重排。因此可以将for循环里的DOM渲染放在循环结束后统一渲染。
			
		},100)
	}
	
	
	return {
		Linear : Linear,
		move : move,
		
	}
	
})()