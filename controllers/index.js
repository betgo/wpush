/*
 * @Author: wxx 
 * @Date: 2019-07-26 12:05:30 
 * @Last Modified by:   wxx 
 * @Last Modified time: 2019-07-26 12:05:30 
 */
const model=require('../model')
const telegram = require('../bot');
const fn_time=require('../uitl/time')
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
/**
 * post 保存功能
 * @param {*} ctx 
 * @param {*} next 
 */
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
 * get 保存
 * @param {*} ctx 
 * @param {*} next 
 */

var fn_push=async(ctx,next)=>{
    var mes=ctx.request.query.message || '';
    // let {message}=ctx.request.body;
     //console.log(message);
    console.log(`message is ${mes}`);
    console.log(ctx.request.body);

    let mess=model.Message;
    var mm=await mess.create({
        message: mes,
    });
   // console.log('mm :', mm);
    console.log('created: ' + JSON.stringify(mm));
   // console.log('mm.status :', mm.status);
    ctx.response.body={'message':1};

    //telegram.sendMessage(chat_id,mes);
 }   

/**
 * 查询功能
 * @param {} ctx 
 * @param {*} next 
 */
var fn_query=async(ctx,next)=>{
    let message=model.Message;
    var text=await message.findAll({
        attributes: ['message','id','createdAt'],
        order:[
            ['createdAt','DESC']
        ]
    });
    fn_time(text);
    // for(let i=0;i<text.length;i++)
    // {
    //     console.log('text[i].createdAt :', text[i].createdAt);
    // }
    
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
    'POST /delete': fn_delete,
    'GET /push': fn_push
};