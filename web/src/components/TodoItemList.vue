<script setup lang="ts">
import { useQueryTodos } from "../api/todo";
import TodoItem from "./TodoItem.vue";

const { data: todos, isFetching } = useQueryTodos();
</script>

<template lang="pug">
div
  .list-area
    .loader(v-if="isFetching") 読み込み中
    .list(v-if="todos != null")
      transition-group(name="flip")
        .list__item(v-for="todo in todos" :key="todo.id")
          TodoItem(:todo="todo")
</template>

<style lang="scss" scoped>
.flip {
  // 要素が移動するときのアニメーション設定（基本的にはtransitionにtransformを設定していればいい）
  &-move {
    transition: transform 0.5s;
  }

  // 要素が入るときのアニメーション
  &-enter {
    // アニメーションの初期設定（初期値とtransitionを設定する）
    &-active {
      opacity: 0;
      transform: translate3d(0, -30px, 0);
      transition: opacity 0.5s, transform 0.5s;
    }
    // アニメーション開始（目標のプロパティ値を設定する）
    &-to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  // 要素が消える時のアニメーション
  &-leave {
    // アニメーションの初期設定
    &-active {
      // 要素が消える場合はabsoluteにする
      position: absolute;
      width: 100%;
      transition: opacity 0.5s, transform 0.5s;
    }
    // アニメーション開始
    &-to {
      opacity: 0;
      transform: translate3d(0, -30px, 0);
    }
  }
}

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
