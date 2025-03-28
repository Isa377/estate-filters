<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title class="text-center">Тестовое задание с фильтрами</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <FiltersComponent />
    </v-main>
  </v-app>
</template>

<script>
import FiltersComponent from "@/components/FiltersComponent.vue";
export default {
  components: {
    FiltersComponent
  }
}
</script>