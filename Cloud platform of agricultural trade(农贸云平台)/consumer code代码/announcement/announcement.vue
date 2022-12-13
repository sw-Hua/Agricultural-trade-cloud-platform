<template>
	<view class="main">
		<view v-show="!isShowSpec">
			<nav-bar :pageName="'通知公告'" :showAdd="true" :showSearch="true" @add="add" @search="search"></nav-bar>
			<view class="common__top">
				<view class="common__top--main">
					<view class="common__search">
						<view class="common__search--left">

							<uni-icons type="search" color="#2E2E2E"></uni-icons>
						</view>
						<input type="text" placeholder="可按标题、时间搜索" confirm-type="search" @confirm="search" />
					</view>
					<view class="common__top--add">跳转</view>
				</view>

			</view>

			<view class="common">

				<view class="common__list" @click="goSpec(item.title)" v-for="item in announcementList">
					<view class="common__list--box">
						<view class="box-left">
							<image src="../../../static/image/homeother.png" mode=""></image>
						</view>
						<view class="box-right">
							<text class="title">规章制度：{{item.title}}</text>
							<text class="txt">创建时间：{{item.addtime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 品种添加 -->
		<view class="" v-show="isShowSpec" >
			<view class="common__box common__chakan" 
			v-for="item in announcementList"
			v-show="currentSelect===item.title">
				<view class="common__box--title"><text>通知公告</text></view>
				<view class="common__field">
					<text class="common__field--left">公告标题</text>
					<view class="common__field--right">
						<text>{{item.title}}</text>
					</view>
				</view>

				<view class="common__field">
					<text class="common__field--left">公告描述</text>
					<view class="common__field--right">
						<text v-html="item.content"></text>
						<view></view>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">公告附件</text>
					<view class="common__field--right">
						<view>{{item.imageList}}</view>
					</view>
				</view>
			</view>

			<view class="common__btn" @click="backTraceIndex()"><text class="common__twobtn--yes">返回</text></view>
		</view>
		<!-- 品种添加 -->
	</view>
</template>

<script>
	import navBar from '@/components/components/navBar.vue';
	import {
		announcementList
	} from '@/api/cusMarketInfo.js';

	export default {
		components: {
			navBar
		},
		data() {
			return {
				isShowSpec: false,
				announcementList: [],
				currentSelect: ""
			};
		},
		methods: {
			pullDown() {},
			pullUp() {},
			add() {
				console.log('ss');
			},
			search(e) {
				console.log(e);
			},
			pushSwitch(item) {
				console.log(item)
				this.currentType = item;
			},
			goSpec(currentSelect) {
				this.currentSelect = currentSelect
				this.isShowSpec = !this.isShowSpec;
			},
			backTraceIndex() {
				this.isShowSpec = !this.isShowSpec;
			},
			getAnnouncementList(page, limit, search) {
				announcementList(page, limit, search).then(res => {
					this.announcementList = res.data;
				})
			}
		},
		onLoad() {
			this.getAnnouncementList(1, 10, "")
		}
	};
</script>

<style lang="scss">
	.navBar {}
</style>
