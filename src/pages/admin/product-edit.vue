<template>
  <div>
    <section class="section no-top-pad">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h5 class="title is-5">Add Product</h5>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button" @click="goBack">Back</button>
          </div>
        </div>
      </nav>
      <hr>
      <form @submit.prevent="onSubmit">
        <div class="columns">
          <div class="column is-one-third">
            <label class="label">Product image</label>
            <div class="file has-name is-fullwidth">
              <label class="file-label">
                <input class="file-input" type="file" @change="onImageSelect">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">Upload</span>
                </span>
                <span class="file-name">{{imageName}}</span>
              </label>
            </div>
            <br>
            <p class="image is-4by3">
              <img :src="imageUrl">
            </p>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Product Name*</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="name"
                  v-model="name"
                  v-validate="'required|min:4'"
                  :class="{ 'is-danger': errors.has('name') }"
                >
                <p v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Code*</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="code"
                  v-model="code"
                  v-validate="'required|min:2'"
                  :class="{ 'is-danger': errors.has('code') }"
                >
                <p v-show="errors.has('code')" class="help is-danger">{{ errors.first('code') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Brand*</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="brand"
                  v-model="brand"
                  v-validate="'required|min:2'"
                  :class="{ 'is-danger': errors.has('brand') }"
                >
                <p v-show="errors.has('brand')" class="help is-danger">{{ errors.first('brand') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Price*</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="price"
                  v-model="price"
                  v-validate="'required|decimal:2'"
                  :class="{ 'is-danger': errors.has('price') }"
                >
                <p v-show="errors.has('price')" class="help is-danger">{{ errors.first('price') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Stock*</label>
              <div class="control">
                <input
                  class="input"
                  type="number"
                  name="stock"
                  v-model="stock"
                  v-validate="'required|numeric'"
                  :class="{ 'is-danger': errors.has('stock') }"
                >
                <p v-show="errors.has('stock')" class="help is-danger">{{ errors.first('stock') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Belongs in*</label>
              <div class="control">
                <div class="select is-multiple">
                  <select
                    multiple
                    size="3"
                    name="belongs"
                    v-model="belongs"
                    v-validate="'required'"
                    :class="{ 'is-danger': errors.has('belongs') }"
                  >
                    <option
                      v-for="category in categories"
                      :key="category.key"
                      :value="category.key"
                    >{{ category.name }}</option>
                  </select>
                </div>
                <p
                  v-show="errors.has('belongs')"
                  class="help is-danger"
                >{{ errors.first('belongs') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Status*</label>
              <div class="control">
                <div class="select">
                  <select name="status" v-model="status">
                    <option value="1">Available</option>
                    <option value="0">Not Available</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Detail</label>
              <div class="control">
                <textarea class="textarea" name="description" v-model="description"></textarea>
              </div>
            </div>

            <error-bar :error="error"></error-bar>

            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >{{ !key ? 'Add' : 'Update' }}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import ErrorBar from "@/components/ErrorBar";
import apiJobMixin from "@/mixins/apiJobMixin";

export default {
  data() {
    return {
      key: 0,
      name: "",
      code: "",
      brand: "",
      price: "",
      stock: "",
      belongs: [],
      status: 1,
      description: "",
      image: null,
      imageName: "",
      imageUrl: "https://placehold.it/800x600",
      oldImageUrl: ""
    };
  },
  middleware: "verify-admin",
  mixins: [apiJobMixin],
  components: {
    ErrorBar
  },
  mounted() {
    const loadedCats = this.$store.getters["product/categories"];
    if (loadedCats.length === 0) {
      this.$store.dispatch("product/getCategories");
    }
    const product = this.$store.getters["product/product"];
    if (product != null) {
      this.populateForm(product);
      this.$store.dispatch("product/productCategories", product.key);
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const productData = {
            name: this.name,
            code: this.code,
            brand: this.brand,
            price: this.price,
            stock: this.stock,
            belongs: this.belongs /* category */,
            status: this.status,
            description: this.description,
            image: this.image
          };
          if (!this.key) {
            this.$store.dispatch("product/addProduct", productData);
          } else {
            productData.key = this.key;
            productData.imageUrl = this.imageUrl;
            productData.oldImageUrl = this.oldImageUrl;
            this.$store.dispatch("product/updateProduct", productData);
          }
        }
      });
    },
    onImageSelect(event) {
      const files = event.target.files;
      this.imageName = files[0].name;
      this.image = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(files[0]);
    },
    populateForm(product) {
      this.key = product.key;
      this.name = product.name;
      this.code = product.code;
      this.brand = product.brand;
      this.price = product.price;
      this.stock = product.stock;
      this.status = product.status;
      this.description = product.description;
      this.imageUrl = product.imageUrl;
      //oldImagUrl = imageUrl so we can delete the old one
      this.oldImageUrl = product.imageUrl;
    },
    jobsDone() {
      this.$router.push("product-list");
    },
    goBack() {
      window.history.go(-1);
    }
  },
  computed: {
    categories() {
      return this.$store.getters["product/categories"];
    },
    productCategories() {
      return this.$store.getters["product/productCategories"];
    }
  },
  watch: {
    productCategories(value) {
      if (value) {
        this.belongs = value;
      }
    }
  }
};
</script>


