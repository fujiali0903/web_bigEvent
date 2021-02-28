$(function () {
    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击"去登陆"的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    
    // 从layui中获取form对象
    var form = layui.form
    var layer=layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/,'亲，密码必须6到12位，且不能出现空格哦'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // console.log(value);//用户输入的确认密码的值
            // 通过形参拿到的是确认密码框的内容，还需要拿到密码框的内容，将确认密码框的值与密码框的内容进行一次等于的判断，如果判断失败则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
 
    // 事件 获取 展示
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {   
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            // console.log('haha');
            if (res.status !== 0) {
            return console.log(res.message);
            // return layer.msg(res.message);
            }
            // console.log('注册成功,请登录!');
            layer.msg('注册成功,请登录!'); 
            // 模拟人的点击行为
            $('#link_login').click()     
        }) 
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功!')
                // console.log(res.token)
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转后台主页
                location.href='/index.html'
            }
        })
    })
})