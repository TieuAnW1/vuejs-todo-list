<template>
	<div class="headerComponent">
		<h2>{{ $t(textInTag.title) }}</h2>
		<!-- <select v-model="$i18n.locale" @change="handleChangeLanguageApp">
			<option v-for="value in language" :key="value" :value="value">{{ capitalizedFirstLetter(value) }}</option>
		</select> -->
		<div class="language">
			<div class="flag">
				<img :src="currentLanguage.path" :alt="currentLanguage.alt" />
			</div>
			<div class="iconDropdown">
				<oh-vue-icon
					name="md-arrowdropdown-outlined"
					class="mdArrowdropdownOutlined"
					@click="handleToggleFlags"
				></oh-vue-icon>
			</div>
		</div>
		<div class="languages" v-if="isOpenFlags">
			<div class="flags" v-for="flag in otherLanguages" :key="flag.path" @click="handleChangeLanguageApp(flag)">
				<img :src="flag.path" :alt="flag.alt" />
				<p>{{ capitalizedFirstLetter(flag.lang) }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { Text, PathImages } from '../../constants';

export default {
	name: 'headerComponent',
	data() {
		return {
			language: Text.language,
			textInTag: {
				title: Text.textInTag.todoList,
			},
			isOpenFlags: false,
			flags: PathImages.flags,
		};
	},
	methods: {
		handleChangeLanguageApp(selectedFlag) {
			this.$i18n.locale = selectedFlag.lang;
			localStorage.setItem(Text.keyLocalStorage.currentLanguageApp, selectedFlag.lang);
			this.isOpenFlags = false;
		},
		handleToggleFlags() {
			this.isOpenFlags = !this.isOpenFlags;
		},
	},
	computed: {
		capitalizedFirstLetter() {
			return function (value) {
				return value.charAt(0).toUpperCase() + value.slice(1);
			};
		},
		currentLanguage() {
			const currentLanguage = this.$i18n.locale;
			return this.flags.find((flag) => flag.lang === currentLanguage);
		},
		otherLanguages() {
			const currentLanguage = this.$i18n.locale;
			return this.flags.filter((flag) => flag.lang !== currentLanguage);
		},
	},
};
</script>

<style>
@import './index.scss';
</style>
