
var headerHeight = 0;
function fixStatusBar() {
    var _eHeader = $api.dom('header');
    headerHeight = $api.fixStatusBar(_eHeader);
}

function goBack() {
    api.closeWin();
}

/* UITemplate模块封装 */

function WXUI(path) {
    var _Debug = false; //调试模式，默认开启
    var _UITemplate = api.require("UITemplate");
    var _isInit = false;

    /* 辅助方法 */

    /**
     * 调试日志打印
     * @param       {String} msg 打印信息
     */
    function LOG(msg){
        if( !api.debug || !_Debug ){
            return;
        }
        console.log(msg);
    }

    /**
     * 模块初始化
     * @param       {String}   path     模块所在的widget路径
     * @param       {Function} callback 初始化后的回调函数
     * @return      {Void}
     */
    function _init(path,callback) {
        var _path = path ? path:'widget://template';
        _UITemplate.init({
            path: _path
        }, function(ret,err){
            if(ret){
                _isInit = true;  // 修改初始化状态
            }
            if('function' === typeof callback) {
                callback(ret);
            }
        });
    }

    function _openView(param,callback) {
        if ( '[object Object]' !== Object.prototype.toString(param) ) {
            return;
        }
        if(!_isInit) {
            LOG('模块没有初始化，重新进行初始化');
            _init('',function(){
                _openView(param,callback);
            });
            return;
        }
        LOG('模块openView param=='+JSON.stringify(param));
        var _param = {
            rect: { marginTop: 0, h: 'auto', w: 'auto' },
            level: 'normal'
        }
        for(var key in param){
            _param[key] = param[key];
        }
        _UITemplate.openView( _param, function(ret,err){
            if(ret){
                LOG('UITemplate.openView callback=>ret:'+JSON.stringify(ret));
            }else{
                LOG('UITemplate.openView callback=>err:'+JSON.stringify(err));
            }
            if('function' == typeof callback) {
                callback(ret,err);
            }
        });
    }

    /**
     * alert弹窗
     * @param       {JSON}   param    alert内容参数
     *                                {
     *                                  title: '标题',
     *                                  msg: ‘消息’,
     *                                  buttonName: ‘按钮名称’
     *                                }
     * @param       {Function} callback
     *                                ret {
     *                                    type: 'buttonEvent'  // 确定按钮点击类型事件
     *                                }
     * @constructor
     */
    function _alert(param,callback){
        var _param = {
            name: 'alert',
            url: 'pages/alertview/alertview',
            rect: {
                marginTop: 0,
                h: 'auto',
                w: 'auto'
            },
            level: 'alert',
            data: {
                pageParam: param
            }
        }
        _openView(_param,function(ret,err){
            if(ret && 'buttonClick' == ret.type ){
                _UITemplate.closeView({name: 'alert'});
                if('function' == typeof callback) {
                    callback(ret,err);
                }
            }
        });
    }

    /**
     * confirm弹窗
     * @param       {JSON}   param    alert内容参数
     *                                {
     *                                  title: '标题',
     *                                  msg: ‘消息’,
     *                                  buttons: ['button1名称','button2名称','button3名称','button4名称']
     *                                }
     * @param       {Function} callback
     *                                ret {
     *                                    type: 'buttonClick',  // 确定按钮点击类型事件
     *                                    index: 1,             // 触发点击事件的按钮索引序号，起始为0
     *                                }
     */
    function _confirm(param,callback){
        var _param = {
            name: 'confirm',
            url: 'pages/confirmview/confirmview',
            rect: {
                marginTop: 0,
                h: 'auto',
                w: 'auto'
            },
            level: 'alert',
            data: {
                pageParam: param
            }
        }
        _openView(_param,function(ret,err){
            if(ret && 'buttonClick' == ret.type ){
                _UITemplate.closeView({name: 'confirm'});
                if('function' == typeof callback) {
                    callback(ret,err);
                }
            }
        });
    }


    /**
     * sheet弹窗
     * @param       {JSON}   param    sheet内容参数
     *                                {
     *                                  title: '标题',
     *                                  items: [{name: 'item1'},{name: 'item2'},{name: 'item3'},{name: 'item4'}],
     *                                  cancleName: ‘按钮名称’
     *                                }
     * @param       {Function} callback
     *                             ret {
     *                                  type: 'itemClick'   //类型事件， “itemClick” item被点击事件
     *                                                                 “cancleClick”    取消按钮点击事件
     *                                  index: 1            // itemClick事件触发时，返回，代表当前被点击的item序号，从上到下起始值为0
     *                             }
     * @return      {[type]}            [description]
     */
    function _sheet(param,callback){
        var _param = {
            name: 'sheet',
            url: 'pages/sheetview/sheetview',
            rect: {
                marginTop: 0,
                h: 'auto',
                w: 'auto'
            },
            level: 'alert',
            data: {
                pageParam: param
            }
        }
        _openView(_param,function(ret,err){
            if(ret && ret.type ){
                _UITemplate.closeView({name: 'sheet'});
                if('function' == typeof callback) {
                    callback(ret,err);
                }
            }
        });
    }

    /**
     * inputField输入框
     * @param       {Function} callback
     *                             ret {
     *                                  type: 'sendMessage'   //类型事件， “sendMessage”     发送消息事件
     *                                                                   “leftBtnClicked”  左侧按钮点击事件
     *                             }
     * @return      {Void}
     */
    function _inputField(callback){
        var _param = {
            name: 'inputField',
            url: 'pages/inputfield/inputfield',
            rect: {
                marginTop: api.winHeight-50-api.safeArea.bottom,
                h: 50,
                w: 'auto'
            },
            level: 'normal'
        }
        _openView(_param,function(ret,err){
            if('function' == typeof callback) {
                callback(ret,err);
            }
        });
    }

    /**
     * listview 列表
     * @param       {JSON}   param    listview内容参数
     *                                {
     *                                  dataSource: [],  //列表数据源，数组
     *                                }
     * @param       {Function} callback
     *                             ret {
     *                                  type: 'cellClick'   //类型事件， “cellClick”    单元格被点击事件
     *                                                                 “pullUp”       上拉加载事件
     *                                                                 “pullDown”     上拉加载事件
     *                                  index: 1            // cellClick事件触发时，返回，代表当前被点击的cell序号，从上到下起始值为0
     *                                  data: {JSON}        // cellClick事件触发时，返回，json格式，单元格的数据对象
     *                             }
     * @return      {Void}
     */
    function _list(param,callback){
        var _param = {
            name: 'listview',
            url: 'pages/listview/listview',
            rect: {
                marginTop: headerHeight,
                h: 'auto',
                w: 'auto'
            },
            level: 'normal',
            data: {
                pageParam: param
            }
        }
        _openView(_param,function(ret,err){
            if('function' == typeof callback) {
                callback(ret,err);
            }
        });
    }

    /**
     * 传递数据给UI模版引擎
     * @param       {JSON} param 数据参数
     *                           {
     *                                name: 'listview',    // 引用的引擎页面名称, 内容String类型
                                      data: {              // 想要传递的数据，内容JSON类型
                                         dataSource: dataSource,
                                      }
     *                           }
     * @constructor
     */
    function _setData(param) {
        if(!param.name){
            console.log('setData失败，缺少name参数');
            return;
        }
        else if(!param.data){
            console.log('setData失败，缺少data参数');
            return;
        }
        _UITemplate.setData(param)
    }

    _WXUI = {
        init: _init,
        openView: _openView,
        alert: _alert,
        confirm: _confirm,
        sheet: _sheet,
        inputField: _inputField,
        list: _list,
        setData: _setData
    }

    return _WXUI;
}
