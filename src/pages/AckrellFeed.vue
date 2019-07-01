<template>
  <div :class="{ 'full-height': approved.length === 0 }" class="inner">


    <div class="channel-info" :key="isDataLoaded">
        <div v-if="getChannelImg() == '' " class="channel-img" style="box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);width: 80px;height: 80px;margin: 4px;border-radius: 10px;">
				    <md-icon  style="font-size: 105px!important;width: 80px;height: 80px;color: green;">check_box</md-icon>
        </div>
        <div v-if="getChannelImg() != ''" class="channel-img" style="width: 80px;height: 85px;margin: 4px;border-radius: 10px;">
					<img :src=getChannelImg() :id=approvedPicItemStyle() ></img>
        </div>		
		

        <h3>Ackrell Club Newsfeed Live</h3>
        <p> Current displayed public Ackrell Newsfeed</p>
          <p>
              {{ channeldata.description }}
              - <a :href="channeldata.url" target="_blank">{{ channeldata.url }}</a>
          </p>
          <p>
              Feed URL
              - <a :href="channeldata.url" target="_blank">{{ channeldata.url }}</a>
          </p>          <el-row>
            <el-col :sm="18" :xs="16">
              <p class="channel-meta">
				  <span class="text-dark">{{ channeldata.items.length }} posts found</span>
                  <i class="el-icon-date"></i> Blog updated <span class="text-dark">{{ updatedTime(channeldata.lastBuildDate) }}</span>
                  <i class="el-icon-time"></i> Last synced <span class="text-dark">{{ updatedTime(channeldata.updated) }}</span>

                  <transition v-if="loading" name="fade">
                      <span class="loading-feed">
                          <i class="el-icon-loading"></i> checking feed...
                      </span>
                  </transition>
                  <!-- end checking feed -->
              </p>
            </el-col>
          </el-row>
          <!-- end channel meta -->		
    </div>
    <!-- end header for approved -->

	
	<div class="md-layout" id="feed-list-approved">

      <div v-for="(feed, index) in approved" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" :id=approvedItemStyle()>
		<a target="_blank" :title="feed.title" :href="feed.link">
	  			<stats-card data-background-color="green" :class="{ 'query-match': getQueryString(feed.title) }"> 
	
				  <template slot="header">
					<md-icon v-if="getItemImg(feed) == '' " :style=approvedImgItemStyle()>store</md-icon>
					<img v-if="getItemImg(feed) != ''" :src=getItemImg(feed) :id=approvedPicItemStyle() ></img>
				  </template>

				  <template slot="content">
					<h4 class="title">{{ feed.title }}</h4>
				  </template>
				  
				  
				  <template slot="description">
					<p class="category"><span v-html=feed.description_text></span></p>
				  </template>

				  <template slot="footer">
					<div  class="stats" style="width: 100%;">
					<h6  style="margin-top: 1px; margin-bottom: 1px;">
						<span v-if="feed.pubDate"><md-icon>date_range</md-icon> Posted <span class="text-dark">{{ updatedTime(feed.pubDate) }}</span>&nbsp;&nbsp;</span>
						<span>&nbsp;Source: {{ getNameFromUrl(feed.link) }} </span>
					</h6>	
					</div>		
				  </template>		  
			</stats-card>
			</a>
        </div>

  </div>	

  </div>
</template>

