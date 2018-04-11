<template>
  <div class="p-4">
    <b-row>
      <b-col cols="2" v-if="$store.state.user && $store.state.isAdmin">
        <Sidebar/>
      </b-col>
      <b-col>
        <b-row class="pb-3">
          <b-col>
            <h3>Plazas</h3>
          </b-col>
          <div v-if="$store.state.user">
            <b-col align="right" v-if="$store.state.user['role'] == 'admin'">
              <b-button variant="success" :to="{ name: 'addPlaza'}"><icon name="plus-circle" class="mr-3"></icon>Add Plaza</b-button>
            </b-col>
          </div>
        </b-row>
        <b-card
            tag="article" class="mb-3"
            v-for="plaza in plazas " :key="plaza.id">
          <b-row>
            <b-col>
              <router-link :to="{ name: 'plazaSchedule', params: { id: plaza.id } }">
                <img :src="plaza.image" style="height:300px;width:100%" v-if="plaza.image"/>
              </router-link>
            </b-col>
            <b-col>
              <h4><b>{{plaza.name}}</b></h4>
              <p><b>Address :</b> {{plaza.street}}</p>
              <p><b>Phone:</b> {{plaza.phone_number}}</p>
              <div v-if="$store.state.user">
                <b-button type="submit" variant="info" v-if="$store.state.user['role'] == 'admin'">Edit</b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'Plaza',
  components: {
    Sidebar
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  data () {
    return {
      plazas: []
    }
  },
  async mounted () {
    const plazasObj = await AuthenthicationService.getPlaza()
    const plazasData = plazasObj.data.plazas
    for (var i = 0; i < plazasData.length; i++) {
      var image = null
      try {
        image = await AuthenthicationService.getProfile(plazasData[i].name)
        image = 'data:image/jpg;base64,' + image
      } catch (err) {
      }
      var obj = plazasData[i]
      obj['image'] = image
      this.plazas.push(obj)
    }
  }
}
</script>
