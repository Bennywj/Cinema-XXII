<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                :interval="2500"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                width="50">
      <b-carousel-slide caption="Ready Player One"
                        text="When the creator of a virtual reality world called the OASIS dies, he releases a video in which he challenges all OASIS users to find his Easter Egg, which will give the finder his fortune.">
        <img slot="img" class="d-block img-fluid w-100" style="height:500px !important;"
             src="../img/dashboard/ready-player-one-cinema-banner.png" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide caption="Avenger: Infinity War"
                        text="The fate of the planet and existence itself has never been more uncertain as everything the Avengers have fought for has led up to this moment.">
        <img slot="img" class="d-block img-fluid w-100" style="height:500px !important;background-size:cover !important"
             src="../img/dashboard/avengers_infinity_war-HD.jpg" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide caption="Incredible 2"
                        text="Elastigirl springs into action to save the day, while Mr. Incredible faces his greatest challenge yet -- taking care of the problems of his three children.">
        <img slot="img" class="d-block img-fluid w-100" style="height:500px !important;background-size:cover !important"
             src="../img/dashboard/incredible2.jpg" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide caption="Pacific Rim Uprising"
                        text="Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.">
        <img slot="img" class="d-block img-fluid w-100" style="height:500px !important;background-size:cover !important"
             src="../img/dashboard/Pacific-Rim-2-cinema-banner.png" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide caption="Rampage"
                        text="When three different animals become infected with a dangerous pathogen, a primatologist and a geneticist team up to stop them from destroying Chicago.">
        <img slot="img" class="d-block img-fluid w-100" style="height:500px !important;background-size:cover !important"
             src="../img/dashboard/rampage-cinema-banner.png" alt="image slot">
      </b-carousel-slide>
    </b-carousel>
    <div class="pl-3 pr-3">
    <h2 class="p-3">TOP 10 MOVIES</h2>
    <div class="pb-5">
      <b-row>
          <b-col>
              <b-list-group>
                <b-list-group-item v-for="(genre,index) in genres.slice(0,5) " :key="genre.id">
                  <b-row>
                    <b-col cols="1">
                      <b-badge>{{ index+1 }}</b-badge>
                    </b-col>
                    <b-col>
                      {{ genre.title }}
                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
          </b-col>
          <b-col>
              <b-list-group>
                <b-list-group-item v-for="(genre,index) in genres.slice(5,10)" :key="genre.no">
                  <b-row>
                    <b-col cols="1">
                      <b-badge>{{ index+6 }}</b-badge>
                    </b-col>
                    <b-col>
                      {{ genre.title }}
                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
          </b-col>
      </b-row>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      genres: [
        { no: 1, title: 'Avenger: Infinity War' },
        { no: 2, title: 'Black Panther' },
        { no: 3, title: 'Deadpool 2' },
        { no: 4, title: 'Ready Player One' },
        { no: 5, title: 'A Wrinkle In Time' },
        { no: 6, title: 'Annihilation' },
        { no: 7, title: 'The Incredibles 2' },
        { no: 8, title: 'Jurrasic World: Fallen Kingdom' },
        { no: 9, title: 'Pacific Rim Uprising' },
        { no: 10, title: 'Tomb Raider' }
      ]
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = false
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style>
  span.badge {
    background-color:#FB8C00 !important;
  }
</style>
