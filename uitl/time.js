
/**
 * 可以传时间
 * @param {*} text 
 */
var fn_time=function(text){
    for(let i=0;i<text.length;i++)
    {
        let time=Date.now()-text[i].createdAt;
     if(time/1000<60)
     {
         time=time/1000;
         text[i].createdAt=parseInt(time) +"秒前";
     }
         
     else if(time/60000<60)
     {
         time=time/60000;
         text[i].createdAt=parseInt(time) +"分钟前";
     }
            
         else if(time/3600000<24){
             time=time/3600000;
             text[i].createdAt=parseInt(time) +"小时前"
         }
             else {
                 time=time/86400000;
                 text[i].createdAt=parseInt(time) +"天前";
             }
        
    }
}
module.exports=fn_time;