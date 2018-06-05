
Page({
  data: {
    dataSource: [{ title: '名称' }, { title: '性别' }],
  },
  onLoad: function (options) {
    var pageParam = this.data.pageParam;

    if(pageParam){
        console.log('pageParam=='+JSON.stringify(pageParam));
        this.setData({
            dataSource: pageParam.dataSource
        }) ;
    }
    else {
        console.log('pageParam不存在')
    }
  },
  bindchange: function (event) {
      console.log('switch开关改变'+JSON.stringify(event));
      var tStatus = event.detail.value;
      var tKey = event.target.dataset.key;
      var obj = {
          type: 'switchChange',
          key: tKey,
          status: tStatus
      }
      callApi(obj);
  }
})
