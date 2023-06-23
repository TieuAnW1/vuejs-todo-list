<template>
	<div class="listTodo">
		<div v-if="todos.length === 0">No todo</div>
		<div v-else>
			<div v-for="(todo, index) in todos" :key="todo + index"> {{ todo.name }} + {{ todo.deadline }}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'listTodo',
	data() {
		return {
			todos: JSON.parse(localStorage.getItem('todos')) || [],
		};
	},
};
</script>
