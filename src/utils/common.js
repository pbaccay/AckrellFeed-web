// Common utils
export default {

    timeAgo (dateString) {
        let rightNow = new Date();
        let then = new Date(dateString);

        let diff = rightNow - then;

        let second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

        if (isNaN(diff) || diff < 0) {
            return ""; // return blank string if unknown
        }

        if (diff < second * 2) {
            // within 2 seconds
            return "right now";
        }

        if (diff < minute) {
            return Math.floor(diff / second) + " seconds ago";
        }

        if (diff < minute * 2) {
            return "about 1 minute ago";
        }

        if (diff < hour) {
            return Math.floor(diff / minute) + " minutes ago";
        }

        if (diff < hour * 2) {
            return "about 1 hour ago";
        }

        if (diff < day) {
            return  Math.floor(diff / hour) + " hours ago";
        }

        if (diff > day && diff < day * 2) {
            return "yesterday";
        }

        if (diff < day * 365) {
            return Math.floor(diff / day) + " days ago";
        } else {
            return "over a year ago";
        }
    },    
	lastUpdateCheck (updatedateString) {
        let rightNow = new Date();
        let then = new Date(updatedateString);

        let diff = rightNow - then;

        let second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

        if (diff < minute) {
            // within minute
            return 0;
        } else 
			return 999;



    },
    slug(str) {
        return str.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },
    randomColor() {
        return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    },
	daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
	},	
	
	getFirstMonday(firstDay) {
		var firstMonday = 0;
			if (firstDay == 0)
				firstMonday = 1;
			else if (firstDay == 1)
				firstMonday = 1;
			else if (firstDay == 2)
				firstMonday = 7;
			else if (firstDay == 3)
				firstMonday = 6;
			else if (firstDay == 4)
				firstMonday = 5;
			else if (firstDay == 5)
				firstMonday = 4;
			else if (firstDay == 6)
				firstMonday = 3;
			return firstMonday;
	},
	
	/*
	Date.prototype.getMonthWeek = function(){
    var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay)/7);
}
*/
	
	getMonthWeek(dateString) {
			let monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
			];
			let then = new Date(dateString);
			var year = then.getFullYear();
			var month = then.getMonth();
			var firstDay = new Date(then.getFullYear(), then.getMonth(), 1).getDay();
			var firstMonday = 0;
			firstMonday = this.getFirstMonday(firstDay);
			var firstMondayWeek = 0;
			firstMondayWeek = ((Math.ceil((then.getDate() + firstDay)/7))-1)*7 + firstMonday;
			if(firstMondayWeek == then.getDay()) {
				firstMondayWeek = firstMondayWeek + 7;
				return monthNames[month] + " " + firstMondayWeek + ", " + year;	
			}
			var daysinmonth = this.daysInMonth( month, year);
			if(firstMondayWeek > daysinmonth) {
				if(month < 12) {
					month = month+1;
					firstDay = new Date(year, month, 1).getDay();
					firstMonday = this.getFirstMonday(firstDay);
					return monthNames[month] + " " + firstMonday + ", " + year;
				} else {
					year = year+1;
					month = 0;
					firstDay = new Date(year, month, 1).getDay();
					firstMonday = this.getFirstMonday(firstDay);
					return monthNames[month] + " " + firstMonday + ", " + year;					
				}
			} else 
				return monthNames[month] + " " + firstMondayWeek + ", " + year;	
	},
	
		getMonthWeekhtml(dateString) {
			let monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
			];
			let then = new Date(dateString);
			var year = then.getFullYear();
			var month = then.getMonth();
			var firstDay = new Date(then.getFullYear(), then.getMonth(), 1).getDay();
			var firstMonday = 0;
			firstMonday = this.getFirstMonday(firstDay);
			var firstMondayWeek = 0;
			firstMondayWeek = ((Math.ceil((then.getDate() + firstDay)/7))-1)*7 + firstMonday;
			if(firstMondayWeek == then.getDay()) {
				firstMondayWeek = firstMondayWeek + 7;
				return "ackrellnewsletter_" + monthNames[month] + "_" + firstMondayWeek + "_" + year + ".html";	
			}
			var daysinmonth = this.daysInMonth( month, year);
			if(firstMondayWeek > daysinmonth) {
				if(month < 12) {
					month = month+1;
					firstDay = new Date(year, month, 1).getDay();
					firstMonday = this.getFirstMonday(firstDay);
					return "ackrellnewsletter_" + monthNames[month] + "_" + firstMonday + "_" + year + ".html";	
				} else {
					year = year+1;
					month = 0;
					firstDay = new Date(year, month, 1).getDay();
					firstMonday = this.getFirstMonday(firstDay);
					return "ackrellnewsletter_" + monthNames[month] + "_" + firstMonday + "_" + year + ".html";					
				}
			} else 
				return "ackrellnewsletter_" + monthNames[month] + "_" + firstMondayWeek + "_" + year + ".html";	
	},
	extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
	},

	extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

	
}
