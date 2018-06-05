
Page({
    data: {
        list: [{url: '../../../res/scrollpicture/banner_1@3x.png'},{url: '../../../res/scrollpicture/banner_2@3x.png'},{url: '../../../res/scrollpicture/banner_3@3x.png'},{url: '../../../res/scrollpicture/banner_4@3x.png'}],
        interval: 3000,   //自动播放间隔时间 单位ms
        autoplay: true,   // 是否自动播放
        indicator: true,  // 是否显示指示器
        circular: true,  // 是否采用衔接滑动
        currentIndex: 0
    },
    changed: function (e) {
        var tIndex = e.detail.current;
        this.setData({
            currentIndex: tIndex
        });
        callApi({
            type: 'itemChanged',
            index: tIndex
        });
    },
    itemclicked: function (e) {
        callApi({
            type: 'itemClicked',
            index: e.currentTarget.dataset.index
        });
    }
});
