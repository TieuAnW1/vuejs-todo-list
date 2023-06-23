<template>
	<div class="headerComponent">
		<input type="text" placeholder="Son app" />
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
