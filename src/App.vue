<template>
  <div>
    <Menu mode="horizontal" :theme="theme" active-name="1">
      <router-link to="/">
      <MenuItem name="1">
          <Icon type="ios-paper" />
          中国疫情地图
      </MenuItem>
      </router-link>
      <router-link to="/worldmap">
      <MenuItem name="2">
          <Icon type="ios-people" />
          世界疫情地图
      </MenuItem>
      </router-link>
      <router-link to="/beijing">
      <MenuItem name="3">
          <Icon type="ios-stats" />
          北京市防控风险
      </MenuItem>
      </router-link>
      <router-link to="/risk">
      <MenuItem name="4">
          <Icon type="ios-construct" />
          疫情风险预测
      </MenuItem>
      </router-link>
  </Menu>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      theme: 'light'
    }
  }
}
</script>

<style>
html, body {
  padding: 0px;
  margin: 0px;
}
</style>
