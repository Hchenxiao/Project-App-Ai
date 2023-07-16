<template>
	<view class="content">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</view>
</template>

<script>
	export default {
		onLoad: function() {}
	}
</script>

<style>
	.content {
		height: 100%;
		width: 100%;
		padding: 40px 5.8% 0 5.8%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background: #FAFAFF;
	}

	div {
		width: 48%;
		height: 20%;
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