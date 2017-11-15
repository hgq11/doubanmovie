const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
	data: {
		userInfo: '',
		array: ['微信登录', '手机号登录', '163登录', '微博'],
		objectArray: [
			{
				id: 0,
				name: '微信登录'
			},
			{
				id: 1,
				name: '手机号登录'
			},
			{
				id: 2,
				name: '163登录'
			},
			{
				id: 3,
				name: '微博'
			}
		],
		input1: '',
		input2: '',
		login: {},
		show: true,
	},
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	formSubmit: function (e) {
		var that = this
		console.log(e.detail.value)
		var a = e.detail.value
		if (a.input1 == '' || a.input2 == '') {
			wx.showModal({
				title: '提示',
				content: '请输入账号密码'
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '确认提交',
				success: function (res) {
					console.log(res)
					if (res.confirm) {
						console.log(a, typeof a)
						wx.setStorage({
							key: "keys",
							data: e.detail.value
						})
						console.log(that.data.show)
						that.setData({
							show: false
						})
						console.log(that.data.show)
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			});
		}
	},
	exit: function () {
		var that = this
		console.log(777)
		wx.showModal({
			title: '提示',
			content: '确认退出吗',
			success: function (res) {
				if (res.confirm) {
					wx.removeStorage({
						key: 'keys',
						success: function (res) {
							console.log(321)
							that.setData({
								show: true
							})
						}
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})

	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this
		wx.getStorage({
			key: 'keys',
			success: function (res) {
				console.log(res.data)
				if (!res.data) {
					that.setData({
						show: true
					})
				} else {
					that.setData({
						show: false
					})
				}
			}
		})
		wx.getUserInfo({
			success: res => {
				app.globalData.userInfo = res.userInfo
				that.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
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