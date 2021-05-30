// 注意 每次调用 $.get 或 $.post 或ajax 会先调用这个函数
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限接口 设置请求头 headers
    // 判断 检测 是否包含 /my/ 是的话 才需要加请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // 在complete 回调函数中 可以使用 res.responseJSON拿到服务器响应回来数据
        if (res.responseJSON.status === 1 &&
            res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
            //强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})