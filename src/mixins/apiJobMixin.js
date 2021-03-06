//this mixin requires you to import your own jobsDone method,
//which updates the display after the processing has finished
export default {
  methods: {
    removeErrors() {
      this.$validator.reset();
      this.$store.commit("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    busy() {
      return this.$store.getters.busy;
    },
    jobDone() {
      return this.$store.getters.jobDone;
    }
  },
  watch: {
    jobDone(value) {
      if (value) {
        this.$store.commit("setJobDone", false);
        if (typeof (this.jobsDone == 'functions')) {
          this.jobsDone();
        }
      }
    }
  },
}
