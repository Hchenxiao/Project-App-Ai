<template>
	<view class="showInput">
		<input type="text" :value="value" v-if="isEdit" @input="setValue($event)" @blur="isEdit = false"
			@focus="isEdit = true">
		<span class="showText" @click="showInput" v-else>{{value}}</span>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
			}
		},
		data() {
			return {
				// 是否编辑
				isEdit: false,
			}
		},
		computed: {
			inputValue: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit("change", val);
				}
			}
		},
		methods: {
			setValue(val) {
				this.$emit("input", val.detail.value || '');
			},
			// 打开编辑
			showInput() {
				this.isEdit = true;
			}
		}
	}
</script>

<style>
	.showInput {
		height: 32px;
		display: inline-block;
		margin: 0 10px 0 6px;
	}
    ::v-deep uni-input {
		height: 100%;
		padding: 2px 0;
	}
	::v-deep .uni-input-input {
		/* margin: 2px 4px 0 4px; */
		text-align: center;
		width: 96% !important;
		border-radius: 6px !important;
		border: 1px solid #0235FA !important;
	}

	.showText {
		padding: 3px 8px;
		margin: 0 6px;
		background: rgba(2, 53, 250, 0.08);
		border-radius: 6px;
	}
</style>