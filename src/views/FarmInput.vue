<template>
  <v-dialog v-model="farmInputDialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" fab x-large
        ><v-icon x-large>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Input your Farm
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name of farm"
            required
          ></v-text-field>
          <h3>Select your field area</h3>
          <GmapMap
            :center="{ lat: 40.59, lng: 22.95 }"
            :zoom="14"
            map-type-id="terrain"
            style="width: 100%; height: 500px"
          >
            <GmapPolygon
              :paths="paths"
              :editable="true"
              @paths_changed="updateEdited($event)"
            />
          </GmapMap>
          <h3>{{ edited }}</h3>
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Type is required']"
            label="Type of crops"
            required
          ></v-select>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset
          </v-btn>
          <v-btn class="mr-4" @click="farmInputDialog = false">
            Close
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    farmInputDialog: false,
    edited: null,
    paths: [
      [
        { lat: 40.59, lng: 22.95 },
        { lat: 40.59, lng: 22.96 },
        { lat: 40.6, lng: 22.96 },
        { lat: 40.6, lng: 22.95 }
      ]
    ],
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    select: null,
    items: ["Rice", "Corn", "Bananas", "Lemons"]
  }),

  methods: {
    updateEdited(mvcArray) {
      let paths = [];
      for (let i = 0; i < mvcArray.getLength(); i++) {
        let path = [];
        for (let j = 0; j < mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      this.edited = paths;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.submit();
      }
    },
    async submit() {
      try {
        const provider =
          process.env.NODE_ENV == "production"
            ? ""
            : "http://localhost:8000/post/farms/";
        //console.log(provider);
        await axios.post(provider, [
          {
            name: this.name,
            type: this.select,
            coords: this.edited === null ? this.paths[0] : this.edited[0]
          }
        ]);

        //console.log(res);
        this.farmInputDialog = false;
        this.$emit("refreshFarms");
      } catch (error) {
        //console.log(error);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style></style>
