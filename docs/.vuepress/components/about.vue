<template>
	<div class="about_wrapper">
		<!-- 个人栏 -->
		<el-row>
			<el-col :span='24'>
				<el-container>
					<el-aside width='20%'>
						<div class="userinfo">
				            <div class="avatar">
				                <img :src="$withBase('/img/avatar.jpg')">
				            </div>
							<div class="base_wrapper">
								<div class="base_info">
									<p class="left"></p>
									<p class="base">个人信息</p>
								</div>
                                <div class="item">
                                    <i></i><span>男</span>
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
				name:'李成',
                bossInfo:[ '男', '汉族', '安徽芜湖', '745573545@qq.com']
			}
		},
        created() {
            this.iconClss = []
        }
	}
</script>
<style lang="less" scoped>
    @import '../public/styles/variable.less';
	.about_wrapper{
		width: 100%;
		padding: 5%;
        height: calc(100vh - 3.6rem);
		background-color:@color-theme;
		.userinfo{
			height: 60vh;
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
