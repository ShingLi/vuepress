<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-09 18:59:06
 * @LastEditTime: 2019-10-04 12:16:35
 * @LastEditors: Please set LastEditors
 -->
<template>
	<transition name ='slide'>
        <div class="about_wrapper" :class="{pd : isiPad}">
		<!-- 个人栏 -->
            <el-row>
                <el-col :span='24'>
					<template v-if='isiPad'>
						<el-aside style="width: 100%;">
						    <div class="userinfo ipad">
						        <div class="avatar">
						            <img :src="avatar"
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
					</template>
                    <el-container class="main_box">
                        <el-aside :width='calculateWidth'>
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
                        <el-main :style="calculateWidth_main">
                            <div class="main">
                                <div class="detail">
                                    <h3>《 卜算子 自嘲 》</h3>
                                    <p>本是后山人， 偶做前堂客。 醉舞经阁半卷书， 坐井说天阔。</p>
                                    <p>大志戏功名， 海斗量福祸。 论到囊中羞涩时， 怒指乾坤错！</p>
                                </div>
                                <!-- skil -->
                            <div class="progress" :class="[ isiPad ? 'ipad' : 'normal' ]">
                                    <code>Html&&Html5</code>
                                    <el-progress :percentage="70"></el-progress>
                                    <code>CSS&&CSS3</code>
                                    <el-progress :percentage="70" color="#8e71c7"></el-progress>
                                    <code>Jquery</code>
                                    <el-progress :percentage="60" color="#909399"></el-progress>
                                    <code>JavaScript(es6 && es7)</code>
                                    <el-progress :percentage="61" color="#F56C6C"></el-progress>
                                    <code>Mini program(微信小程序)</code>
                                    <el-progress :percentage="60" color="#2db7f5"></el-progress>
                                    <code>Vue</code>
                                    <el-progress :percentage="70" color="#19be6b"></el-progress>
                                    <code>React</code>
                                    <el-progress :percentage="30" color="#19be6b"></el-progress>
									<code>Koa</code>
									<el-progress :percentage="10" color="#F56C6C"></el-progress>
                            </div>
                            </div>
                        </el-main>
                    </el-container>
                    <el-container v-if="!isiPad">
                        <!-- <el-footer height='52'>
                            <v-footer></v-footer>
                        </el-footer> -->
                    </el-container>
                </el-col>
            </el-row>
			<img :src="logo" class="logo_">
	    </div>
    </transition>
</template>
<script>
    import  VFooter from './views/footer.vue'
	import logo from '../public/img/logo.svg'
    export default {
        name: "about",
		components: {
		    VFooter
		},
        data () {
            try {
				return {
				    name: "李成",
				    // avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
					avatar: "/img/avatar_1.jpg",
				    bossInfo: [
				        { icon: "&#xe66e;", text: "男" },
				        { icon: "&#xe626;", text: "汉" },
				        { icon: "&#xe608;", text: "licheng" },
				        { icon: "&#xe60d;", text: "安徽芜湖" },
				        { icon: "&#xe670;", text: "745573545@qq.com" }
				    ],
					isiPad: !!navigator.userAgent.toLowerCase().match(/ipad/i),
					logo,
				}
			} catch(e) { console.log(e) }
        },
		computed: {
			calculateWidth () {
				try{
					let ret = '20%'
					let ua = navigator.userAgent.toLowerCase()
					if (ua.match(/ipad/i) == 'ipad') {
						
						ret = '0%'
					}
					return ret
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			calculateWidth_main () {
				if (this.isiPad) {
					return {
						marginLeft: 0,
						marginTop: '40px'
					}
				}
				return {
					marginLeft: '5vw'
				}
			}
		},
        created () {
            this.iconClss = []
			// try{
			// 	window.addEventListener('resize', () => {
			// 		location.reload()
			// 	})
			// }catch(e){
			// 	//TODO handle the exception
			// }
        },
        methods: {  
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
    }
</script>
<style lang="less">
    .slide-enter-active,.slide-leave-active{
        transition: all 1s;
        position: fixed;
    }
    .slide-enter{
        transform: translate3d(100%, 0, 0)
    }
    .slide-leave-to {
        transform: translate3d(-100%, 0, 0)
    }
</style>

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
        position: relative;
		width: 100%;
        padding: 5%;
        padding-bottom: 0;
        min-height: calc(100vh - 3.6rem);
        
        background-color:@color-theme;
		.userinfo{
			// padding: 4rem;
            text-align: center;
			border-radius: 10px;
			background-color: #fff;
			&.ipad{
				width: 100%;
			}
            .avatar{
            	padding: 4rem;
				padding-bottom: 1rem;;

                img{
                    width: 7rem;
                    height: 7rem;
                    border-radius: 50%;
                    cursor: pointer;
					animation:  Rotate 3s infinite linear;
                }
				// @keyframes Rotate {
				// 	0%{
				// 		transform: rotate(0)
				// 	}
				// 	100% {
				// 		transform: rotate(360deg)
				// 	}
				// }
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
            background: #dd5e89; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #dd5e89, #f7bb97); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #dd5e89, #f7bb97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            .detail {
                padding-left: 2rem;
                h3{
                    text-indent: 3%;
                    margin-bottom: 3%;
                }
                p{
                    line-height: 35px;
                    text-indent: 1%;
                    
                }
            }
            .progress{
                margin-top: .2rem;
                padding-left: 2rem;
                &.noraml{
					width: 40%;
				}
				&.ipad{
					width: 70%;
				}
            }
        }
    }
    html{
        @media screen{
            @media (max-width: 375px){
                .detail{
                    p{
                        font-size: .7rem;
                    }
                }
                .el-container{
                    flex-wrap: wrap
                }
            }
            @media (max-width:414px){
                .detail{
                    p{
                        font-size: .9rem;
                    }
                }
                .el-container{
                    flex-wrap: wrap
                }
                .el-aside{
                    width:100% !important;
                    .userinfo{
                        // margin: 0 5%;
                        margin-bottom: 10%;
                        .base_wrapper{
                            padding-bottom: 9%
                        }
                    }
                }
                .el-main{
                    margin-left:  0 !important;
                    // margin: 0 5%;
                    margin-bottom: 10%;
                    .progress{
                        width: inherit !important
                    }
                }
                .about_wrapper{
                    height: inherit !important;
                }
            }
            @media (min-width: 1024px){
                .detail{
                    p{
                        font-size: 16px;
                    }
                }
				.el-aside{
				    width: 100%;
				}
                // .el-main{
                //     margin-left: 5vw;
                //     // margin: 0 5%;
                //     margin-bottom: 10%;
                // }
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
        }
    }
    // 覆盖element-ui
    .el-row{
        height: 100%;  
    }
	.pd{
		padding-bottom: 20px;
	}
	.el-aside{
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 3px 3px #f5f5f5;
	}
	.logo_{
		position: absolute;
		right: 0vmin;
		top: 10vmin;
		width: 40vmin;
		animation:  logo 15s infinite linear;
	}
	@keyframes logo {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
