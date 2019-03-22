<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        {{curret}}
        <div class="progress">
          <div
            v-bind:style="{width : score+'%'}"
            class="progress-bar"
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 align-self-center">
        <div class="card bg-primary text-white text-center p-3">
          <blockquote class="blockquote mb-0">
            <p>{{activeQuestion.kataAsal}}</p>
          </blockquote>
        </div>
        <form class="form-inline" @submit.prevent="submitAnswer(activeQuestion)">
          <div class="form-group mx-sm-3 mb-2">
            <label for="inputPassword2" class="sr-only">Answer here</label>
            <input
              v-model="answer"
              type="text"
              class="form-control"
              id="inputPassword2"
              placeholder="Your Answer"
            >
          </div>
          <button type="submit" class="btn btn-primary mb-2">submit</button>
          <button type="submit" class="btn btn-primary mb-2">next Question</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "game",
  data() {
    return {
      id: this.$router.currentRoute.params.id,
      answer: "",
      score: 0,
      startIndex: 0,
      data: "",
      name: "",
      author: "",
      players: "",
      status: "",
      answer: "",
      score: 0,
      startIndex: 0,
      questions: [
        {
          artiBahasa: ["mendapatkan", "memperoleh", "dapat", "mengambil"],
          bahasaAsal: "English",
          kataAsal: "get"
        },
        {
          artiBahasa: ["makan"],
          bahasaAsal: "English",
          kataAsal: "eat"
        },
        {
          artiBahasa: ["minum"],
          bahasaAsal: "English",
          kataAsal: "drink"
        }
      ]
    };
  },
  created() {
    this.snapshot()
    // this.$db
    //   .collection("rooms")
    //   .doc(this.id)
    //   .onSnapshot(doc => {
    //     this.id = doc.id;
    //     let data = doc.data();
    //     this.name = data.name;
    //     this.author = data.author;
    //     this.players = data.users;
    //     this.status = data.status;
    //   });
  },
  methods: {
    snapshot() {
      this.$db
        .collection("rooms")
        .doc(this.id)
        .onSnapshot(doc => {
          this.id = doc.id;
          let data = doc.data();
          this.name = data.name;
          this.author = data.author;
          this.players = data.users;
          this.status = data.status;
        });
    },
    submitAnswer(payload) {
      console.log(payload);
      let obj;
      if (payload.artiBahasa.indexOf(this.answer) !== -1) {
        this.startIndex += 1;
        this.score += 10;
        this.currentPlayer.score = this.score;
        this.$db
          .collection("rooms")
          .doc(this.id)
          .update({
            "users.1.score": this.currentPlayer.score
          })
          .then(() => {
            this.snapshot()
            // this.$router.replace("/games/" + this.id);
          })
          .catch(err => {
            console.log(err);
            
          })
    this.$db
      .collection("rooms")
      .doc(id)
      .onSnapshot(doc => {
        this.id = doc.id;
        let data = doc.data();
        this.name = data.name;
        this.author = data.author;
        this.players = data.users;
        this.status = data.status;
      });
  },
  methods: {
    submitAnswer(payload) {
      console.log(payload);

      if (payload.artiBahasa.indexOf(this.answer) !== -1) {
        this.startIndex += 1;
        this.score += 10;
        // console.log(this.startIndex,"====");
      }
    }
  },
  computed: {
    currentPlayer() {
      return this.players[1];
    },
    activeQuestion() {
      console.log("masuk sini");

      return this.questions[this.startIndex];
    }
  }
};
</script>

