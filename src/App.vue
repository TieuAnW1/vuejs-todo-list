<script setup></script>

<template>
	<div class="wrapper">
		<div class="content">
			<addTodo></addTodo>
			<listTodo></listTodo>
		</div>
	</div>
</template>

<script>
import addTodo from './components/addTodo/index.vue';
import listTodo from './components/listTodo/index.vue';

export default { components: { addTodo, listTodo } };
</script>
