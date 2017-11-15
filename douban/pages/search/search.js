// pages/page2/page2.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
	data: {
		movies: [],
		name: '',
	},
	send: function (e) {
		this.setData({
			name: e.detail.value
		})
	},
	search1: function () {
		this.getData()
	},
	//请求数据
	getData() {
		var url = 'https://api.douban.com/v2/movie/search?q=' + this.data.name
		app.wxapi.getNetJson(url).then((res) => {
			this.setData({
				movies: res.data.subjects
			})
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {

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
