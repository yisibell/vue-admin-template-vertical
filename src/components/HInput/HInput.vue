<template>
  <el-input 
    :style="{width: width}"
    v-model="inputValue" 
    :placeholder="placeholder"
    :clearable="clearable"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    @clear="clearHandle"
    @blur="blurHandle"
    @focus="focusHandle"
    @change="changeHandle"
    @input="inputHandle">
    
    <slot name="prefix" slot="prefix"></slot>
    <slot name="suffix" slot="suffix"></slot>
  
  </el-input>
</template>

<script>
export default {
  name: 'HInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String,Number],
      default: ''
    },
    validator: { // 输入验证器，用户每次输入都会触发，传入的参数为用户当前输入的值
      type: [Function,undefined],
      default: undefined
    },
    width: {
      type: String,
      default: '100%'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    prefixIcon: {  // 输入框内前置图标类名
      type: String,
      default: ''
    },
    suffixIcon: { // 输入框内后置图标类名
      type: String,
      default: ''
    },
  

  },
  data(){
    return {
      inputValue: this.value === null || this.value === undefined ? "" : this.value
    }
  },
  watch: {
    value(val){
      this.inputValue = val
    }
  },
  methods: {
    defaultValidator( _val ){ // 默认验证器

      // 过滤非法字符
      let pattern = new RegExp("[`~!@#$^&*()=+|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

      _val = _val.replace(pattern, '')

      // 格式校验
      if (this.type === 'number' || this.type === 'phone') {

        _val = _val.replace(/[^\0-9\.]/g, '');

      } else if (

        this.type == 'price' || 
        this.type == 'coefficient' || 
        this.type == 'priceModulus' || 
        this.type =='validDate' || 
        this.type == 'auditPrice' || 
        this.type=='halfModulus'

        ) {
        
        //先把非数字的都替换掉，除了数字和.
        _val = _val.replace(/[^\d.]/g, "");
        //保证只有出现一个.而没有多个.
        _val = _val.replace(/\.{2,}/g, ".");
        //必须保证第一个为数字而不是.
        _val = _val.replace(/^\./g, "");
        //保证.只出现一次，而不能出现两次以上
        _val = _val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

        if (this.type == 'coefficient') { //hwq: 大于0小于等于2只能有2位小数的数

          var str = _val,
              res = '';

          if (str > 2) str = '2';
          if (str == "") {
            this.$layer.msg('不能为空，不能为0', {
              type: "warning"
            })
          }
          var m = str.match(/^([0-2])+(\.(\d{1,2})\d*)?$/);
          if (m === null) {
            res = str;
          } else if (m[3]) {
            res = m[1] + "." + m[3]
          } else {
            res = m[1]
          }
          _val = res;

        } else if (this.type == 'price') {  //hwq: 金额类型，最多2位小数，不超 100000000

          //只能输入两个小数
          _val = _val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

          if (_val > 100000000) {
            this.$layer.msg('不能大于100000000', {
              type: 'warning'
            })
            _val = 100000000
          }

        } else if (this.type == 'priceModulus') { // 价格系数, 大于等于1，2位小数，小于等于10 

          _val = _val.replace(/^[0]/g, "1.0");
          _val = _val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
          if (_val > 10) _val = '10.0';
          if (_val === "") {
            this.$layer.msg('不能为空', {
              type: 'warning'
            })
          }

        } else if (this.type == 'validDate') { // 大于0的整数 有效期 最大值为180

          _val = _val.replace(/[^\d]/g, "");
          _val = _val.replace(/^[0]/g, "180");
          if (_val > 180) {
            _val = 180
          } else if (_val == "") {
            this.$layer.msg('有效期不能为空', {
              type: 'warning'
            })
          }

        } else if (this.type == 'auditPrice') { // 上报价 大于等于0，两位小数

          _val = _val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
          if (_val == "") {
            this.$layer.msg('不能为空', {
              type: 'warning'
            })
          } else if (_val > 100000000) {
            this.$layer.msg('不能大于100000000', {
              type: 'warning'
            })
            _val = 100000000
          }

        } else if (this.type == 'halfModulus'){

          var str = _val,
            res = '';
          if (str > 2) str = '2';
          if (str == "0"){
            this.$layer.msg('不能为0', {
              type: "warning"
            })
          }
          var m = str.match(/^([0-2])+(\.(\d{1,2})\d*)?$/);
          if (m === null) {
            res = str;
          } else if (m[3]) {
            res = m[1] + "." + m[3]
          } else {
            res = m[1]
          }
          _val = res;
        }

      } else if (this.type == 'text') { //hwq: 纯文本验证，限制输入字数100内

        if ( _val.length > 100 ){
          this.$layer.msg("字数不可超过100")
        }

        _val = _val.replace(/^(.{0,99}).*$/, '$1');

      }

      return _val

    },
    inputHandle() { // 用户输入处理

      this.inputValue = this.validator ? this.validator(this.inputValue) : this.defaultValidator(this.inputValue)

      this.$emit('input', this.inputValue);

    },
    changeHandle(){  // changed and blur will emit this handler
      this.$emit('change', this.inputValue);
    },
    blurHandle(){
      this.$emit('blur', this.inputValue);
    },
    focusHandle(){
      this.$emit('focus', this.inputValue);
    },
    clearHandle(){
      this.$emit('clear' , this.inputValue);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


