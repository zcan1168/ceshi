
Page({
  data: {
    // labelKey: '名称',
    // labelValue: '值',
    labelKeyColor: '#BBB',
    labelValueColor: '#333',
    backgroundColor: '#eee',
    activeColor: 'rgb(4,190,2)',
    value: 0,
    step: 1
  },
  onLoad: function (options) {
    var pageParam = this.data.pageParam;

    if(pageParam){
        console.log('pageParam=='+JSON.stringify(pageParam));
        var tValue = pageParam.value ? pageParam.value:0;
        var tStep = pageParam.step ? pageParam.step:1;
        var tInitValue = pageParam.initValue ? pageParam.initValue:'';
        this.setData({
            labelKey: pageParam.labelKey,
            initValue: tInitValue,
            labelValue: tValue*tStep + tInitValue,
            unitName: pageParam.unitName,
            value: tValue,
            step: tStep,

        });
    }
    else {
        console.log('pageParam不存在')
    }
  },
  bindchange: function (event) {
    console.log('slider滑块改变' + JSON.stringify(event));
    var tStep = this.data.step;
    var tValue = event.detail.value;
    var tInitValue = this.data.initValue ? this.data.initValue:'';
    var tLabelValue = tInitValue + tValue * tStep;
    console.log('tLabelValue=='+ tLabelValue)
    this.setData({
        value: tValue,
        labelValue: tLabelValue
    })
    var obj = {
      type: 'valueChange',
      realValue: tLabelValue,
      value: tValue
    }
    callApi(obj);
  }
})
