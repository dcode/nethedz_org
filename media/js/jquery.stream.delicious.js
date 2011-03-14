/*
 *
 *
 *
 */

(function($){
    $.fn.extend({
        delicious: function( options ){
            // Set default values
            var defaults = {
                count: 10,
                template: $.template( "deliciousTemplate",
                    "<li class=\"bookmark \">"
                        + "<h5><span class=\"meta\">"
                        + "LINK // <time datetime=\"${dt}\">${dateline}</time></span>"
                        + "<a href=\"${u}\">${d}</a></h5>"
                        + "<p>${n}</p>"
                    + "</li><hr />"
                )
            }

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var url_ = "http://feeds.delicious.com/v2/json/" + o.user + "?count=" + o.count + "&callback=?";

                function pad_digit ( value )
                {
                    return (value < 10 ? '0' + value : value);
                }

                $.getJSON( url_, function(data) {
                    $("#stream").empty();
                    $.each( data, function ( i, item ){
                        var d_ = new Date( item.dt );
                        item.dateline = d_.getFullYear() + '.' + pad_digit(d_.getMonth() + 1) + '.' 
                            + pad_digit( d_.getDate() ) + ' // '
                            + pad_digit( d_.getHours() ) + ':' 
                            + pad_digit( d_.getMinutes() );

                        $.tmpl("deliciousTemplate", item ).appendTo("#stream");
                    });
                });

            });
        }

    });
})(jQuery);
