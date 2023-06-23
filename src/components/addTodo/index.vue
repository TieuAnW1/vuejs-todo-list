<template>
	<div class="addTodo">
		<input type="text" v-model="nameTodo" />
		<input type="date" v-model="deadlineTodo" />
		<button @click="handleAddNewTodo">{{ $t(text.add) }}</button>
	</div>
</template>

<script>
import { Text } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import { mapMutations } from 'vuex';

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
		...mapMutations(['addTodo']),
		handleAddNewTodo() {
			const newTodo = {
				id: uuidv4(),
				name: this.nameTodo,
				deadline: this.deadlineTodo,
				isCompleted: false,
			};

			this.$store.dispatch('addNewTodo', newTodo);
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
