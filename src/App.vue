<template>
  <div id="main">
    <div class="header">
      <div class="logo">
        <a href="https://www.bigscity.com/" target="_blank">
          <img src="static/images/bigscitylogo.png" alt="BIGSCITYLOGO">
        </a>
      </div>
      <div class="left">
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
            <li><a href="https://www.bigscity.com/" target="_blank">BIGSCity Lab</a></li>
          </ul> 
        </div>
      </div>
      <div class="right">
        <div class="panel">
          <div class="buaa">
            <a href="https://www.buaa.edu.cn/" target="_blank">
              <img src="static/images/buaalogo.png" alt="BUAALOGO" width="100%">
            </a>
          </div>
          <div class="text">
            <p style="font-weight: 600; font-size: 14px;">Beihang University</p>
            <p style="font-weight: 600; font-size: 14px;">COVID-19 Research Team</p>
          </div>
        </div>
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
  html, body, div, p {
    padding: 0;
    margin: 0;
  }
  html, body {
    width: 100%;
    height: 100%;
    background-color: #0065B3;
  }
  #main {
    position: absolute;

    width: 100%;
    /* height: calc(100% - 60px); */
    height: 100%;
  }
  .header {
    width: 100%;
    height: 60px;
    /* min-height: 60px; */
    background-color: #0065B3;
    z-index: 100;
    font-family: "Arial";
  }
  .logo {
    float: left;
    width: 5%;
    height: 100%;
  }
  .logo img {
    padding: 4%;
    width: 90%;
    height: 100%;
  }
  .left {
    float: left;
    width: 70%;
    height: 100%;
    font-size: 18px;
  }
  .right {
    float: right;
    width: 25%;
    height: 100%;
  }
  .panel {
    float: right;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .buaa {
    float: left;
    width: 50%;
    height: 85%;
    text-align: right;
    border-right: 1px solid #fff;
  }
  .buaa img {
    padding: 3%;
    width: 100%;
    height: 60%;
  }
  .text {
    float: left;
    width: 50%;
    padding-left: 10px;
    color: #fff;
  }
  .menu {
    float: left;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
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
    padding-right: 1%;  /* 两个li之间的距离 */
    position: relative;
    overflow: hidden;
  }
  li a{
    display: block; /* 把链接显示为块元素可使整个链接区域可点击 */
    color:white;
    text-align: center;
    padding: 10px 10px;
    overflow: hidden;
    text-decoration: none; /* 去除下划线 */
    font-weight: 600;
  }
  ul li ul{
    width: 100px;
    margin: 0px;
    background: #0065B3;
    position: fixed;
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
    float: none;
    text-align: center;
  }
  ul li:hover ul  {
    display: block;
  }
  #show-iframe {
    width: 100%;
    height: calc(100% - 60px);
  }
</style>