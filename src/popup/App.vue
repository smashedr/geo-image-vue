<script setup lang="ts">
import ResultsTable from '@/components/ResultsTable.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import SearchBox from '@/components/SearchBox.vue'
import PermsCheck from '@/components/PermsCheck.vue'
</script>

<template>
  <PanelHeader :close-window="true" :popup-button="false" />

  <div class="d-grid gap-2 p-1">
    <PermsCheck />
    <SearchBox />
    <ResultsTable />
  </div>

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
