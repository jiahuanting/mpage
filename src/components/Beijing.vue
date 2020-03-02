<template>
    <div id="show-iframe">
        <iframe  src="http://analysis.caupdcloud.com/nlpa/7f1918b6823847e8b62ee2bcf2506c12/share?ak=Yjk5ZjNjOWRmNGFlNGM2ZTlkNzllYTJmNTc2OTViOGE&from=singlemessage&isappinstalled=0" frameborder="0" height="100%" width="100%">

        </iframe>
        <div id="statement">
            <Tag>本工作由中国城市规划设计研究院完成，受到国家重点研发计划项目"城市多样化场景模式挖掘与态势认知(2019YFB2102103)"支持</Tag>
        </div>
    </div>
</template>

<script>
export default {
    name: "Beijing"
}
</script>

<style scoped>
    html, body {
        height: 3000px;
        width: 3000px;
    }
    #show-iframe {
        position: absolute;
        height: calc(100% - 60px);
        top: 60px;
        left: 0px;
        width: 100%;
        z-index: 5000;
    }
    #statement {
        position: absolute;
        left: 0px;
        bottom: 0px;
    }
</style>