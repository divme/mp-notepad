// 笔记三要素： content（显示）, time（显示）, id（唯一标识）;
// 新加： 三要素都更新，并且添加到storage中；
// 编辑： 内容时间更新，id不变，修改storage中已存在项。

var timeFunc = require("../../utils/util.js");
Page({
  data: {
    
  },
  onLoad: function (e) {
      var id = e.id;
      console.log(id);
      if(id){
         initData(id, this); 
      }
  },
  onPullDownRefresh: function () {
    alert('拉吧拉吧!有什么好拉的')
  },
  edit: function(e){
    var val = e.detail.value;
    this.setData({
       content: val
    });
  },
  cancle: function(){
     wx.navigateBack();
  },
  save: function(){
    var reg = /^\s*$/g;
    if(this.data.content && !reg.test(this.data.content)){
      saveData(this);
    }
    wx.navigateBack();
  }
})



function initData(id, page){
  var lists = wx.getStorageSync('lists') || [];
  lists.forEach(function(item, i){
    if(item.id == id){
       page.setData({
         content: item.content,
         time: timeFunc.formatTime(new Date()),
         id: id,
         isShow: false
       }) 
    }
  })
}

function saveData(page){
  var lists = wx.getStorageSync('lists') || [];
  var flag = true;
  var index = -1;
  lists.forEach(function (item, i) {
    if (item.id == page.data.id) {
      flag = false;
      index = i;
    }
  })
  if (flag) {
      page.setData({
        time: timeFunc.formatTime(new Date()),
        id: Date.now()
      });
      lists.unshift(page.data);
  } else {
      lists[index].content = page.data.content;
      lists[index].time = timeFunc.formatTime(new Date());
      lists.unshift(lists[index]);
      lists.splice(index + 1, 1);
 }
  wx.setStorageSync('lists', lists);
}