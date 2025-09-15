<script setup lang="ts">
import {
  useMutationDeleteTodo,
  useMutationEditTodo,
  type Todo,
} from "../api/todo";
import { formatDate } from "date-fns";

const { mutate: mutateEditTodo } = useMutationEditTodo();
const { mutate: mutateDeleteTodo } = useMutationDeleteTodo();

const props = defineProps<{
  /** TODO項目 */
  todo: Todo;
}>();

function onChangeCompleted(event: Event) {
  const target = event.target as HTMLInputElement;
  const completed = target.checked;
  console.log(completed);
  mutateEditTodo({
    todoId: props.todo.id,
    newTodo: {
      ...props.todo,
      completed,
    },
  });
}

function onRemove() {
  const result = confirm("本当に削除しますか？");
  if (!result) {
    return;
  }
  mutateDeleteTodo(props.todo.id);
}
</script>

<template lang="pug">
div
  .todo-item
    .todo-item__header
      label
        input(
          type="checkbox"
          :checked="props.todo.completed"
          @change="onChangeCompleted"
        )
        | 完了
      button(@click="onRemove") 削除
    .todo-item__content {{ props.todo.title }}
    .todo-item__footer
      .todo-id ID: {{ props.todo.id }}
      .todo-created-at 作成日: {{ formatDate(props.todo.created_at, 'yyyy/MM/dd') }}
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
