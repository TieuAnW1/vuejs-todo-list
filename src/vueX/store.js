import { createStore } from 'vuex';
import { Text } from '../constants';

const store = createStore({
	state() {
		return {
			todos: [],
			currentSearchText: '',
			currentStatusFilter: Text.statusDeadline.all,
			currentDeadlineFilter: '',
		};
	},
	mutations: {
		setTodos(state, todos) {
			state.todos = todos;
		},
		addTodo(state, todo) {
			state.todos.push(todo);
			localStorage.setItem(Text.keyLocalStorage.todos, JSON.stringify(state.todos));
		},
		deleteTodo(state, id) {
			state.todos = state.todos.filter((todo) => todo.id !== id);
			localStorage.setItem(Text.keyLocalStorage.todos, JSON.stringify(state.todos));
		},
		toggleIsCompletedTodo(state, id) {
			const todo = state.todos.find((todo) => todo.id === id);
			if (todo) {
				todo.isCompleted = !todo.isCompleted;
				localStorage.setItem(Text.keyLocalStorage.todos, JSON.stringify(state.todos));
			}
		},
		setSearchText(state, searchText) {
			state.currentSearchText = searchText;
		},
		setStatusFilter(state, selectedFilter) {
			state.currentStatusFilter = selectedFilter;
		},
		setDeadlineFilter(state, selectedDeadline) {
			state.currentDeadlineFilter = selectedDeadline;
		},
	},
	actions: {
		initializeTodos({ commit }) {
			const todos = JSON.parse(localStorage.getItem(Text.keyLocalStorage.todos)) || [];
			commit('setTodos', todos);
		},
		addNewTodo({ commit }, todo) {
			commit('addTodo', todo);
		},
		deleteTodo({ commit }, idTodo) {
			commit('deleteTodo', idTodo);
		},
		toggleIsCompletedTodo({ commit }, idTodo) {
			commit('toggleIsCompletedTodo', idTodo);
		},
		setSearchText({ commit }, searchText) {
			commit('setSearchText', searchText);
		},
		setStatusFilter({ commit }, selectedStatus) {
			commit('setStatusFilter', selectedStatus);
		},
		setDeadlineFilter({ commit }, selectedDeadline) {
			commit('setDeadlineFilter', selectedDeadline);
		},
	},
	getters: {
		filteredTodos: (state) => {
			if (
				!state.currentSearchText &&
				state.currentStatusFilter === Text.statusDeadline.all &&
				!state.currentDeadlineFilter
			) {
				return state.todos;
			}
			const keyword = state.currentSearchText.toLowerCase();
			let todosIncludesKeyword = state.todos.filter(
				(todo) => todo.name.toLowerCase().includes(keyword) || todo.deadline.toLowerCase().includes(keyword),
			);

			if (state.currentDeadlineFilter.length > 0) {
				if (state.currentStatusFilter === Text.statusDeadline.all) {
					return todosIncludesKeyword.filter((todo) => todo.deadline === state.currentDeadlineFilter);
				} else {
					return todosIncludesKeyword.filter((todo) =>
						state.currentStatusFilter === Text.statusDeadline.todo
							? todo.deadline === state.currentDeadlineFilter && !todo.isCompleted
							: todo.deadline === state.currentDeadlineFilter && todo.isCompleted,
					);
				}
			} else {
				if (state.currentStatusFilter === Text.statusDeadline.all) {
					return todosIncludesKeyword;
				} else {
					return todosIncludesKeyword.filter((todo) =>
						state.currentStatusFilter === Text.statusDeadline.todo ? !todo.isCompleted : todo.isCompleted,
					);
				}
			}
		},
		sortedFilteredTodos: (state, getters) => {
			const filteredTodos = getters.filteredTodos;
			const copiedTodos = filteredTodos.slice();
			return copiedTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
		},
	},
});

export default store;
