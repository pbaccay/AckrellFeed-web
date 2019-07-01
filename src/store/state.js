import { storage } from '../utils'

// State of app
const state = {
  channels: getChannels() ||[],
  favs: getFavs() || [],  
  approved: getApproved() || [],
  //selectedSearchTerm: storage.get('ackrell_selected_search') || "",
  showAddChannel: false,
  collapseSideBar: storage.get('qr_sidebar_collapse') || false,
  approvedUploadPending: storage.get('ackrell_approved_pending') || false,
  lastChannelUpdate: storage.get('ackrell_channels_updated') || new Date(),
  version: getVersion() || "",
  newsletteremailhtml: ""
}

function getFavs() {
var version = storage.get('version') ;
	if(version == "1.0") {
		console.log("PBK state getFavs() version: " + version );
		return storage.get('ackrell_favs');
	} else {
		console.log("PBK state getFavs(): older" );
		var emptychannels = [];
		storage.set('ackrell_favs', emptychannels);
		console.log("PBK state current version favs: " + emptychannels.length );
		return emptychannels;
	}
}

function getApproved() {
var version = storage.get('version') ;
	if(version == "1.0") {
		console.log("PBK state getApproved() version: " + version );
		storage.get('ackrell_approved')
		return storage.get('ackrell_approved');
	} else {
		console.log("PBK state getApproved(): older" );
		var emptychannels = [];
		storage.set('ackrell_approved', emptychannels);
		console.log("PBK state current version approved: " + emptychannels.length );
		return emptychannels;
	}
}


function getChannels() {
var version = storage.get('version') ;
	if(version == "1.0") {
		console.log("PBK state getChannels() version: " + version );
		return storage.get('ackrell_channels');
	} else {
		console.log("PBK state getChannels: older" );
		var emptychannels = [];
		storage.set('ackrell_channels', emptychannels);
		console.log("PBK state current version channels: " + emptychannels.length );
		return emptychannels;
	}
}

function getVersion() {
	var version = storage.get('version') ;
	if(version == "1.0") {
		console.log("PBK state current version: " + version );
		return "";
	} else {
		console.log("PBK state current version: older" );
		version = "1.0";
		storage.set('version', version);
		return version;
	}
}

export default state
