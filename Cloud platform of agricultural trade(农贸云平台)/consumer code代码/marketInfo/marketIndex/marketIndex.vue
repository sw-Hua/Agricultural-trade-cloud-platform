<template>
	<view class="main">
		<nav-bar :pageName="'商铺详情'"></nav-bar>
		<view class="common__top">
			<view class="common__top--main">
				<view class="common__search">
					<view class="common__search--left">
						<uni-icons type="search" color="#2E2E2E"></uni-icons>
					</view>
					<jPicker sureColor="#3E7CEF" class="cont" @sure="pickerMarketId" :options="marketId" showKey="name" valKey="code"
					 type="请选择市场" />
				</view>
			</view>
		</view>
		<view class="common">
			<view class="common__list">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view class="common__list--box" v-for="(item, index) in tableList" :key="index" @click="pushToTd(item.name)">
						<view class="box-right">
							<text class="title">市场名称：{{ item.name }}</text>
							<text class="txt">联系人：{{ item.contacts }}</text>
							<text class="txt">联系电话：{{ item.contactsTel }}</text>
						</view>
						<view class="box-left" v-show="item.jyUploadFile != null && item.jyUploadFile != ''">
							<image :src="item.jyUploadFile" mode=""></image>
						</view>
					</view>
				</mescroll-body>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/components/navBar.vue';
	import jPicker from '@/components/J-Picker/jPicker.vue';
	import common from '@/static/js/common.js';
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import {
		baseURL
	} from '@/config';
	import {
		list,
		marketList
	} from '@/api/cusMarketInfo.js';
	export default {
		mixins: [MescrollMixin],
		components: {
			navBar,
			jPicker
		},
		data() {
			return {
				marketId: [],
				tableList: [],
				queryForm: {
					page: 1,
					limit: 10,
					id: ''
				},
				mescroll: null
			};
		},
		methods: {
			pickerMarketId(e) {
				this.queryForm.id = e.code;
				this.queryForm.page = 1;
				this.tableList = [];
				this.getList();
			},
			getMarketList() {
				let _this = this;
				return new Promise((resolve, reject) => {
					marketList().then(res => {
						if (res.code === 0) {
							let data = res.data;
							let array = [{
								code: '',
								name: '全部'
							}];
							for (let i = 0; i < data.length; i++) {
								array.push({
									code: data[i].id,
									name: data[i].name
								});
							}
							_this.marketId = array;
							resolve();
						}
					});
				});
			},
			pushToTd(name) {
				uni.navigateTo({
					url: '../marketSpec/marketSpec?currentName=' + name
				});
			},
			getList() {
				list(this.queryForm).then(res => {
					let data = res.data;
					for (let item of data) {
						if (item.jyUploadFile != null && item.jyUploadFile != '') {
							let list = common.removeTrim(item.jyUploadFile.split(","));
							item.jyUploadFile = baseURL + list[0];
						}
					}
					let curPageData = [];
					let curPageLen = res.data.length;
					let totalSize = res.count;
					let totalPage = Math.ceil(totalSize / this.queryForm.limit);
					this.tableList = this.tableList.concat(res.data);
					this.mescroll.endByPage(curPageLen, totalPage);
					this.queryForm.page++;
				})
			},
			/*上拉加载的回调*/
			upCallback(page) {
				this.getMarketList();
				this.getList();
			},
			downCallback() {
				this.mescroll.resetUpScroll();
			},
		},
		onLoad() {
			this.getMarketList();
			this.getList();
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';

	.picker {
		border-top: #F2F2F2 1rpx solid;
		border-bottom: #F2F2F2 1rpx solid;
		padding: 10rpx;
	}

	page {
		background-color: #FFFFFF;
	}
</style>
