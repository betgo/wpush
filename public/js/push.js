/*
 * @Author: wxx 
 * @Date: 2019-07-19 19:48:54 
 * @Last Modified by: wxx
 * @Last Modified time: 2019-07-25 20:54:07
 */
// function  send(){
//         var m=document.getElementById('m1').value;
//         console.log(m);
//        var d=document.getElementById('tt');
//        var node=document.createElement('div');
//        var hr =document.createElement('hr');
//        var nodedate=document.createTextNode(m);
        
//         node.appendChild(nodedate);
//         d.appendChild(hr);
//         d.appendChild(node);
        
// }


bindForm=function(form){
    var submit;
    submit=document.querySelector('button[type="submit"]');
    return form.addEventListener('submit',function(e){
        var formData;
        e.preventDefault();
        formData=new FormData(this);
        //console.log(formData);
        if (submit != null) {
            submit.setAttribute('disabled', 'disabled');
          }
          return fetch(this.getAttribute('action'),{
              method: (this.getAttribute('method')).toLowerCase(),
              body: formData
          }).then(function(response) {
            console.log(response);
           
            return response.json();
          }).then(
              data=>{
                if (submit != null) {
                    submit.removeAttribute('disabled');
                  };
                  (form.querySelectorAll('.reset')).forEach(function(input) {
                    return input.value = null;
                  });
                  refreshWindow();
              }
          );

    });
};
/**
 * message模版
 */
createElement=function(data){
  var el,btn,img,div;
    el=document.createElement('div');
    el.classList.add('jigu-body','jigu-type-text');
    div=document.createElement('div'); 
    div.innerHTML=data.createdAt;
    el.appendChild(div);
    div=document.createElement('div');
    div.classList.add('jigu-content');
    div.setAttribute('id',data.id);
    div.innerHTML=data.message;
    //el.innerHTML=`<div class="jigu-content" id="${data.id}">${data.message}</div>`;
    el.appendChild(div);
    img=document.createElement('img');
    img.setAttribute('src','../public/images/f36c1e8a40b0de24da565ae0e53ebd59.png');
    el.appendChild(img);
    btn=document.createElement('button');
    btn.setAttribute('class','b2');
    btn.innerHTML='复制';
    el.appendChild(btn);
   
    binddel(el);
    bindcopy(el);
   
    return el;
}

/**
 * 显示消息
 */
refreshWindow=function(){
    document.querySelector('.tt').innerHTML="";
    return fetch('http://173.82.226.139:3000/query').then(
      response=>{
        return response.json();
      }
    ).then(data=>{
        var container=document.getElementById('tt');
        for(let i of data){
          el=createElement(i);
          container.appendChild(el);
        }
    }
    );
  
}
/**
 * 删除操作
 */

 binddel=function(div){
    div.querySelector('img').addEventListener('click',function(e){
     var  mes=this.parentNode.querySelector('.jigu-content').getAttribute('id');
     if(!window.confirm("确认删除么?"))return;
     
      return fetch(`http://173.82.226.139:3000/delete?id=${mes}`,{
        method:'POST'
      }).then(
        response=>{
            if(response.status===200)
            {
              div.remove();
              
            }
        }
      )
    })
 }
 
/**

 * 复制文本
 */
bindcopy=function (div){
 
     div.querySelector('.b2').addEventListener('click',function(e){

         body=this.parentNode;
         const range = document.createRange();
         range.selectNode(body.querySelector('.jigu-content'));
        const selection = window.getSelection();
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
       var mes=body.querySelector('.jigu-content').textContent;
       selection.removeAllRanges();
       $('.tips').initTips({
        title: "复制成功", // head头部显示的标题内容
         message:mes,// 内容区域 动态生成div时,将根据ajax获取的数据并拼接好的html字符串放到此处即可
         duration: 5000, // 提示框停留时间(毫秒为单位)  默认值为5000ms
         space: 10, // 通知窗之间上下间隔 单位px(默认值为8)
         firstSpace: 8, // 第一个提示框距离页面 上方或(下,左,右)的距离 (默认值为8)
         margin: 15, // 提示框 距离左右两边的距离 (默认值15px)
          width:300, // 提示框宽度,默认为auto不换行
          toastType:'success'
			});
        //console.log(this === e.currentTarget);
    })
    return ;
}

/**
 * 使用正则表达式判断空格
 */
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}
var dom=document.querySelector('[name=message');
var btn1=document.querySelector('button[type="submit"]');
dom.addEventListener('input',function(e){
  if(this.value.trim().length){
    btn1.removeAttribute("disabled");
  }else{
    btn1.disabled="disabled";
    
   
    
  }
});


refreshWindow();
(document.querySelectorAll('form')).forEach(bindForm);
//setInterval("refreshWindow()",15000);
