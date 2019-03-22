<template>
  <div class="home">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/home.mp4" type="video/mp4">
        </video>
        <div class="content">
          <br><br><br>
          <div v-if="isSession">
              <div id="row">
                <button type="button" class="btn btn-outline-warning btn-lg" data-toggle="modal"><router-link to="/rooms">
                Translate Me Please </router-link>
                </button>
              </div>
              <br>
              <div id="row">
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalCenter">
                New Player Name 
                </button>
              </div>
          </div>
          <div v-if="!isSession">
              <!-- Button trigger modal -->
              isSession false
              <button type="button" class="btn btn-lg" data-toggle="modal" data-target="#exampleModalCenter">
              Translate Me
              </button>
          </div>
          
          
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
</template>

<script>
export default {
  name: 'userenter',
  data() {
    return {
      isSession: false,
      nama: '',
      racerId: '',
    };
  },
  created() {
    this.getQuestion()
    // this.$store.dispatch('getQuestions')
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
      localStorage.setItem('racerId', this.getRandomId())
      this.nama ='';
      this.racerId='';
    },
    getRandomId() {
      //The maximum is 10 millions and minimum 1 million
      return Math.floor(Math.random() * (10000000 - 1000000)) + 1000000; 
    },
    getQuestion() {

      this.$db
      .collection('question')
      .onSnapshot( (querySnapshot)=> {
        console.log('onSnapshot')
          const data = [];
          querySnapshot.docs.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() })
          })

          // this.allTask = data 
          console.log(data);
             
        this.$store.dispatch('fetchQuestion', data)

      })
    }
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
