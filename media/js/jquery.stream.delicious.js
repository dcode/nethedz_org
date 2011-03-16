/* A Delicious plugin for the jQuery Stream plugin.
 *
 * @author: Derek Ditch <derek.ditch@gmail.com>
 * @date: 2011.03.15
 */

(function($){
    var methods = {

        render: function( options ){
            // Set default values
            var defaults = { count: 10, }

            var options = $.extend(defaults, options);
            var data = $(this).data('stream_delicious');
            var url_ = "http://feeds.delicious.com/v2/json/" + data['user'] + "?count=" 
                + options.count + "&callback=?";
            var entries = [];

            $.getJSON( url_, function(data) {
                $.each( data, function ( index, item ){
                    var context = {
                        stream_type: "Link",
                    datetime: item.dt,
                    url: item.u,
                    title: item.d,
                    body: item.n,
                    };
                    entries[entries.length] = context;
                });
            });

            return entries;
        },

        init: function( options ){
            var defaults = { user: 'example', }
            var options = $.extend(defaults, options);
            var data = $(this).data('stream_delicious', {user: options['user'],});

            $(this).stream('register', {
                name: 'stream_delicious',
                method: methods['render']
            });
        },
    }

    $.fn.stream_delicious = function( method ){
            // Method calling logic
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
            }
    };
})(jQuery);
