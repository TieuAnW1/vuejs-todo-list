<template>
	<div class="headerComponent">
		<h2>{{ $t(textInTag.title) }}</h2>
		<select v-model="$i18n.locale" @change="handleChangeLanguageApp">
			<option v-for="value in language" :key="value" :value="value">{{ capitalizedFirstLetter(value) }}</option>
		</select>
	</div>
</template>

<script>
import { Text } from '../../constants';

export default {
	name: 'headerComponent',
	data() {
		return {
			language: Text.language,
			textInTag: {
				title: Text.textInTag.todoList,
			},
		};
	},
	methods: {
		handleChangeLanguageApp(e) {
			const selectedLanguage = e.target.value;
			this.$i18n.locale = selectedLanguage;
			localStorage.setItem(Text.keyLocalStorage.currentLanguageApp, selectedLanguage);
		},
	},
	computed: {
		capitalizedFirstLetter() {
			return function (value) {
				return value.charAt(0).toUpperCase() + value.slice(1);
			};
		},
	},
};
</script>
<style>
@import './index.scss';
</style>
