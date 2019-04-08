
 const dom = {
  // 设置样式
  css( el , styles ){
    for ( let k in styles ){
      if ( styles.hasOwnProperty(k) )
      el.style[k] = styles[k]
    }
  },

  //获取指定样式
  getStyleValue(elObj,attr){
   
    var view = elObj.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }

    if(elObj.currentStyle){      //IE
      return elObj.currentStyle[attr];
    }else{
      return view.getComputedStyle(elObj)[attr];     //Firefox
    }
  },

  //获取元素偏移量( top , left )
  offset(curEle){
    var totalLeft = null,totalTop = null,par = curEle.offsetParent;
  
    //首先把自己本身的进行累加
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;
  
    //只要没有找到body，我们就把父级参照物的边框和偏移量累加
    while(par){
      if(navigator.userAgent.indexOf("MSIE 8.0") === -1){
        //不是标准的ie8浏览器，才进行边框累加
        //累加父级参照物边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop;
      }
      //累加父级参照物本身的偏移
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop;
      par = par.offsetParent;
    }
  
    return {left:totalLeft,top:totalTop};
  },
  
  //计算活动高度
  calcHeight(el , extra){
   
    let el_table_head = el.querySelector(".el-table__header-wrapper"),
        el_table_body = el.querySelector(".el-table__body-wrapper");
  
    let winHeight = window.innerHeight,
        currTop = this.offset(el_table_head).top,
        lastHeight = winHeight - currTop - 33 - extra;
  
    el_table_body.style.overflowY = 'auto';
    el_table_body.style.height = lastHeight + 'px';

    var gt = "scroll",
        lt = "hidden";

    if ( 'ActiveXObject' in window ){  //for IE
      gt = "hidden";
      lt = "scroll";
    }

    if ( el_table_body.scrollHeight > el_table_body.offsetHeight){

      el_table_head.style.overflowY = gt;

    }else{
      
      el_table_head.style.overflowY = lt;

    }


  }

  
}


export default dom;