<script>
//import draggable from 'vuedraggable';
import { common } from '../utils';
import { StatsCard } from '@/components';
import { axios } from '../utils';
import axiosmodule from 'axios';

  export default {
	 data: () => ({
      feedtitle: null,
      feedurl: null,
	  feeddescription: null,
	  feedimgurl: null,
	  selectedPostDate: new Date(),
	  ackrellpublished: [],
	  publishedFeed: [],
	  newsPostShow: false,
	  sortmode: false,
	  isDataLoaded: false,
	  showOptional: false,
	  channelimg: '',
	  channeldata: null

    }),
	mounted() {
		  console.log("PBK ackrellfeed getServerData mounted");
		  this.getServerData();
	  },
      computed : {
		  approved: {
			  get() {
			  return this.publishedFeed;
			  }, set(value) {
				  //this.$store.commit('UPDATE_APPROVED', value);
			  }
			},
      },
      components: { 
	StatsCard,  
	//draggable
	  },
    methods: {
	    check(value) {
		console.log(value)
    },
	getNameFromUrl(url) {
		return common.extractHostname(url);
	},
    updatedTime(time) {
            return common.timeAgo(time);
    },	
getServerData() {
		
		axios.get('getackrellfeed').then(res => {
				console.log("PBK getServerPublishedData axios return");

    let ackrellpublished = res.data;

    // append other info
    if( ackrellpublished.channel ) {
		this.channeldata = ackrellpublished.channel;
		console.log('PBK getServerPublishedData update');	
		var publishedtemp = ackrellpublished.channel.items;
						 publishedtemp.forEach( (published, pubindex) => {   
					this.publishedFeed[pubindex] = published;
			  })
	    this.channelimg = ackrellpublished.channel.img;
	this.isDataLoaded=true;	  
    }  
  })
	
	},	
	showcompacted() {

				  if(this.sortmode) {
					  return "true"
				  } else
					  return "false"
			
		  },
	approvedItemStyle () {
				   
					if(this.sortmode) {
						return "feed-item-approved-sort";
					  }	else {
						return  "feed-item-approved";
					  }					
	
				
	},
	approvedImgItemStyle () {
				   
					if(this.sortmode) {
						return "width: 50px;height: 50px;";
					  }	else {
						return "width: 72px;height: 72px;";
					  }					
	
				
	},
	approvedPicItemStyle () {
				   
					if(this.sortmode) {
						return "feed-item-approved-img-sort";
					  }	else {
						return  "feed-item-approved-img";
					  }	
				
	},
	showOptionalStyle() {
					if(this.showOptional) {
						return "display: block;";
					  }	else {
						return "display: none;";
					  }	
	},	
	cardDescriptionStyle() {
					if(this.sortmode) {
						return "display: none;";
					  }	else {
						return "";
					  }	
	},
    handleChange() {
      console.log('changed');
    },
    inputChanged(value) {
      console.log(value);
    },
    getComponentData() {
		//this.$store.commit('UPDATE_APPROVED', this.approved);
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
      
        }
      };
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
	  isHideFromAckrellFeed(link) {
	    var hideNewsFeed = this.$store.getters.isHideFromAckrellFeed(link);
		//console.log(approved );
		if(hideNewsFeed ) 
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
      hideFromAckrellFeed(item) {
	  		var isHide = item.hideFromAckrellFeed;
			if(!isHide)
				item.hideFromAckrellFeed = true;
			else
				item.hideFromAckrellFeed = false;
          this.$store.commit('TOGGLE_HIDE_ACKRELLNEWSFEED', item);
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
	  },
	  getChannelImg() {
		return this.channelimg;
		}
	  
    }	  
  }
</script>

<style lang="css">
@media (max-width: 1000px){
#feed-list-approved {
	width: 75%;
}
}
#approved-edit-label {
	font-size: 18px;
}
#approved-helper-text {
	font-size: 15px;
}

#feed-item-approved {
	margin-bottom: 25px;
}

#feed-item-approved-sort {
	margin-bottom: 10px;
}

#feed-item-approved-img {
	width: 88px;
	height: 88px;
	display: block;
	object-fit: cover;
	border-radius: 3px;
	margin-right: 0;
}

#feed-item-approved-img-sort {
	width: 44px;
	height: 44px;
	display: block;
	object-fit: cover;
	border-radius: 3px;
	margin-right: 0;
}

#create-post {
    margin-left: 15px;
    border: 1px solid #bbbbbb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}

.demo-block {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}

.demo-block .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #39454b;
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

demo-block .source {
    padding: 24px;
}

demo-block .meta {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    height: 0;
    -webkit-transition: height .2s;
    transition: height .2s;
    overflow: scroll;
}
</style>