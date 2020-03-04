<template>
  <div>
    <Menu mode="horizontal" :theme="theme" active-name="1">
      <router-link to="/">
      <MenuItem name="1">
          <!-- <Icon type="ios-paper" /> -->
          {{ zh_en.nav1 }}
      </MenuItem>
      </router-link>
      <router-link to="/worldmap">
      <MenuItem name="2">
          <!-- <Icon type="ios-people" /> -->
          {{ zh_en.nav2 }}
      </MenuItem>
      </router-link>
      <router-link to="/risk">
      <MenuItem name="4">
          <!-- <Icon type="ios-construct" />想 -->
          {{ zh_en.nav4 }}
      </MenuItem>
      </router-link>
      <MenuItem name="5" style="float: right;">
        <ButtonGroup :size="buttonSize">
          <Button :size="buttonSize" type="default" @click="setZH">
              中文
          </Button>
          <Button :size="buttonSize" type="default" @click="setEN">
              English
          </Button>
        </ButtonGroup>
      </MenuItem>
  </Menu>
  <router-view></router-view>
  </div>
</template>

<script>
const zh = {
    title: "COVID-19全球疫情分析与预测地图",
    nav1: "中国疫情地图",
    nav2: "世界疫情地图",
    nav3: "",
    nav4: "疫情风险预测",
};
const en = {
    title: "Global COVID-19 Epidemic Evaluation and Prediction Map",
    nav1: "China Epidemic Map",
    nav2: "World Epidemic Map",
    nav3: "",
    nav4: "Epidemic Risk Forecast",
};
export default {
    name: 'App',
    data () {
        return {
            theme: 'light',
            buttonSize: 'large',
            zh_en: en,
        }
    },
    computed: {
        zh_en_signal: function() {
            return this.$store.state.zh_en;
        }
    },
    watch: {
        zh_en_signal: function(val, oldval) {
            if(val === "zh") {
                this.zh_en = {
                    title: "COVID-19全球疫情分析与预测地图",
                    nav1: "中国疫情地图",
                    nav2: "世界疫情地图",
                    nav3: "",
                    nav4: "疫情风险预测",
                };
            } else {
                this.zh_en = {
                    title: "Global COVID-19 Epidemic Evaluation and Prediction Map",
                    nav1: "China Epidemic Map",
                    nav2: "World Epidemic Map",
                    nav3: "",
                    nav4: "Epidemic Risk Forecast",
                };
            }
        }
            
    },
    methods: {
        setZH(){
            console.log("setZH");
            //这里的change函数记得加引号
            this.$store.commit("change", "zh");
        },
        setEN(){
            console.log("setEN");
            this.$store.commit("change", "en");
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
