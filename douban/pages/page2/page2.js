
var app = getApp()
// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
				id:0,
				movies:[]
  },
	getCache() {
		return new Promise((resolve, reject) => {
			app.wxapi.getStorage('detail_data_' + this.data.id).then((storage_res) => {
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
		var url = "https://api.douban.com/v2/movie/subject/" + this.data.id;
		app.wxapi.getNetJson(url).then((res) => { 
			console.log(res.data);
			
		

			this.setData({
				movies:res.data
			})
		}).catch(function (err) {
			console.log(err);
		});
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log("options是" + options)
		this.getNetWorkData()
		this.setData({
			id:options.id,
			// movies: this.getNetWorkData()
		})
		this.getCache().then((res) => {
			if (!res) {
				this.getNetWorkData()
			} else {

				console.log(res),
					this.setData({
						movies: res
					})
			}
		}).catch((err) => {
			this.getNetWorkData()
		})
	
		
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