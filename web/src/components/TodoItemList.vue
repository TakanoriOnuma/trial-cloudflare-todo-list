<script setup lang="ts">
import { useQueryTodos } from "../api/todo";
import TodoItem from "./TodoItem.vue";

const { data: todos, isFetching } = useQueryTodos();
</script>

<template lang="pug">
div
  .list-area
    .loader(v-if="isFetching") 読み込み中
    .list
      .list__item(v-for="todo in todos" :key="todo.id")
        TodoItem(:todo="todo")
</template>

<style lang="scss" scoped>
.list-area {
  position: relative;
  border: solid 1px #ccc;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(#000, 0.1);
}

.list {
  max-height: 70vh;
  overflow-y: auto;

  &__item {
    & + & {
      border-top: solid 1px #ccc;
    }
  }
}
</style>
