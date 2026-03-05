<script setup lang="ts">
import ResultsTable from '@/components/ResultsTable.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import HeaderPanel from '@/components/HeaderPanel.vue'
import SearchBox from '@/components/SearchBox.vue'
</script>

<template>
  <HeaderPanel :close-window="true" :popup-button="false" />

  <SearchBox class="p-1" />
  <ResultsTable />

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
