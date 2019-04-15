<template>
    <div class='init'>
        <HeaderBar></HeaderBar>
        <NavBar></NavBar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <TagBar></TagBar>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from './headerBar'
    import NavBar from './navBar'
    import TagBar from './tagBar'
    import Event from '../../util/Event'
    import {mapState} from 'vuex'
    export default {
        // 组建的名称
        title: '',
        name: 'init',
        computed: {
            ...mapState({
                // showLoader: state => state.vux.showLoader,
            })
        },
        /**
         * 子组建传值
         * objData: {
         *   type: Object,
         *   default: () => ({ })
         * }
         * arrData: {
         *   type: Array,
         *   twoWay: true,
         *   default: []
         * }
         */
        props: {},
        // 组建刷新
        inject: ['reload'],
        // 挂在组建
        components: {HeaderBar, TagBar, NavBar},
        data() {
            return {
                tagsList: [],
                collapse: false
            }
        },
        // 初始化记载
        created() {
            let vue = this;
            Event.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            Event.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        // DOM加载完毕执行操作
        mounted() {
        },
        // 事件处理
        methods: {},
        // 离开路由的操作
        destroyed() {
        }
    }
</script>

<style scoped lang='less'>
.init{height: 100%;}
.content-box {position: absolute;left: 250px;right: 0;top: 70px;bottom: 0;padding-bottom: 30px;-webkit-transition: left .3s ease-in-out;transition: left .3s ease-in-out;background: #f0f0f0;}
.content {width: auto;height: 100%;padding: 10px;overflow-y: scroll;box-sizing: border-box;}
.content-collapse {left: 65px;}
</style>
