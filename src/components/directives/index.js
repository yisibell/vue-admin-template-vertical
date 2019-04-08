// 自定义指令模块

import dom from './dom'

export default {
  /*
  * 功能：对 el-table 动态设置 tbody 高度。
  * 使用方式：给 el-table 组件添加 v-autoheight 指令。
  * @value: Number 指令值 , 控制 表格 tbody 距离视窗底部的距离 ，默认值65。
  * 例：v-autoheight="65" 此时 表格 tbody 底部 和 视窗底部将会有 65px 的间距。
  **/
  autoheight: {
    bind(el, { value = 65 } = {}) {
      el._fn = function() {
        dom.calcHeight(el, value)
      }
      window.addEventListener('resize', el._fn)
    },
    inserted(el, { value = 65 } = {}) {
      dom.calcHeight(el, value)
    },
    componentUpdated(el, { value = 65 } = {}) {
      dom.calcHeight(el, value)
    },
    unbind(el) {
      window.removeEventListener('resize', el._fn)
    }
  },

  /**
  * @author: hongwenqing
  * @date: 2019-2-14
  * @desc: 拖拽功能指令
  * @lastEditor: 
  */
  drag: {
    inserted( el , { value = true } = {} ){

      el._drag_el_offset = dom.offset(el)  // 初始偏移

      el._mousedown_handle =  function(e){
        e.preventDefault()

        e = e || window.event;
    
        let drag_el = e.target,
            dist = e.clientY - drag_el.offsetTop,
            disl = e.clientX - drag_el.offsetLeft;
            
        const mousemove_handle = function(e){
          e = e || window.event;
    
          let winW = document.documentElement.clientWidth || document.body.clientWidth,
              winH = document.documentElement.clientHeight || document.body.clientHeight,
              maxW = winW - drag_el.offsetWidth,
              maxH = winH - drag_el.offsetHeight;
    
          let x = e.clientX - disl,
              y = e.clientY - dist;
     
          if ( x < 0 ) x = 0;
          else if ( x > maxW ) x = maxW;
      
          if ( y < 0 ) y = 0;
          else if ( y > maxH ) y = maxH; 
    
    
          drag_el.style.top = y + "px";
          drag_el.style.left = x + "px";
        
        }
    
        const mouseup_handle = function(){
          //鼠标弹起时卸载鼠标移动事件
          document.removeEventListener( 'mousemove' , mousemove_handle );   
          //同时卸载弹起事件
          document.removeEventListener( 'mouseup' , mouseup_handle );     
        }
    
    
        document.addEventListener('mousemove' ,  mousemove_handle ) 
        document.addEventListener('mouseup' , mouseup_handle ) 
        
      }

      el._drag_set_css = function( isFixed ){
       
        dom.css( el , {
          position: isFixed ? 'fixed' : 'static',
          top: el._drag_el_offset.top + 'px',
          left: el._drag_el_offset.left + 'px'
        })
      }
     
      el._drag_set_css( value )

      el.addEventListener( 'mousedown' , el._mousedown_handle )

    },
    componentUpdated( el, { value } ){
      el._drag_set_css( value )
    },
    unbind( el ){
      el.removeEventListener( 'mousedown' , el._mousedown_handle )
    }
  },

  /**
  * @author: hongwenqing
  * @date: 2019-2-14
  * @desc: 吸顶功能指令
  * @lastEditor: 
  */
  affix: {
    bind(el){
      dom.css(el , { 
        width: '100%',
        zIndex: '1994214' 
      })
    },
    inserted( el , {value} ){
      const prevEl = el.previousElementSibling,  // 上一兄弟节点
            nextEl = el.nextElementSibling,      // 后一兄弟节点
            nextElPaddingTop = Number.parseFloat( dom.getStyleValue( nextEl , 'paddingTop') ),
            prevHeight = Number.parseFloat(dom.getStyleValue( prevEl , 'height')) ,
            elHeight = Number.parseFloat(dom.getStyleValue( el , 'height' ));

      el._affix_scroll_handle = function(e){
        let scroll_instance = window.pageYOffset || window.scrollY,
            position = 'static',
            paddingTop = nextElPaddingTop;
        
        if ( scroll_instance >= prevHeight ){
          position = 'fixed'
          paddingTop = elHeight + nextElPaddingTop + 'px'
        }else{
          position = 'static'
          paddingTop = nextElPaddingTop + 'px'
        }

        dom.css( el , {
          position,
          left: '0px',
          top: '0px'
        })

        dom.css(nextEl , {paddingTop})
        
      }
      

      window.addEventListener( 'scroll' , el._affix_scroll_handle )
      
      
    },
    unbind(el){
      window.removeEventListener( 'scroll' , el._affix_scroll_handle )
    }
  }
  

  // more directives right here ...

}
