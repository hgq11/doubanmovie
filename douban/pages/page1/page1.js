var that
var app = getApp()
// pages/page1/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		nowPage:0,
    urlName:'',
    movies:[],
		show:false
  },

  getCache() {
    return new Promise((resolve, reject) => {
      app.wxapi.getStorage('list_data_'+this.data.urlName).then((storage_res) => {
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
   
      var url = "https://api.douban.com/v2/movie/" + this.data.urlName;
      app.wxapi.getNetJson(url, { count: 40 }).then((res) => {
        console.log('进行了一次请求');
        wx.setStorage({
          key: 'list_data_' + this.data.urlName,
          data: {
            movies: this.data.movies.concat(res.data.subjects),
            expires: Date.now() + 1000 * 60 * 60 * 24
          },
        });
     
        this.setData({
          movies: this.data.movies.concat(res.data.subjects)
        })
      }).catch(function(err){
            console.log(err);
      });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      urlName: options.requesturl
    });
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
        console.log(111);
      } else {
        this.setData({
          movies: result
        });
        console.log(movies);
      }
    }).catch((err) => {
      this.getNetWorkData()
      console.log("page1请求失败");
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
					wx.showToast({
						title: '请稍等',
						icon: 'loading',
						duration: 2000
					})

					setTimeout(() => {
						this.setData({
							nowPage: ++this.data.nowPage
						});
					}, 2000)


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})