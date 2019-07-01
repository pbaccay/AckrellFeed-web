<template>
  <div class="inner full-height">
      <div class="jumbotron">
          <h2 class="greet">Ackrell NewsFeed Admin</h2>
		  

				<div class="md-layout" style="display: flex;align-items: center;justify-content: center;">
					<div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
					<md-button class="md-success md-block" @click="showChannelDialogAction()"> Add a Channel</md-button>
					</div>
				</div>		  
  <modal v-if="showChannelDialog" @close="showChannelDialogAction">

    <template slot="header">
      <h4 class="modal-title">Add Channel</h4>
    </template>

    <template slot="body">
	  	<div class="md-small-size-100" id="create-post">
			<md-field>
			<label id="approved-edit-label">Enter URL Link here(required): </label>
			<md-input v-model="channelurl"></md-input>
					<span class="md-helper-text" id="approved-helper-text">URL link to feed ex. https://newfrontierdata.com/feed/</span>
			</md-field>		
		</div>
		
  </template>

    <template slot="footer">
      <md-button class="md-simple" @click="addChannelAction">Add</md-button>
      <md-button class="md-danger md-simple" @click="showChannelDialogAction">Close</md-button>
    </template>
	
  </modal>	
  <modal v-if="showNotification" @close="showNotificationAction">

    <template slot="header">
      <h4 class="modal-title">Add Channel Result</h4>
    </template>

    <template slot="body">
	  	<div class="md-small-size-100" id="create-post">
		    <div id="notifications">
      <div class="alert alert-info" v-if="notificationType == 'info'" id="alertnotification">
        <div class="container">
          <div class="alert-icon">
            <md-icon>info_outline</md-icon>
          </div>
          <b> INFO ALERT </b><span v-html="notificationmsg"></span>
        </div>
      </div>
      <div class="alert alert-success" v-if="notificationType == 'success'" id="alertnotification">
        <div class="container">
          <div class="alert-icon">
            <md-icon>check</md-icon>
          </div>

          <b> SUCCESS ALERT </b><span v-html="notificationmsg"></span>
        </div>
      </div>
      <div class="alert alert-warning" v-if="notificationType == 'warning'" id="alertnotification">
        <div class="container">
          <div class="alert-icon">
            <md-icon>warning</md-icon>
          </div>
          <b> WARNING ALERT </b><span v-html="notificationmsg"></span>
        </div>
      </div>
      <div class="alert alert-danger" v-if="notificationType == 'error'" id="alertnotification">
        <div class="container">
          <div class="alert-icon">
            <md-icon>info_outline</md-icon>
          </div>
          <b> ERROR ALERT </b><span v-html="notificationmsg"></span>
        </div>
      </div>
    </div>
			
		</div>
		
  </template>

    <template slot="footer">
      <md-button class="md-danger md-simple" @click="showNotificationAction">Close</md-button>
    </template>
	
  </modal>  
                  <transition v-if="loading" name="fade">
                      <span class="loading-feed">
                          <i class="el-icon-loading"></i> checking feed...
                      </span>
                  </transition>
      </div>
  </div>
</template>

