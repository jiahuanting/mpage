<template>
  <div>
    <div class="top">
        <ul>
          <li>
            <a href="#">Epidemic Forecast</a>
            <ul>
                <li><a href="/#/forecasting">English</a></li>
                <li><a href="/#/forecasting_cn">Chinese</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Economic Recovery</a>
            <ul>
              <li><a href="/#/resumption">English</a></li>
              <li><a href="/#/resumption_cn">Chinese</a></li>
            </ul>
          </li>
          <li>
            <a href="/#/r-value">Weather Effects</a>
          </li>
          <li><a href="https://github.com/bigscity/nCov-predict" target="_blank">Data</a></li>
          <li><a href="https://www.bigscity.com/" target="_blank">BIGSCITY</a></li>
        </ul>
              
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
      $('.top>ul>li').hover(function() {
        const li = $(this), width = li.width();
        const items = li.children('ul');
        if (items.length) items.width(width);
      })
    }
}
</script>

<style>
    html, body {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
    }
    .top{
      /* 设置宽度高度背景颜色 */
      height: auto; /*高度改为自动高度*/
      width: 100%;
      background:rgb(36, 36, 36);
      background-image: linear-gradient(to right, rgb(26,26,26), #444,  rgb(26,26,26));
      position: fixed; /*固定在顶部*/
      top: 0;/*离顶部的距离为0*/
      margin-bottom: 5px;
      z-index: 100;
    }
    ul{
      /* 清除ul标签的默认样式 */
      width: auto;/*宽度也改为自动*/
      list-style-type: none;
      white-space: nowrap;
      overflow: hidden;
      margin-left: 5%;
      margin-top: 0;
      margin-bottom: 0;      
      padding: 0;
    }
    li {
      float: left; /* 使li内容横向浮动，即横向排列 */
      margin-right: 2%;  /* 两个li之间的距离 */
      position: relative;
      overflow: hidden;
    }
    li a{
      display: block; /* 把链接显示为块元素可使整个链接区域可点击 */
      color:white;
      text-align: center;
      padding: 15px;
      overflow: hidden;
      text-decoration: none; /* 去除下划线 */
    }
    li a:hover{
      background-color: #aaa;
      transition: 0.8s;
    }
    ul li ul{
      /* 设置二级菜单 */
      margin: 0px;
      background: rgb(36, 36, 36);
      position: fixed;
      display: none; /* 默认隐藏二级菜单的内容 */
    }
    ul li ul li a:hover {
      transition: 0.8s;
      background-color: #aaa;
    }
    ul li ul li a {
      border-top: 1px solid #fff;
    }
    ul li ul li {
      padding: 0px;
      margin: 0px;
      /* 二级菜单li内容的显示 */
      float: none;
      text-align: center;
    }
    ul li:hover ul  {
      display: block;
    }
</style>
