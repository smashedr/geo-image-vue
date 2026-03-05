<script setup lang="ts">
import ResultsTable from '@/components/ResultsTable.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import HeaderPanel from '@/components/HeaderPanel.vue'
import SearchBox from '@/components/SearchBox.vue'
import PanelFooter from '@/components/PanelFooter.vue'
</script>

<template>
  <header class="flex-shrink-0">
    <HeaderPanel :side-button="false" />
  </header>

  <main class="flex-grow-1 overflow-auto">
    <SearchBox class="p-1" />

    <ResultsTable />
  </main>

  <footer class="flex-shrink-0">
    <PanelFooter />
  </footer>

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
