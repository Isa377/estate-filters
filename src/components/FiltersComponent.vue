<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filters.address"
          label="Адрес"
          outlined
          dense
          clearable
          @update:modelValue="updateQuery"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-text-field
          v-model.number="filters.minArea"
          label="Мин. площадь"
          type="number"
          outlined
          dense
          clearable
          @update:modelValue="updateQuery"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-text-field
          v-model.number="filters.maxArea"
          label="Макс. площадь"
          type="number"
          outlined
          dense
          clearable
          @update:modelValue="updateQuery"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-text-field
          v-model.number="filters.minRooms"
          label="Мин. комнат"
          type="number"
          outlined
          dense
          clearable
          @update:modelValue="updateQuery"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-text-field
          v-model.number="filters.maxRooms"
          label="Макс. комнат"
          type="number"
          outlined
          dense
          clearable
          @update:modelValue="updateQuery"
        ></v-text-field>
      </v-col>
      <v-btn color="primary" class="ml-3" @click="resetFilters">Сбросить фильтры</v-btn>
    </v-row>

    <v-row>
      <v-col v-for="apartment in filteredApartments" :key="apartment.id" cols="12" md="4">
        <v-card>
          <v-img :src="apartment.image" height="200px" cover></v-img>
          <v-card-title>{{ apartment.address }}</v-card-title>
          <v-card-subtitle>
            {{ apartment.area }} м² | {{ apartment.rooms }} комн.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      apartments: [],
      filters: {
        address: "",
        minArea: null,
        maxArea: null,
        minRooms: null,
        maxRooms: null,
      },
      filters: {
        address: "",
        id: "",
        minArea: "",
        maxArea: "",
        minRooms: "",
        maxRooms: "",
      },
    };
  },
  computed: {
    filteredApartments() {
      return this.apartments.filter((apartment) => {
        return (
          (!this.filters.address || apartment.address.toLowerCase().includes(this.filters.address.toLowerCase())) &&
          (!this.filters.id || apartment.id == this.filters.id) &&
          (!this.filters.minArea || apartment.area >= this.filters.minArea) &&
          (!this.filters.maxArea || apartment.area <= this.filters.maxArea) &&
          (!this.filters.minRooms || apartment.rooms >= this.filters.minRooms) &&
          (!this.filters.maxRooms || apartment.rooms <= this.filters.maxRooms)
        );
      });
    },
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("/src/assets/apartments.json");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        this.apartments = await response.json();
        this.loadFiltersFromQuery();
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
    loadFiltersFromQuery() {
      const query = this.$route.query;
      this.filters = {
        address: query.address || "",
        id: query.id || "",
        minArea: query.minArea || "",
        maxArea: query.maxArea || "",
        minRooms: query.minRooms || "",
        maxRooms: query.maxRooms || "",
      };
    },
    updateQuery() {
      this.$router.push({ query: { ...this.filters } });
    },
    resetFilters() {
      for (const key in this.filters) {
        this.filters[key] = "";
			}
      this.$router.push({ query: {} });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.v-card {
  transition: 0.3s;
}
.v-card:hover {
  transform: scale(1.02);
}
</style>
