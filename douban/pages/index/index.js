//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
		 all_info:[{
			 requestUrl:'in_theaters',
			 title:'正在上映的电影-北京',
       movies:[]

		},{
				 requestUrl:'coming_soon',
			  	title:'即将上映的电影',
          movies: []
				
		 }, {
				 requestUrl: 'top250',
			   title: 'Top250',
         movies: []

}, {
      requestUrl:'us_box',
			title:'北美口碑榜',
      movies: []
				
		 }],
			// imgUrls: [
			// 	'../../images/lb1.jpg',
			// 	'../../images/lb2.jpg',
			// 	'../../images/lb3.jpg',
			// 	'../../images/lb4.jpg'
			// ],
	// 		img1url:[{
	// 			img:'../../images/p1.jpg',
	// 			name:'战长沙'
	// 		}, {
	// 			img: '../../images/p2.jpg',
	// 			name: '雷鸣'
	// 			},{
	// 				img: '../../images/p3.jpg',
	// 				name: '安妮日记'
	// 		}, {
	// 			img: '../../images/p4.jpg',
	// 			name: '十万个为什么'
	// 			}, {
	// 				img: '../../images/p5.jpg',
	// 				name: '台主秘史'
	// 		}, {
	// 			img: '../../images/p6.jpg',
	// 			name: '雍正王朝'
	// 			}, {
	// 				img: '../../images/p7.jpg',
	// 				name: '还珠格格'
	// 		}, {
	// 			img: '../../images/p9.jpg',
	// 			name: '泰坦尼克'
	// 		}],
			interval: 5000,
			duration: 1000
  },






	getCache(){
		return new Promise((resolve,reject)=>{
			 app.wxapi.getStorage('board_data').then((storage_res)=>{
				 if (storage_res.data.expires < Date.now()) {
					 return resolve(null);
				 } else {
					 return resolve(storage_res.data.all_info);
				 }
					
			 }).catch(function(err){
				 return resolve(null);
			 })
		})
	},

	getNetWorkData() {
		var promises = this.data.all_info.map(function(info){
			var url = "https://api.douban.com/v2/movie/" + info.requestUrl;
			return app.wxapi.getNetJson(url, { count: 10 }).then((res) => {
				console.log('进行了一次请求');
				info.movies = res.data.subjects;
				return info;
       
			});
		});
		  Promise.all(promises).then((infos)=>{
				wx.setStorage({
					key: 'board_data',
					data: {
						all_info:infos,
						expires: Date.now() + 1000 * 60 * 60 * 24
					},
				});
				this.setData({
          all_info:infos
        })

			})
     
      
	},
  onLoad: function (options) {
		this.getCache().then((result)=>{
			 if(!result) {
				 this.getNetNetWorkData();
				 console.log(111);
			 } else {
				 this.setData({
					 all_info:result
				 });
         console.log("首页请求成功");
			 }
		}).catch((err)=>{
			this.getNetWorkData()
			console.log("主页请求失败");
		})
  }
})
