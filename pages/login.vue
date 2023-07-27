<template>
	<view class="normal-login-container">
		<view class="bg" @click="toIndex"></view>
		<view class="logo" @click="toIndex"></view>
		<view class="logoText" @click="toIndex"></view>
	</view>
</template>

<script>
	import {
		getCodeImg
	} from '@/api/login'

	export default {
		data() {
			return {
				timer: null
			}
		},
		// onLoad() {
		// 	this.timer = setTimeout(() => {
		// 		this.$router.push("/pages/index")
		// 	}, 3000)
		// },
		onShow() {
			this.timer = setTimeout(() => {
				this.$router.push("/pages/index")
			}, 3000)
		},
		onHide() {
			window.clearTimeout(this.timer)
			this.timer = null
		},
		created() {

		},
		methods: {
			toIndex() {
				window.clearTimeout(this.timer)
				this.timer = null
				this.$router.push("/pages/index")

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.normal-login-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-self: center;
		align-items: center;

		// background: url('../static/images/index.png') no-repeat center;
		// background-size: 100% 100%;
		.bg {
			height: 77%;
			width: 100%;
			background: url('../static/bdqx.png') no-repeat center;
			background-size: 100% 100%;
		}

		.logo {
			width: 74px;
			height: 74px;
			margin-bottom: 16px;
			background: url('../static/logo.png') no-repeat center;
			background-size: 100% 100%;
		}

		.logoText {
			width: 200px;
			height: 40px;
			background: url('../static/bdtext.png') no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>