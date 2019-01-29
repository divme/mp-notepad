
const app = getApp()
Page({
  data: {
    isSet: false,
    hasUserInfo: false,
    userInfo: {},
    isSet: false,
    password: '',
    isErr: false,
    errMsg: '',
    content: ''
  },
  onShow: function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var ifcancle = wx.getStorageSync('ifcancle');
    if (ifcancle) {
      this.setData({
        content: "启用密码"
      })
    } else {
      this.setData({
        content: "取消密码"
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  isok: function(e){
    this.setData({
      isSet: !this.data.isSet
    }) 
  },
  input: function(e){
      var value = e.detail.value;
      var password = wx.getStorageSync('password');
      password = value;
      wx.setStorageSync('password', password);
  },
  makesure: function(e){
    var value = e.detail.value;
    this.setData({
      password: value
    })
  },
  submit: function(e){
    var ps1 = wx.getStorageSync('password');
    var ps2 = this.data.password;
    if(!ps1 || !ps2){
      this.setData({
        isErr: true,
        errMsg: '不能为空'
      })
    }else if(ps1 && ps2 && ps1 != ps2){
      this.setData({
        isErr: true,
        errMsg: '两次输入的密码不一致'
      })
    } else {
       this.setData({
         isSet: !this.data.isSet
       })
    }
  },
  cancle: function(){
      var ifcancle = wx.getStorageSync('ifcancle');    
      ifcancle = !ifcancle;
      wx.setStorageSync('ifcancle', ifcancle);
      if(ifcancle){
        this.setData({
          content: "启用密码"
        })
      }else{
        this.setData({
          content: "取消密码"
        })
      }
  }
})
