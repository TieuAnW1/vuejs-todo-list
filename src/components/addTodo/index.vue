<template>
	<div class="addTodo">
		<input type="text" v-model="nameTodo" />
		<input type="date" v-model="deadlineTodo" />
		<button @click="handleAddNewTodo">{{ $t(text.add) }}</button>
	</div>
</template>

<script>
import { Text } from '../../constants';
export default {
	name: 'addTodo',
	data() {
		return {
			nameTodo: '',
			deadlineTodo: '',
			text: {
				add: Text.add,
			},
		};
	},
	methods: {
		handleAddNewTodo() {
			const newTodo = {
				name: this.nameTodo,
				deadline: this.deadlineTodo,
			};

			const todos = localStorage.getItem(Text.keyLocalStorage.todos);

			if (todos) {
				const existingTodos = JSON.parse(todos);
				existingTodos.push(newTodo);
				localStorage.setItem(Text.keyLocalStorage.todos, JSON.stringify(existingTodos));
			} else {
				localStorage.setItem(Text.keyLocalStorage.todos, JSON.stringify([newTodo]));
			}
			this.nameTodo = '';
			this.deadlineTodo = '';
		},
	},
};
</script>

<style scoped>
.addTodo {
	background-color: aqua;
}
</style>
