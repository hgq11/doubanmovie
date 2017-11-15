var app = getApp()
// pages/Poster/poster.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
		movies: [],
		height:0,
		width:0,
		show:false,
		// imgUrls: [
		// 	'../../images/poster1.jpg',
		// 	'../../images/poster2.jpg',
		// 	'../../images/poster3.jpg'
		// ],
		autoplay: true,
		interval: 5000,
		duration: 1000

  },
	getCache() {
		return new Promise((resolve, reject) => {
			app.wxapi.getStorage('index_data').then((storage_res) => {
				if (storage_res.data.expires < Date.now()) {
					return resolve(null);
				} else {
					return resolve(storage_res.data.movies);
				}

			}).catch(function (err) {
				return resolve(null);
			})
		})
	},
	getNetWorkData() {
		var url = "https://api.douban.com/v2/movie/coming_soon";
		app.wxapi.getNetJson(url, { count: 3 }).then((res) => {
			wx.setStorage({
				key: 'index_data',
				data: {
					movies: res.data.subjects,
					expires: Date.now() + 1000 * 60 * 60 * 24
				},
			});
			this.setData({
				movies: res.data.subjects
			});
		}).catch(function (err) {
			console.log(err);
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		that = this;
		console.log('this' + this);
		wx.getSystemInfo({
			success: function (res) {
				console.log(res);
				that.setData({
					width: res.windowWidth,
					height: res.windowHeight
				});
			}
		});

		this.getCache().then((result) => {
			if (!result) {
				this.getNetNetWorkData();
			} else {
				this.setData({
					movies: result
				});
				console.log("海报页请求成功");
			}
		}).catch((err) => {
			this.getNetWorkData()
			console.log("海报页请求失败");
		})





  },
	toIndex: function (e) {
		wx.switchTab({
			url: '../index/index'
		});
		
	},
	checkVal:function(e) {
	
		var a = e.detail.current;
		console.log("e是" + a);
		if(a ===2) {
			this.setData({
				show:true
			})
		} else{
			this.setData({
				show: false
			})
		}
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})