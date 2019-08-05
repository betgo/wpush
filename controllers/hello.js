var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};


var fn_login=async(ctx,next)=>{
    console.log('ctx.request.body:',ctx.request.body);
    var username= ctx.request.body.username || '';
    var password=ctx.request.body.password || '';
    if(username=='123' && password=='123'){
    ctx.session.user = username;
    ctx.body = { success: true, msg: '登录成功！' };
                }
    else{
    ctx.body = { success: false, msg: '账号或密码错误！' };
                }
}
var fn_logout=async(ctx,next)=>
{
    ctx.session = null;
    // 跳转到登录页或网站首页
    ctx.response.redirect('/');
}
module.exports = {
    'GET /hello/:name': fn_hello,
    'POST /login': fn_login,
    'GET /logout': fn_logout,
};