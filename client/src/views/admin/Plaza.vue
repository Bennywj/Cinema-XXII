<template>
  <div class="p-4">
    <b-row>
      <b-col cols="2">
        <Sidebar/>
      </b-col>
      <b-col>
        <b-row class="pb-3">
          <b-col>
            <h3>Plazas</h3>
          </b-col>
          <b-col align="right">
            <b-button variant="success" :to="{ name: 'addPlaza'}"><icon name="plus-circle" class="mr-3"></icon>Add Plaza</b-button>
          </b-col>
        </b-row>
        <b-card
            tag="article" class="mb-3"
            v-for="plaza in plazas " :key="plaza.id">
          <b-row>
            <b-col>
              <img :src="plaza.image" style="height:300px;width:500px" v-if="plaza.image"/>
              <img src="../../img/emptyPlaza.png" style="height:300px;width:500px" v-if="!plaza.image"/>
            </b-col>
            <b-col>
              <h4><b>{{plaza.name}}</b></h4>
              <p><b>Address :</b> {{plaza.street}}</p>
              <p><b>Phone:</b> {{plaza.phone_number}}</p>
              <b-button type="submit" variant="info">Edit</b-button>
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
