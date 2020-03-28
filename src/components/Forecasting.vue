<template>
    <div id="show-iframe">
        <iframe src="https://www.arcgis.com/apps/opsdashboard/index.html#/a05bcfd7177b44c2a1bc0644ae496978" frameborder="0" height="100%" width="100%"></iframe>
    </div>
</template>

<script>
export default {
    name: 'Forecasting_cn',
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
  