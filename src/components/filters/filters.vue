<template>
	<div class="filters">
		<div class="status">
			<p class="filterBy">{{ $t(textInTag.status) + symbol.colon }}</p>
			<div class="currentStatus">
				<p>{{ $t(currentStatus) }}</p>
				<div class="iconDropdown">
					<oh-vue-icon
						name="md-arrowdropdown-outlined"
						class="mdArrowdropdownOutlined"
						@click="handleOpenOtherStatuses"
					></oh-vue-icon>
				</div>
			</div>
			<div class="otherStatuses" v-if="isOpenOtherStatuses" v-click-outside="handleClickOutsideOtherStatuses">
				<div
					class="otherStatus"
					v-for="(status, index) in otherStatuses"
					:key="index"
					@click="handleChangeStatus(status)"
				>
					<p> {{ $t(status) }}</p>
				</div>
			</div>
		</div>
		<div class="deadline">
			<p class="filterBy">{{ $t(textInTag.deadline) + symbol.colon }}</p>
			<input
				type="date"
				v-model="deadlineSearch"
				:class="{ changed: isDeadlineFilterChanged }"
				@input="handleChangeDeadlineFilter($event)"
			/>
		</div>
	</div>
</template>
<script>
import { Text } from '../../constants';
export default {
	name: 'filters',
	data() {
		return {
			textInTag: {
				status: Text.textInTag.status,
				deadline: Text.textInTag.deadline,
			},
			symbol: {
				colon: Text.symbol.colon,
			},
			deadlineSearch: '',
			isDeadlineFilterChanged: false,
			isOpenOtherStatuses: false,
			currentStatus: Text.statusDeadline.all,
			statuses: Text.statusDeadline,
		};
	},
	methods: {
		handleClickOutsideOtherStatuses() {
			this.isOpenOtherStatuses = false;
		},
		handleOpenOtherStatuses() {
			this.isOpenOtherStatuses = true;
		},
		handleChangeStatus(selectedStatus) {
			this.currentStatus = selectedStatus;
			this.isOpenOtherStatuses = false;
			this.$store.dispatch('setStatusFilter', selectedStatus);
		},
		handleChangeDeadlineFilter(e) {
			this.isDeadlineFilterChanged = !!e.target.value;
			this.deadlineSearch = e.target.value;
			this.$store.dispatch('setDeadlineFilter', this.deadlineSearch);
		},
	},
	computed: {
		otherStatuses() {
			return Object.values(this.statuses).filter((status) => status !== this.currentStatus);
		},
	},
};
</script>
<style scoped>
@import './index.scss';
</style>
