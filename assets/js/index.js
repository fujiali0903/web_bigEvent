$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    // 点击退出按钮，弹出对话框并跳转到登录界面
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layui.layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            // console.log('ok');
            // 1、清空本地存储中的token
            localStorage.removeItem('token')
            // 2、重新跳转到登录页面
            location.href='/login.html'

            layer.close(index);
          });
     })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // // headers就是请求头配置对象
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');              
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // 不管成功还是失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('执行了回调函数');
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.message === '身份认证失败! ') {
        //         // 1、强制清空token
        //         localStorage.removeItem('token')
        //         // 2、强制跳转到登录页面
        //         location.href='/login.html'
        //     }
        //  }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1、获取用户的名称
    var name = user.nickname || user.username
    // 2、设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3、按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src,user.user_pic').show()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
 }