<template>
  <div>
    <a href="/pages/componentsTest/main"> -组件- </a>
    <a href="/pages/login/main"> -登录- </a>
    <a href="/pages/form/mchat/main"> -MCHAT- </a>
    <a href="/pages/web/main"> -web- </a>
    <div class="flex">
      <button @click="handleSyncInfo"> 同步资料</button>
      <button @click="handleClearCache"> 清除缓存</button>
      <button @click="handleLogout"> 退出登录</button>
    </div>
    <div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts">
</script>
