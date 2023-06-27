<template>
	<div class="search">
		<input
			type="text"
			v-model="searchText"
			:placeholder="placeholder"
			ref="searchInputRef"
			@input="handleSearchTodos"
		/>
		<oh-vue-icon v-if="searchText.length > 0" class="BiXCircle" name="bi-x-circle" @click="clearSearchText" />
	</div>
</template>
<script>
export default {
	name: 'search',
	props: ['placeholder'],
	data() {
		return {
			searchText: '',
		};
	},
	methods: {
		clearSearchText() {
			this.searchText = '';
			this.$refs.searchInputRef.focus();
			this.handleSearchTodos();
		},
		handleSearchTodos() {
			this.$store.dispatch('setSearchText', this.searchText);
		},
	},
};
</script>
<style scoped>
@import './index.scss';
</style>
