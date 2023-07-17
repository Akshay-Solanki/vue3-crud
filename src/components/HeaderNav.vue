<script setup>
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue'

</script>

<template>
    <Navbar>
      <template #logo>
        <NavbarLogo link="https://www.google.com/" alt="Flowbite logo" image-url="https://flowbite.com/docs/images/logo.svg">
          Flowbite
        </NavbarLogo>
      </template>
      <template #default="{isShowMenu}">
        <NavbarCollapse :isShowMenu="isShowMenu">
          <NavbarLink component="RouterLink" :is-active="$route.path === '/'" linkAttr="to" link="/">Home</NavbarLink>
        </NavbarCollapse>
      </template>
    </Navbar>
</template>