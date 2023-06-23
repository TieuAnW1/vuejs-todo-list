<template>
	<div class="listTodo">
		<div v-if="todos.length === 0">No todo</div>
		<div v-else v-for="todo in todos" :key="todo.id">
			<div class="infoTodo">
				<p class="nameTodo">{{ todo.name }}</p>
				<p class="deadlineTodo">{{ todo.deadline }}</p>
			</div>
			<div class="actions">
				<oh-vue-icon name="ri-delete-bin-line" @click="handleDeleteTodo(todo.id)" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'listTodo',
	methods: {
		handleDeleteTodo(idTodo) {
			this.$store.dispatch('deleteTodo', idTodo);
		},
	},
	computed: {
		todos() {
			return this.$store.state.todos;
		},
	},
};
</script>
