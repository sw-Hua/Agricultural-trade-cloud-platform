<template>
	<view class="main">
		<nav-bar :pageName="'证照信息'"></nav-bar>
		<view class="food common">
		<view class="food__luru" v-show="!isSpec">
			<view class="common__box common__chakan">
				<view class="common__box--title"><text>商户信息</text></view>
				<view class="common__field">
					<text class="common__field--left">商铺区域</text>
					<view class="common__field--right">
						<text>{{ form.stallTypeName }}</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">姓名</text>
					<view class="common__field--right">
						<text>{{ form.stallName }}</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">身份证号码</text>
					<view class="common__field--right">
						<text>{{ form.stallName }}</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">籍贯</text>
					<view class="common__field--right">
						<text>{{ form.stallName }}</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">手机号码</text>
					<view class="common__field--right">
						<text>{{ form.stallName }}</text>
					</view>
				</view>
				<view class="common__field">
					<text class="common__field--left">营业执照号</text>
					<view class="common__field--right">
						<text>{{ form.stallName }}</text>
					</view>
				</view>
			</view>
			
			
			
				<view class="common__upload">
					<text class="common__upload--txt">证照附件</text>
					<view>
						<easy-upload :dataList="imageList" :uploadUrl="uploadUrl" :types="'image'" :uploadCount="6" @changeUrl="changeUrl"></easy-upload>
					</view>
				</view>
				<view style="display: flex;">
					<view class="common__btn" @click="changeSpec()" style="width: 200rpx;"><text class="common__twobtn--yes">修改</text></view>
					<view class="common__btn" @click="doSave" style="width: 200rpx;"><text class="common__twobtn--yes">保存</text></view>
				</view>
			</view>
		</view>
			
			
			
			
			<!-- 页面信息修改 -->
			<view class="food__luru" v-show="isSpec">
				<view class="common__box common__chakan">
					<view class="common__box--title"><text>商户信息</text></view>
					<view class="common__field">
						<text class="common__field--left">商铺区域</text>
						<view class="common__field--right">
							<text>{{ form.stallTypeName }}</text>
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">商铺名称</text>
						<view class="common__field--right">
							<text>{{ form.stallName }}</text>
						</view>
					</view>
				</view>
				<view class="common__box">
					<view class="common__field">
						<text class="common__field--left">姓名</text>
						<view class="common__field--right"><input placeholder="请输入姓名" v-model="form.name" /></view>
					</view>
					<view class="common__field">
						<text class="common__field--left">身份证</text>
						<view class="common__field--right"><input placeholder="请输入身份证" type="number" v-model="form.cardNo" /></view>
					</view>
					<view class="common__field">
						<text class="common__field--left">籍贯</text>
						<view class="common__field--right">
							<region-picker mode="multiSelector" :value="form.divisionCode" :range="divisionList" @change="bindPickerChange">
								<view class="picker">
									<text class="placeholder" v-if="!form.divisionName">请选择籍贯</text>
									<text v-else>{{ form.divisionName }}</text>
								</view>
							</region-picker>
						</view>
					</view>
					<view class="common__field">
						<text class="common__field--left">手机号码</text>
						<view class="common__field--right"><input placeholder="请输入手机号码" v-model="form.tel" type="number" /></view>
					</view>
					<view class="common__field">
						<text class="common__field--left">营业执照号</text>
						<view class="common__field--right"><input v-model="form.regNo" placeholder="请输入营业执照号" /></view>
					</view>
					<view class="common__upload">
						<text class="common__upload--txt">证照附件</text>
						<view>
							<easy-upload :dataList="imageList" :uploadUrl="uploadUrl" :types="'image'" :uploadCount="6" @changeUrl="changeUrl"></easy-upload>
						</view>
					</view>
					<view style="display: flex;">
						<view class="common__btn" @click="changeSpec()" style="width: 200rpx;"><text class="common__twobtn--yes">返回</text></view>
						<view class="common__btn" @click="doSave" style="width: 200rpx;"><text class="common__twobtn--yes">保存</text></view>
					</view>
				</view>
			</view>
			
			<!-- 页面信息修改 -->
		</view>
	</view>
</template>

<script>
	import regionPicker from '@/components/region-picker/region-picker.vue';
	import navBar from '@/components/components/navBar.vue';
	import {
		baseURL
	} from '@/config';
	import {
		queryByIdV,
		update
	} from '../../../api/scOperator.js';
	import common from '../../../static/js/common.js';
	export default {
		components: {
			navBar,
			regionPicker
		},
		data() {
			return {
				isSpec: false,
				uploadUrl: baseURL + 'phone/upload',
				userMsg: uni.getStorageSync('userMsg'),
				imageList: [],
				divisionList: [],
				form: {
					id: '',
					stallId: '',
					stallName: '',
					name: '',
					cardNo: '',
					divisionCode: '',
					divisionName: '',
					tel: '',
					regNo: '',
					yyzzurl: ''
				},
				rules: {
					stallId: {
						rule: /\S/,
						msg: '商铺名必须选择'
					},
					name: {
						rule: /\S/,
						msg: '经营户姓名不能为空'
					},
					cardNo: {
						rule: /\S/,
						msg: '身份证号不能为空'
					},
					divisionCode: {
						rule: /\S/,
						msg: '籍贯不能为空'
					},
					tel: {
						rule: /\S/,
						msg: '手机号不能为空'
					},
					regNo: {
						rule: /\S/,
						msg: '营业执照号不能为空'
					}
				}
			};
		},
		onLoad() {
			this.$resetToken()
				.then(() => {
					this.getInfo(this.userMsg.operatorId);
				})
				.catch(err => {
					if (err === 'error') {
						uni.navigateTo({
							url: '../../login/login'
						});
					} else {
						console.log('接口错误');
					}
				});
		},
		methods: {
			getInfo(id) {
				queryByIdV(id).then(res => {
					this.form = res.data;
					if (res.data.yyzzurl != null) {
						let list = common.removeTrim(res.data.yyzzurl.split(','));
						for (let i = 0; i < list.length; i++) {
							this.imageList.push(baseURL + list[i]);
						}
					}
				});
			},
			pickerStoreType(e) {
				console.log(e);
			},
			changeUrl(e) {
				console.log(e)
				this.form.yyzzurl = e;
			},
			bindPickerChange(e) {
				this.form.divisionCode = e.detail && e.detail.code[e.detail.code.length - 1];
				this.form.divisionName = e.detail && e.detail.value[e.detail.value.length - 1];
			},
			doSave() {
				if (!this.validate('name')) return;
				if (!this.validate('cardNo')) return;
				if (!this.validate('divisionCode')) return;
				if (!this.validate('tel')) return;
				if (!this.validate('regNo')) return;
				console.log(this.imageList)
				console.log(this.form)
				update(this.form).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
					if (res.code == 0) {
						setTimeout(function() {
							uni.redirectTo({
								url: './certificat'
							});
						}, 1000);
					}
				});
			},
			validate(key) {
				let bool = true;
				if (!this.rules[key].rule.test(this.form[key])) {
					//提示信息
					uni.showToast({
						title: this.rules[key].msg,
						icon: 'none'
					});
					//取反
					bool = false;
					return false;
				}
				return bool;
			},
			changeSpec() {
				this.isSpec = !this.isSpec;
			}
		}
	};
</script>

<style lang="scss"></style>
