<script setup>
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators';
import { Button, Modal } from 'flowbite-vue';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['user'])

const showModal = ref(false);

const store = useStore();

const openModel = () => {
  showModal.value = true;
}

const form = reactive(props.user && {...props.user} || {
  name: '',
  email:'',
  mobile: '',
  birth_date: ''
})
const uniqueEmail = (value) => {
  console.log(props.user 
  && (store.state.users.filter(u => u.email !== props.user.email).filter(user => (user.email === value)).length == 0)
  || (store.state.users.filter(user => (user.email === value)).length == 0))
  return props.user 
  && (store.state.users.filter(u => u.email !== props.user.email).filter(user => (user.email === value)).length == 0)
  || (store.state.users.filter(user => (user.email === value)).length == 0)
}
const rules = {
  name: {
    required:helpers.withMessage('Please enter name', required),
    minLength: helpers.withMessage('Please ente name properly', minLength(3))
  },
  email: {
    required: helpers.withMessage('Please enter email', required),
    email: helpers.withMessage('Please enter valid email', email),    
    unique: helpers.withMessage('Email already exists', uniqueEmail),
  },
  mobile: {
    required: helpers.withMessage('Please enter mobile', required),
    numeric: helpers.withMessage('Please enter valid mobile', numeric),
    minLength: helpers.withMessage('Please enter 10 numbers', minLength(10)),
    maxLength: helpers.withMessage('Please enter 10 numbers', maxLength(10)),
  },
  birth_date: {
    required: helpers.withMessage('Please enter birth date', required),
  }
}
const $v = useVuelidate(rules,form);

const resetForm = () => {
  form.name='';
  form.email='';
  form.mobile= '';
  form.birth_date= '';
  $v.value.$reset()
  showModal.value = false
}
const addUser = () => {
  $v.value.$validate().then(result => {
    if(result){
      if(props.user){
        store.commit('updateUser',form)
      }else{
        store.commit('addUser',form)
      }
      resetForm()
    }
  })

}

</script>
<template>
  <Button color="default" v-if="!props.user" @click="openModel">Add User</Button>
  <a href="javascript:void(0)" v-else @click="openModel" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
  <Modal :size="'lg'" v-if="showModal" @close="showModal = false">
      <template #header>
        <div class="flex items-center text-lg">
          {{!props.user && 'Add User' || 'Edit user'}}
        </div>
      </template>
      <template #body>
        <form @submit.prevent="addUser" id="userForm">
          <div>
            <label for="name" class="block mt-2 text-sm font-medium text-left" :class="{'text-red-700 dark:text-red-500':$v.name.$errors.length}">Name</label>
            <input type="text" id="name" v-model="form.name" class=" border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700" placeholder="Enter name"
            :class="{
              'bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500': $v.name.$errors.length
            }"
            @blur="$v.name.$touch">
            <p class="text-sm text-red-600 text-left dark:text-red-500" v-for="error in $v.name.$errors" :key="error">{{ error.$message }}</p>
          </div>
          <div>
            <label for="email" class="block mt-2 text-sm font-medium text-left" :class="{'text-red-700 dark:text-red-500':$v.email.$errors.length}">Email</label>
            <input type="text" id="email" v-model="form.email" class=" border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700" placeholder="Enter email"
            :class="{
              'bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500': $v.email.$errors.length
            }"
            @blur="$v.email.$touch">
            <p class="text-sm text-red-600 text-left dark:text-red-500" v-for="error in $v.email.$errors" :key="error">{{ error.$message }}</p>
          </div>
          <div>
            <label for="mobile" class="block mt-2 text-sm font-medium text-left" :class="{'text-red-700 dark:text-red-500':$v.mobile.$errors.length}">Mobile</label>
            <input type="text" id="mobile" v-model="form.mobile" class=" border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700" placeholder="Enter mobile"
            :class="{
              'bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500':$v.mobile.$errors.length 
            }"
            @blur="$v.mobile.$touch">
            <p class="text-sm text-red-600 text-left dark:text-red-500" v-for="error in $v.mobile.$errors" :key="error">{{ error.$message }}</p>
          </div>
          <label for="date" class="block mt-2 text-sm font-medium text-left" :class="{'text-red-700 dark:text-red-500':$v.birth_date.$errors.length }">Birth Date</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
            </div>
            <input ref="dateInput" type="date" id="date" v-model="form.birth_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"
            :class="{
              'bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500':$v.birth_date.$errors.length 
            }"        
            @blur="$v.birth_date.$touch">
          </div>
          <p class="text-sm text-red-600 text-left dark:text-red-500" v-for="error in $v.birth_date.$errors" :key="error">{{ error.$message }}</p>
        </form>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <button @click="showModal = false" type="button"  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            Cancel
          </button>
          <button type="submit" form="userForm" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </div>
      </template>
    </Modal>
</template>
