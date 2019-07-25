const model=require('../model')
const telegram = require('../bot');

const chat_id=566203875;
var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

var fn_send=async(ctx,next)=>{
        var mes=ctx.request.body.message || '';
        // let {message}=ctx.request.body;
         //console.log(message);
        console.log(`message is ${mes}`);
        console.log(ctx.request.body);
    
        let mess=model.Message;
        var mm=await mess.create({
            message: mes,
        });
        console.log('created: ' + JSON.stringify(mm));
        telegram.sendMessage(chat_id,mes);
       
        ctx.response.body={'mesage':'dsfsdf'};
}
/**
 * 查询功能
 * @param {} ctx 
 * @param {*} next 
 */
var fn_query=async(ctx,next)=>{
    let message=model.Message;
    var text=await message.findAll({
        attributes: ['message','id'],
        order:[
            ['createdAt','DESC']
        ]
    });
    ctx.response.body=text;
   

}
/**
 * 删除功能
 */
var fn_delete=async(ctx,next)=>{
    var delid=ctx.request.query.id || '';
    //console.log('delid: ', delid);
    let message=model.Message;
    //console.log(ctx.request);
    var status=await message.destroy({
        where: {
          id: delid
        }
      });
     console.log('status: ', status);
     ctx.response.body={'status':status};
          
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin,
    'POST /send' : fn_send,
    'GET /query': fn_query,
    'POST /delete': fn_delete
};