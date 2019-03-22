<template>
  <div class="container">
    <div class="row">
      <form>
        <div class="form-group">
          <label></label>
        </div>

      </form>
    </div>
    <div class="row">

      <div class="col-8 offset-2" v-if="!newPlayer">
        <h2>{{name}}</h2>
        <div v-if="xi === this.author && status ==='pending' && Object.keys(players).length > 1" class="mb-3">
          <button class="btn btn-primary btn-lg my-5" @click="startGame()">Start Game</button>
          <button class="btn btn-primary btn-lg my-5" v-if="status==='started'">Game started</button>
          <div class="text-left" v-if="false">
            <small class="text-muted">Share :</small>
            <a target="_blank" class="btn btn-primary btn-small"
               href="https://www.facebook.com/sharer/sharer.php?u=http%3A//localhost%3A8080/rooms/kH6C21seFTxSk7deaRxQ">Facebook</a>
          </div>
        </div>
        <div v-if="xi !== this.author && newPlayer" class="mb-3">
          <button class="btn btn-primary btn-lg my-5">Waiting...</button>
        </div>
        <div class="alert" v-if="status === 'finished'">
          <h3 class="alert alert-success">Congratulation!!</h3>
          <h2><strong>{{winner.name}}</strong></h2>
          <h3>{{winner.score}}</h3>
        </div>
      </div>
      <div class="col-8 offset-2" v-else>
        <h2>{{name}}</h2>
        <div class="mb-3">
          <button class="btn btn-primary btn-lg my-5" @click="joinGame()">Join Room</button>
        </div>
      </div>
      <ul class="col-8 offset-2 list-group text-left">
        <strong>Player list</strong>
        <li class="list-group-item border-0" v-for="(player, i) in players" :key="player.id">
          {{player.name}}
          <div class="float-right" v-if="i===author">
            Room master
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Rooms",
    mounted() {
      this.xi = localStorage.racerId;
      console.log(this.xi);
      this.getRoomById(this.$router.currentRoute.params.id)
        .onSnapshot((doc) => {
          this.rooms = doc.data();
          this.id = doc.id;
          let data = doc.data();
          this.name = data.name;
          this.author = data.author;
          this.players = data.users;
          this.status = data.status;
          let winner = {};
          let score = 0;
          let isFound = false;
          this.newPlayer = false;
          for (let item in data.users) {
            if (this.xi === item) {
              isFound = true;
            }
            let prop = data.users[item];
            if (score < +prop.score) {
              score = prop.score;
              winner = prop;
            }
          }
          this.winner = winner;
          this.newPlayer = !isFound;
          if (isFound && this.status === 'started') {
            this.$router.replace('/games/' + this.id)
          }
        })
    },
    methods: {
      joinGame() {
        let newData = {};
        newData[localStorage.racerId] = {
          name: 'uye',
          score: 0
        };
        Object.assign(this.rooms['users'], newData);
        this.$db.collection('rooms')
          .doc(this.id)
          .set(this.rooms);
        this.newPlayer = false;
      },
      startGame() {
        this.$db.collection('rooms')
          .doc(this.id)
          .update({
            status: 'started',
          })
          .then(() => {
            let audio = new Audio('/assets/mp3/btn_start_game.mp3');
            audio.play();
            this.$router.replace('/games/' + this.id)
          });
      },
      getRoomById(id) {
        return this.$db.collection('rooms')
          .doc(id);
      },
    },
    data() {
      return {
        rooms: {},
        id: ``,
        name: ``,
        author: ``,
        status: ``,
        xi: ``,
        winner: ``,
        newPlayer: false,
        players: {}
      }
    }
  }
</script>

<style scoped>

</style>
