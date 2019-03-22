<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset 3">
        <div v-for="(player,index) in players">
          <p>{{player.name}}</p>
          <div class="progress" >

            <div
              v-bind:style="{width : player.score+'%'}"
              class="progress-bar"
              role="progressbar"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 align-self-center">
        <div>
          <div class="card bg-primary text-white text-center p-3">
            <blockquote class="blockquote mb-0">
              <p>Bahasa Asal: {{activeQuestion.bahasaAsal}}</p>
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
            <div>
            
            <button type="submit" class="btn btn-primary mb-2 ml-2">submit</button>
            </div>
            <div>
            <button
              type="button"
              class="btn btn-primary mb-2"
              @click.prevent="skipQuestion"
            >next Question</button>
            </div>
          </form>
        </div>
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
      userId: localStorage.getItem("racerId"),
      startIndex: 0,
      data: "",
      name: "",
      author: "",
      players: "",
      status: ""
    };
  },
  created() {
    this.getQuestion();
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
        for (let i in this.players) {
          if (this.players[i].score >= 100) {
            let payload = {
              status: "finished"
            };
            this.updateRoom(payload);
            this.$router.replace(`/rooms/${this.id}`);
          }
        }
      });
  },
  methods: {
    getQuestion() {
      this.$db.collection("question").onSnapshot(querySnapshot => {
        console.log("onSnapshot");
        const data = [];
        querySnapshot.docs.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });

          // this.allTask = data
          console.log(data);
        this.$store.dispatch("fetchQuestion", data);
      });
    },
    skipQuestion() {
      let audio = new Audio("/assets/mp3/_next-question.mp3");
      audio.play();
      this.startIndex += 1;
    },
    submitAnswer(payload) {
      let obj;
      if (payload.artiBahasa.indexOf(this.answer) !== -1) {
        this.startIndex += 1;
        this.currentPlayer.score += 10;
        let payload = {
          [`users.${this.userId}.score`]: this.currentPlayer.score
        };

        let audio = new Audio("/assets/mp3/car.mp3");
        audio.play();

        this.updateRoom(payload);
      } else {
        let audio = new Audio("/assets/mp3/fail-buzzer.mp3");
        audio.play();
      }
    },
    updateRoom(payload) {
      this.$db
        .collection("rooms")
        .doc(this.id)
        .update(payload)
        .then(() => {
          // this.snapshot();
          // this.$router.replace("/games/" + this.id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    currentPlayer() {
      return this.players[this.userId];
    },
    activeQuestion() {
      return this.questions[this.startIndex];
    },
    activePlayers() {
      return this.players;
    },
    questions() {
      return this.$store.state.questions.sort(function func(a, b) {
        return 0.5 - Math.random();
      })
    }
  }
};
</script>

