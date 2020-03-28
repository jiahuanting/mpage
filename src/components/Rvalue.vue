<template>
    <div id="show-iframe">
        <iframe src="https://www.arcgis.com/apps/opsdashboard/index.html#/a1168dd3cf6b4470ab58e4c0b8e7c020" frameborder="0" height="100%" width="100%"></iframe>
    </div>
</template>

<script>
export default {
    name: 'R',
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
  