/**
 * jquery.checkList.
 * Object search plugin.
 *
 * Copyright (c) 2012 Jensen Tonne
 * www.jstonne.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * $(e).checkList({
 *    check  : function(){},   // this refers to the input being checked
 *    uncheck: function(){},   // this refers to the input being unchecked
 *
 *    // returns checked elements & unchecked elements in separate arguments
 *    change : function(checked, unchecked){}
 * })
 *
 */


$.fn.checkList = function(options) {

	var defaultOptions = {
		checkbox: ".checkbox",
		masterCheckbox: ".master-checkbox",
		check: function() {},
		uncheck: function() {},
		change: function() {}
	}

	var options = $.extend({}, defaultOptions, options),

		checkList       = this,
		checkboxes      = checkList.find(options.checkbox),
		masterCheckbox  = checkList.find(options.masterCheckbox),

		disableChangeEvent = false;

	var change = function() {
		if (!disableChangeEvent) {
			options.change.call(checkList,
					            checkboxes.filter(':checked'),
					            checkboxes.not(':checked'));
		}
	}

	checkboxes.checked(

		// checked
		function() {
			options.check.apply(checkList);
			change();
		},

		// unchecked
		function() {
			options.uncheck.apply(checkList);
			change();
		}
	);

	masterCheckbox.checked(

		// checked
		function() {

			disableChangeEvent = true;

			checkboxes.checked(true);

			disableChange = false;

			change();
		},

		// unchecked
		function() {

			disableChangeEvent = true;

			checkboxes.checked(false);

			disableChangeEvent = false;

			change();
		}
	);

	return this;
}
