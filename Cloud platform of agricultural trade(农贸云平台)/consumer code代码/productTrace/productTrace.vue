<template>
	<view class="main">
		<nav-bar :pageName="'质量检测'"></nav-bar>
		<view class="common__top">
			<view class="common__top--main">
				<view class="common__search">
					<view class="common__search--left">
						<uni-icons type="search" color="#2E2E2E"></uni-icons>
					</view>
					<input type="text" placeholder="可按品种搜索" confirm-type="search" @confirm="search" />
				</view>
				<view class="common__top--add" @click="doAdd">添加</view>
			</view>
			<view class="common__top--main" style="margin-top: 30rpx;">
				<view class="common__top--time">
					<picker mode="date" :value="query.gainBeginDate" @change="bindDateChange($event, 'from')">
						<view>{{ query.gainBeginDate }}</view>
					</picker>
				</view>
				<text class="common__top--txt">至</text>
				<view class="common__top--time">
					<picker mode="date" :value="query.gainEndDate" @change="bindDateChange($event, 'to')">
						<view>{{ query.gainEndDate }}</view>
					</picker>
				</view>
				<view class="common__top--add" @click="search1">搜索</view>
			</view>
			<view class="common__top--total">
				<view class="total-list">
					<view class="totalList-top">
						<image src="../../../static/image/iconOther/icon1.png" mode=""></image>
						<text>报告总数</text>
					</view>
					<view class="totalList-bottom">
						<text>{{productTraceList.length}}</text>
					</view>
				</view>
				<view class="total-list">
					<!-- 我了解到2020年? -->
					<view class="totalList-top">
						<image src="../../../static/image/iconOther/icon2.png" mode=""></image>
						<text>合格</text>
					</view>
					<view class="totalList-bottom">
						<text>{{qualifiedNum}}</text>
					</view>
				</view>
				<view class="total-list">
					<view class="totalList-top">
						<image src="../../../static/image/iconOther/icon3.png" mode=""></image>
						<text>不合格</text>
					</view>
					<view class="totalList-bottom">
						<text>{{unqualifiedNum}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="common">
			<view class="common__list havetable">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view class="common__list--box" v-for="(item, index) in productTraceList" :key="item.id">
						<view class="box-left">
							<image src="../../../static/image/homeother.png" mode=""></image>
						</view>
						<view class="box-right">
							<text class="title">检测结果：{{item.qualified}}</text>
							<text class="txt">商品：{{item.goodsName}}</text>
							<text class="txt">检测项目：{{item.checkType}}</text>
							<text class="txt">检测时间：{{item.time}}</text>
						</view>
					</view>
				</mescroll-body>
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
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import common from '../../../static/js/common.js';
	import {
		goodsInList,
		goodsInQueryAmount
	} from '../../../api/spGoodsIn.js';
	import {
		productTraceList
	} from '../../../api/cusMarketInfo.js';
	export default {
		mixins: [MescrollMixin],
		components: {
			navBar,
			tTable,
			tTh,
			tTr,
			tTd,
		},
		data() {
			return {
				unqualifiedNum:0,
				qualifiedNum:0,
				productTraceList: [],
				list: [],
				query: {
					limit: 10,
					page: 1,
					search: "",
					gainBeginDate: common.getDate(0, -7),
					gainEndDate: common.getDate(0)
				},
				countData: {
					totalCount: 0,
					amount: 0,
					inAmount: 0
				}
			};
		},
		methods: {
			bindDateChange(e, type) {
				if (type == 'from') {
					this.query.gainBeginDate = e.detail.value;
				} else if (type == 'to') {
					this.query.gainEndDate = e.detail.value;
				}
			},
			pushToTd(item) {
				console.log(item)
				uni.navigateTo({
					url: 'goodsTraceEdit?id=' + item
				});
			},
			search(e) {
				this.query.search = e.detail.value;
				this.query.page = 1;
				this.list = [];
				this.getList();
			},
			search1() {
				this.query.page = 1;
				this.list = [];
				this.getList();
			},
			getCount() {
				goodsInQueryAmount(null).then(res => {
					if (res.code == '0') {
						if (res.data[0].totalCount) {
							this.countData = res.data[0];
						}
					}
				});
			},
			getList() {
				goodsInList(this.query).then(res => {
					if (res.code == '0') {
						let curPageData = res.data;
						let curPageLen = res.data.length;
						let totalSize = res.count;
						let totalPage = Math.ceil(totalSize / this.query.limit);
						this.list = this.list.concat(curPageData);
						this.mescroll.endByPage(curPageLen, totalPage);
						this.query.page++;
					}
				});
			},
			doAdd() {
				uni.navigateTo({
					url: 'productTraceEdit'
				});
			},
			upCallback() {
				this.getList();
			},
			downCallback() {
				this.query.page = 1;
				this.list = [];
				this.mescroll.resetUpScroll();
			},
			getProductTraceList(page, limit, search) {
				productTraceList(page, limit, search).then(res => {
					this.productTraceList = res.data;
				})
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			this.$resetToken().then(() => {
				this.getCount();
				this.getList();
			}).catch(() => {
				uni.navigateTo({
					url: '../../../pages/login/login'
				});
			})
		},
		created() {
			this.getProductTraceList(1, 10, "");
		},
		mounted(){
			console.log("productTraceList.length "+this.productTraceList.length)
			for (var i = 0; i < this.productTraceList.length; i++) {
				if(this.productTraceList[i].qualified==="不合格"){
					this.unqualifiedNum+=1;
				}else{
					this.qualifiedNum+=1;
				}
			}
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';
</style>
