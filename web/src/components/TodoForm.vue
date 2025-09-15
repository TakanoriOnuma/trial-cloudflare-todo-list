<script setup lang="ts">
import { reactive } from "vue";
import { useMutationCreateTodo } from "../api/todo";

const INITIAL_FORM_DATA = {
  title: "",
};
const formData = reactive({ ...INITIAL_FORM_DATA });

const { mutate: mutateCreateTodo } = useMutationCreateTodo();

function onSubmit() {
  mutateCreateTodo(formData, {
    onSuccess: () => {
      Object.assign(formData, INITIAL_FORM_DATA);
    },
  });
}
</script>

<template lang="pug">
div
  form(@submit.prevent="onSubmit")
    label(for="todoTitle") TODO名:
    input#todoTitle(v-model="formData.title" type="text")
    button(type="submit", :disabled="formData.title === ''") 作成
</template>

<style lang="scss" scoped>
#todoTitle {
  margin: 0 5px;
}
</style>
