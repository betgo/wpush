const model = require('./model');

const koa=require('koa');

const router = require('koa-router')();
const app=new koa();
const bodyParser = require('koa-bodyparser');
const body=require('koa-body');
const multer=require('koa-multer');
const busboy = require('koa-busboy');
<<<<<<< HEAD
const views=require('koa-view');
const static = require('koa-static')
=======
>>>>>>> 43d3c9a1363e2fb31f809aa193edda7a138b9e2f

app.use(busboy());

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
   });

<<<<<<< HEAD
   const staticPath = './public'
 
   app.use(static(
      __dirname,  staticPath)
   );

  app.use(views(__dirname + '/views')) ;
=======
>>>>>>> 43d3c9a1363e2fb31f809aa193edda7a138b9e2f
const controller=require('./controller');
app.use(controller());



app.listen(3000);
console.log('app started at port 3000...');