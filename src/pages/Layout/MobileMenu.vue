<template>
  <ul class="nav nav-mobile-menu">
    <li>
          <div class="md-autocomplete">
            <md-autocomplete class="search" name="mobilesearchbox" v-model="query" :md-options="titleresults" @md-changed="querySearch" @md-opened="querySearch" :md-open-on-focus="false"  @md-selected="handleSelect">
              <label>Search...</label>
            </md-autocomplete>
          </div>
    </li>
  </ul>
</template>
<script>
import { common } from '../../utils';
export default {
  data () {
    return {
      search: null,
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
