<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{$route.name}}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete"  style="width: 100%;">
            <md-autocomplete class="search" name="searchbox" v-model="query" :md-options="titleresults" @md-changed="querySearch" @md-opened="querySearch" @md-selected="handleSelect">
              <label>Search...</label>
            </md-autocomplete>
          </div>
          <md-list>
            <md-list-item to="/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>


          </md-list>
        </div>
      </div>
    </div>

  </md-toolbar>
</template>

<script>
import { common } from '../../utils';
export default{
    data() {
      return {
        rules: {
          url: [{
            required: true,
            type: 'url',
            message: 'Please enter a valid feed url', trigger: 'blur'
          }]
        },
        query: null,
		queryresults: [],
		titleresults: []
      }
    },
	computed: {
      channels() {
        return this.$store.getters.channels
      }
    },
	methods: {
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
	clearSearchInput() {
        this.query = '';
      },
      querySearch(searchTerm) {
          // get all channels
          var feeds = this.channels;

          // result holder
          let results = [];
		  let titles = [];
          if( searchTerm ) {
            // search in all channels post titles
            feeds.forEach( (channel, channelIndex) => {
              let matched = channel.channel.items.forEach( (post) => {
			  if(post.title) {
					  if(post.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
					    titles.push (post.title);
						results.push( {
						  value : post.title,
						  link: post.link,
						  channel: channel.channel.title,
						  channelIndex: channelIndex
						});
					  }
				  }
              })
            })

            // call callback function to return suggestions
            this.queryresults = results;
			this.titleresults = titles;
          }
        },
        handleSelect(selected) {
          // navigate to chosen result
		  //this.$store.commit('SET_SEARCH_SELECTED', selected);
		  console.log("Handle Selected: " + selected);
		  let index = this.titleresults.indexOf(selected);
		  let item = this.queryresults[index];
          this.$router.push({ name: 'Channel', params: {
            index: item.channelIndex,
            title: common.slug(item.channel)
          }});
        }
  }
}
</script>

<style lang="css">
</style>
