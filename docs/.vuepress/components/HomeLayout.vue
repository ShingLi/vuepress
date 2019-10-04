<!--
 * @Description: In User Settings Edit
 * @Author: shingli
 * @Date: 2019-03-09 18:59:06
 * @LastEditTime: 2019-10-04 11:43:55
 * @LastEditors: Please set LastEditors
 -->
<template>
    <transition name='slide'>
        <div class="home-wrapper">
    	    <canvas class="canvas"></canvas>
        </div>
    </transition>
</template>
<script>
	import canvas from '../public/js/canvas'
    import vFooter from './views/footer'
    import { Notify, Icon } from 'vant'
    
	export default {
	    name:'home',
	    components:{
	    	vFooter
        },
        created () {
            this.$nextTick(() => {
                window.onresize = function () {
                    canvas()
                }
            })
            this.tick = null
        },
        mounted () {
            canvas()
            this.tick = setTimeout(() => {
                if (!this.isPC())  Notify({
                    type: 'danger',
                    message: 'pc预览首页效果更佳哦！',
                    duration: 3000
                })
            }, 3000)
        },
        destroyed () {
            clearTimeout(this.tick)
        },
        methods: {
            isPC () {
                const Agents = ["android","iphone","symbianos", "windows phone","ipad", "ipod"]
                let userAgentInfo = navigator.userAgent.toLowerCase(), ret = true
                
                for (let i = 0; i < Agents.length; i ++) {
                    if (userAgentInfo.indexOf(Agents[i]) != -1) {
                        ret  = false
                        
                    }
                }
                return ret
            }
        }

	}
</script>
<style lang="less">
    .home-wrapper{
        font-family: 'Open Sans', 'Helvetica Neue', 'Hiragino Sans GB', 'LiHei Pro', Arial, sans-serif;
        color: #333;
        position: absolute;
        // top:3.6rem;
        width: 100%;
        bottom: 0;
        overflow: hidden;
		.canvas{}
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 1s;
        position: fixed;
    }
    .slide-enter, .slide-leave-to{
        transform: translate3d(-100%, 0, 0)
    }
</style>
