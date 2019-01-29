Page({
  data: {
      list:[
       //   {
       //     content: '今天是周五，早点下班吧',
       //     time: 44343232131231,
       //     id: new Date().getTime(),
       //     isShow: false
       //   }
      ],
      showAll: true,
      hasPassword: false,
      password: '',
      hasErr: false,
      errMsg: '密码不正确'
  },
  onLoad: function(){
    var value = wx.getStorageSync('password');
    var ifcancle = wx.getStorageSync('ifcancle');
    if (value && !ifcancle) {
      this.setData({
        showAll: false,
        hasPassword: true
      });
    } else {
      this.setData({
        showAll: true
      });
      init(this);
    }  
  },
  onShow: function(){
       init(this)
  },
  cinput: function(e){
     var value = e.detail.value;
     this.setData({
        hasErr: false,
        password: value
     })
  },
  cpassword: function(){
     var ps1 = wx.getStorageSync('password');
     var ps2 = this.data.password;
     if(ps1 && ps2 && ps1 == ps2){
       this.setData({
         showAll: true
       });
       init(this);
     }else{
        this.setData({
          hasErr: true
        })
     }
  },
  toggle: function(e){
     var id = e.currentTarget.dataset.id;
     var lists = this.data.list;
     var index = -1;
     lists.forEach(function(item, i){
       if (item.id == id) {
         item.isShow = !item.isShow;
       }  
     });
     this.setData({
       list: lists
     })
  },
  edit: function(e){
     var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: '../add/add?id='+ id
     })
  },
  delete: function(e){
     var id = e.currentTarget.dataset.id;
     var lists = wx.getStorageSync("lists") || [];  
     var index = -1;
     lists.forEach(function(item, i){
         if(item.id == id){
           index = i;
         }  
     })
     lists.splice(index, 1);
     wx.setStorageSync("lists", lists);
     init(this);
  },
  add: function(e){
      wx.navigateTo({
        url: '../add/add'
      })
  }
});

// 从 storage 中读取数据，并处理时间显示格式；
function init(page){
    var lists = wx.getStorageSync("lists") || [];
    page.setData({
        list: lists
    });    
}