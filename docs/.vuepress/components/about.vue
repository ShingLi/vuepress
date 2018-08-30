<template>
	<div class="about_wrapper">
		<!-- 个人栏 -->
		<el-row>
			<el-col :span='24'>
				<el-container>
					<el-aside width='20%'>
						<div class="userinfo">
				            <div class="avatar">
				                <img :src="$withBase(`${avatar}?imageView2/1/w/80/h/80`)">
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
					<el-main></el-main>
				</el-container>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		name:'about',
		data() {
			return {
                name: '李成',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                bossInfo: [
                    {icon:'&#xe66e;',text:'男'},
                    {icon:'&#xe626;',text:'汉'},
                    {icon:'&#xe608;',text:'licheng'},
                    {icon:'&#xe60d;',text:'安徽芜湖'},
                    {icon:'&#xe670;',text:'745573545@qq.com'}

                ]
			}
		},
        created() {
            this.iconClss = []
        }
	}
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
	}
</style>
