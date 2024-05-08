# wrap-text-with-t README

## 插件描述

将一个已有的项目支持国际化时避免不了以下操作：
`"你好"` -> `t("你好")` 或者是 `{t("你好")}`

该插件实现了通过`ctrl/cmd+alt+z`的快捷键方式快速嵌套一个`t`函数

该插件将会智能判定 jsx 语法

## 使用

1. 鼠标双击选中文字（不包含双引号，更快捷）
2. ctrl+alt+z

## template

```jsx
import { t } from "@/utils/method";	// 项目中自己封装的翻译函数

{title: "物料编号"}  双击文字+快捷键->  {title: t("物料编号")}

<span>物料编号</span>  双击文字+快捷键->  <span>{t("物料编号")}</span>	 // jsx智能识别

<Form.Item label="车间区域" placeholder="请选择"/>
双击文字+快捷键->
<Form.Item label={t("车间区域")} placeholder={t("请选择")}/>		// jsx智能识别
```

**Enjoy!**
