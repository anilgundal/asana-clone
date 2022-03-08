<script>
export default {
  data() {
    return {
      imagePreviewURL: null,
    };
  },
  methods: {
    onFileChange(payload) {
      //const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload; // in case vuetify file input
      if (file) {
        this.imagePreviewURL = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
      } else {
        this.imagePreviewURL = null;
      }
    },
  },
};
</script>
