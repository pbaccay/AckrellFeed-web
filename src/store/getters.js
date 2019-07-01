// Get the channels
export const channels = state => state.channels

// Get the channels
export const channelscount = state => state.channels.length

export const lastChannelUpdate = state => state.lastChannelUpdate

// Get the favs
export const favs = state => state.favs

// Get the approved
export const approved = state => state.approved

export const version = state => state.version

// Add Channel Dialog
export const showAddChannel = state => state.showAddChannel

// get random quote
export const quotes = state => state.quotes

// Check if post is faved
export const isFaved = (state, getters) => (link) => {
    return state.favs.find(fav => fav.link === link)
}

// Check if post is approved
export const isApproved = (state, getters) => (link) => {
    return state.approved.find(approved => approved.link === link)
}

export const getEmailHtml = state => state.newsletteremailhtml

export const isHideFromAckrellFeed = (state, getters) => (link) => {
    var apprvd = state.approved.find(approved => approved.link === link)
	if(apprvd) {
		return apprvd.hideFromAckrellFeed;
	} else {
		return false;
	}
	
}


// Fave count
export const favCount = state => state.favs.length

export const getSelectedSearchTerm = state => state.selectedSearchTerm

// Approved count
export const approvedCount = state => state.approved.length

// Approved upload status
export const getApprovedUploadStatus = state => state.approvedUploadPending

export const flaggedCount = (state, getters) => (channelindex) => {
	var flagcount = 0;
	let channel = state.channels[channelindex];
	let favs = state.favs;
	let apprvd = state.approved;
	let channelitems = channel.channel.items;
	if(channelitems) {
	favs.forEach( (fav, favindex) => {   
		let index = channelitems.findIndex( (item) => {
		return item.link == fav.link
	  }); 
	  if(index > -1) {
		  flagcount++;
	  }
  })
  	apprvd.forEach( (appr, apprindex) => {   
		let index = channelitems.findIndex( (item) => {
		return item.link == appr.link
	  }); 
	  if(index > -1) {
		  flagcount++;
	  }
  })
	return flagcount;
	} else {
		console.log('Old version reset store');	
	}
	}
// Get toggle status of sidebar
export const collapse = state => state.collapseSideBar
