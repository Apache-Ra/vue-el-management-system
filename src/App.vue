<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        components: {},
        computed: {},
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                loading: true,
                isRouterAlive: true,
            }
        },
        created() {
        },
        methods: {
            reload() {
                let vue = this
                vue.isRouterAlive = false
                //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
                vue.$nextTick(() => {
                    vue.isRouterAlive = true
                })
            }
        }
    }
</script>
<style>
    /*@import "./assets/css/main.css";*/
    @import "../node_modules/element-ui/lib/theme-chalk/index.css";
    @import "./assets/css/icon.less";
    @import "./assets/css/customize.ui.less";
    @import "./assets/css/base.less";
</style>