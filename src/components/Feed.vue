<template>
	<div class="md-layout">
      <div v-for="(feed, index) in items" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
			<stats-card data-background-color="green" :class="{ 'query-match': getQueryString(feed.title) }" :style=feedCardStyle(feed.link)>
				  <template slot="header">
					<md-icon v-if="getItemImg(feed) == '' " style="width: 72px;height: 72px;">store</md-icon>
					<img v-if="getItemImg(feed) != ''" :src=getItemImg(feed) id="feed-item-img"></img>
				  </template>

				  <template slot="content">
					<h4 class="title"><a target="_blank" :title="feed.title" :href="feed.link">{{ feed.title }}</a></h4>
				  </template>
				  
				  <template slot="description">
					<p class="category"><span v-html=feed.description_text></span></p>
				  </template>

				  <template slot="footer">
					<div class="stats">
					<h6  style="margin-top: 1px; margin-bottom: 1px;">
						<span v-if="feed.pubDate"><md-icon>date_range</md-icon> Posted <span class="text-dark">{{ updatedTime(feed.pubDate) }}</span>&nbsp;&nbsp;</span>
						<div class="flex-row" style="float: right;">
							<input type="checkbox" :checked=isFaved(feed.link) @change="faveIt(feed)" style="color: black;">&nbsp;Pending&nbsp;&nbsp;</input>
							<input type="checkbox" :checked=isApproved(feed.link) @change="approveIt(feed)" style="color: black;">&nbsp;Approved</input>
						</div>
					</h6>	
					</div>		
				  </template>		  
			</stats-card>
        </div>
  </div>
  <!-- end feed list -->
</template>

<script>
import { common } from '../utils';
import { StatsCard } from '@/components'



  export default {
    components: {
    StatsCard
	},
    props: {
      items: { default: [] },
      fav: false,
	  approved: false,
      query: ''
    },
	data() {
	return {
	  }    
	},
	computed: {


 },	
	mounted() {

    },
    methods: {
	    check(value) {
		console.log(value)
    },
	updatedTime(time) {
		return common.timeAgo(time);
    },		
	feedCardStyle(link) {
	  var fav = this.$store.getters.isFaved(link);
	  var approved = this.$store.getters.isApproved(link);
	     if(approved)
			return "border: 1px solid #13ce66;background-color: #b1e68a40;";
		 else if(fav)
			return "border: 1px solid #FFEB3B;background-color: #ffeb3b2b;";
	     else
			return "";
	  },
	getQueryString(title) {
	if(document.querySelector("div[name=searchbox] input")){
	 var searchterm = document.querySelector("div[name=searchbox] input").value;
	  if(searchterm && searchterm == title) {
	  console.log('PBK Feed getQ: ' + searchterm + ' title: ' + title);
	  return true;
	  } else 
	    return false;
		} else
		return false;
	 },
      addEvent (feed) {
		this.$store.commit('TOGGLE_FAV',feed);
	  },
	  isFaved(link) {
	    var fav = this.$store.getters.isFaved(link);
		//onsole.log(fav);
		if(fav) 
			return true;
        else 
			return false;
      },
	  isApproved(link) {
	    var approved = this.$store.getters.isApproved(link);
		//console.log(approved );
		if(approved ) 
			return true;
        else 
			return false;
      },
      faveIt(item) {
		var isfav = this.$store.getters.isFaved(item);
		  if(!isfav)
			item.favedAt = new Date();
          this.$store.commit('TOGGLE_FAV', item);
      },
      approveIt(item) {
	  		var isapproved = this.$store.getters.isApproved(item);
			if(!isapproved) {
				item.approvedAt = new Date();
				item.hideFromAckrellFeed = false;
			}
          this.$store.commit('TOGGLE_APPROVED', item);
      },
      faveTime(time) {
          return common.timeAgo(time);
      },
      approvedTime(time) {
          return common.timeAgo(time);
      },
	  getItemImg(item) {
		var images = item.images;
		if(images && images.length > 0) {
		//var imgstring = images[0].outerHTML;
		var imgstring = images[0];
		//let images = [...xmlDoc.querySelectorAll('img')].map(image=>image.getAttribute('src'));
		return imgstring;
		} else {
			return "";
		}
	  }
    }
  }
</script>

<style lang="css">
#feed-item-img {
	width: 88px;
	height: 88px;
	display: block;
	object-fit: cover;
	border-radius: 3px;
	margin-right: 0;
}
</style>
