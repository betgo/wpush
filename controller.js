const fs=require('fs');

/**
 * 判断请求方法
 * 导入router
 *
 * @param {d} router 
 * @param {d} mapping 
 */
function addMapping(router, mapping) {
    for (var url in mapping) {
        //console.log('url: ', url);
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.delete(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } 
        else {
            console.log(`invalid URL: ${url}`);
        }
    }
};

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');//读取类文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    //将url一一导入router
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        //console.log(mapping);
        addMapping(router, mapping);
    }
};

module.exports=function(dir){
	let 
        controllers_dir=dir || 'controllers',
        // 注意require('koa-router')返回的是函数:
        router3=require('koa-router');
        router=router3();//实例化
        addControllers(router,controllers_dir);
        
		return router.routes();
};