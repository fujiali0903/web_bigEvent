$(function () {
    // 1、使用layui中的form.verify自定义校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd:function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '新密码与确认密码不一致！'
            }
          }
    });
    
    // 2、给表单绑定一个提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})