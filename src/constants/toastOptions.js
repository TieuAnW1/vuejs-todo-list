const ToastOptions = {
	position: 'top-right',
	duration: 3000,
};

const WarningToastOptions = {
	...ToastOptions,
	style: {
		'line-height': '1.5',
	},
};

export { ToastOptions, WarningToastOptions };
