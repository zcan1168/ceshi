
Page({
    data: {
        placeholder:'说点什么吧...',
        rightBtnName: '发送',
        content: ''
    },
    onLoad: function(options) {
       console.log('onLoad');
    },
    onReady: function() {
       console.log('onReady');
    },
    onShow: function() {
      console.log('onShow');
    },
    leftBtnTap: function() {  //左侧按钮点击事件
       console.log('add');
       var tObj = {
           type: 'liftBtnClicked'
       }
       callApi(tObj);
    },
    rightBtnTap: function(event) {  // 右侧按钮点击事件
        console.log('rightBtnTap');
        var tRightBtnName = this.data.rightBtnName;
        console.log('tRightBtnName=='+tRightBtnName);
        if('发送' == tRightBtnName) {
            console.log('发送');
            this.onconfirm();
        }
        else if('清空' == tRightBtnName){
            console.log('清空');
            this.setData({
               focusStatus: false,
               content: ''
            }) ;
        }
    },
    inputContent: function(event){ // 输入框输入事件
        var tContent = event.detail.value;
        var tRightBtnName = tContent.length ? '清空':'发送';
        this.setData({
            content: tContent,
            rightBtnName: tRightBtnName
        })
    },
    inputFocus: function(event) { // 输入框获取焦点事件
        console.log('inputFocus event=='+JSON.stringify(event));
        var tContent = event.detail.value;
        var tRightBtnName = tContent.length ? '清空':'发送';
        this.setData({
            rightBtnName: tRightBtnName
        })
        var tObj = {
            type: 'focus'
        }
    },
    inputBlur: function(event) { // 输入框失去焦点事件
        var tContent = event.detail.value;
        var tRightBtnName = tContent.length ? '发送':'发送';
        this.setData({
            rightBtnName: tRightBtnName
        })
        var tObj = {
            type: 'blur'
        }
    },
    onconfirm: function() {  // 键盘右下方按钮点击事件
        console.log('confirm');
        var tContent = this.data.content;
        var tObj = {
          type: 'sendMessage',
          value: tContent
        }
        callApi(tObj);
        this.setData({
          focusStatus: false,
          content: ''
        });
    }
});
