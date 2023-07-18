<template>
	<view class="content">
		<uni-row :gutter="0" :span="24">
			<uni-col :span="12" v-for="(item, index) in dataList" :index="index" :key="index">
				<view class="card" :style="`background:${item.bgColor};`" @click="goSearch(item)">
					<image :src="item.bgImg" class="bgImage"></image>
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.desc}}</view>
					<!-- tips -->
					<view class="tips" v-show="!item.isOpen" :style="`background:${item.tipsColor}`">敬请期待..</view>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
						title: '智能问答',
						desc: '满足您的每个好奇',
						pages: '/pages/chatWithAi/smartAi',
						bgColor: 'linear-gradient(134deg, #F9636E 0%, #E42533 100%);',
						bgImg: require("@/static/images/bag/first.png"),
						isOpen: true,
					},
					{
						title: '智慧百科',
						desc: '解答您的每个疑惑点',
						pages: '/pages/chatWithAi/smartAi',
						bgColor: 'linear-gradient(134deg, #FFC44A 0%, #F0A200 100%);',
						bgImg: require("@/static/images/bag/second.png"),
						isOpen: true,
					},
					{
						title: '即兴发言',
						desc: '梳理您的每个灵感',
						pages: '/pages/chatWithAi/languageMode',
						bgColor: 'linear-gradient(135deg, #FF7FF2 0%, #FF48E1 100%);',
						bgImg: require("@/static/images/bag/third.png"),
						isOpen: true,
					},
					{
						title: '公文助手',
						desc: '成就您的每个官方创意点',
						pages: '/pages/chatWithAi/languageMode',
						bgColor: 'linear-gradient(135deg, #FF4235 0%, #FFA835 100%);',
						bgImg: require("@/static/images/bag/fourth.png"),
						isOpen: true,
					},
					{
						title: '实操指南',
						desc: '帮你处理实际操作问题',
						bgColor: 'linear-gradient(132deg, #B268F1 0%, #8B05FD 100%);',
						bgImg: require("@/static/images/bag/fifth.png"),
						isOpen: false,
						tipsColor: '#FE9866'
					},
					{
						title: '智能秘书',
						desc: '帮您处理每日琐事',
						bgColor: 'linear-gradient(134deg, #F4CC7B 0%, #FFAF0E 100%);',
						bgImg: require("@/static/images/bag/sixth.png"),
						isOpen: false,
						tipsColor: '#B166F1'
					},
				]
			}
		},
		onLoad: function() {},
		methods: {
			// 点击跳转查看
			goSearch(item) {
				if (item.isOpen) {
					this.$router.push(`${item.pages}`)
				}
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		padding: 20px 3% 0 3%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		background: #FAFAFF;
	}

	.uni-row {
		width: 100%;
	}

	.uni-col {
		height: 12.4vh;
		margin-bottom: 20px;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		/* 		width: 100%; */
		height: 100%;
		margin: 6px;
		padding: 0 0 0 10px;
		margin-bottom: 0;
		border-radius: 8px;
		background-color: antiquewhite;
	}

	.bgImage {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.tips {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0 8px;
		color: #ffffff;
		font-size: 12px;
		border-radius: 11px 8px 0px 11px;
		background-color: aquamarine;
	}

	.title {
		font-size: 16px;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 22px;
		margin-bottom: 12px;
		margin-top: 10px;
	}

	.desc {
		font-size: 12px;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 17px;
	}

	div {
		width: 48%;
		height: 16vh;
		margin-bottom: 20px;
		background-color: #F00;
	}

	.uni-grid {
		display: flex;
		justify-content: space-between !important;
	}

	.grid-wrapper {
		width: 100%;
		padding: 40px 5.8% 0 5.8%;
		background: #FAFAFF;
		justify-content: space-between;
	}

	.grid-item {
		width: 48% !important;
		background-color: aqua;
		margin-bottom: 20px;
	}

	ul {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}

	li {
		height: 12.31%;
		width: 42.5%;
		background-color: aquamarine;
	}
</style>