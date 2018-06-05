
Page({
  data: {
    title:'标题',
    items: [],
    cancleName: '取消',
    animationBottom: '-100%',
    animationBackgroundColor: 'rgba(55,55,55,0)'
  },
  onLoad: function (options) {
      var pageParam = this.data.pageParam;
      console.log('pageParam=='+JSON.stringify(pageParam));
      if(pageParam){
          console.log('buttons=='+Object.prototype.toString.call(pageParam.buttons));
          this.setData({
              title: pageParam.title,
              items: pageParam.items,
              cancleName: pageParam.cancleName,
          });
      }
      else {
          console.log('pageParam不存在')
      }
  },
  onReady: function() {
     this.setData({
        animationBackgroundColor: 'rgba(55,55,55,0.5)',
        animationBottom: '0'
     });
  },
  itemTouched: function(event) {
     this.doCloseAnimation(
        function(){
            var tIndex = event.target.dataset.index;
            obj = {
                type: 'itemClick',
                index: tIndex
            }
            callApi(obj);
        }
    );
  },
  cancleBtnTouched: function (event) {
     this.doCloseAnimation(
        function(){
            var obj = {
                type: 'cancleClick'
            }
            callApi(obj);
        }
     );
  },
  doCloseAnimation:function(callback) {
     this.setData({
          animationBackgroundColor: 'rgba(55,55,55,0)',
          animationBottom: '-100%'
     });
     setTimeout(callback, 500);
  }
})
