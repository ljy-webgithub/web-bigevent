// 注意 每次调用 $.get 或 $.post 或ajax 会先调用这个函数
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})