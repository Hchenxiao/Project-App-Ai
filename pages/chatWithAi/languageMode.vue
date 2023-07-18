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
			<view class="tipsCard" v-if="!chatRecordList.length">
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
						<uni-icons class="icons" custom-prefix="iconfont" type="icon-yiwen" style="color: #C40311"
							size="25"></uni-icons>
						<view class="example_item_title">即兴发言：</view>
						<view class="example_item_content">我是一名学生，要演讲的主题是我的老师，要求字数500字以上，内…</view>
					</view>
					<view class="example_item">
						<uni-icons class="icons" custom-prefix="iconfont" type="icon-document" style="color: #C40311"
							size="25"></uni-icons>
						<view class="example_item_title">公文助手：</view>
						<view class="example_item_content">我是一名学生，要演讲的主题是我的老师，要求字数500字以上，内…</view>
					</view>
				</view>
			</view>
			<view class="chatRecordList" v-else>
				<view class="chatRecordList_item" v-for="(item,index) in chatRecordList" :key="index">
					<view class="user" v-if="item.role == 'user'">
						<view class="user-avatar"></view>
						<view class="user-content">{{item.content}}</view>
					</view>
					<view class="chatAi" v-else>
						<view class="chatAi-avatar"></view>
						<view class="chatAi-content">{{item.content}}</view>
					</view>

				</view>
				<!-- 实时显示内容 -->
				<view class="showCurrent"></view>
			</view>
			<view class="chatLoading" v-if="loading">
				<view class="loadingIcon"></view>
				生成中...
			</view>
		</view>
		<view class="chat_input">
			<textarea class="textarea" v-model="recordInput" :maxlength="-1" :auto-height="true" auto-focus
				:show-confirm-bar="false" :cursor-spacing="10" :fixed="true" :adjust-position="false"
				placeholder="有什么想法💡呢！" />
			<uni-icons custom-prefix="iconfont" type="icon-fasong" size="30" @click="sendMessage"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {
		fetchEventSource
	} from "@microsoft/fetch-event-source";
	export default {
		data() {
			return {
				// 生成 token
				jwtToken: '',
				// 用户输入查询信息
				recordInput: '',
				// loading加载中
				loading: false,
				// 聊天记录
				chatRecordList: [{
					role: 'user',
					content: '您好!'
				}, {
					role: 'assistant',
					content: '您好，我是 北斗参谋！您的智能助手！'
				}],
			}
		},
		created() {
			this.token = this.generateJsonwebToken(
				"da5fddb1da10215d1ea05ad39daad05f.uVfpOBxqq2iCqqcQ",
				3600
			);
			// this.createSSE(this.token, {
			// 	prompt: [{
			// 		role: "user",
			// 		content: "你好"
			// 	}],
			// });
		},
		methods: {
			// 用户发送信息
			sendMessage() {

			},
			// 生成Token
			generateJsonwebToken(apikey, expSeconds) {
				const [id, secret] = apikey.split(".");
				const exp = new Date().getTime() + expSeconds;

				const header = {
					alg: "HS256",
					sign_type: "SIGN"
				};
				const payload = {
					api_key: id,
					exp: exp,
					timestamp: new Date().getTime(),
				};
				const KJUR = require("jsrsasign");
				const jwt = KJUR.jws.JWS.sign(
					"HS256",
					JSON.stringify(header),
					JSON.stringify(payload),
					secret
				);
				return jwt;
			},
			// 创建SSE
			createSSE(token, data) {
				fetchEventSource(
					"https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_std/sse-invoke", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: token,
						},
						body: JSON.stringify(data),
						onmessage: (ev) => {
							// content.value+=ev.data
							const response_row = document.getElementById("response_row");
							if (ev.event === "finish") {
								this.dataList.push({
									role: "assistant",
									content: response_row.innerText,
								});
							} else {
								var content = ev.data;
								response_row.innerText += content;
							}
						},
						onerror(ev) {
							console.log(ev, "连接失败，请重试！");
						},
					}
				);
			},
		}
	}
</script>

<style>
	.chat_navBar {
		background-color: #F6F7F9 !important;
	}

	.showCurrent:after {
		-webkit-animation: blink 1s steps(5, start) infinite;
		animation: blink 1s steps(5, start) infinite;
		content: "▋";
		margin-left: 0.25rem;
		vertical-align: baseline;
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
		position: relative;
		height: 100vh;
		overflow: auto;
		background: #F6F7F9;
	}

	.chatLoading {
		width: 119px;
		height: 38px;
		background: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(196, 3, 17, 0.08);
		border-radius: 10px;
		position: absolute;
		top: 0;
		right: 50%;
		transform: translateX(50%);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.loadingIcon {
		height: 20px;
		width: 25px;
		margin-right: 10px;
		background: url('@/static/images/icons/loading.png') no-repeat;
		background-size: 100%;
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
		width: 100%;
		height: 84px;
		background: rgba(196, 3, 17, 0.08);
		border-radius: 6px;
		margin-bottom: 16px;
		padding: 16px;
		font-size: 16px;
		font-weight: 300;
		color: #333333;
		line-height: 30px;
		vertical-align: bottom;
		overflow: hidden; //溢出隐藏
		text-overflow: ellipsis; //省略号
		display: -webkit-box; //
		word-break: break-all;
		-webkit-box-orient: vertical; //设置弹性盒子的子元素的排列方式
		-webkit-line-clamp: 2; //设置显示文本的行数

	}

	.icons {
		vertical-align: bottom;
	}

	.example_item_title {
		display: inline;
		color: #333333;
		margin: 0 0 0 6px;
		vertical-align: bottom;
	}

	.example_item_content {
		display: inline;
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

	.chatRecordList {
		width: 88.4%;
		margin: 0 auto;
	}

	.user {
		width: 100%;
		min-height: 58px;
		padding: 16px;
		background: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(196, 3, 17, 0.08);
		border-radius: 8px;
		opacity: 0.3;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.user-avatar {
		width: 32px;
		min-width: 32px;
		height: 32px;
		background: #C40311;
		border-radius: 50%;
		margin-left: 10px;
	}

	.user-content {
		font-size: 16px;
		font-family: PingFang-SC-Light, PingFang-SC;
		font-weight: 300;
		color: #333333;
		line-height: 26px;
	}
</style>