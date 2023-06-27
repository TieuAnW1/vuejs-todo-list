<script setup></script>

<template>
	<div class="wrapper">
		<div class="content">
			<headerComponent />
			<div class="filtersAndSearch">
				<search :placeholder="$t(placeholder.search)" />
				<filters />
			</div>
			<listTodo />
			<addTodo />
		</div>
	</div>
</template>

<script>
import headerComponent from './components/headerComponent/index.vue';
import addTodo from './components/addTodo/index.vue';
import listTodo from './components/listTodo/index.vue';
import search from './components/search/search.vue';
import filters from './components/filters/filters.vue';
import { Text } from './constants';

export default {
	components: { headerComponent, addTodo, listTodo, search, filters },
	created() {
		const currentLanguageApp = localStorage.getItem(Text.keyLocalStorage.currentLanguageApp);
		if (!currentLanguageApp) {
			localStorage.setItem(Text.keyLocalStorage.currentLanguageApp, Text.language.en);
			this.$i18n.locale = Text.language.en;
		} else {
			this.$i18n.locale = currentLanguageApp;
		}
		this.$store.dispatch('initializeTodos');
	},
	data() {
		return {
			placeholder: {
				search: Text.placeholder.search,
			},
		};
	},
};
</script>

<style>
@import './assets/global.scss';
@import './assets/app.scss';
@import './assets/overrideVue3ModalConfirm.scss';
</style>
