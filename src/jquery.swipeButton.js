/*
	Name: jquery.swipeButton.js
	Author: Andy andyMatthews
	Forked by: Rodrigo Coutinho (digaoddc)
	Website: http://andyMatthews.net
	Version: 1.2.1
*/
(function($){
	var opts = {};
	var methods = {
		init : function( options ) {
			//$(this).attr("data-swipeurl",""); //setting data-swipeurl on the li --Added: 2012/12/15
			var o = $.extend( {}, $.fn.swipeDelete.defaults, options );
			opts = o;
			return this.not("[data-swipeurl]").each(function(i, el){
				var $e = $(el);
				var $parent = $(el).parent('ul');
				var uniq = Date.now()+i;
				$e.attr("data-swipeurl","");
				$e.attr("id" ,"swipe-"+uniq);

				$(document).on('swipeleft', "#"+ $e.attr("id"),  function(event){
					// reference the current item
					var $li = $(this);
					var cnt = $('.ui-btn', $li).length;

					// remove all currently displayed buttons
					$('div.ui-btn, .' + o.btnClass, $parent).animate({ width: 'toggle' }, 200, function(e) {
						$(this).remove();
					});

					// if there's an existing button we simply delete it, then stop
					if (!cnt) {
						// create button
						var $swipeBtn = $('<a>' + o.btnLabel + '</a>').attr({
											'data-role': 'button',
											'data-mini': true,
											'data-inline': 'true',
											'class': (o.btnClass === 'aSwipeBtn') ? o.btnClass : o.btnClass + ' aSwipeBtn',
											'data-theme': o.btnTheme,
											'href': $li.data('swipeurl')
										})
										.on('click tap', o.click);

						// slide insert button into list item
						$swipeBtn.prependTo($li).button();
						$li.find('.ui-btn').hide().animate({ width: 'toggle' }, 200);

						// override row click
					    $li.on('vclick.swipe', function (e) {
	                        e.stopPropagation();
	                        e.preventDefault();
	                        $(this).off('vclick.swipe');
	                        $li.removeClass('ui-btn-active');
	                        $swipeBtn.animate({ width: 0 }, function() {
	                            $(this).remove();
	                        });
                    	});

					}

				});

			});
		},
		refresh : function() {
			this.swipeDelete(opts);
			return this;
		}
	}

	$.fn.swipeDelete = function(method){
	
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.swipeDelete' );
		}
	};

	$.fn.swipeDelete.defaults = {
		direction: 'swiperight',
		btnLabel: 'Delete',
		btnTheme: 'e',
		btnClass: 'aSwipeBtn',
		click: function(e){
			e.preventDefault();
			$(this).parents('li').slideUp();
		}
	};

}(jQuery));
