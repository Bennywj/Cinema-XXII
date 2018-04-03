<template>
  <div class="p-4">
      <b-row>
          <b-col cols="2">
              <Sidebar/>
          </b-col>
          <b-col>
            <b-card title="Generate Theater"
                  tag="article"
                  style="max-width: 20rem;"
                  align="center">
              <b-form @submit="generateTheater">
                <b-container fluid>
                  <p v-html="theaterStatus"></p>
                  <div v-if="!theaterExist">
                    <b-button type="submit" variant="primary">Generate Theater</b-button>
                  </div>
                </b-container>
              </b-form>
            </b-card>
          </b-col>
      </b-row>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  name: 'GenerateTheater',
  components: {
    Sidebar
  },
  data () {
    return {
      theaterExist: false,
      theaterStatus: ''
    }
  },
  methods: {
    async generateTheater () {
      try {
        await AuthenthicationService.generateTheater()
        this.theaterStatus = 'Theaters have been generated'
        this.theaterExist = true
      } catch (err) {
      }
    }
  },
  async mounted () {
    const theaterObj = await AuthenthicationService.getTheater()
    console.log(theaterObj.data.theaters)
    if (theaterObj.data.theaters.length > 0) {
      this.theaterExist = true
      this.theaterStatus = 'Theaters have been generated'
    } else {
      this.theaterExist = false
      this.theaterStatus = 'Theaters haven\'t been generated'
    }
  }
}
</script>
