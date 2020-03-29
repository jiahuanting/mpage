<template>
  <div class="header">
    <div class="bigscity_logo">
      <a href="https://www.bigscity.com/" target="_blank">
        <img src="static/images/bigscitylogo.png" alt="BIGSCITYLOGO" width="75%">
      </a>
    </div>
    <div class="menu">
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
    <div class="title">
      <div class="buaa_logo">
        <a href="https://www.buaa.edu.cn/" target="_blank">
          <img src="static/images/buaalogo.png" alt="BUAALOGO" width="80%">
        </a>
      </div>
      <div class="text">
        <p style="font-weight: 100; font-size: 14px;">Coronavirus (COVID-19)</p>
        <p style="font-weight: 100; font-size: 14px;">Research team</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
      $('.menu>ul>li').hover(function() {
        const li = $(this), width = li.width();
        const items = li.children('ul');
        if (items.length) items.width(width);
      })
    }
}
</script>

<style>
  html, body, div, p, h4 {
    padding: 0;
    margin: 0;
  }
  .header {
    height: auto;
    background-color: #0065B3;
    display: flex;
    flex-wrap: nowrap;
  }
  .bigscity_logo {
    margin-left: 1%;
    width: 5%;
  }
  .menu {
    width: 55%;
    display: flex;
    align-items: center;
  }
  .title {
    width: 40%;
    display: flex;
    align-items: center;
  }
  .buaa_logo {
    margin-left: auto;
    text-align: right;
    width: 40%;
    border-right: 1px solid #fff;
  }
  .text {
    margin-left: 20px;
    text-align: left;
    width: 40%;
    color: #fff;
  }
  ul{
    width: 100%;
    list-style-type: none;
    white-space: nowrap;
    overflow: hidden;
    margin: 0;
    padding: 0;
    align-items: center;
  }
  li {
    float: left; /* 使li内容横向浮动，即横向排列 */
    padding-right: 2%;  /* 两个li之间的距离 */
    position: relative;
    overflow: hidden;
  }
  li a{
    display: block; /* 把链接显示为块元素可使整个链接区域可点击 */
    color:white;
    text-align: center;
    padding: 5px;
    overflow: hidden;
    text-decoration: none; /* 去除下划线 */
    font-weight: 500;
  }
  ul li ul{
    /* 设置二级菜单 */
    width: 100px;
    margin: 0px;
    background: #0065B3;
    position: fixed;
    z-index: 100;
    display: none; /* 默认隐藏二级菜单的内容 */
  }
  li a:hover{
    background-color: #aaa;
    transition: 0.8s;
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
  #show-iframe {
    position: absolute;
    z-index: 10;
    height: calc(100% - 60px);
    top: 60px;
    width: 100%;
  }
</style>