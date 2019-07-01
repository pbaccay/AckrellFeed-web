<template>
  <div :class="{ 'full-height': approved.length === 0 }" class="inner">

    <div class="jumbotron" v-if="!approved.length">
        <h2>Approved News List</h2>
        <p>You dont have any approved items.</p>
    </div>
    <!-- end jumbotron for empty approved -->

    <div v-if="approved.length" class="channel-info">
        <div class="channel-img" style="box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);width: 80px;height: 80px;margin: 4px;border-radius: 10px;">
			<md-icon style="    font-size: 105px!important;width: 80px;height: 80px;color: green;">check_box</md-icon>
        </div>

        <h3>Approved List</h3>
        <p> All the news posts you approved and choose to keep are here.  Approved posts still need to be published in Preview Approved Newsletter and Preview Newsfeed sections for public consumption.</p>
        <p class="channel-meta">
            <span class="text-dark">You have selected {{ approved.length }}</span> news post(s)
        </p>
    </div>
    <!-- end header for approved -->
  <modal v-if="showItemEdit" @close="showItemEditAction">

    <template slot="header">
      <h3 class="modal-title" style="margin: 10px; paddingTop: 5px;">Edit Item</h3>
    </template>

    <template slot="body">
	  	<div class="md-small-size-100" id="edit-post">
			<md-field>
				<label id="approved-edit-label">Edit Title:</label>
			<md-input v-model="editedtitle"></md-input>
			</md-field>
			<md-field  style="margin-top: 5px; margin-bottom: 5px;">
			<label id="approved-edit-label">Edit Post Summary:</label>
			<md-textarea v-model="editeddescription"></md-textarea>
			</md-field>
			<md-field style="margin-top: 5px;">
			<label id="approved-edit-label">Add\Edit Thumbnail(optional):</label>
			<md-input v-model="editedimgurl"></md-input>
			<span class="md-helper-text" id="approved-helper-text">Enter a an img url for thumbnail (ex. https://static1.squarespace.com/AckrellCapital2018Globe.JPG) </span>						
			</md-field>		
			<span class="md-helper-text" id="approved-helper-text">1. To get image from website, right-click on image and select "Copy Image address" and paste contents above.</span>						

			<md-datepicker v-model="editedselectedPostDate">
				<label id="approved-edit-label">Edit posted date: </label>
			</md-datepicker>			
		</div>
		
  </template>

    <template slot="footer">
				<div class="md-layout">
				    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
						<md-button class="md-success md-block" @click="showItemEditAction">Cancel</md-button>
					</div>
					<div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
						<md-button class="md-success md-block" @click="saveEditedPost()"> Save </md-button>
					</div>
				</div>	

    </template>
	
  </modal>
<div class="md-layout">
	<div v-if="!showItemEdit" class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100" id="create-post">
					<div class="md-layout" v-if="newsPostShow == false">
						<div class="md-layout-item md-size-50">
							<md-button  class="md-success md-block" @click="newsPostShow = true"><md-icon>library_books</md-icon> Create News Post</md-button>
						<span class="md-helper-text" id="approved-helper-text" style="display: block;">Create newsfeed item for Ackrell Newsfeed and\or Newsletter </span>
						<span class="md-helper-text" id="approved-helper-text" style="display: block;">1. Unchecking Approved checkbox deletes Ackrell created items</span>
						</div>
						<div class="md-layout-item md-size-50">
							<md-checkbox v-model="sortmode" style="max-height: 75px; overflow: hidden;">Compact Items for easier sorting
							</md-checkbox>	
						</div>
					</div>
		<div v-if="newsPostShow">
			<md-field>
			<label id="approved-edit-label">News post title (required):</label>
			<md-input v-model="feedtitle"></md-input>
				<span class="md-helper-text" id="approved-helper-text">Title for news post</span>
			</md-field>
			<md-field>
			<label id="approved-edit-label">Enter URL Link here(required):</label>
			<md-input v-model="feedurl"></md-input>
				<span class="md-helper-text" id="approved-helper-text">URL link to news post (ex: https://news.google.com)</span>
			</md-field>
			<md-field>
			<label id="approved-edit-label">Post Summary (required):</label>
			<md-textarea v-model="feeddescription"></md-textarea>
				<span class="md-helper-text" id="approved-helper-text">Summary of news post</span>
			</md-field>
			<md-datepicker v-model="selectedPostDate">
				<label id="approved-edit-label">Select posted date: </label>
			</md-datepicker>
			<div class="demo-block demo-box demo-component-docs demo-buttons.html">


				<div class="meta"  :style=showOptionalStyle()> 
					<div class="highlight" style="width: 100%;">
						<md-field>
						<label id="approved-edit-label">Thumbnail (optional):</label>
						<md-input v-model="feedimgurl"></md-input>
						<span class="md-helper-text" id="approved-helper-text">Enter a an img url for thumbnail (ex. https://static1.squarespace.com/AckrellCapital2018Globe.JPG) </span>						
						</md-field>		
						<span class="md-helper-text" id="approved-helper-text">1. To get image from website, right-click on image and select "Copy Image address" and paste contents above.</span>						
					</div>
				</div> 				
				
				<div v-if="showOptional == false" class="demo-block-control" style="left: 0px;" @click="showOptional = true" id="optionalfields">
					<i class="el-icon-caret-bottom"></i> 
					<span class="showText" > Show Optional fields</span>
				</div>
				<div v-if="showOptional == true" class="demo-block-control" style="left: 0px;" @click="showOptional = false" id="optionalfields">
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

	

	<div  v-if="!showItemEdit" class="md-layout-item md-size-50 md-medium-size-75 md-small-size-100" id="create-post">
				<div class="md-layout">
						<div class="md-layout-item md-size-50">
						<md-button class="md-success md-block" @click="undoChanges()" :disabled="isSaveChangesDisabled"> Undo Changes </md-button>
						</div>
						<div class="md-layout-item md-size-50">
						<md-button class="md-success md-block" @click="updateAckrellPendingApproved()" :disabled="isSaveChangesDisabled"> Save Changes </md-button>
						</div>
						<div class="md-layout-item md-size-100">
						<span class="md-helper-text" id="approved-helper-text" style="display: block;">Any changes to list order require saving</span>
						<span class="md-helper-text" id="approved-helper-text" style="display: block;">1. Any unsaved list changes will be lost if navigating to another page</span>
						</div>		

				</div>
	</div>
</div>
		
	<div class="md-layout" id="feed-list-approved">
	<draggable :list="approved" :component-data="getComponentData()">
      <div v-for="(feed, index) in approved" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" :id=approvedItemStyle()>
	  			<stats-card :showcompact="showcompacted()" data-background-color="green" :class="{ 'query-match': getQueryString(feed.title) }" :style=feedCardStyle(feed.link) > 
	
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
						<span v-if="index == 0" style="margin-left: 5%;color: black;font-size: .80rem;" >&nbsp;Newsletter: Featured Story</span>
						<span v-if="index > 0 && index < 4" style="margin-left: 5%;color: black;font-size: .80rem;" >&nbsp;Newsletter: Story {{index+1}}</span>
						<span v-if="feed.ackrellCreated == true" style="margin-left: 5%;color: black;font-size: .75rem;" >&nbsp;Ackrell Created Post</span>
						<div class="flex-row" style="float: right;">
							<input type="checkbox" :checked=isFaved(feed.link) @change="faveIt(feed)" style="color: black;">&nbsp;Pending&nbsp;&nbsp;</input>
							<input type="checkbox" :checked=isApproved(feed.link) @change="approveIt(feed)" style="color: black;">&nbsp;Approved</input>
							<input type="checkbox" :checked=isHideFromAckrellFeed(feed.link) @change="hideFromAckrellFeed(feed)" style="color: black;">&nbsp;Hide Newsfeed</input>	
							<span @click="statCardClick(feed)"><md-icon>edit</md-icon><span class="text-dark">EDIT</span></span>						
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
import Modal from '../components/Modal.vue';

  export default {
	 data: () => ({
      feedtitle: null,
      feedurl: null,
	  feeddescription: null,
	  feedimgurl: null,
      editedtitle: null,
      editedurl: null,
	  editeddescription: null,
	  editedimgurl: null,
	  editedselectedPostDate: new Date(),
	  selectedPostDate: new Date(),
	  newsPostShow: false,
	  sortmode: false,
	  showOptional: false,
	  lastUploadtime: new Date(),
	  uploadPending: false,
	  isUploadRequest: false,
	  isUndoChangeRequest: false,
	  showItemEdit: false,
	  editedItem: null,
	  originalApproved: [],
	  isSaveChangesDisabled: true

    }),
      mounted() {
		  var origapprvd = this.$store.getters.approved;
		  origapprvd.forEach( (appr, apprindex) => {   
		  this.originalApproved[apprindex] = appr;
		  })
		  console.log("PBK approved getServerPendingData mounted");
		  this.getServerPendingData();
	  },		  
      computed : {
		  approved: {
			  get() {
			  return this.$store.getters.approved;
			  }, set(value) {
				  this.$store.commit('UPDATE_APPROVED', value);
			  }
			}
      },
      components: { 
	StatsCard,  
	draggable,
	Modal
	  },
    methods: {
	    check(value) {
		console.log(value)
    },
    showItemEditAction() {
		if(this.showItemEdit)
			this.showItemEdit = false;
		else
			this.showItemEdit = true;
    },
	statCardClick(item) {
		this.editedItem = item;
		this.editeddescription = item.description_text;
		if(item.images && item.images.length > 0)
			this.editedimgurl = item.images[0];
		else
			this.editedimgurl = '';
		this.editedselectedPostDate = item.pubDate;
		this.editedtitle = item.title;
		this.showItemEditAction();
		console.log("PBK Approved statCardClick");
	},	
	updatedTime(time) {
		return common.timeAgo(time);
    },	
	saveEditedPost() {
		this.editedItem.description_text = this.editeddescription;
		if(this.editedimgurl != '') 
			this.editedItem.images[0]= this.editedimgurl;
		this.editedItem.pubDate = this.editedselectedPostDate;
		this.editedItem.title = this.editedtitle;	
		var post = this.editedItem;
		  let index = this.approved.findIndex( (item) => {
			return item.link == post.link
		  });

		  // if alreday have it just update it
		  if( index !== -1 ) {
			this.approved.splice(index, 1, post);
		  }			
		 console.log('PBK saveEditedPost saved');				
		this.$store.commit('UPDATE_APPROVED', this.approved);	
		this.updateAckrellPendingApproved();
		this.showItemEdit = false;
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
				this.$store.commit('UPDATE_APPROVED', origapprvdsave);
				console.log('PBK getackrellapproved size ' + this.originalApproved.length);	
				var origapprvd = this.$store.getters.approved;
				 origapprvd.forEach( (appr, apprindex) => {   
				this.originalApproved[apprindex] = appr;
			  })
			  	console.log('PBK getackrellapproved size ' + this.originalApproved.length);	
								this.isSaveChangesDisabled = true;
								this.isUndoChangeRequest = true;

    }

   
  })
	
	},
	isDisabled() {
		if(this.originalApproved && this.originalApproved.length > 0 ) {
				//&& this.approved != this.originalApproved
				var approvedcomp = this.approved;
				var issame = true;
	
				var origapprovedcomp = this.originalApproved;
				console.log('PBK isDisabled approved.length: ' + this.approved.length  + ' origapprovedcomp.length: ' +  origapprovedcomp.length);							
					if(approvedcomp.length != origapprovedcomp.length) {
					console.log('PBK isDisabled different length');	
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
		
	},

	undoChanges() {
		console.log('PBK undoChanges');	
				var origapprvdtemp = this.originalApproved;
				var origapprvdsave = [];
				 origapprvdtemp.forEach( (apprx, apprindexx) => {   
					origapprvdsave[apprindexx] = apprx;
			  })
			  this.originalApproved = [];
				this.$store.commit('UPDATE_APPROVED', origapprvdsave);
				console.log('PBK undoChanges size ' + this.originalApproved.length);	
				var origapprvd = this.$store.getters.approved;
				 origapprvd.forEach( (appr, apprindex) => {   
				this.originalApproved[apprindex] = appr;
			  })
			  	console.log('PBK undoChanges size ' + this.originalApproved.length);	
								this.isSaveChangesDisabled = true;
								this.isUndoChangeRequest = true;
							axios.post('updateackrellpendingapproved', {
			  link: "https://ackrellclub.com/approved/rss",
			  feed_items: this.originalApproved,
			}).then(res => {
				console.log("PBK undoChanges axios return");
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
      console.log('changed1');
    },
    inputChanged(value) {
      console.log('changed2');
    },
    getComponentData() {
		      console.log('PBK getComponentData changed');				
		this.$store.commit('UPDATE_APPROVED', this.approved);
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
    addnewsPostShow() {
      this.newsPostShow = false;
    }, 
	 addAckrellNewsPost() {
		 var ackrellitem = {};
		 this.newsPostShow = false;
			ackrellitem.title = this.feedtitle;
			ackrellitem.link = this.feedurl;
			ackrellitem.description = this.feeddescription;
			ackrellitem.description_text = this.feeddescription;
			ackrellitem.approvedAt = new Date();
			ackrellitem.hideFromAckrellFeed = false;
			ackrellitem.ackrellCreated = true;
			ackrellitem.pubDate = this.selectedPostDate;
			ackrellitem.images = [];
			if(this.feedimgurl && this.feedimgurl != "") {
				ackrellitem.images.push(this.feedimgurl);
			}
		 
	  		var isapproved = this.$store.getters.isApproved(ackrellitem);
			if(!isapproved) {
				ackrellitem.approvedAt = new Date();
				ackrellitem.hideFromAckrellFeed = false;
			}
          this.$store.commit('TOGGLE_APPROVED', ackrellitem);
		  this.updateAckrellPendingApproved();
      },	
 
	
	updateAckrellPendingApproved() {
		console.log("PBK updateAckrellPendingApproved");
		var approveditems = this.$store.getters.approved;
		this.lastUploadTime = new Date();
		this.uploadPending = false;
			axios.post('updateackrellpendingapproved', {
			  link: "https://ackrellclub.com/approved/rss",
			  feed_items: approveditems,
			}).then(res => {
				console.log("PBK updateackrellpendingapproved axios return");
			})
		this.originalApproved = [];
		console.log('PBK updateackrellpendingapproved size ' + this.originalApproved.length);	
		approveditems.forEach( (appr, apprindex) => {   
			this.originalApproved[apprindex] = appr;
		})
		console.log('PBK updateackrellpendingapproved size ' + this.originalApproved.length);	
		this.isSaveChangesDisabled = true;
		this.isUndoChangeRequest = true;			  

    },	
	
	uploadAckrellData(isrequested) {
		if(isrequested) {
			console.log("PBK Approved upload requested");
			/*
		  let timediff =  common.lastUpdateCheck(this.lastUploadtime);
		  if(timediff < 1  && this.uploadPending == false)
		  {
				console.log("PBK Approved Data recently updated queue next upload");
				this.uploadPending = true;
					  var self = this;
            setTimeout(function(){
				  console.log("PBK Approved Data timed upload");
				  	var approveditems = this.$store.getters.approved;
					axios.post('updateAckrellPendingApproved', {
					  link: "https://ackrellclub.com/approved/rss",
					  feed_items: approveditems,
					})				
					self.uploadPending = false;
            }, 5000);				

		  }			  
		  else {
			  console.log("PBK Approved Data uploading");
			  if(this.uploadPending) {
				 	console.log("PBK Approved Data PENDING"); 
			  } else {
			  this.updateAckrellPendingApproved();
			  }
		  }
		  */
		} else {
			console.log("PBK Approved upload NOT requested");
			return;
		}
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
	display: block;
}

#feed-item-approved {
	margin-bottom: 50px;
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

#edit-post {
    margin: 10px;
    border: 1px solid #bbbbbb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}

#create-post {
    margin-left: 15px;
    border: 1px solid #bbbbbb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}

#optionalfields {
    border: 2px solid #bbbbbb;
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