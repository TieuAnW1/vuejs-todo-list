<script setup></script>

<template>
	<div class="wrapper">
		<div class="content">
			<headerComponent></headerComponent>
			<addTodo></addTodo>
			<listTodo></listTodo>
		</div>
	</div>
</template>

<script>
import headerComponent from './components/headerComponent/index.vue';
import addTodo from './components/addTodo/index.vue';
import listTodo from './components/listTodo/index.vue';
import { Text } from './constants';

export default {
	components: { headerComponent, addTodo, listTodo },
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
};
</script>

<style>
@import './assets/global.scss';
@import './assets/overrideVue3ModalConfirm.scss';
</style>
