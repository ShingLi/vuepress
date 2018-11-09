<template>
    <transition name='slide'>
        <div class="home-wrapper" ref='wrapper'>
    	    <canvas class="canvas"></canvas>
        </div>
    </transition>
</template>
<script>
	import canvas from '../public/js/canvas'
	import vFooter from './views/footer'
	export default {
	    name:'home',
	    components:{
	    	vFooter
        },
        mounted() {
	    	setTimeout(() => {
                canvas()
            },26)
        },
        updated () {
            let h = document.body.clientHeight
            let height = document.getElementsByTagName('header')[0].clientHeight
            this.$refs.wrapper.style.height = h - height -1 +'px'
        }
	}
</script>
<style lang="less">
    .home-wrapper{
        font-family: 'Open Sans', 'Helvetica Neue', 'Hiragino Sans GB', 'LiHei Pro', Arial, sans-serif;
        color: #333;
		.canvas{
			position: absolute;
            top:0;
            bottom: 0;
            left: 0;
            z-index: 0;
            width: 100%;
            pointer-events: none;
            // background-color: #e6ecf0;
		}
    }
</style>
