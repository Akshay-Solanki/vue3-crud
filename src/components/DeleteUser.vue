<script setup>
import { useStore } from "vuex";


const props = defineProps(['user']);

const store = useStore();

const deleteUser = (user) => {
  if(confirm('Are you sure you want delete user?')){
    store.commit('deleteUser', user.id)
  }
}
</script>
<template>
  <a href="javascript:void(0)"
  v-if="props.user"
  @click="deleteUser(props.user)"
  class="pl-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
</template>