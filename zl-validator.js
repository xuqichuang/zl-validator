/*
 * @Author: 徐其闯 
 * @Date: 2019-09-09 17:14:47 
 * @Last Modified by: 徐其闯
 * @Last Modified time: 2019-09-26 09:50:16
 */

import validator from 'validator'
const zlValidator = {
  isEmpty(code, tip='输入信息不能为空'){ // 空值
    let [pass]= [true];
    if(validator.isEmpty(code)){
      pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isIdentity(code){ // 身份证
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    let [pass, tip]= [true, ''];
    if(validator.isEmpty(code)){
      tip = "请输入身份证号码";
      pass = false;
    }
    //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    else if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    else if(!city[code.substr(0,2)]){
        tip = "身份证地址编码错误";
        pass = false;
    }
    else{
      //18位身份证需要验证最后一位校验位
      if(code.length == 18){
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        //校验位
        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++){
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if(parity[sum % 11] != code[17]){
          tip = "身份证校验位错误";
          pass =false;
        }
      }
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isPassport(code){ // 护照
    let [pass, tip]= [true, ''];
    if(validator.isEmpty(code)){
      tip = "请输入护照号码";
      pass = false;
    }else if(!code || !/^((1[45]\d{7,8})|(E\d{7,8})|(D\d{7,8})|(G\d{7,8})|(P\d{7,8})|(S\d{7,8})|(ED\d{7,8}))?$/.test(code)){
        tip = "护照号码格式错误";
        pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isMobilePhone(code, locale='zh-CN'){ // 手机号
    let [pass, tip] = [true, '']
    if(validator.isEmpty(code)){
      tip = "请输入手机号码";
      pass = false;
    }else if(!validator.isMobilePhone(code,locale)){
      tip = "请输入正确的手机号码";
      pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isUserName(code){ // 姓名
    let [pass, tip] = [true, '']
    if(validator.isEmpty(code)){
      tip = "请输入姓名";
      pass = false;
    }else if(!validator.matches(code,/^[a-zA-Z\u4e00-\u9fa5\.\/]{1,}$/)){
      tip = "姓名请输入中/英文";
      pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isEnglishWord(code, type='姓'){ // 英文
    let [pass, tip] = [true, '']
    if(validator.isEmpty(code)){
      tip = `请输入${type}`;
      pass = false;
    }else if(!validator.matches(code,/^[a-zA-Z]{1,}$/)){
      tip = `${type}请输入英文`;
      pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isEmail(code){ // 邮箱
    let [pass, tip] = [true, '']
    if(validator.isEmpty(code)){
      tip = `请输入邮箱账号`;
      pass = false;
    }else if(!validator.isEmail(code)){
      tip = `请输入正确的邮箱账号`;
      pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isCreditCard(code){ // 信用卡
    let [pass, tip] = [true, '']
    if(validator.isEmpty(code)){
      tip = `请输入信用卡账号`;
      pass = false;
    }else if(!validator.isCreditCard(code)){
      tip = `请输入正确的信用卡账号`;
      pass = false;
    }
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isAndroid(){ // 安卓系统
    const userAgent = navigator.userAgent
    const pass = (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1)
    const tip = pass ? '安卓' : '非安卓'
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isLeapYear(yyyy){ // 闰年
    const pass = yyyy % 4 == 0 ? true : false ;
    const tip = pass ? '闰年' : '平年'
    return {
      isSuccess: pass,
      msg: tip
    };
  },
  isWeixin(){ // 判断是否是微信浏览器
    const ua = navigator.userAgent.toLowerCase();
    const pass = ua.match(/MicroMessenger/i) == "micromessenger" ? true : false ;
    const tip = pass ? '微信浏览器' : '非微信浏览器'
    return {
      isSuccess: pass,
      msg: tip
    };
  }
}

export default zlValidator