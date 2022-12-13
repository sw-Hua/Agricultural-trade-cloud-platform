<template>
	<view>
		<view>{{List}}</view>
	</view>
</template>

<script>
	import{
		list
	}from '@/api/test.js';
	export default {
		data() {
			return {
				List:[]
			}
		},
		methods: {
			getList(page, limit, search){
				list(page, limit, search).then(res =>{
					this.List = res.data;
				})
		},
		onLoad(){
			this.getList(1,10,"");
		}
	}
}
	
</script>

<style>

</style>