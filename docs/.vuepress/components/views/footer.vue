<template>
	<footer class="_footer">
		MIT Licensed | Copyright © 2018-present Shing_li /  <a target="_blank" href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">皖ICP备18000360号-1</a>
		<!-- https://www.xiaoyulive.top/ -->
	</footer>
</template>
<script>
	export default {
		name:'Footer'
	}
</script>
<style lang="less" scoped>
	._footer{
		position: absolute;
		bottom:0;
		left: 0;
		width: 100%;
        height: 52px;
        line-height: 52px;
        font-size: 1rem;
        text-align: center;
    }
    html{
        @media screen{
            @media (min-width: 20px){
                ._footer{
                    line-height: 60px;                    
                    font-size:7px;
                }
            }
            @media (min-width: 375px){
                ._footer{
                    line-height: 60px;                    
                    font-size:8px;
                }
            }
            @media (min-width:414px){
                ._footer{
                    line-height: 70px;
                    font-size:9px;
                }
            }
            @media (min-width:768px){
                ._footer{
                    bottom: 0;
                    font-size:1rem;
                }
            }
        }
    }
</style>
