<template>
  <div class="home">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/home.mp4" type="video/mp4">
        </video>
        <div class="content">
          <br><br><br>
          <div v-if="isSession">
              <button type="button" class="btn btn-lg" data-toggle="modal"><router-link to="/rooms">
              Translate Me Please </router-link>
              </button>
          </div>
          <div v-if="!isSession">
              <!-- Button trigger modal -->
              isSession false
              <button type="button" class="btn btn-lg" data-toggle="modal" data-target="#exampleModalCenter">
              Translate Me
              </button>
          </div>
          <!-- Modal for Unregistered Player -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Please enter your name</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Your Name:<br>
                    <input type="text" v-model="nama" placeholder="Your Name Here"><br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click.prevent="setName(nama)" data-dismiss="modal"><router-link to="/rooms"> Enter Game </router-link></button>
                </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'userenter',
  data() {
    return {
      isSession: false,
      nama: '',
    };
  },
  mounted() {
    if (localStorage.getItem('racerName')) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }
  },
  methods: {
    setName(input) {
      console.log('masuk sini', input);
      localStorage.setItem('racerName', input);
    },
  },
};
</script>


<style>
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
}

.content {
  position: fixed;
  top: 100px;
  width: 150%;
}
</style>
