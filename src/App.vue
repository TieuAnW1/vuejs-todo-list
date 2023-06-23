<script setup></script>

<template>
	<div class="wrapper">
		<div class="content">
			<addTodo></addTodo>
		</div>
	</div>
</template>

<script>
import addTodo from './components/addTodo/index.vue';

export default { components: { addTodo } };
</script>
