<template>
	<div class="about_wrapper">
		<!-- 个人栏 -->
		<el-row>
			<el-col :span='24'>
				<el-container>
					<el-aside width='20%'>
						<div class="userinfo">
				            <div class="avatar">
				                <img :src="$withBase(`${avatar}?imageView2/1/w/80/h/80`)"
                                    @mouseover='startRotate'
                                    @mouseout= 'endRotate'
                                >
				            </div>
							<div class="base_wrapper">
								<div class="base_info">
									<p class="left"></p>
									<p class="base">个人信息</p>
								</div>
                                <div class="item"
                                    v-for='item in bossInfo'
                                >
                                    <i class="iconfont" v-html='item.icon'></i>
                                    <span>{{item.text}}</span>
                                </div>
                                
							</div>
						</div>
					</el-aside>
					<el-main>
                        <div class="main">
                            <div class="detail">
                                <h3>《卜算子 自嘲》</h3>
                                <p>本是后山人， 偶做前堂客。 醉舞经阁半卷书， 坐井说天阔。</p>
                                <p>大志戏功名， 海斗量福祸。 论到囊中羞涩时， 怒指乾坤错！</p>
                            </div>
                            <!-- 个人介绍 -->
                            <lottie :options="defaultOptions"
                                :height="200" 
                                :width="200" 
                                v-on:animCreated="handleAnimation" />
                        </div>
                    </el-main>
				</el-container>
			</el-col>
		</el-row>
	</div>
</template>
<script>
    import lottie from 'vue-lottie'
    import * as animationData from "../public/json/loading.json";
    export default {
        name: "about",
        data () {
            return {
                name: "李成",
                avatar:
                    "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                bossInfo: [
                    { icon: "&#xe66e;", text: "男" },
                    { icon: "&#xe626;", text: "汉" },
                    { icon: "&#xe608;", text: "licheng" },
                    { icon: "&#xe60d;", text: "安徽芜湖" },
                    { icon: "&#xe670;", text: "745573545@qq.com" }
                ],
                defaultOptions: { animationData: animationData },
                animationSpeed: 1,
                anim: {}
            };
        },
        created () {
            this.iconClss = [];
        },
        methods: {
            handleAnimation (anim) {
                this.anim = anim;
            },
            startRotate (e) {
                this.avatarRotate(e,true)
            },
            endRotate (e) {
                this.avatarRotate(e,false)
            },
            avatarRotate (e, flag) {
                const avatar = e.target
                    avatar.style.transition = 'all 1s'
                if (flag) {
                    avatar.style.transform = `rotate(360deg)`
                } else {
                    avatar.style.transform = 'rotate(0)'
                }
            }
        },
        components: {
            lottie
        }
    };
</script>
<style lang="less" scoped>
    @import '../public/styles/variable.less';
    @font-face {
        font-family: 'iconfont';  /* project id 439555 */
        src: url('//at.alicdn.com/t/font_439555_nrqz7rbcpjr.eot');
        src: url('//at.alicdn.com/t/font_439555_nrqz7rbcpjr.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_439555_nrqz7rbcpjr.woff') format('woff'),
        url('//at.alicdn.com/t/font_439555_nrqz7rbcpjr.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_439555_nrqz7rbcpjr.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
	.about_wrapper{
		width: 100%;
		padding: 5%;
        height: calc(100vh - 3.6rem);
		background-color:@color-theme;
		.userinfo{
			// padding: 4rem;
            text-align: center;
			border-radius: 10px;
			background-color: #fff;
			box-shadow: 3px 3px #f5f5f5;
            .avatar{
            	padding: 4rem;
				padding-bottom: 1rem;;

                img{
                    width: 7rem;
                    height: 7rem;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
			.base{
				&_wrapper{
                    padding-bottom: 20%;
                    .item{
                        text-align: left;
                        padding:  0 10%;
                        display: flex;
                        align-items: center;
                        line-height: 35px;
                        i{
                            font-size: 20px;
                        }
                        span{
                            font-size: 1rem;
                            display: inline-block;
                            margin-left: 5%;
                        }
                    }
				}
				&_info{
					height: 2rem;
                    position: relative;
					// background-color:#67C23A;
					p{
						// display: inline-block;
						&.left{
							width: 5px;
							height: 100%;
							background-color: #F56C6C;
                        }
                        &.base{
                            position: absolute;
                            left: 50%;
                            top:50%;
                            transform: translate(-50%,-50%)
                        }
					}
				}
			}
        }
        .el-main{
            margin-left: 5vw;
            border-radius: 10px;
            background: linear-gradient(#F56C6C 0,#EAE3D6 100%);
            .detail {
                padding-left: 2rem;
                h3{
                    text-indent: 3%;
                    margin-bottom: 3%;
                }
                p{
                    line-height: 35px;
                    text-indent: 1%
                }
            }
        }
    }
    html{
        @media screen{
            @media (min-width: 1024px){

            } /*>=1024的设备*/

            @media (min-width: 1100px) {

            } /*>=1100的设备*/
            @media (min-width: 1280px) {
                
            } /*>=1280的设备*/

            @media (min-width: 1366px) {

            }  

            @media (min-width: 1440px) {
                .el-aside{
                    width: 17% !important;
                }
            } 
            @media (min-width: 1680px) {
            
            } 
            @media (min-width: 1920px) {
            } 
        }
    }
</style>
