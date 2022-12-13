import {
  request
} from "../../request/index.js"
// pages/category/index.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        //左侧的菜单数据
        leftMenuList: [],
        //右侧的菜单数据
        rightContent: [],
        // data里面 被点击的左侧的菜单
        currentIndex: 0,
        scrollTop: 0
      },

      // 接口的返回数据, 全部的数据
      Cates: [],
      /*
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        /*
        1 判断一下本地存储中, 有没有旧的数据
        当前的时间戳
        {time:Date.now(), data:[...]}
        
        2 没有旧数据, 直接发送新请求
        3 有旧的数据, 同时旧的数据没有过期, 			就使用本地存储中的旧数据即可*/
        // 1 获取本地存储中的数据{小程序中也存在本地存储 技术}        下面是key

        const Cates = wx.getStorageSync("cates");
        //2 判断
        if (!Cates) {
          //不存在 发送请求获取数据
          this.getCates();
        } else {
          //有旧的数据 定义过期时间 10s 再改成5分钟
          if (Date.now() - Cates.time > 1000 * 10) {
            //过期判断, 过期了重新发送请求
            this.getCates();
          } else {
            //没过期, 可以使用旧的数据
            this.Cates = Cates.data;
            //复制过来
            //渲染
            let leftMenuList = this.Cates.map(v => v.cat_name)
            //渲染 构造右侧的商品数据 
            let rightContent = this.Cates[0].children;
            this.setData({
              leftMenuList,
              rightContent
            })
          }
        }
        //this.getCates();
      },

      //获取分类数据
      async getCates() {
        /*
        request({
            url: "/categories"
          })
          //成功之后, 触发then方法
          .then(res => {
            this.Cates = res.data.message;

            //把接口的数据存入到本地存储中
            wx.setStorageSync("cates", {
              time: Date.now(),
              data: this.Cates
            });

            //构造左侧的大菜单数据
            //遍历 把cate_name取出来赋给leftList
            //总的[]做遍历, 运算出value, 我想要所有的cat_name的value
            let leftMenuList = this.Cates.map(v => v.cat_name)
            //构造右侧的商品数据 
            let rightContent = this.Cates[0].children;
            this.setData({
              leftMenuList,
              rightContent
            })
          })
        */
        //1 使用es7的async await来发送请求
        const res = await request({
          url: "/categories"
        });

        this.Cates = res.data.message;

        //把接口的数据存入到本地存储中
        wx.setStorageSync("cates", {
          time: Date.now(),
          data: this.Cates
        });

        //构造左侧的大菜单数据
        //遍历 把cate_name取出来赋给leftList
        //总的[]做遍历, 运算出value, 我想要所有的cat_name的value
        let leftMenuList = this.Cates.map(v => v.cat_name)
        //构造右侧的商品数据 
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
  },

  handleItemTap(e) {
    console.log(e)
    /*
    1 获取被点击标题身上的索引
    2 给data中的currentIndex赋值就可以了
    {}一看就知道是对象dataset的返回值一定是对象, 这是只有你点值得一个对象
    3 3 根据不同的索引渲染右侧的商品内容
    */
    const index = e.currentTarget.dataset.index;
    //const {index} = e.currentTarget.dataset; 这两者是一样的

    //构造右侧的商品数据 这里不是0了, 是当前被点击的索引, 我使用了上面一种, 感觉更直观
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置, 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })

  }
})