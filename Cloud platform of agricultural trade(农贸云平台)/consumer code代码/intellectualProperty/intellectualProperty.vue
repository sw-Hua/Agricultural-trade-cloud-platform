<template>
	<view class="main">
		<nav-bar :pageName="'知识产权'"></nav-bar>
		<view class="common__top">
			<view class="common__top--main">
				<view class="common__search">
					<view class="common__search--left">
						<uni-icons type="search" color="#2E2E2E"></uni-icons>
					</view>
					<input type="text" placeholder="可按商户名搜索" confirm-type="search" @confirm="search" />
				</view>
				<view class="common__top--add" @click="doAdd">添加</view>
			</view>
			<view class="common__top--main" style="margin-top: 30rpx;">
				<view class="common__top--time">
					<picker mode="date" :value="query.dueDateBegin" @change="bindDateChange($event, 'from')">
						<view>{{ query.dueDateBegin }}</view>
					</picker>
				</view>
				<text class="common__top--txt">至</text>
				<view class="common__top--time">
					<picker mode="date" :value="query.dueDateEnd" @change="bindDateChange($event, 'to')">
						<view>{{ query.dueDateEnd }}</view>
					</picker>
				</view>
				<view class="common__top--add" @click="search1">搜索</view>
			</view>
			<view class="common__top--total">
				<view class="total-list">
					<view class="totalList-top">
						<image src="../../../static/image/iconOther/icon1.png" mode=""></image>
						<text>专利</text>
					</view>
					<view class="totalList-bottom">
						<text>{{countData.patent}}</text>
					</view>
				</view>
				<view class="total-list">
					<view class="totalList-top">
						<image src="../../../static/image/iconOther/icon2.png" mode=""></image>
						<text>商标</text>
					</view>
					<view class="totalList-bottom">
						<text>{{countData.trademark}}</text>
					</view>
				</view>
				<view class="total-list">
					<view class="totalList-top">
						<image src="../../../static/image/iconOther/icon3.png" mode=""></image>
						<text>版权</text>
					</view>
					<view class="totalList-bottom">
						<text>{{countData.copyright}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="common">
			<view class="common__switch">
				<view class="common__switch--type" v-for="(item, index) in typeList" :key="index" :class="{ active: currentType.id === item.id }"
				 @click="pushSwitch(item)">
					<text>{{ item.name }}</text>
				</view>
			</view>
			<view class="common__list havetable">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view class="common__list--box" v-for="(item, index) in list" :key="item.id" @click.native="pushToTd(item.id)">
						<view class="box-left">
							<image src="../../../static/image/homeother.png" mode=""></image>
						</view>
						<view class="box-right">
							<text class="title">类型：{{item.typeName}}</text>
							<text class="txt">商户：{{item.operatorName}}</text>
							<text class="txt">专利名称：{{item.intellectualPropertyTitle}}</text>
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
		iPList,
		iPQueryCount
	} from '../../../api/intellectualProperty.js';
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
				list: [],
				query: {
					limit: 10,
					page: 1,
					search: "",
					intellectualPropertyType: 1,
					dueDateBegin: common.getDate(0, -7),
					dueDateEnd: common.getDate(0)
				},
				countData: {
					patent: 0,
					trademark: 0,
					copyright: 0
				},
				currentType: {
					id: 1,
					name: '专利'
				},
				typeList: [{
						id: 1,
						name: '专利'
					},
					{
						id: 2,
						name: '商标'
					},
					{
						id: 3,
						name: '版权'
					}
				],
			};
		},
		methods: {
			bindDateChange(e, type) {
				if (type == 'from') {
					this.query.dueDateBegin = e.detail.value;
				} else if (type == 'to') {
					this.query.dueDateEnd = e.detail.value;
				}
			},
			pushSwitch(item) {
				this.currentType = item;
				this.query.page = 1;
				this.list = [];
				switch (item.id) {
					case 1:
						this.query.intellectualPropertyType = 1;
						this.getList()
						break;
					case 2:
						this.query.intellectualPropertyType = 2;
						this.getList()
						break;
					case 3:
						this.query.intellectualPropertyType = 3;
						this.getList()
						break;
					default:
						break;
				}
			},
			pushToTd(item) {
				uni.navigateTo({
					url: 'intellectualPropertyEdit?id=' + item
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
				iPQueryCount(null).then(res => {
					if (res.code == '0') {
						if (res.data[0].totalCount) {
							this.countData = res.data[0];
						}
					}
				});
			},
			getList() {
				iPList(this.query).then(res => {
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
					url: 'intellectualPropertyEdit'
				});
			},
			upCallback() {
				this.getList();
			},
			downCallback() {
				this.query.page = 1;
				this.list = [];
				this.mescroll.resetUpScroll();
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
		}
	};
</script>

<style lang="scss">
	@import '@/static/style/food.scss';
</style>
