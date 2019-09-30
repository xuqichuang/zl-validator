# 使用方法

```
import zlValidator from 'zl-validator'
```


校验器返回值

```
return {
  isSuccess: Boolean,
  msg: String
};
isSuccess 为 true 时 msg返回空字符串
```

所有校验器
```
1. 空值
zlValidator.isEmpty(code, tip='输入信息不能为空').isSuccess
2. 身份证
zlValidator.isIdentity(code).isSuccess
3. 护照
zlValidator.isPassport(code).isSuccess
4. 手机号
zlValidator.isMobilePhone(code, locale='zh-CN').isSuccess
5. 姓名, 支持中文和英文
zlValidator.isUserName(code).isSuccess
6. 英文
zlValidator.isEnglishWord(code, type='姓').isSuccess
7. 邮箱
zlValidator.isEmail(code).isSuccess
8. 信用卡
zlValidator.isCreditCard(code).isSuccess
9. 安卓
zlValidator.isAndroid().isSuccess
10. 闰年
zlValidator.isLeapYear().isSuccess
11. 判断是否是微信浏览器
zlValidator.isWeixin().isSuccess
```
