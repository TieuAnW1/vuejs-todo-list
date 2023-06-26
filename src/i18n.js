import { createI18n } from 'vue-i18n';
import vietnameseLanguage from './locales/vi.json';
import englishLanguage from './locales/en.json';
import { Text } from './constants';

const i18n = createI18n({
	locale: Text.language.en,
	messages: {
		en: englishLanguage,
		vi: vietnameseLanguage,
	},
});

export default i18n;
