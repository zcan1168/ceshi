Page({
  data: {
    dataSource: []
  },
  onLoad: function (options) {
    console.log('onLoad执行了');
    var pageParam = this.data.pageParam;
    if(pageParam){
        this.setData({
            dataSource: pageParam.dataSource
        }) ;
    }
    else {
        console.log('pageParam不存在')
    }
  },
  pullDown: function () { // 顶部下拉事件（暂未开发）
      console.log('下拉刷新')
      var tObj = {
          type: 'pullDown'
      }
      callApi(tObj);
  },
  pullUp: function (pIndex) {  // 底部上拉事件
      console.log('上拉加载')
      var tObj = {
          type: 'pullUp'
      }
      callApi(tObj);
  },
  cellTouched: function (event) {  // 单元格点击事件
      console.log('cell被点击了');
      var tIndex = event.target.dataset.index;
      var tCellData = this.data.dataSource[tIndex];
      var tObj = {
          type: 'cellClick',
          index: tIndex,
          data: tCellData
      }
      callApi(tObj);
  }
})
