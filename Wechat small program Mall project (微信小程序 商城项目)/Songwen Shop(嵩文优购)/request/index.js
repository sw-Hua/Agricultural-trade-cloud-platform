export const request=(params)=>{
  //定义公共的url
  //url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject)=>{
      var reqTask = wx.request({
        // 解构所有params的参数
        ...params, 
        url: baseURL+params.url,
        success:(result)=>{
            resolve(result)
        },
        fail:(err)=>{
            reject(err)
        }
      });
    })
  }