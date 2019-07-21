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
	export default {
	    name:'home',
	    components:{
	    	vFooter
        },
        mounted () {
            canvas()
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
		.canvas{
            
		}
    }
</style>
