$(function () {
    //调用getUserInfo
    getUserInfo()
    // 给退出 添加点击事件
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的 token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });
    })
})
// 获取用户基本信息 getUserInfo
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.msg('获取用户信息失败')
            }
            //调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1 获取用户名称 根据说明文档
    var name = user.nickname || user.username
    // 2 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 3 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        //toUpperCase 转成大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}