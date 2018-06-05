
Page({
  data: {
    title: { content: '标题' },
    msg: { content: '消息内容' },
    buttons: [{ content: '取消', style: 'color: #000;' },{ content: '确定' }]
  },
  onLoad: function () {
      var pageParam = this.data.pageParam;
console.log('pageParam11=='+JSON.stringify(pageParam));
      if(pageParam){
          console.log('buttons=='+Object.prototype.toString.call(pageParam.buttons));
          var tButtons = pageParam.buttons;
          this.setData({
              title: pageParam.title,
              msg: pageParam.msg,
              buttons: tButtons
          });
      }
      else {
          console.log('pageParam不存在')
      }
  },
  btnTouched: function (event) {
    var tIndex = event.target.dataset.index;
    console.log('按钮' + tIndex + '被点击了');
    var obj = {
      type: 'buttonClick',
      buttonIndex: tIndex,
    }
    callApi(obj);
  }
})
