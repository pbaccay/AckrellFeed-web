<template>
  <div class="inner">
      <div class="channel-info">
			  <div>
				<md-dialog-confirm
				  :md-active.sync="deleteactive"
				  md-title="Delete Channel?"
				  md-content="Press confirm to permanantly delete channel."
				  md-confirm-text="Confirm"
				  md-cancel-text="Cancel"
				  @md-cancel="onCancel"
				  @md-confirm="onConfirm" />
			  </div>
          <div class="channel-img" :style="{
              'background-color': channel.color,
              'background-image': (channel.channel.img) ? 'url(' + channel.channel.img + ')' : 'none'
              }"  style="box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);width: 80px;height: 80px;margin: 4px;border-radius: 3px;">
              <h1 class="text-thumb" v-if="!channel.channel.img" style="margin-top: -4px;" >{{ channel.channel.title[0] }}</h1>
          </div>
          <!-- end channel logo -->

          <h3>
              <span v-if="!editing">{{ channel.channel.title }}</span>

              <span v-if="editing">
                  <input class="edit-title-input" v-if="editing" placeholder="Rename channel title" v-model="editing"></input>
                  <input type="color" v-model="channel.color" v-if="editing">

                  <el-button @click.prevent="renameChannel()" class="md-fab md-mini md-plain" style="margin-left: 5px;"><md-icon style="font-size: 20px!important;">save</md-icon></el-button>
                  <el-button @click.prevent="editing = null"  class="md-fab md-mini md-plain" style="margin-left: 5px;"><md-icon style="font-size: 20px!important;" >cancel</md-icon></el-button>
              </span>

              <span v-if="!editing">
                  <el-button @click="editing = channel.channel.title" class="md-fab md-mini md-plain"  style="margin-left: 5px;"><md-icon style="font-size: 20px!important;">edit</md-icon></el-button>
                  <el-button  @click="deleteactive = true" class="md-fab md-mini md-plain" style="margin-left: 5px;"><md-icon style="font-size: 20px!important;">delete</md-icon></el-button>
              </span>
          </h3>
          <!-- end editable channel title and color -->

          <p>
              {{ channel.channel.description }}
              - <a :href="channel.channel.link" target="_blank">{{ channel.channel.link }}</a>
          </p>
          <p>
              Feed URL
              - <a :href="channel.url" target="_blank">{{ channel.url }}</a>
          </p>          <el-row>
            <el-col :sm="18" :xs="16">
              <p class="channel-meta">
				  <span class="text-dark">{{ channel.channel.items.length }} posts found</span>
                  <i class="el-icon-date"></i> Blog updated <span class="text-dark">{{ updatedTime(channel.channel.lastBuildDate) }}</span>
                  <i class="el-icon-time"></i> Last synced <span class="text-dark">{{ updatedTime(channel.updated) }}</span>

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
      <!-- end channel info -->

      <feed :items="channel.channel.items" :channelindex="this.index" :query="$parent.query"></feed>
  </div>
</template>

<script>
  import Feed from '../components/Feed.vue';
  import { common } from '../utils';

  export default {
    props: ['index', 'title'],
    mounted() {
        this.fetchFeed();
    },
    data() {
        return {
            loading: false,
            editing: null,
			deleteactive: false,
			deletevalue: null
        }
    },
    components: { Feed },
    computed: {
        channel () {
            return this.$store.getters.channels[this.index];
        }
    },
    methods: {
        updatedTime(time) {
            return common.timeAgo(time);
        },
        fetchFeed() {
            this.loading = true;
            this.$store.dispatch('addChannel', { channel:  this.channel }).then((res) => {
                this.loading = false;
            }).catch((error) => {
                this.loading = false;
                let errorMsg = error.response ? error.response.data.msg : error;
                this.$message.error('Oops, ' + errorMsg);
            });
        },
        deleteChannel(url) {
            this.$confirm( this.channel.channel.title + ' channel will permanently deleted?', 'Confirm Delete', {
              confirmButtonText: 'Delete it',
              cancelButtonText: 'Cancel',
              type: 'warning',
              confirmButtonClass: 'el-button--danger'
            }).then(() => {
                this.$message.success( this.channel.channel.title + ' channel has been deleted.');
                this.$store.commit('DELETE_CHANNEL', url);
            }).catch(() => console.info('Delete cancel'))
        },
        renameChannel() {
            if( this.editing && this.editing.trim() == '' ) {
                this.$message.error('Enter a title for channel');
                return;
            }

            this.$store.dispatch('renameChannel', {
                title: this.editing,
                color: this.channel.color,
                url: this.channel.url
            });

            this.channel.channel.title = this.editing;
            this.editing = null;
        },      onConfirm () {	
        this.deletevalue = 'Agreed';
		let channelurl = this.channel.url;
		setTimeout(() => this.$store.commit('DELETE_CHANNEL', channelurl), 500);
	    this.$router.push({ name: 'Pending'});


      },
      onCancel () {
        this.deletevalue = 'Disagreed'
			console.log(this.deletevalue);
      }
    },
    watch: {
        '$route' (to) {
          this.fetchFeed();
        }
    }
}
</script>
