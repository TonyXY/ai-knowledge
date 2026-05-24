<template>
  <Layout>
    <template #layout-bottom>
      <ProgressTracker />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ProgressTracker from './components/ProgressTracker.vue'

const { Layout } = DefaultTheme
</script>
