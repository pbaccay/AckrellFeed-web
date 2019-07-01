<template>
  <div :class="{ 'full-height': approved.length === 0 }" class="inner">

    <div class="jumbotron" v-if="!approved.length">
        <h2>Preview Ackrell Club Newsfeed</h2>
        <p>You dont have any approved items.  Configure the preview using the Approved menu option</p>
    </div>
    <!-- end jumbotron for empty approved -->

    <div v-if="approved.length" class="channel-info">
        <div class="channel-img" style="box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);width: 80px;height: 80px;margin: 4px;border-radius: 10px;">
			<md-icon style="    font-size: 105px!important;width: 80px;height: 80px;color: green;">check_box</md-icon>
        </div>

        <h3>Ackrell Club Newsfeed Preview</h3>
        <p> Preview the Ackrell Club Newsfeed as configured in Approved menu prior to publishing for public use</p>
        <p class="channel-meta">
            <span class="text-dark">You have selected {{ approved.length }}</span> news post(s)
        </p>
    </div>
    <!-- end header for approved -->

<div class="md-layout">
	<div class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100" id="create-post">
					<div class="md-layout" v-if="newsPostShow == false">
						<div class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100">
							<md-checkbox v-model="previewEnabled" style="max-height: 80px;">Preview Mode
														<span class="md-helper-text"> - Unchecked is edit mode</span>
							</md-checkbox>	
						</div>
						<div class="md-layout-item md-size-75 md-medium-size-75 md-small-size-100">
							<md-checkbox v-model="showExistingFeed" style="max-height: 80px;" :disabled="previewEnabled">Add to existing feed 
							<span class="md-helper-text">(Uncheck replace live feed with current view)</span>
							</md-checkbox>	
						</div>
						<div class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100">
							<md-checkbox v-model="showHiddenItems" style="max-height: 80px; overflow: hidden;" :disabled="previewEnabled">Show hidden items (For use with edit mode)
							</md-checkbox>	
						</div>	
						<div class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100">
							<md-checkbox v-model="sortmode" style="max-height: 80px; overflow: hidden;" :disabled="previewEnabled">Compact Items for easier sorting
							</md-checkbox>	
						</div>						
					</div>
		<div v-if="newsPostShow">
			<md-field>
			<label id="approved-edit-label">News post title (required)</label>
			<md-input v-model="feedtitle"></md-input>
				<span class="md-helper-text" id="approved-helper-text">Title for news post</span>
			</md-field>
			<md-field>
			<label id="approved-edit-label">URL Link (required)</label>
			<md-input v-model="feedurl"></md-input>
				<span class="md-helper-text" id="approved-helper-text">URL link to news post (ex: https://news.google.com)</span>
			</md-field>
			<md-field>
			<label id="approved-edit-label">Post Summary (required)</label>
			<md-textarea v-model="feeddescription"></md-textarea>
				<span class="md-helper-text" id="approved-helper-text">Summary of news post</span>
			</md-field>
			<md-datepicker v-model="selectedPostDate">
				<label id="approved-edit-label">Select date</label>
			</md-datepicker>
			<div class="demo-block demo-box demo-component-docs demo-buttons.html">


				<div class="meta"  :style=showOptionalStyle()> 
					<div class="highlight" style="width: 100%;">
						<md-field>
						<label id="approved-edit-label">Thumbnail (optional)</label>
						<md-input v-model="feedimgurl"></md-input>
						<span class="md-helper-text" id="approved-helper-text">Enter a an img url 300px for thumbnail(ex. https://static1.squarespace.com/AckrellCapital2018Globe.JPG) or select category image from dropdown list</span>
						</md-field>							
					</div>
				</div> 				
				
				<div v-if="showOptional == false" class="demo-block-control" style="left: 0px;" @click="showOptional = true">
					<i class="el-icon-caret-bottom"></i> 
					<span class="showText" > Show Optional fields</span>
				</div>
				<div v-if="showOptional == true" class="demo-block-control" style="left: 0px;" @click="showOptional = false">
					<i class="el-icon-caret-top"></i> 
					<span class="showText" > Hide Optional fields</span>
				</div>				
			</div>			
				<div class="md-layout">
				    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
						<md-button class="md-success md-block" @click="newsPostShow = false"> Cancel </md-button>
					</div>
					<div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
						<md-button class="md-success md-block" @click="addAckrellNewsPost()"> Ok </md-button>
					</div>
				</div>
		</div>
	</div>

	

	<div class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100" id="create-post">
				<div class="md-layout">
						<div class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100"">
						<md-button class="md-success md-block" @click="updateAckrellApproved()" :disabled="!previewEnabled" style="overflow: hidden;"> Publish Current View to newsfeed </md-button>
						</div>
						<div class="md-layout-item md-size-100">
						<span class="md-helper-text" id="approved-helper-text" style="display: block;"> !!! Publish will update current public Ackrell newsfeed to this view !!! </span>
						<span class="md-helper-text" id="approved-helper-text" style="display: block;">1. Must have "Preview Mode" checked to publish changes.</span>
						<span class="md-helper-text" id="approved-helper-text" style="display: block;">2. Leaving this page before publishing will undo changes.</span>
						</div>						
				</div>
	</div>
</div>
	
	<div class="md-layout" id="feed-list-approved">
	<draggable :list="approved" :component-data="getComponentData()" :options="{disabled:editEnabled}">
      <div v-for="(feed, index) in approved" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" :id=approvedItemStyle()>
			<a v-if="previewEnabled" target="_blank" :title="feed.title" :href="feed.link">
	  			<stats-card v-if="isHideFromAckrellFeed(feed.link) == false" :showcompact="showcompacted()" data-background-color="green" :class="{ 'query-match': getQueryString(feed.title) }" :style=feedCardStyle(feed.link)> 
	
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
						<span v-if="feed.ackrellCreated == true  && !previewEnabled" style="margin-left: 5%;color: black;font-size: .75rem;" >&nbsp;Ackrell Created Post</span>
						<div v-if="!previewEnabled" class="flex-row" style="float: right;">
							<input type="checkbox" :checked=isHideFromAckrellFeed(feed.link) @change="hideFromAckrellFeed(feed)" style="color: black;">&nbsp;Hide Newsfeed</input>					
						</div>						
					</h6>	
					</div>		
				  </template>		  
			</stats-card>
			</a>
	  			<stats-card v-if="(!previewEnabled && showHiddenItems) || (!previewEnabled && isHideFromAckrellFeed(feed.link) == false)" :showcompact="showcompacted()" data-background-color="green" :class="{ 'query-match': getQueryString(feed.title) }" :style=feedCardStyle(feed.link)> 
	
				  <template slot="header">
					<md-icon v-if="getItemImg(feed) == '' " :style=approvedImgItemStyle()>store</md-icon>
					<img v-if="getItemImg(feed) != ''" :src=getItemImg(feed) :id=approvedPicItemStyle() ></img>
				  </template>

				  <template slot="content">
					<h4 class="title"><a target="_blank" :title="feed.title" :href="feed.link">{{ feed.title }}</a></h4>
				  </template>
				  
				  
				  <template slot="description">
					<p class="category"><span v-html=feed.description_text></span></p>
				  </template>

				  <template slot="footer">
					<div  class="stats" style="width: 100%;">
					<h6  style="margin-top: 1px; margin-bottom: 1px;">
						<span v-if="feed.pubDate"><md-icon>date_range</md-icon> Posted <span class="text-dark">{{ updatedTime(feed.pubDate) }}</span>&nbsp;&nbsp;</span>
						<span>&nbsp;Source: {{ getNameFromUrl(feed.link) }} </span>
						<span v-if="feed.ackrellCreated == true" style="margin-left: 5%;color: black;font-size: .75rem;" >&nbsp;Ackrell Created Post</span>
						<div v-if="!previewEnabled" class="flex-row" style="float: right;">
							<input type="checkbox" :checked=isHideFromAckrellFeed(feed.link) @change="hideFromAckrellFeed(feed)" style="color: black;">&nbsp;Hide Newsfeed</input>					
						</div>						
					</h6>	
					</div>		
				  </template>		  
			</stats-card>			
        </div>
	</draggable>
  </div>	

  </div>
</template>

<script>
import draggable from 'vuedraggable';
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
	  newsPostShow: false,
	  sortmode: false,
	  previewEnabled: true,
	  showOptional: false,
	  showHiddenItems: false,
	  originalApproved: [],
	  editedApproved: [],
	  combinedFeed: [],
	  publishedFeed: [],
	  uploadData: [],
	  duplicatesRemoved: false,
	  showExistingFeed: false,
	  isSaveChangesDisabled: false

    }),      mounted() {
		  var origapprvd = this.$store.getters.approved;
		  origapprvd.forEach( (appr, apprindex) => {   
		  this.originalApproved[apprindex] = appr;

		  })
		  console.log("PBK ackrellchannel getServerData mounted");
		  this.getServerData();
	  },	
      computed : {
		  approved: {
			  get() {
				var iscombined = this.showExistingFeed;
				var edittemp = [];
				var pubtemp = [];
				//combine pending approved and public ackrell feeds if user combines
				if(this.showExistingFeed) {
					if(!this.previewEnabled  && this.combinedFeed.length == 0) {

					this.editedApproved.forEach( (appv, appvindex) => {   
						edittemp[appvindex] = appv;
						var index = -1;
							//Do not run remove duplicate logic again if done one time as public feed shouldn't change (todo: test if multiple users modifying at same time)
							//if(!this.duplicatesRemoved) {
								this.publishedFeed.forEach( (combined, combindex) => {   
									if(appv.link == combined.link) {
										index = combindex;
									}
								})
								if( index !== -1 ) {
									this.publishedFeed.splice(index, 1);
								//	this.duplicatesRemoved = true;
								}
	
							//}
						});
					this.publishedFeed.forEach( (combined, combindex) => {   
						pubtemp[combindex] = combined;
						})
					
					this.combinedFeed = edittemp.concat(pubtemp);
					this.uploadData = this.combinedFeed;
					}

					return this.combinedFeed;
				} else {
				this.combinedFeed = [];
				this.uploadData = this.editedApproved;
				return this.editedApproved;
				}
			  }, set(value) {
				  //this.$store.commit('UPDATE_APPROVED', value);
			  }
			},
		  editEnabled: {
			  get() {
				  var isdisabled = this.previewEnabled;
				  if(this.previewEnabled) {
					  this.showHiddenItems=false;
					  this.sortmode=false;
				  }
			  return isdisabled;
			  }
		  }
      },
      components: { 
	StatsCard,  
	draggable
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
		
      axiosmodule.all([
        this.getServerPendingData(), 
        this.getServerPublishedData()
      ]).then((results) => {
			console.log("PBK  AckrellChannel all RESULTS: " + results)
		   this.loading = false;
        },(error) => {
                this.loading = false;
            });
	
	},
