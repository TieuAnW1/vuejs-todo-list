import Text from './text';
const publicFlagsPath = '/images/flags/';
const pathImages = {
	noTodo: '/images/no-todo.png',
	flags: [
		{
			lang: Text.language.vi,
			alt: 'Vietnam Flag',
			path: publicFlagsPath + 'vietnam-flag.png',
		},
		{
			lang: Text.language.en,
			alt: 'USA Flag',
			path: publicFlagsPath + 'usa-flag.png',
		},
	],
};

export default pathImages;
