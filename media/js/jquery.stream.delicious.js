/* A Delicious plugin for the jQuery Stream plugin.
 *
 * @author: Derek Ditch <derek.ditch@gmail.com>
 * @date: 2011.03.15
 */

(function($){
    $.fn.stream_delicious = function( options ){
        var defaults = { user: 'example', }
        var options = $.extend(defaults, options);
        var data = $(this).data('stream_delicious', {user: options['user'],});

        return this;
    };

    $(this).stream('register', {
        name: 'stream_delicious',
        method: function( options ){
            // Set default values
            var defaults = {
                count: 10,
            }

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
        }
    });

    return this;
})(jQuery);
