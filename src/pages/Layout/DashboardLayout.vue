<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>

    <side-bar :class="{ collapse: collapse }">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/pending">
        <md-icon>star</md-icon>
	<span v-if="favCount() > 0" class="notification" :style="notificationsytle">{{favCount()}}
	</span>				
        <p>Pending</p>
      </sidebar-link>	  
	   <sidebar-link to="/approved">
        <md-icon>check_box</md-icon>
	<span v-if="approvedCount() > 0" class="notification" :style="notificationsytle">{{approvedCount()}}
	</span>		
        <p>Approved</p>
      </sidebar-link>
      <sidebar-link to="/newsletter">
        <md-icon>zoom_in</md-icon>
        <p>Preview Approved Newsletter</p>
      </sidebar-link>	
      <sidebar-link to="/ackrellfeedpreview">
        <md-icon>zoom_in</md-icon>
        <p>Preview Ackrell Newsfeed</p>
      </sidebar-link>	
      <sidebar-link to="/ackrellfeedlive">
        <md-icon>rss_feed</md-icon>
        <p>Live Ackrell Newsfeed</p>
      </sidebar-link>		  
      <sidebar-link >
        <md-icon>rss_feed</md-icon>
        <p :style="{ color: 'white' }">Channels</p>
      </sidebar-link>
            <sidebar-link v-for="(item, index) in channels"
              :index="index.toString()"
              :key="index"
              :to="getRouteLink(index, slug(item.channel.title))">
			          <img :src="getFavicon(item.channel.link)" alt="" style="margin-right:10px;">
					  
		<span v-if="flaggedCount(index) > 0" class="notification" :style="notificationsytle">{{flaggedCount(index)}}
		</span>
        <p>{{item.channel.title}}</p>
        </sidebar-link>  
	  
	  
	  
    </side-bar>

    <div class="main-panel" :class="{ collapse: collapse }">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

   <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'
import Modal from '../../components/Modal.vue'
import { common } from '../../utils';

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
      methods: {
      toggleChannelDialog() {
        this.$store.commit('TOGGLE_ADD_CHANNEL');
      },
      slug(str) {
	    if(str)
        return common.slug(str);
      },
      getFavicon(url) {
        return 'https://www.google.com/s2/favicons?domain_url=' + url
      },
      collaseSideBar() {
        this.$store.commit('TOGGLE_SIDEBAR')
      },
	  getRouteLink(index, title) {
	     return '/channel/' + index + '/' + title
	  },
	  flaggedCount(index) {
		return this.$store.getters.flaggedCount(index);
	  },
      favCount() {
        return this.$store.getters.favCount;
      },
      approvedCount() {
        return this.$store.getters.approvedCount;
      }
    },
    computed: {
      channels () {
        return this.$store.getters.channels;
      },
      currentIndex() {
        if( this.$route.name === 'Pending' ) return 'pending';
        if( this.$route.name === 'Approved' ) return 'approved';
        if( this.$route.name === 'Newsletter' ) return 'newsletter';
        if( this.$route.name === 'Feedpreview' ) return 'ackrellfeedpreview';
        if( this.$route.name === 'Feedlive' ) return 'ackrellfeedlive';	
        return this.$route.params.hasOwnProperty('index') ? this.$route.params.index.toString() : '/';
      },
      collapse() {
        return this.$store.getters.collapse;
      },
	  notificationsytle() {
		 return "position: absolute;top: 0;border: 1px solid #fff;right: 7px;background: #f44336;color: #fff;min-width: 10px;padding: 0 5px;height: 22px;border-radius: 11px;text-align: center;line-height: 19px;vertical-align: middle;display: block;width: 22px;";
	  }
    }
}
</script>
