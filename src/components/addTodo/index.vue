<template>
	<div class="addTodo">
		<div class="nameTodo">
			<input
				class=""
				type="text"
				v-model="nameTodo"
				:placeholder="$t(text.placeHolder.yourTodo)"
				ref="nameTodoInput"
			/>
			<oh-vue-icon v-if="nameTodo.length > 0" class="BiXCircle" name="bi-x-circle" @click="clearNameTodo" />
		</div>
		<input type="date" v-model="deadlineTodo" :class="{ changed: isDeadlineChanged }" />
		<button @click="handleAddNewTodo" :title="$t(text.add)" :disabled="nameTodo === '' || deadlineTodo === ''">{{
			text.plus
		}}</button>
	</div>
</template>

<script>
import { Text, SuccessfulMessages, ToastOptions } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import { mapMutations } from 'vuex';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {
	name: 'addTodo',
	data() {
		return {
			nameTodo: '',
			deadlineTodo: '',
			isEmptyInput: false,
			isDeadlineChanged: false,
			text: {
				add: Text.textInTag.add,
				plus: Text.symbol.plus,
				placeHolder: {
					yourTodo: Text.placeholder.yourTodo,
				},
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

			try {
				this.$store.dispatch('addNewTodo', newTodo);
				const successfulMessage = this.$t(SuccessfulMessages.add);
				useToast().success(successfulMessage, ToastOptions);
				this.nameTodo = '';
				this.deadlineTodo = '';
			} catch (error) {
				console.log(error);
			}
		},
		clearNameTodo() {
			this.nameTodo = '';
		},
	},
	watch: {
		deadlineTodo(newValue, oldValue) {
			if (newValue !== oldValue) this.isDeadlineChanged = true;
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.$refs.nameTodoInput.focus();
		});
	},
};
</script>

<style scoped>
@import './index.scss';
</style>
