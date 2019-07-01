import { storage } from '../utils'
  import { axios } from '../utils';
// Show add channel box
export const TOGGLE_ADD_CHANNEL = state => {
  state.showAddChannel = !state.showAddChannel
}

// Add a channel
export const ADD_CHANNEL = (state, newChannel) => {
  let allChannel = state.channels;
  // ceck if already exists
  let index = allChannel.findIndex( (data) => {
    return newChannel.channel.link == data.channel.link
  });
 console.log("PBK ADD_CHANNEL INDEX 1: " + index);
   if( index == -1 ) {
	index = allChannel.findIndex( (data) => {
    return newChannel.url == data.url
  });
   }
  console.log("PBK ADD_CHANNEL INDEX 2: " + index);  
  // if alreday have it just update it
  if( index !== -1 ) {
    // dont update title and color
    newChannel.channel.title = allChannel[index].channel.title;
    allChannel[index] = newChannel;
    state.channels.splice(index, 1, newChannel);
  } else {
    allChannel.unshift(newChannel);
  }

  // persist it
  storage.set('ackrell_channels', allChannel);
}

// Rename a channel by url
export const RENAME_CHANNEL = (state, data) => {
  // check if already exists
  let index = state.channels.findIndex( (channel) => {
    return data.url == channel.url
  });

  // if alreday have it just update it
  if( index !== -1 ) {
    let channel = state.channels[index];
    channel.channel.title = data.title;
    channel.color = data.color;

    // update channel
    state.channels.splice(index, 1, channel);

    // persist it
    storage.set('ackrell_channels', state.channels);
  }
}

// Delete a channel by url
export const DELETE_CHANNEL = (state, url) => {
  // find channel
  let index = state.channels.findIndex( (channel) => {
    return url == channel.url
  });

  if( index !== -1 ) {
    state.channels.splice(index, 1);

    // persist it
    storage.set('ackrell_channels', state.channels);
  axios.post('removeChannel', {
			  link: url,
			}).then(res => {
				console.log("PBK mutations removeChannel axios return");
			})	
  }
}
export const SET_SEARCH_SELECTED = (state, searchterm) => {
 console.log("PBK Selected search: "  + searchterm);
 state.selectedSearchTerm = searchterm;
  storage.set('ackrell_selected_search', state.selectedSearchTerm);
  }
  


// Toggle fav post
export const TOGGLE_FAV = (state, post) => {
  // find fav
  let index = state.favs.findIndex( (item) => {
    return item.link == post.link
  });

  if( index !== -1 ) {
    state.favs.splice(index, 1);
  } else {
    state.favs.unshift(post);
  }

  // persist it
  storage.set('ackrell_favs', state.favs);
    axios.post('updateackrellpending', {
			  link: "https://ackrellclub.com/pending/rss",
			  feed_items: state.favs,
			}).then(res => {
				console.log("PBK mutations updateackrellpending axios return");
			})
}

// Toggle fav post
export const TOGGLE_APPROVED = (state, post) => {
  // find approved
  let index = state.approved.findIndex( (item) => {
    return item.link == post.link
  });

  if( index !== -1 ) {
    state.approved.splice(index, 1);
  } else {
    state.approved.unshift(post);
  }

  // persist it
  storage.set('ackrell_approved', state.approved);
  axios.post('updateackrellpendingapproved', {
			  link: "https://ackrellclub.com/approved/rss",
			  feed_items: state.approved,
			}).then(res => {
				console.log("PBK mutations updateApproved axios return");
			})
}

export const TOGGLE_HIDE_ACKRELLNEWSFEED = (state, post) => {
  // find approved
  let index = state.approved.findIndex( (item) => {
    return item.link == post.link
  });

  // if alreday have it just update it
  if( index !== -1 ) {
    state.approved.splice(index, 1, post);
	  // persist it
  storage.set('ackrell_approved', state.approved);
  axios.post('updateackrellpendingapproved', {
			  link: "https://ackrellclub.com/approved/rss",
			  feed_items: state.approved,
			}).then(res => {
				console.log("PBK mutations TOGGLE_HIDE_ACKRELLNEWSFEED axios return");
			})
  } 


}

// Toggle fav post
export const UPDATE_APPROVED = (state, approvedlist) => {
  // find approved
   state.approved = approvedlist;
  // persist it
  storage.set('ackrell_approved', state.approved);
}

// Toggle fav post
export const UPDATE_FAVS = (state, pendinglist) => {
  // find approved
   state.favs = pendinglist;
  // persist it
  storage.set('ackrell_favs', state.favs);
}


// Toggle fav post
export const UPDATE_EMAIL_TEMPLATE = (state, emailcontent) => {
  // find email template
   state.newsletteremailhtml = emailcontent;
  // persist it
  storage.set('ackrell_email_approved', state.newsletteremailhtml);
}

// Collapse sidebar
export const TOGGLE_SIDEBAR = (state) => {
  state.collapseSideBar = !state.collapseSideBar;

  // persist it
  storage.set('qr_sidebar_collapse', state.collapseSideBar);
}

export const UPDATE_CHANNEL_REFRESH = (state, newtime) => {
	state.lastChannelUpdate = newtime;
	storage.set('ackrell_channels_updated', state.lastChannelUpdate);
}