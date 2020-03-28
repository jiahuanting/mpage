<template>
    <div id="show-iframe">
        <iframe src="https://www.arcgis.com/apps/opsdashboard/index.html#/52a2851318a8415192d530ac115b6b51" frameborder="0" height="100%" width="100%"></iframe>
    </div>
</template>

<script>
export default {
    name: 'Forecasting',
}
</script>

<style scoped>
    #show-iframe {
        position: absolute;
        height: calc(100% - 50px);
        top: 50px;
        left: 0px;
        width: 100%;
    }
</style>
  