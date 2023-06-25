<template>
	<div class="listTodo">
		<div v-if="sortedTodos.length === 0" class="noTodo">
			<img :src="pathImages.noTodo.src" :alt="pathImages.noTodo.alt" />
			<h3>{{ $t(noTodoText) }}</h3>
		</div>
		<div v-else class="existenceTodo">
			<div
				v-for="(todo, index) in sortedTodos"
				:key="todo.id"
				:class="todo.isCompleted ? 'itemTodo completedTodo' : 'itemTodo'"
			>
				<div class="infoTodo">
					<oh-vue-icon
						class="mdDownloaddoneRound"
						name="md-downloaddone-round"
						@click="handleCompleteTodo(todo.id)"
					/>
					<div class="valuesTodo">
						<h3 :title="formatOrdinalNumbers(index) + symbols.dot + ' ' + todo.name">
							{{ formatOrdinalNumbers(index) + symbols.dot + ' ' + todo.name }}
						</h3>
						<p class="deadlineTodo">
							{{ $t(textInTag.deadline) + symbols.colon }} <span>{{ ' ' + todo.deadline }}</span>
						</p>
					</div>
				</div>
				<div class="actions">
					<oh-vue-icon name="ri-delete-bin-line" @click="handleDeleteTodo(todo.id)" class="riDeleteBinLine" />
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
			symbols: {
				dot: Text.symbol.dot,
				colon: Text.symbol.colon,
			},
			textInTag: {
				deadline: Text.textInTag.deadline,
			},
		};
	},
	methods: {
		formatOrdinalNumbers(index) {
			return index + 1;
		},
		handleDeleteTodo(idTodo) {
			this.$store.dispatch('deleteTodo', idTodo);
		},
		handleCompleteTodo(idTodo) {
			this.$store.dispatch('toggleIsCompletedTodo', idTodo);
		},
	},
	computed: {
		sortedTodos() {
			const copiedTodos = this.$store.state.todos.slice();
			return copiedTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
		},
	},
};
</script>

<style>
@import './index.scss';
</style>
