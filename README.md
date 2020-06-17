# orangeUI
原生微信小程序UI库

## 说明
该小程序的工具均是基于原生小程序开发的，无需第三方学习成本

## 演示
![](https://user-gold-cdn.xitu.io/2019/12/25/16f3c75dcaf8d26f?w=258&h=258&f=jpeg&s=44009)

## 使用

###  引入公共字体文件和公共样式文件
```
/resources/Iconfont/*
/resources/wxss/common.wxss
/resources/images/ 图片文件按照组件需要引入
app.wxss内容复制粘到项目中
```
### 引入组件

自定义组件放在/components下

#### 轮播图：  普通轮播，卡片式轮播

![](https://user-gold-cdn.xitu.io/2020/6/11/172a11b33b7c4fbf?w=379&h=670&f=gif&s=1906116)

组件路径
```
"usingComponents": {
    "swiper-normal": "../../../components/swiper/swiper",
    "swiper-card": "../../../components/swiper-card/swiper-card"
}
```
使用例子

pages/comp/swiper/swiper

```
<view class="title">普通轮播图</view>
  <swiper-normal imgUrls="{{imgUrls}}" indicatorDots="{{indicatorDots}}"
    autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="{{circular}}" bind:swiperChange="swiperChange"></swiper-normal>
  
<view class="swiper-card">
  <view class="title">卡片式轮播图</view>
  <swiper-card imgUrls="{{imgUrls}}" circular interval="{{2000}}" duration="{{800}}" bind:swiperChange="change"></swiper-card>
</view>
```
#### 滚动导航栏
![](https://user-gold-cdn.xitu.io/2020/6/11/172a11b6c4254dc9?w=379&h=670&f=gif&s=178941)

组件路径

/components/classify-bar/classify-bar

使用例子

pages/comp/classify-bar/classify-bar

```
<nav classify="{{classify}}" bind:clickClassify="clickClassify"></nav>
```

#### 地图定位（使用百度地图插件）
 
pages/comp/Location/Location

####  图片压缩

pages/pictureCompression/pictureCompression

[解析](https://juejin.im/post/5d5df7cf6fb9a06b09361f9a)

#### 选项卡
![](https://user-gold-cdn.xitu.io/2020/6/11/172a11fbc1f18ca7?w=379&h=670&f=gif&s=226541)
pages/slidingSwitch/slidingSwitch

#### 滑动删除
![](https://user-gold-cdn.xitu.io/2020/6/11/172a1206ef20981c?w=379&h=670&f=gif&s=69368)

pages/Slide/slide

#### 加入购物车动画
![](https://user-gold-cdn.xitu.io/2020/6/11/172a1211736aa0a0?w=379&h=670&f=gif&s=156263)

pages/addShoppingCarAnimate/addShoppingCarAnimate

[解析](https://juejin.im/post/5d54f17a518825053e042ff6)

#### 通讯录字母索引查询
![](https://user-gold-cdn.xitu.io/2020/6/11/172a1228a2beb712?w=379&h=670&f=gif&s=1264486)

pages/comp/initialQuery/initialQuery

#### 省市区级联选择（省按照字母排序）
![](https://user-gold-cdn.xitu.io/2020/6/11/172a122ea9a5fb17?w=379&h=670&f=gif&s=175478)

pages/comp/cascader/cascader

#### 绘制海报
![](https://user-gold-cdn.xitu.io/2020/6/11/172a1231b7d433e0?w=379&h=670&f=gif&s=179472)

pages/comp/poster/poster

[解析](https://juejin.im/post/5d75f151f265da03bf0f69b7)

#### 贴底框
![](https://user-gold-cdn.xitu.io/2020/6/11/172a123a8ed1523a?w=382&h=57&f=png&s=6209)

引入自定义组件
```
"buttom-nav": "../../../components/bottom-nav/bottom-nav"
```
使用例子

pages/element/icon-text/icon-text

```
<buttom-nav style="padding-left: 15rpx;">
      <icon-text icon="icon-cart" text="购物车" num="5" bindnavto="navTo" class="spacing-row-30"></icon-text>
      <icon-text icon="icon-fuwu" text="收藏" bindnavto="navTo"></icon-text>
      <icon-text icon="icon-store" text="店铺" bindnavto="navTo"></icon-text>
      <view class="flex">
        <button-rect colorBg="red" radius="0rpx" size="28rpx" bindnavTo="navTo(3)">加入购物车</button-rect>
        <button-rect colorBg="green" radius="0rpx" size="28rpx" bindnavTo="navTo(4)">一键购</button-rect>
      </view>
</buttom-nav>
```

#### 图标文字
![](https://user-gold-cdn.xitu.io/2020/6/11/172a1251fcb3fa38?w=223&h=50&f=png&s=5270)

引入自定义组件
```
"icon-text": "../../../components/icon-text/icon-text"
```
使用例子

pages/element/icon-text/icon-text

```
<icon-text img="/resources/images/heart.png" imgW="50rpx" imgH="50rpx" text="收藏"></icon-text>
<buttom-nav style="padding-left: 15rpx;">
  <icon-text icon="icon-cart" text="购物车" num="5" bindnavto="navTo" class="spacing-row-30"></icon-text>
  <icon-text icon="icon-fuwu" text="收藏" bindnavto="navTo"></icon-text>
  <icon-text icon="icon-store" text="店铺" bindnavto="navTo"></icon-text>
  <view class="flex">
    <button-rect colorBg="red" radius="0rpx" size="28rpx" bindnavTo="navTo(3)">加入购物车</button-rect>
    <button-rect colorBg="green" radius="0rpx" size="28rpx" bindnavTo="navTo(4)">一键购</button-rect>
  </view>
</buttom-nav>
```
#### 地址框
![](https://user-gold-cdn.xitu.io/2020/6/11/172a126f0e517851?w=378&h=242&f=png&s=4720)

引入自定义组件
```
"address-border": "../../../components/address-border/address-border"
```
使用例子

```
pages/element/address-border/address-border
```
```
<address-border>
  <text>插槽内容</text>
</address-border>

<address-border>
  <view class="size28 flex space-between v-center">
    <view>
      <view class="flex v-center">
        <text>女士</text>
        <text class="spacing-row-30">18000000001</text>
        <button-rect class="spacing-row-30" colorBg="red" width="80rpx" height="30rpx" size="24rpx" radius="10rpx">默认</button-rect>
      </view>
      <view class="flex v-center margin-top-30">
        <i class="iconfont icon-dingwei"></i>
        <text class="spacing-row-30">XX省XX市XX区详细地址</text>
      </view>
    </view>
    <i class="iconfont icon-right"></i>
  </view>
</address-border>
```
#### 搜索框

![](https://user-gold-cdn.xitu.io/2020/6/11/172a128158a9c25e?w=377&h=168&f=png&s=3458)

引入自定义组件地址

```
"m-input": "../../../components/m-input/m-input"
```
使用例子
```
<view class="pad-30">
  <m-input placeholder="搜索关键字" icon="icon-sousuo" bindonInput="onInput"></m-input>
</view>

<view class="pad-30">
  <m-input placeholder="请搜索..." icon="" bindonInput="onInput" focus="true"></m-input>
</view>

<view class="pad-30">
  <m-input placeholder="请搜索..." icon="icon-ditu" colorBg="#f5f5f5" bindonInput="onInput"></m-input>
</view>
```
### 元素
#### 图标
![](https://user-gold-cdn.xitu.io/2020/6/11/172a13fc498dc067?w=1560&h=550&f=png&s=45114)

pages/element/icon/icon

#### 时间轴
![](https://user-gold-cdn.xitu.io/2020/6/11/172a12a435a61941?w=1181&h=439&f=png&s=41291)

pages/comp/timeLine/timeLine 

#### 按钮
![](https://user-gold-cdn.xitu.io/2020/6/11/172a12a6ef9e89ab?w=383&h=672&f=png&s=40792)

```
引入自定义组件
"o-button": "../../../components/button/button"

使用例子
pages/element/btn/btn
``` 
#### 自定义宽高颜色等按钮
![](https://user-gold-cdn.xitu.io/2020/6/11/172a131171800284?w=281&h=61&f=png&s=3998)

```
"button-rect": "../../../components/botton-rect/botton-rect"
```
pages/element/address-border/address-border和pages/element/icon-text/icon-text中都有用到button-rect
```
<button-rect colorBg="red" radius="0rpx" size="28rpx" bindnavTo="navTo(3)">加入购物车</button-rect>
<button-rect colorBg="green" radius="0rpx" size="28rpx" bindnavTo="navTo(4)">一键购</button-rect>
<button-rect class="spacing-row-30" colorBg="red" width="80rpx" height="30rpx" size="24rpx" radius="10rpx">默认</button-rect>
```
#### 列表
![](https://user-gold-cdn.xitu.io/2020/6/11/172a133e42d66238?w=376&h=374&f=png&s=12198)

引入自定义组件路径
```
"list": "../../../components/list/list",
"cell": "../../../components/cell/cell"
```
使用例子
```
pages/element/list/list
```
```
<list wx:for="{{iconList}}" wx:key="{{index}}"
      icon="{{item.icon}}"
      title="{{item.title}}"
      desc="{{item.desc}}"
      src="{{item.src}}"
      key="{{index}}">
</list>

<list icon="{{''}}"
      title="{{'左边插槽'}}"
      desc="{{''}}"
      src="{{'/resources/images/right.png'}}">
  <i class="iconfont icon-bianji" slot="icon"></i>
</list>

<list icon="{{''}}"
      title="{{'右边插槽'}}"
      desc="{{'点我'}}"
      src="{{'/resources/images/right.png'}}"
      bindnavTo="navTo">
  <i class="iconfont icon-xiangkan" slot="fun"></i>
</list>

<list icon="{{''}}"
      title="{{'开关'}}"
      desc="{{''}}"
      src="{{'/resources/images/right.png'}}">
  <switch checked="true" slot="fun"></switch>
</list>

<cell icon="icon-bianji" title="我的订单"></cell>
<cell icon="icon-dingwei" title="我的地址" desc="描述" btLine="true"></cell>
```
#### 分割线
![](https://user-gold-cdn.xitu.io/2020/6/11/172a134e8989bd99?w=380&h=221&f=png&s=1977)

引入
```
"footer-divider": "../../../components/footerDivider/footerDivider"
```
使用例子
```
pages/element/footerDivider/footerDivider
```
```
<footer-divider all="true"></footer-divider>
<footer-divider>到底啦</footer-divider>
<footer-divider>Time Travel</footer-divider>
<footer-divider><i class="iconfont icon-aixin"></i></footer-divider>
```
#### 商品卡片
![](https://user-gold-cdn.xitu.io/2020/6/11/172a135a9be7f6e9?w=1200&h=550&f=png&s=118412)

引入
```
"grid": "../../../components/grid/grid",
"goods-card": "../../../components/goods-card/goods-card"
```
使用
```
pages/comp/goods/goods
```
```
<text class="size28 pad-30">纵向排列</text>
<grid col="3">
  <view class="flex bg-color-white scroll">
    <goods-card bindtoDatail="toDatail" col="3" wx:for="{{goodsInfo}}" wx:key="index" goodsInfo="{{item}}"></goods-card>
  </view>
</grid>
<view class="size28 pad-30" style="margin-top:100rpx;">横向排列 插槽</view>
<grid col="1" wx:for="{{goodsInfo}}" wx:key="index">
  <view style="display: flex;justify-content: space-around;">
    <goods-card col="1" goodsInfo="{{item}}" direction="h" bindtap="toDetail">
      <view slot="slot-info" class="add-cart spacing-col-sm flex space-between">
        <text class="size28 color51">已售1件</text>
        <i class="iconfont icon-xiangkan active"></i>
      </view>
    </goods-card>
  </view>
</grid>
<view class="size28 pad-30" style="margin-top:100rpx;">数字框 插槽</view>
<grid col="1" wx:for="{{goodsInfo}}" wx:key="index">
  <view style="display: flex;justify-content: space-around;">
    <goods-card col="1" goodsInfo="{{item}}" direction="h" bindtap="toDetail">
      <select-number slot="slot-opera" val="{{item.quantity}}" idx="{{index}}" bindinputNumber="inputNumber" class="select-number spacing-col-sm"></select-number>
    </goods-card>
  </view>
</grid>
```
#### 结果页（成功/失败）
![](https://user-gold-cdn.xitu.io/2020/6/11/172a1370aeb63aa2?w=381&h=674&f=png&s=12823)
![](https://user-gold-cdn.xitu.io/2020/6/11/172a13718ba945f8?w=378&h=668&f=png&s=10400)

pages/element/resultPage/success/success

pages/element/resultPage/fail/fail
#### 空页
![](https://user-gold-cdn.xitu.io/2020/6/11/172a13752d66883a?w=382&h=674&f=png&s=12317)

引入
```
"empty": "../../../components/empty/empty"
```
使用
```
pages/comp/empty/empty
```
```
<empty>
  <text class="size26 color51">木有了~</text>
</empty>
```
#### 自定义弹框
![](https://user-gold-cdn.xitu.io/2020/6/11/172a139093cb70e5?w=375&h=669&f=png&s=17919)

引入
```
"suspend-modal": "../../../components/suspend-modal/suspend-modal",
"m-mask": "../../../components/mask/mask"
```
使用
```
pages/comp/suspend-modal/suspend-modal
```
```
<suspend-modal isShow="{{showModal}}">
  <view class="size28 color51 pad-30">
    <view class="text-center">你查看了如下企业信息</view>
    <view class="color153 spacing-col-sm">企业名称</view>
    <view class="color153 spacing-col-sm">银行账户</view>
    <view class="color153 spacing-col-sm">转账金额</view>
    <view class="spacing-col-sm">请确认信息是否正确</view>
  </view>
  <view class="flex">
    <button-rect width="100%" height="80rpx" border="#eee" color="#333" bindnavTo="alertModal" radius="0" class="flex-1">关闭</button-rect>
    <button-rect width="100%" height="80rpx" border="#eee" color="#ff5b1f" bindnavTo="alertModal" radius="0" class="flex-1">确认</button-rect>
  </view>
</suspend-modal>
<m-mask wx:if="{{showModal}}" bindtap="alertModal"></m-mask>
```
#### 进度条
pages/comp/progressBar/progressBar

自定义组件放在引入components文件夹下

使用示例在pages文件夹下:

元素 pages/element

组件 pages/comp

页面风格样式参考了
[ColorUI](https://github.com/weilanwl/ColorUI)
