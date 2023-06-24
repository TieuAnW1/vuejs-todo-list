<template>
	<div class="listTodo">
		<div v-if="todos.length === 0" class="noTodo">
			<img :src="pathImages.noTodo.src" :alt="pathImages.noTodo.alt" />
			<h3>{{ $t(noTodoText) }}</h3>
		</div>
		<div v-else>
			<div v-for="todo in todos" :key="todo.id">
				<div class="infoTodo">
					<p class="nameTodo">{{ todo.name }}</p>
					<p class="deadlineTodo">{{ todo.deadline }}</p>
				</div>
				<div class="actions">
					<oh-vue-icon name="ri-delete-bin-line" @click="handleDeleteTodo(todo.id)" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { PathImages, Text } from '../../constants';
export default {
	name: 'listTodo',
	data() {
		return {
			pathImages: {
				noTodo: {
					src: PathImages.noTodo,
					alt: Text.alt.noTodo,
				},
			},
			noTodoText: Text.textInTag.noTodo,
		};
	},
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

<style>
@import './index.scss';
</style>
