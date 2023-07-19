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
			<view class="chatRecordList" v-else>
				<view class="chatRecordList_item" v-for="(item,index) in chatRecordList" :key="index">
					<view class="user" v-if="item.role == 'user'">
						<view class="user-avatar">
							<uni-icons class="icons" custom-prefix="iconfont" type="icon-yonghu" style="color: #ffffff"
								size="20"></uni-icons>
						</view>
						<view class="user-content">{{item.content}}</view>
					</view>
					<view class="chatAi" v-else>
						<view class="chatAi-avatar"></view>
						<view class="chatAi-content" v-if="item.content"></view>
						<view class="chatAi-print" id="print" v-else></view>
						<view class="chatAi-operate" v-if="item.content && item.content.length">
							<view class="operate-left">共生成 {{computedWord(item.content)}}字 <uni-icons
									custom-prefix="iconfont" type="icon-zhongshi" size="14"></uni-icons> 重新生成</view>
							<view class="operate-right">
								<uni-icons custom-prefix="iconfont" type="icon-fuzhi" size="14"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="chat_input">
			<textarea class="textarea" v-model="recordInput" :maxlength="-1" :auto-height="true"
				:show-confirm-bar="false" :cursor-spacing="10" :fixed="true" :adjust-position="true"
				placeholder="有什么想法💡呢！" :disabled="loading" />
			<uni-icons custom-prefix="iconfont" type="icon-fasong" size="30" v-if="!loading"
				@click="sendMessage"></uni-icons>
			<view class="loadingIcon" v-else></view>
		</view>
		<view class="chatLoading" v-if="loading">
			<view class="loadingIcon"></view>
			生成中...
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
				chatRecordList: [],
			}
		},
		created() {
			this.token = this.generateJsonwebToken(
				"da5fddb1da10215d1ea05ad39daad05f.uVfpOBxqq2iCqqcQ",
				3600
			);
		},
		computed: {
			computedWord() {
				return (val) => {
					return val.length
				}
			}
		},
		methods: {
			// 用户发送信息
			sendMessage() {
				if (!this.recordInput) return
				this.chatRecordList.push({
					role: 'user',
					content: this.recordInput,
				});
				this.createSSE(this.token, {
					prompt: this.chatRecordList,
				});
				this.chatRecordList.push({
					role: 'assistant',
					content: '',
				})
				// 清空输入框
				this.recordInput = '';
				this.loading = true;
				this.handleScrollBottom();
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
					"https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_pro_test/sse-invoke", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: token,
						},
						body: JSON.stringify(data),
						onmessage: (ev) => {
							// content.value+=ev.data
							this.handleScrollBottom();
							const response_row = document.getElementById('print');
							if (ev.event === "finish") {
								this.loading = false;
								const obj = {
									role: 'assistant',
									content: response_row.innerText,
								}
								this.$set(this.chatRecordList, this.chatRecordList.length - 1, obj)
								this.$forceUpdate();
							} else if (ev.event === "add") {
								var content = ev.data;
								response_row.innerText += content;
								if (response_row.innerText.includes('ChatGLM')) {
									response_row.innerText = response_row.innerText.replaceAll('ChatGLM', '北斗参谋')
								}
								console.log('add', response_row.innerText)
							}
						},
						onerror(ev) {
							console.log(ev, "连接失败，请重试！");
						},
					}
				);
			},
			handleScrollBottom() {
				this.$nextTick(() => {
					const scrollDom = document.getElementsByClassName('chat_content')[0];
					this.animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
				});
			},
			//下拉动画
			animation(obj, target, fn1) {
				// fn是一个回调函数，在定时器结束的时候添加
				// 每次开定时器之前先清除掉定时器
				clearInterval(obj.timer);
				obj.timer = setInterval(function() {
					// 步长计算公式  越来越小
					// 步长取整
					var step = (target - obj.scrollTop) / 10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					if (obj.scrollTop >= target) {
						clearInterval(obj.timer);
						// 如果fn1存在，调用fn
						if (fn1) {
							fn1();
						}
					} else {
						// 每30毫秒就将新的值给obj.left
						obj.scrollTop = obj.scrollTop + step;
					}
				}, 10);
			},
		}
	}
</script>

<style>
	.chatWrapper {
		position: relative;
	}

	.chat_navBar {
		background-color: #F6F7F9 !important;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		width: 100%;
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
		padding-bottom: 85px;
		overflow: auto;
		background: #F6F7F9;
		margin-top: 44px;
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
		overflow: hidden; //溢出隐藏
		text-overflow: ellipsis; //省略号
		display: -webkit-box; //
		word-break: break-all;
		-webkit-box-orient: vertical; //设置弹性盒子的子元素的排列方式
		-webkit-line-clamp: 2; //设置显示文本的行数
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
		margin-top: 24px;
	}

	.user {
		width: 100%;
		min-height: 58px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 10px 0px rgba(196, 3, 17, 0.08);
		border-radius: 8px;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin-bottom: 24px;
	}

	.user-avatar {
		width: 32px;
		line-height: 32px;
		min-width: 32px;
		height: 32px;
		text-align: center;
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

	.chatAi {
		width: 100%;
		padding: 16px;
		min-height: 58px;
		background: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(196, 3, 17, 0.08);
		border-radius: 16px;
		margin-bottom: 24px;
	}

	.chatAi-avatar {
		width: 32px;
		line-height: 32px;
		min-width: 32px;
		height: 32px;
		text-align: center;
		background: #C40311;
		border-radius: 50%;
	}

	.chatAi-content,
	.chatAi-print {
		padding: 16px 0;
		font-size: 16px;
		font-weight: 300;
		color: #333333;
		line-height: 26px;
		border-bottom: 1px solid rgba(51, 51, 51, 0.1);
	}

	.chatAi-operate {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 16px;
	}

	.operate-left {
		opacity: 0.3;
		font-size: 12px;
		font-weight: 400;
		color: #333333;
		line-height: 17px;
	}

	.icon-zhongshi {
		margin-left: 30px;
		margin-right: 4px;
	}

	.chatAi-print:after {
		-webkit-animation: blink 1s steps(5, start) infinite;
		animation: blink 1s steps(5, start) infinite;
		content: "▋";
		margin-left: 0.25rem;
		vertical-align: baseline;
	}
</style>