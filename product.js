import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const token = document.cookie.replace(/(?:(?:^|.*;\s*)escaperoom\s*=\s*([^;]*).*$)|^.*$/, "$1");
const config = {
  headers: { Authorization: token },
};

const baseUrl = "https://vue3-course-api.hexschool.io/v2";

const app = {
  data() {
    return {
      productList: [],
      tempProduct: {},
      otherImg: "",
    };
  },
  methods: {
    getProducts() {
      const url = `${baseUrl}/api/escaperoom/admin/products`;
      axios
        .get(url, config)
        .then((res) => {
          this.productList = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProductDetail(product) {
      this.tempProduct = product;
      this.otherImg = "";
    },
    getOtherImg(img) {
      this.otherImg = img;
    },
    checkLogin() {
      const url = `${baseUrl}/api/user/check`;
      axios
        .post(url, {}, config)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
          alert("驗證失敗");
          window.location = "login.html";
        });
    },
  },
  created() {
    this.checkLogin();
  },
};

createApp(app).mount("#app");
