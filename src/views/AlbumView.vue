<template>
  <div class="album">
    <div class="loading" v-if="!album_load">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
    <div v-if="album_load">
      <div>
        <div>
          <albuminfo class="left" testid="albuminformation" />
        </div>
        <div class="right">
          <div class="right">
            <song-component
              testid="songcomponent"
              v-for="(p, i) in album_tracks"
              :key="p._id"
              :index="i"
              :song_id="p._id"
              :song_artists="artist_name"
              :song_name="p.name"
              :song_length="p.duration"
              :isLiked="true"
              :song_album="album_name"
              :albumId="albumid"
              :isPlaylist="false"
              :playlistId="albumid"
              :isPlayable="p.playable"
              :artist_id="artist_id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  i {
    font-size: 70px;
    margin-top: 100px;
    color: white;
  }
}
.row {
  margin: 25px;
  margin-top: 0;
  display: flex;
}
.left {
  display: inline;
  position: absolute;
  width: 40%;
  left: 0;
}

.right {
  display: inline;
  position: absolute;
  width: 75%;
  right: 10px;
}
@media screen and (max-width: 1000px) {
  .left {
    display: block;
    width: 100%;
    position: relative;
  }

  .right {
    display: block;
    width: 100%;
    position: relative;
    right: 0;
  }
}
</style>

<script>
import SongComponent from "@/components/SongComponent.vue";
import albuminfo from "@/components/AlbumInfo.vue";
import { mapGetters } from "vuex";
import ColorThief from "colorthief";
/**
 * Album page made by Artist and you can like and add it to your liked songs also it contains the artist name which will move you to the artist page where you can find more and more of songs you like
 * @displayName Album Page
 * @example [none]
 */
export default {
  name: "albumview",
  data: function() {
    return {
      albumid: ""
    };
  },
  props: {},
  components: {
    SongComponent,
    albuminfo
  },
  computed: {
    ...mapGetters({
      album_tracks: "Album/album_tracks",
      album_length: "Album/album_length",
      album_load: "Album/album_loaded",
      artist_name: "Album/artist_name",
      album_name: "Album/album_name",
      artist_id: "Album/artist_id",
      album_image: "Album/album_image"
    })
  },
  /**
   * Called at loading the page to display album tracks and send the id to get that specific album
   * @public This is a public method
   */
  created: function() {
    this.albumid = this.$route.params.album_id;
    this.$store.dispatch("Album/album_tracks", this.$route.params.album_id);
    var img = new Image();
    img.setAttribute("crossOrigin", "");
    img.src =
      this.$url + "/api/images/" + this.album_image + "?belongs_to=album";
    img.addEventListener("load", () => {
      const colorThief = new ColorThief();
      var c = colorThief.getColor(img);
      console.log("the theif color", c);
      var element = document.querySelector(".album");
      element.style.background =
        "linear-gradient(-180deg," + "rgb" + "(" + c + ")," + "#161516" + " )";
      element.style.backgroundSize = " 600% 600% 200% 200% ";
      element.style.height = "200px";
    });
  },
  mounted() {
    this.albumid = this.$route.params.album_id;
  }
};
</script>