<script>
import { common } from '../utils';
import { axios } from '../utils';
import { storage } from '../utils';
import axiosmodule from 'axios';
import Modal from '../components/Modal.vue';

  export default {
    data () {
      return {
        showChannelDialog: false,
		showNotification: false,
		notificationType: 'info',
		notificationmsg: '',
		channelurl: null,
		    message: 'no message',
    first_request: 'no request',
    second_request: 'no request',
		loading: false,
		color: common.randomColor(),
		initcount: 0
      }
    },
	mounted() {
        this.getchannels();
    },
      components: { 
	Modal 
	//draggable
	  },	
    computed: {
    },	
    methods: {
      openChannelBox() {
        this.$store.commit('TOGGLE_ADD_CHANNEL');
      },
      showChannelDialogAction() {
		if(this.showChannelDialog)
			this.showChannelDialog = false;
		else
			this.showChannelDialog = true;
      },
      showNotificationAction() {
		if(this.showNotification)
			this.showNotification = false;
		else
			this.showNotification = true;
      },
    addChannelAction() {
		this.showChannelDialog = false;
		var self = this;
		var url = this.channelurl;
	  axios.get( 'getchannel/?url=' + url ).then(res => {
		let newChannel = res.data;
console.log("PBK DB addChannelAction: " + url);
		// append other info
		if( newChannel.channel ) {
		  newChannel.color = common.randomColor();
		  newChannel.updated = new Date();
		  newChannel.url = url;
		  this.$store.commit('ADD_CHANNEL', newChannel );
		  this.notificationType = 'success'
		  this.notificationmsg = "Channel Successfully Added."
		  this.showNotification = true;
		}
		else {
			this.notificationType = 'error';
			this.notificationmsg = "Channel Not Added.  An error occured.  Please check url is valid and try again."
		  this.showNotification = true;
		}


	  }).catch(function (error) {
		  console.log("PBK DB addChannelAction ERROR return");
		console.log(error);
		self.notificationType = 'error';
			self.notificationmsg = `Channel Not Added.  An error occured.  Please check url is valid newsfeed (output should look like this url: <a target="_blank" href="https://mjbizdaily.com/feed/">https://mjbizdaily.com/feed/</a> and try again.`;
		  self.showNotification = true;
  })
    },	  
	  setLoading() {
	  var self = this;
	  self.loading = true;
	  console.log("PBK DASHBOARDP Timeout SET");
            setTimeout(function(){
				  console.log("PBK DASHBOARDP Timeout EXP");
                self.loading = false;
            }, 5000);
	  },
	  getchannels() {
		  let channelcnt = this.$store.getters.channelscount;
		  let updatetime = this.$store.getters.lastChannelUpdate;
		  let timediff =  common.lastUpdateCheck(updatetime);
		  if(channelcnt > 0 && timediff < 1)
		  {
			  let channel = this.$store.getters.channels[0];
			  if(channel && channel.items && channel.items.length > 0) {
				  console.log("PBK DASHBOARD Old version reset")
			  } else {
				console.log("PBK DASHBOARD Channel Data up to date");
					return;
			  }
		  }			  
		  else {
			  console.log("PBK DASHBOARDP refreshing channel data");
			  let newrefreshtime = new Date();
			  this.$store.commit('UPDATE_CHANNEL_REFRESH', newrefreshtime);

		  }		  
	  this.setLoading();
	  console.log("PBK2 Dashboard loading channels");
  return axios.get( 'getallchannels' ).then(res => {
			let channels = res.data;
			if(channels && channels.length >0) {
				console.log("PBK getAllChannels success");
				channels.forEach( (channel, index) => { 
					channel.color = common.randomColor();
					this.$store.commit('ADD_CHANNEL', channel );
				});
			}
	  })	  
		/*
      axiosmodule.all([
        this.request_1(), 
        this.request_2(),
		this.request_3(),
		this.request_4(),
		this.request_5()
      ]).then((results) => {
			console.log("PBK all RESULTS: " + results)
		   this.loading = false;
        },(error) => {
                this.loading = false;
            });
			*/
    },
    request_1() {
	  var url1 = "https://news.google.com/rss/search/section/q/cannabis%7Cmarijuana%7Cmedical%20marijuana%7CCBD%7Cdispensary%7Clicensed%20producer%7Ccannabis%20market%20estimates%7Chemp%7CDEA%7CFDA?ned=us&gl=US&hl=en";
	  return axios.get( 'getchannel/?url=' + url1 ).then(res => {
		let newChannel = res.data;
console.log("PBK DB url1: " + url1);
		// append other info
		if( newChannel.channel ) {
		  newChannel.color = common.randomColor();
		  newChannel.updated = new Date();
		  newChannel.url = url1;
		  this.$store.commit('ADD_CHANNEL', newChannel );
		}

		return res.data;
	  })
    },
	request_2() {
	 var  url2 = "https://www.cannabisbusinessexecutive.com/feed/";
	  return axios.get( 'getchannel/?url=' + url2 ).then(res => {
		let newChannel = res.data;
console.log("PBK DB url2: " + url2);
		// append other info
		if( newChannel.channel ) {
		  newChannel.color = common.randomColor();
		  newChannel.updated = new Date();
		  newChannel.url = url2;
		  this.$store.commit('ADD_CHANNEL', newChannel );
		}

		return res.data;
	  })
    },
	request_3() {
	 var  url3 = "https://cannabislaw.report/category/cannabis-law-news/feed/";
	  return axios.get( 'getchannel/?url=' + url3 ).then(res => {
		let newChannel = res.data;
console.log("PBK DB url3: " + url3);
		// append other info
		if( newChannel.channel ) {
		  newChannel.color = common.randomColor();
		  newChannel.updated = new Date();
		  newChannel.url = url3;
		  this.$store.commit('ADD_CHANNEL', newChannel );
		}

		return res.data;
	  })
    },
	request_4() {
	 var  url4 = "https://mjbizdaily.com/feed/";
	  return axios.get( 'getchannel/?url=' + url4 ).then(res => {
		let newChannel = res.data;
console.log("PBK DB url4: " + url4);
		// append other info
		if( newChannel.channel ) {
		  newChannel.color = common.randomColor();
		  newChannel.updated = new Date();
		  newChannel.url = url4;
		  this.$store.commit('ADD_CHANNEL', newChannel );
		}

		return res.data;
	  })
    },
	request_5() {
	 var  url5 = "https://newfrontierdata.com/feed/";
	  return axios.get( 'getchannel/?url=' + url5 ).then(res => {
		let newChannel = res.data;
console.log("PBK DB url5: " + url5);
		// append other info
		if( newChannel.channel ) {
		  newChannel.color = common.randomColor();
		  newChannel.updated = new Date();
		  newChannel.url = url5;
		  this.$store.commit('ADD_CHANNEL', newChannel );
		}

		return res.data;
	  })
    }
	  /*
	  getchannels() {
	  console.log("PBK DASHBOARD GETCHS");
	    if(Object.keys(this.$store.getters.channels).length === 0) {
			  console.log("PBK DASHBOARD GETCHS LOADING");
		            this.loading = true;
					var dashaddurl = "https://news.google.com/search/section/q/cannabis%7Cmarijuana%7Cmedical%20marijuana%7CCBD%7Cdispensary%7Clicensed%20producer%7Ccannabis%20market%20estimates%7Chemp%7CDEA%7CFDA?ned=us&gl=US&hl=en";
					//channeladd.color  = common.randomColor();
            this.$store.dispatch('addChannelbyurl', { addurl : "https://news.google.com/rss/search/section/q/cannabis%7Cmarijuana%7Cmedical%20marijuana%7CCBD%7Cdispensary%7Clicensed%20producer%7Ccannabis%20market%20estimates%7Chemp%7CDEA%7CFDA?ned=us&gl=US&hl=en" }).then((res) => {
			this.loading = false;
            }).catch((error) => {
                this.loading = false;
                let errorMsg = error.response ? error.response.data.msg : error;
                this.$message.error('Oops, ' + errorMsg);
            });
		this.$message.error('Oops1 ' + Object.keys(this.$store.getters.channels).length);

		} else {
		this.$message.error('Oops2 ' + Object.keys(this.$store.getters.channels).length);
		} 	
      } */
    } 
  }
</script>

<style scoped>
  h2 {
    margin-bottom: .5em;
  }

  blockquote {
    font-size: 1.4em;
    font-style: italic;
    width: 80%;
    margin: 1em auto;
  }

  em {
    font-size: .8em;
    color: gray
  }
  #alertnotification {
	  margin-bottom: 0px;
  }
  #create-post {
    margin: 15px;
    border: 1px solid #bbbbbb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
	}
</style>
