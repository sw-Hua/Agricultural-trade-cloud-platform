//0 引用用来发送请求的 方法 引用的时候把路径补全
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList: [],
    //楼层数据
    floorList: []
  },
  //opittions(object)
  //页面开始加载的, 就会触发
  onLoad: function (objects) {
    // 1 开始发送异步请求获取轮播图数据
    //wx-req插件的提示
    /*
        var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        //console.log(result)
        this.setData({
          swiperList:result.data.message
        })
      }
    });
    */
   this.getSwiperList();
   this.getCatesList();
   this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList(){
       //调用 {}里面的参数最后被解构, 丢到params里面
   request({url:"/home/swiperdata"})
   //成功就触发.then
   .then(result=>{
    this.setData({
      swiperList:result.data.message
    })
   })
  },
    //获取导航数组数据
  getCatesList(){
      //调用 {}里面的参数最后被解构, 丢到params里面
  request({url:"/home/catitems"})
  //成功就触发.then
  .then(result=>{
   this.setData({
     catesList:result.data.message
   })
  })
 },
     //获取楼层数组数据
  getFloorList(){
      //调用 {}里面的参数最后被解构, 丢到params里面
  request({url:"/home/floordata"})
  //成功就触发.then
  .then(result=>{
   this.setData({
    floorList:result.data.message
   })
  })
 }
 

})