getServerPublishedData() {
		
		axios.get('getackrellfeed').then(res => {
				console.log("PBK getServerPublishedData axios return");

    let ackrellpublished = res.data;

    // append other info
    if( ackrellpublished.channel ) {
		console.log('PBK getServerPublishedData update');	
		var publishedtemp = ackrellpublished.channel.items;
						 publishedtemp.forEach( (published, pubindex) => {   
					this.publishedFeed[pubindex] = published;
			  })
    }  
  })
	
	},	
	
getServerPendingData() {
		
		axios.get('getackrellapproved').then(res => {
				console.log("PBK getServerPendingData axios return");

    let ackrellpending = res.data;

    // append other info
    if( ackrellpending.channel ) {
		console.log('PBK getackrellapproved update');	
				var origapprvdtemp = ackrellpending.channel.items;
				var origapprvdsave = [];
				 origapprvdtemp.forEach( (apprx, apprindexx) => {   
					origapprvdsave[apprindexx] = apprx;
			  })
			  this.originalApproved = [];
			  this.editedApproved = [];
			  this.combinedFeed = [];
				this.$store.commit('UPDATE_APPROVED', origapprvdsave);
				console.log('PBK getackrellapproved size ' + this.originalApproved.length);	
				var origapprvd = this.$store.getters.approved;
				 origapprvd.forEach( (appr, apprindex) => {   
				this.originalApproved[apprindex] = appr;
				this.editedApproved[apprindex] = appr;
				this.combinedFeed[apprindex] = appr;
			  })
			  	console.log('PBK getackrellapproved size ' + this.originalApproved.length);	
								this.isSaveChangesDisabled = true;
								this.isUndoChangeRequest = true;

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
	isDisabled() {
		/*
		if(this.originalApproved && this.originalApproved.length > 0 ) {
				//&& this.approved != this.originalApproved
				var approvedcomp = this.approved;
				var issame = true;
				
				var origapprovedcomp = this.originalApproved;
				console.log('PBK AckrellChannel isDisabled approved.length: ' + this.approved.length  + ' origapprovedcomp.length: ' +  origapprovedcomp.length);							
					if(approvedcomp.length != origapprovedcomp.length) {
					console.log('PBK AckrellChannel isDisabled different length');	
					this.isSaveChangesDisabled = false;
					return;
				}			
		approvedcomp.forEach( (apprx, apprindexx) => {   
						if(origapprovedcomp[apprindexx].title != apprx.title)
						   issame = false;
				  })	
					if(issame) 	 {
				console.log('PBK isDisabled changed no change');	
				this.isSaveChangesDisabled =  true;					
			} else {
			console.log('PBK isDisabled different');	
			this.isSaveChangesDisabled = false;
			}	
		}
	*/	
	},	
    getComponentData() {
		//this.$store.commit('UPDATE_APPROVED', this.approved);
		this.isDisabled();		
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
	     if(!this.previewEnabled)
			return "border: 1px solid #13ce66;background-color: #b1e68a40;";
		 //else if(fav)
		//	return "border: 1px solid #FFEB3B;background-color: #ffeb3b2b;";
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
 
	
	updateAckrellApproved() {
		console.log("PBK updateAckrellApproved");
		var approveditems = [];	
		var i;
		for (i = 0; i < this.uploadData.length; i++) { 
					if( !this.uploadData[i].hideFromAckrellFeed ) {
						approveditems.push(this.uploadData[i]);
					}		  
		}		
		this.lastUploadTime = new Date();
		this.uploadPending = false;
			axios.post('updateackrellapproved', {
			  link: "https://ackrellclub.com/rss",
			  feed_items: approveditems,
			}).then(res => {
				console.log("PBK updateAckrellPendingApproved axios return");
			})
			/*
		this.originalApproved = [];
		console.log('PBK updateAckrellPendingApproved size ' + this.originalApproved.length);	
		approveditems.forEach( (appr, apprindex) => {   
			this.originalApproved[apprindex] = appr;
		})
		console.log('PBK updateAckrellPendingApproved size ' + this.originalApproved.length);	
		this.isSaveChangesDisabled = true;
		this.isUndoChangeRequest = true;			  
*/
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