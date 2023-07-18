<template>
	<view class="chatWrapper">
		<uni-nav-bar class="chat_navBar">
			<view class="title">北斗参谋</view>
			<block slot="right">
				<view class="city">
					<uni-icons class="qingchu" custom-prefix="iconfont" type="icon-icoqingchuhuancun"
						size="25"></uni-icons>
				</view>
			</block>
		</uni-nav-bar>
		<view class="chat_content">
			<view class="tipsCard">
				<view class="tipsCard—avatar"></view>
				<view class="tipsCard-tips">您好🙋！我是人工智能助手 北斗参谋，我能回答您所有问题，快来和我提问吧！</view>
				<view class="tipsCard-title">
					<view class="left">
						试一试以下列子
					</view>
					<view class="right">
						<uni-icons custom-prefix="iconfont" type="icon-qiehuan" size="20"></uni-icons>
						<view class="text">
							换一换
						</view>
					</view>
				</view>
				<view class="example_content">
					<view class="example_item">
						我是一名学生，要演讲的主题是我...
					</view>
					<view class="example_item">
						模拟公务员发布一则通知，通知内容...
					</view>
					<view class="example_item">
						香蕉为什么叫香蕉 ？
					</view>
					<view class="example_item">
						国内比较著名的chatgtp有哪些 ？
					</view>
				</view>
			</view>
		</view>
		<view class="chat_input">
			<textarea class="textarea" v-model="recordInput" :maxlength="-1" :auto-height="true" auto-focus
				:show-confirm-bar="false" :cursor-spacing="10" :fixed="true" :adjust-position="false"
				@focus="focusTextarea" placeholder="有什么想法💡呢！" @blur="blurTextarea" />
			<uni-icons custom-prefix="iconfont" type="icon-fasong" size="30"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordInput: ''
			}
		},
		methods: {
			focusTextarea() {

			},
			blurTextarea() {

			}
		}
	}
</script>

<style>
	.chat_navBar {
		background-color: #F6F7F9 !important;
	}

	.uni-navbar__content,
	.uni-navbar__header {
		background-color: #F6F7F9 !important;
	}

	.title {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 17px;
		font-weight: 500;
		color: #333333;
	}

	.qingchu {
		cursor: pointer;
		opacity: 0.3;
	}

	.icon-qiehuan {
		cursor: pointer;
		vertical-align: middle;
		margin-right: 4px;
	}
	
	.icon-fasong {
		cursor: pointer;
	}

	.chat_content {
		height: 100vh;
		overflow: auto;
		background: #F6F7F9;

	}

	.tipsCard {
		width: 88.4%;
		padding: 16px;
		margin: 18px auto;
		height: 406px;
		background: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(196, 3, 17, 0.08);
		border-radius: 16px;
	}

	.tipsCard—avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		margin-bottom: 16px;
		background: #C40311;
	}

	.tipsCard-tips {
		font-size: 16px;
		font-weight: 300;
		color: #333333;
		line-height: 26px;
		margin-bottom: 43px;
	}

	.tipsCard-title {
		margin-bottom: 16px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.left {
		font-size: 16px;
		font-weight: 400;
		color: #333333;
		line-height: 26px;
		color: #333333;
	}

	.right {
		font-size: 16px;
		font-weight: 400;
		color: #333333;
		line-height: 26px;
		color: #333333;
		vertical-align: bottom;
	}

	.icon-refresh {
		vertical-align: bottom;
		margin-right: 3px;
	}

	.text {
		display: inline-block;
		opacity: 0.6;
		vertical-align: middle;
	}

	.example_content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	.example_item {
		width: 48.6%;
		height: 84px;
		background: rgba(196, 3, 17, 0.08);
		border-radius: 6px;
		margin-bottom: 16px;
		padding: 16px 16px;
		font-size: 16px;
		font-weight: 300;
		color: #333333;
		line-height: 30px;
		overflow: hidden;//溢出隐藏
		text-overflow: ellipsis;//省略号
		display: -webkit-box;//
		word-break: break-all;
		-webkit-box-orient: vertical;//设置弹性盒子的子元素的排列方式
		-webkit-line-clamp: 2;//设置显示文本的行数
	}

	.chat_input {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 13px 16px;
		/* height: 64px; */
		background: #F0F1F7;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-easyinput {
		width: 89%;
	}

	.textarea {
		width: 86%;
		padding: 10px 8px;
		min-height: 23px;
		max-height: 200px;
		overflow-y: auto;
		border-radius: 10px;
		background-color: #FFFFFF;
	}

	.uni-textarea-placeholder {
		line-height: 23px;
	}
</style>