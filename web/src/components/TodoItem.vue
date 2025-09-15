<script setup lang="ts">
import type { Todo } from "../api/todo";
import { formatDate } from "date-fns";

defineProps<{
  /** TODO項目 */
  todo: Todo;
}>();
</script>

<template lang="pug">
div
  .todo-item
    .todo-item__header
      label
        input(
          type="checkbox"
          :checked="todo.completed"
        )
        | 完了
      button() 削除
    .todo-item__content {{ todo.title }}
    .todo-item__footer
      .todo-id ID: {{ todo.id }}
      .todo-created-at 作成日: {{ formatDate(todo.created_at, 'yyyy/MM/dd') }}
</template>

<style lang="scss" scoped>
.todo-item {
  padding: 5px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.todo-id {
  font-size: 10px;
}
</style>
