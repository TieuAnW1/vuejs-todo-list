<template>
	<div class="listTodo">
		<div v-if="sortedFilteredTodos.length === 0" class="noTodo">
			<img :src="pathImages.noTodo.src" :alt="pathImages.noTodo.alt" />
			<h3>{{ $t(noTodoText) }}</h3>
		</div>
		<div v-else class="existenceTodo">
			<div class="filterAndSearch">
				<Search :placeholder="$t(placeholder.search)" />
				<Filters />
			</div>
			<div class="todos">
				<div
					v-for="(todo, index) in sortedFilteredTodos"
					:key="todo.id"
					:class="todo.isCompleted ? 'itemTodo completedTodo' : 'itemTodo'"
				>
					<div class="infoTodo">
						<oh-vue-icon
							class="mdDownloaddoneRound"
							name="md-downloaddone-round"
							@click="handleCompleteTodo(todo)"
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
						<oh-vue-icon
							name="ri-delete-bin-line"
							@click="openModalConfirm(todo)"
							class="riDeleteBinLine"
						/>
					</div>
				</div>
			</div>
			<vue3-confirm-dialog></vue3-confirm-dialog>
		</div>
	</div>
</template>

<script>
import { PathImages, Text, Numbers, WarningToastOptions, ToastOptions, SuccessfulMessages } from '../../constants';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Search from '../search/search.vue';
import Filters from '../filters/filters.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'listTodo',
	components: { Search, Filters },
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
			placeholder: {
				search: Text.placeholder.search,
			},
			toastQueue: [],
		};
	},
	methods: {
		formatOrdinalNumbers(index) {
			return index + 1;
		},
		openModalConfirm(todo) {
			this.$confirm({
				message:
					this.$t(Text.confirmDeleteQuestion) +
					Text.symbol.doubleQuote +
					this.handleTodoNameInToast(todo.name) +
					Text.symbol.doubleQuote +
					' ' +
					Text.symbol.questionMark,
				button: {
					no: this.$t(Text.no),
					yes: this.$t(Text.yes),
				},
				callback: (confirm) => {
					if (confirm) this.handleDeleteTodo(todo);
				},
			});
		},
		handleDeleteTodo(todo) {
			try {
				this.$store.dispatch('deleteTodo', todo.id);
				const successfulDeletedMessage =
					this.$t(SuccessfulMessages.delete) +
					Text.symbol.openingParenthesis +
					Text.symbol.doubleQuote +
					this.handleTodoNameInToast(todo.name) +
					Text.symbol.doubleQuote +
					Text.symbol.closingParenthesis;
				useToast().success(successfulDeletedMessage, ToastOptions);
			} catch (error) {
				console.log(error);
			}
		},
		handleCompleteTodo(todo) {
			try {
				this.$store.dispatch('toggleIsCompletedTodo', todo.id);
				if (todo.isCompleted) {
					const congratulationsMessage =
						this.$t(SuccessfulMessages.congratulationsCompletedTodo) +
						Text.symbol.doubleQuote +
						this.handleTodoNameInToast(todo.name) +
						Text.symbol.doubleQuote;
					useToast().success(congratulationsMessage, ToastOptions);
				}
			} catch (error) {
				console.log(error);
			}
		},
		checkTodosDeadline() {
			if (this.sortedFilteredTodos.length > 0) {
				const now = new Date();

				this.sortedFilteredTodos.forEach((todo) => {
					const deadlineTodo = new Date(todo.deadline);
					const timeDiff = deadlineTodo - now;
					if (timeDiff <= Numbers.hour.twentyFour && timeDiff >= 0 && !todo.isCompleted)
						this.toastQueue.push(todo);
				});

				this.showNextToast();
			}
		},
		showNextToast() {
			if (this.toastQueue.length > 0) {
				const todo = this.toastQueue.shift();
				this.showToast(todo);
				setTimeout(this.showNextToast, Numbers.second.two);
			}
		},
		showToast(todo) {
			const nameTodoInToast = this.handleTodoNameInToast(todo.name);
			useToast().warning(
				this.$t(Text.upcomingDeadlineTodo) + Text.symbol.colon + '<br>' + nameTodoInToast,
				WarningToastOptions,
			);
		},
		handleTodoNameInToast(nameTodo) {
			return nameTodo.length <= Numbers.maxCharacterLimitOfTodoNameInToast
				? nameTodo
				: nameTodo.slice(0, Numbers.maxCharacterLimitOfTodoNameInToast) + Text.ellipsis;
		},
	},
	computed: {
		...mapGetters(['sortedFilteredTodos']),
	},
	mounted() {
		setTimeout(() => {
			this.checkTodosDeadline();
			setInterval(this.checkTodosDeadline, Numbers.minute.two);
		}, Numbers.second.three);
	},
};
</script>

<style>
@import './index.scss';
</style>
