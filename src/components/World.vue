<template>
    <div id="show-iframe">
        <iframe src="https://www.arcgis.com/apps/opsdashboard/index.html#/a05bcfd7177b44c2a1bc0644ae496978" frameborder="0" height="100%" width="100%"></iframe>
    </div>
</template>

<script>
export default {
    name: 'World',
}
</script>

<style scoped>
    html, body, div {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
    }
    #show-iframe {
        position: absolute;
        height: 100%;
        width: 100%;
    }
</style>
  