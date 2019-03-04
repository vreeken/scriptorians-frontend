// Globally accessible Filters

export default async({ Vue }) => {
	Vue.filter('fromNow', function(date) {
		// This replaces Moment.js's fromNow() function
		var thresholds = [46656000000, 27648000000, 3888000000, 2246400000, 129600000, 79200000, 5400000, 2700000, 90000, 46000, 0];
		var modifiers = [31536000000, 1, 2592000000, 1, 86400000, 1, 3600000, 1, 60000, 1, 1];
		var outputs = [' years ago', 'a year ago', ' months ago', 'a month ago', ' days ago', 'a day ago', ' hours ago', 'an hour ago', ' minutes ago', 'a minute ago', 'just now'];
		var d = new Date(date);
		var elapsed = Math.round(new Date() - d);
		for (var i = 0; i < thresholds.length; i++) {
			if (elapsed >= thresholds[i]) {
				if (modifiers[i] > 1) {
					return Math.round(elapsed / modifiers[i]) + outputs[i];
				}
				return outputs[i];
			}
		}
		return 'just now';
	});
}
