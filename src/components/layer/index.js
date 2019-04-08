
/**
* @author: hongwenqing
* @date: 2018-11-18
* @desc: 对 element-ui 中的弹出层进行的 二次封装，统一项目弹出层风格、简化调用方式
* @lastEditor: 
*/

import { Message , MessageBox } from 'element-ui';


const layer = {

  //消息提示层
  msg: function( 
      msg , 
      {
        time = 3000 , 
        type = "warning",

      } = {} 

    ){
    return new Promise( resolve => {
      Message({
        message: msg,
        showClose: true,
        duration: time,
        type,
        onClose(mes){  // 提示层关闭时回调
          resolve(mes)
        }
      });
      
    })
    
  },

  //确认框
  confirm: function( 
    msg , 
    { 
      title = "温馨提示" , 
      type = "warning",
      confirmButtonText = "确定",
      cancelButtonText = "取消",
    
    } = {} 
    
    ){
    return new Promise( (resolve , reject) => {
      MessageBox.confirm( msg , {
        confirmButtonText,
        cancelButtonText,
        title,
        type
      })
      .then( () => resolve() )
      .catch( () => reject() )

    })
  },

  //警告框
  alert: function( 
    msg , 
    { 
      title = "提示", 
    } = {} 

    ){
    MessageBox.alert( msg , {
      title,
      closeOnClickModal: true
    })
    .then( () => {})
    .catch( () => {})
  },

  //确认输入框
  prompt: function( 
    title = "输入信息" , 
    { 
      inputType = "textarea" , 
      words = 500,
    } = {} 

    ){

    return new Promise( (resolve , reject) => {
      MessageBox.prompt( "" , {
          title,
          inputType,
          inputPlaceholder: "字数不得超过" + words,
          inputValidator(val){

            let ispass = new RegExp("^.{0,"+ words +"}$").test(val)

            let msg = ispass ? true : "字数不得超过" + words

            return msg;
          }
        }
      )
      .then( res => {
        var val = res.value == null ? "" : res.value;
        resolve( val.trim() )
      })
      .catch( cancel => {
        reject(cancel)
      })


    })
  }

  
}

export default layer;