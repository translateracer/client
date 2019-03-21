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
      <div class="col-8 offset-2">
        <h2>{{name}}</h2>
        <button class="btn btn-primary btn-lg my-5" @click="startGame()" v-if="xi === this.author && status ==='pending' && players.length > 0">Start Game</button>
        <button class="btn btn-primary btn-lg my-5" v-if="status==='started'">Game started</button>
      </div>
      <ul class="col-8 offset-2 list-group text-left">
        <strong>Player list</strong>
        <li class="list-group-item border-0" v-for="(player, i) in players" :key="players.id">
          {{player.name}}
          <div class="float-right" v-if="player.id===author">
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
      localStorage.setItem('xi', 'uyeuye');
      this.xi = localStorage.xi;
      this.getRoomById(this.$router.currentRoute.params.id)
        .onSnapshot((doc) => {
          this.id = doc.id;
          let data = doc.data();
          this.name = data.name;
          this.author = data.author;
          this.players = data.users;
          this.status = data.status;
        })
    },
    methods: {
      startGame() {
        this.$db.collection('rooms')
          .doc(this.id)
          .update({
            status: 'started',
          })
          .then(() => {
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
        id: ``,
        name: ``,
        author: ``,
        status: ``,
        xi: ``,
        players: new Array(5).fill('Lorem ipsum')
      }
    }
  }
</script>

<style scoped>

</style>
