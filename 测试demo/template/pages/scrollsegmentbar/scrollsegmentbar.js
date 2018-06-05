
Page({
    data: {
        dataSource: [],
        selectedIndex: 0,
        // winWidth: 360,     // 屏幕宽度
        config: {
            width: '100%',            // 容器的宽度
            height: '48px',           // 容器的高度
            subWidth: 60,         // 内部子单元的宽度
            identifierWidth: 40,  // 指示标识的宽度
            backgroundColor: '#F1F1F1',   // 滚动栏的背景颜色
            identifierBackgroundColor: 'rgb(255,255,255)',    // 指示标识的背景颜色
            textNormalColor: 'rgb(0,0,0)',  // 子单元文字颜色
            textActiveColor: 'rgb(232,53,85)',  // 子单元文字选中颜色
            identifierActiveColor: 'rgb(232,53,85)',  // 指示标识选中颜色
            fontSize: '16px',         // 子单元字体尺寸
            textAlign: 'center'       // 子单元文字对齐方式
        }
    },
    onLoad: function(options){
        var pageParam = this.data.pageParam;
        console.log('this.data=='+JSON.stringify(pageParam));
        if(pageParam){
            console.log('pageParam=='+JSON.stringify(pageParam));
            var tConfig = this.data.config;
            if(pageParam.config){
                for(var key in pageParam.config) {
                    tConfig[key] = pageParam.config[key];
                }
            }
            this.setData({
                dataSource: pageParam.dataSource,
                selectedIndex: pageParam.selectedIndex,
                winWidth: pageParam.winWidth,
                config: tConfig
            }) ;
        }
        else {
            console.log('pageParam不存在')
        }
    },
    unitTouched: function(event) {  // 子单元点击事件
        var tSelected = event.target.dataset.index;
        this.setData({
            selectedIndex: tSelected
        });
        var tObj = {
            type: 'unitClick',
            index: tSelected
        }
        console.log('ScrollSegmentBar 序号'+tSelected+'单元被点击了');
        callApi(tObj);
    }
})
