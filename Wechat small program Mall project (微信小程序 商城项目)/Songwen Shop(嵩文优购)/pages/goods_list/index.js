// pages/goods_list/index.js
Page({
  data: {
		data:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
            {
        id:1,
        value:"销量",
        isActive:true
      },
            {
        id:2,
        value:"价格",
        isActive:true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  }
})