<template>
	<div class="speechTemplate">
		我是一名 <showInput v-model="speechInfo.identity"></showInput> ,要演讲的主题是<showInput v-model="speechInfo.title">
		</showInput> ，要求字数 <showInput v-model="speechInfo.words">
		</showInput>。<br />
		要求: <br/>
		<br />
		1. 简短的自我介绍，<showInput v-model="speechInfo.introduce"></showInput> <br />
		2. 内容要求：富含感情的表述，表达 <showInput v-model="speechInfo.content"></showInput>
	</div>
</template>

<script>
	import showInput from '@/components/showInput.vue'
	export default {
		components: {
			showInput
		},
		data() {
			return {
				speechInfo: {
					identity: '学生', // 身份
					title: '我的老师', // 主题
					words: '500字以上', // 字数
					introduce: '高二三班的刘洋', // 自我介绍
					content: '我与老师之间亲切的感情', // 内容
				}
			}
		},
		watch: {
			speechInfo: {
				handler(val) {
					this.$emit('change', `我是一名${this.speechInfo.identity}，要演讲的主题是${this.speechInfo.title},要求字数${this.speechInfo.words}.
				  要求：
				  1. 简短的自我介绍，${this.speechInfo.introduce}
				  2. 内容要求：富含感情的陈述，表达${this.speechInfo.content}`)
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style>
	.speechTemplate {
		font-size: 16px;
		font-weight: 400;
		color: #333333;
		line-height: 26px;
	}
</style>