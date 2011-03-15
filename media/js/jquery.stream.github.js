/*
 *
 *
 *
 */

(function($){
    $.fn.extend({
        github: function( options ){
            // Set default values
            var defaults = {
                template: $.template( "streamTemplate",
                    "<li class=\"code \">"
                        + "<h5><span class=\"meta\">"
                        + "CODE // <time datetime=\"${datetime}\">${dateline}</time></span>"
                        + "{{html title}}</h5>"
                        + "<p>{{html body}}</p>"
                    + "</li><hr />"
                )
            }

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var url_ = "https://github.com/" + o.user + ".json?callback=?"

                function pad_digit ( value )
                {
                    return (value < 10 ? '0' + value : value);
                }

                $.getJSON( url_, function(data) {
                    $("#stream").empty();
                    $.each( data, function ( i, item ){

                        var d_ = new Date( item.created_at );
                        dateline_ = d_.getFullYear() + '.' + pad_digit(d_.getMonth() + 1) + '.' 
                            + pad_digit( d_.getDate() ) + ' // '
                            + pad_digit( d_.getHours() ) + ':' 
                            + pad_digit( d_.getMinutes() );

                        var context = {
                            datetime: item.created_at,
                            dateline: dateline_,
                            url: item.url,
                            title: 'default',
                            body: 'default'
                        };

                        var title_ = "";
                        var body_ = "";

                        switch( item.type )
                        {
                            case "PushEvent":
                                refs_ = item.payload.ref.split('/');
                                var branch_ = refs_[ refs_.length - 1];
                                title_ = "<a href=\"http://github.com/" + item.payload.actor + "\">"
                                    + item.payload.actor + "</a> "
                                    + " pushed to " + branch_
                                    + " at <a href=\"http://github.com/" + item.payload.repo + "\">"
                                    + item.payload.repo + "</a>";

                                body_ = "commit data.";
                                break;

                            case "CreateEvent":
                                title_ = "<a href=\"http://github.com/" + item.actor + "\">"
                                    + item.actor + "</a> "
                                    + " created " + item.payload.object + " "
                                    + item.payload.name;

                                if ( item.payload.object == "branch") {
                                    title_ = title_ + "/" + item.payload.object_name;
                                    body_ = "New branch is located at <code>null</code>";
                                }
                                break;
                        }

                        context.title = title_;
                        context.body = body_;

                        $.tmpl("streamTemplate", context ).appendTo("#stream");
                    });
                });

            });
        }

    });
})(jQuery);
