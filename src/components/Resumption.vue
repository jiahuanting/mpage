<template>
    <div id="show-iframe">
        <iframe src="https://www.arcgis.com/apps/opsdashboard/index.html#/419227551b634ffd99bbb638d143cf34" frameborder="0" height="100%" width="100%"></iframe>
    </div>
</template>

<script>
export default {
    name: 'Resumption_cn',
}
</script>

<style scoped>
    #show-iframe {
        position: absolute;
        height: calc(100% - 50px);
        top: 50px;
        width: 100%;
    }
</style>
