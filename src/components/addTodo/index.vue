<template>
	<div class="addTodo">
		<input type="text" v-model="nameTodo" />
		<input type="date" v-model="deadlineTodo" />
		<button @click="handleAddNewTodo">Add</button>
	</div>
</template>

<script>
export default {
	name: 'addTodo',
	data() {
		return {
			nameTodo: '',
			deadlineTodo: '',
		};
	},
	methods: {
		handleAddNewTodo() {
			const newTodo = {
				name: this.nameTodo,
				deadline: this.deadlineTodo,
			};

			const todos = localStorage.getItem('todos');

			if (todos) {
				const existingTodos = JSON.parse(todos);
				existingTodos.push(newTodo);
				localStorage.setItem('todos', JSON.stringify(existingTodos));
			} else {
				localStorage.setItem('todos', JSON.stringify([newTodo]));
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
