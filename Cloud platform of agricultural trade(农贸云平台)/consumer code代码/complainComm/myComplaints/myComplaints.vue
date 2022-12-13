<template>
	<view class="main">
		<nav-bar :pageName="'我的投诉'"></nav-bar>
		<view class="food common">
			
			<view class="common__list">
				<view class="common__list--box">
					<view class="box-left"><image src="../../../../static/image/homeother.png"></image></view>
					<view class="box-right">
						<text>投诉标题</text>
						<text>投诉详情: </text>
						<text>内容1xxxxxxxxxxxxxxx</text>
						<text>店家回复: </text>
						<text>回复1xxxxxxxxxxxxxxx</text>
						</view>
					</view>
				</view>
			</view>
			<view @click="backMenu">
				<button type="default" class="backButton">返回</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/components/navBar.vue';
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup-dialog/uni-popup-dialog.vue';
	export default {
		components: {
			navBar,
			tTable,
			tTh,
			tTr,
			tTd,
			uniPagination,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				type: 1,
				tableList: [{
					name: 'John Brown',
					age: 18,
					hobby: 'xxx',
					hobby1: 'xxx1'
				}],
				columns: [{
						title: '姓名',
						key: 'name'
					},
					{
						title: '年龄',
						key: 'age'
					},
					{
						title: '爱好',
						key: 'hobby'
					},
					{
						title: '爱好1',
						key: 'hobby1'
					}
				]
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			pushSwitch(type) {
				this.type = type;
			},
			open() {
				this.$refs.popup.open();
			},
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done();
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				// 输入框的值
				console.log(value);
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				// ...
				done();
			},
			backMenu: function() {
				uni.navigateTo({
					url: '../complainCommIndex/complainCommIndex',
				});
			}
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';
</style>
