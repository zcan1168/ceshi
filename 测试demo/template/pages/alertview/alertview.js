
Page({
  data: {
    title:'',
    msg:'',
    button: '确定'
  },
  onLoad: function (options) {
    var pageParam = this.data.pageParam;

    if(pageParam){
        console.log('pageParam=='+JSON.stringify(pageParam));
        this.setData({
            title: pageParam.title,
            msg: pageParam.msg,
            button: pageParam.button
        }) ;
    }
    else {
        console.log('pageParam不存在')
    }
  },
  sureBtnTouched: function (event) {
      console.log('确定按钮被点击了'+JSON.stringify(event));
      var obj = {
          type: 'buttonClick',
          // buttonIndex: '1',
          // descript: '确定按钮点击事件'
      }
      callApi(obj);
  }
})
