<template>
    <div>
        <div id="roomenterback">
            <img src="../assets/Roomenter.jpg">
        </div>
        
        <div id="roomentercontent">
         <!-- Button trigger modal for New Room-->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createRoomModal">
        Create New Room
        </button>

        <!-- Modal for New Room -->
        <div class="modal fade" id="createRoomModal" tabindex="-1" role="dialog" aria-labelledby="createRoomModalTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Please enter your new room</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  Your Room Name:<br>
                  <input type="text" v-model="nama" placeholder="Your Room Name Here"><br>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createNewRoom"> Create Room </button>
              </div>
              </div>
          </div>
        </div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-4 mb-3" v-for="room in rooms" :key="room.id">
                    <div class="card mx-auto"><h2><center><strong>{{ room.name }}</strong></center></h2>

                        <div class="card-body">
                            Made by {{ room.author }} <br>
                            <div class="row" style="padding:5px">
                                <div class="col-sm-12">
                                    <!-- Button to join rooms -->
                                    <button @click="xx" type="button" class="btn btn-primary">
                                        <router-link :to="'/rooms/' + room.id "> Enter Room </router-link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'roomenter',
  data() {
    return {
      rooms: [],
      nama: '',
    };
  },
  mounted() {
    console.log('yuk cari rooms');
    this.getAllRooms()
      .onSnapshot(roomdata => {
        this.rooms = [];
        console.log('hasil tarik data room', roomdata);
        roomdata.forEach(doc => {
          console.log(doc.id)
          console.log(doc.data())
          this.rooms.push(doc.data());
        });
        console.log("hasil looping", this.rooms)
      });
  },
  methods: {
    createNewRoom() {
      console.log('masuk method add room', localStorage.getItem('racerName'));
      this.$db.collection('rooms')
        .add({
          name: this.nama,
          author: localStorage.getItem('racerName'),
          status: 'pending',
          users: [
            {
              id: localStorage.getItem('racerName'),
              name: localStorage.getItem('racerName'),
              score: 0,
            },
          ],
        })
        .then((docref) => {
          console.log('berhasil add', docref);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllRooms() {
      console.log('get all rooms');
      return this.$db.collection('rooms')
    },
  },
};
</script>

<style>
#roomenterback {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
}

#roomentercontent {
  position: fixed;
  top: 100px;
  width: 100%;
}
</style>