/**
* @author: hongwenqing
* @date: 2019-3-30
* @desc: 组件、指令、Vue 实例方法统一导出
* @lastEditor: 
*/

import BreadCrumb from './BreadCrumb'
import HPagination from './HPagination'
import HInput from './HInput'

import layer from './layer'

import directives from './directives'


const install = function (Vue){

  // 注册组件
  [

    BreadCrumb,
    HPagination,
    HInput,

    // more ...

  ].forEach( v => {
    Vue.component( v.name , v )
  });


  // 挂载实例方法
  Vue.prototype.$layer = layer


  // 注册指令
  for (let name in directives){
    if ( directives.hasOwnProperty(name) ){
      Vue.directive( name ,  directives[name] )
    }
  }



}


export default {
  install,
  BreadCrumb,
  HPagination,
  HInput,

  // more ...
}

