import { createStore } from 'vuex';
import { Text } from '../constants';

const store = createStore({
	state() {
		return {
			todos: [],
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
	},
});

export default store;
