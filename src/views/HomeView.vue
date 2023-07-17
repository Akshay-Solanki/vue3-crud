<script setup>
import { initFlowbite } from 'flowbite';
import { Table,TableHead, TableBody, TableHeadCell, TableRow, TableCell } from 'flowbite-vue'
import { computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'
import AddUser from '../components/AddUser.vue';
import DeleteUser from '../components/DeleteUser.vue';

const store = useStore();


onMounted(() => {
  initFlowbite();
})

const search = ref('')

const users = computed(() => search.value.length > 2 
  && store.state.users.filter(u => u.email.includes(search.value.toLowerCase()) || u.name.toLowerCase().includes(search.value.toLowerCase()) || u.mobile.includes(search.value))  
  || store.state.users)

</script>

<template>
  <main class="flex items-center w-screen">
    <div class="my-5 mx-5 w-full">
      <div class="flex justify-between">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Users</h5>
        <AddUser />
      </div>
      <div>
        <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" v-model="search" id="search" class="block w-full p-2 mt-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
            
        </div>
      </div>
        <Table class="my-4">
          <table-head>
            <table-head-cell>Name</table-head-cell>
            <table-head-cell>Email</table-head-cell>
            <table-head-cell>Mobile</table-head-cell>
            <table-head-cell>Birth Date</table-head-cell>
            <table-head-cell><span class="sr-only">Action</span></table-head-cell>
          </table-head>
          <table-body v-if="users.length !== 0">
            <table-row v-for="user in users" :key="user.id">
              <table-cell>{{ user.name }}</table-cell>
              <table-cell>{{ user.email }}</table-cell>
              <table-cell>{{ user.mobile }}</table-cell>
              <table-cell>{{ user.birth_date }}</table-cell>
              <table-cell>
                <AddUser :user="user" />
                <DeleteUser :user="user" />
              </table-cell>
            </table-row>
          </table-body>
          <table-body v-else>
            <table-row>
              <td colspan="5" class="py-2 text-center">
                <span class="text-center">No User found.</span>
              </td>
            </table-row>
          </table-body>
        </Table>
    </div>
  </main>
</template>
