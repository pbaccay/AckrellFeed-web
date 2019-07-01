import { axios } from '../utils'
import { common } from '../utils';
// Add a channel
export const addChannel = ({ commit }, { channel }) => {
  return axios.get( 'getchannel/?url=' + channel.url ).then(res => {
    let newChannel = res.data;

    // append other info
    if( newChannel.channel ) {
      newChannel.color = channel.color;
      newChannel.updated = new Date();
	  newChannel.flaggedcount = 0;
      newChannel.url = channel.url;
      commit('ADD_CHANNEL', newChannel );
    }

    return res.data;
  })
}

export const updateApproved = ({ commit }, { approveditems }) => {
	axios.post('updateackrellpending', {
			  link: "https://ackrellclub.com/pending/rss",
			  feed_items: approveditems,
			}).then(res => {
				console.log("PBK action updateApproved axios return");
			})
}
/*
export const addChannelbyurl = ({ commit }, { addurl }) => {
	console.log("PBK actions url: " + addurl);
  return axios.get( '/?url=' + addurl ).then(res => {
    let newChannel = res.data;

    // append other info
    if( newChannel.channel ) {
      newChannel.color = common.randomColor();
      newChannel.updated = new Date();
      newChannel.url = addurl;
      commit('ADD_CHANNEL', newChannel );
    }

    return res.data;
  })
}
*/








