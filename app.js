const model = require('./model');

const koa=require('koa');

const router = require('koa-router')();
const app=new koa();
const bodyParser = require('koa-bodyparser');
const body=require('koa-body');
const multer=require('koa-multer');
const busboy = require('koa-busboy');
const views=require('koa-view');
const static = require('koa-static');
const session=require('koa-session');


app.keys = ['this is my secret and fuck you all'];//我理解为一个加密的密钥

app.use(session({
   key: 'koa:sess', /** cookie的名称，可以不管 */
   maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
   overwrite: true, /** (boolean) can overwrite or not (default true) */
   httpOnly: true, /** (boolean) httpOnly or not (default true) */
   signed: true, /** (boolean) signed or not (default true) */
 },app));
 
app.use(busboy());

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
   });

   const staticPath = './public'
 
   app.use(static(
      __dirname,  staticPath)
   );

  app.use(views(__dirname + '/views')) ;
const controller=require('./controller');
app.use(controller());



app.listen(3000);
console.log('app started at port 3000...');