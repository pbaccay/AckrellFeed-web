<template>
  <div :class="{ 'full-height': favs.length === 0 }" class="inner">

    <div class="jumbotron" v-if="!favs.length">
        <h2>Potential News posts List</h2>
        <p>You haven't selected any news posts for final approval.</p>
    </div>
    <!-- end jumbotron for empty favs -->

    <div v-if="favs.length" class="channel-info">
        <div class="channel-img" style="box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);width: 80px;height: 80px;margin: 4px;border-radius: 3px; background-color: #FFC107;">
            <h1 class="text-thumb">
                <i class="el-icon-star-on" style="vertical-align: text-top;"></i>
            </h1>
        </div>

        <h3>Pending Approval</h3>
        <p>All the news posts considered for approval are here.</p>
        <p class="channel-meta">
            <span class="text-dark">You have selected {{ favs.length }}</span> news post(s)
        </p>
    </div>
    <!-- end header for favs -->

    <feed :items="favs" :fav="true" :query="$parent.query"></feed>
  </div>
</template>

<script>
 import Feed from '../components/Feed.vue';
import { axios } from '../utils';
  export default {
      computed : {
          favs() {
            return this.$store.getters.favs;
          }
      },
	  mounted() {
		this.getServerPendingData();
	  },
	  methods : {
			getServerPendingData() {
		axios.get('getackrellpending').then(res => {
				console.log("PBK getServerPendingData axios return");

    let ackrellpending = res.data;

    // append other info
    if( ackrellpending.channel  && ackrellpending.channel.items ) {
		console.log('PBK getackrellpending update');	
				this.$store.commit('UPDATE_FAVS', ackrellpending.channel.items);
				console.log('PBK getackrellpending size ' +  ackrellpending.channel.items.length);	

    }

   
  })
	
	},  
	  },
      components: { Feed }
  }
</script>
