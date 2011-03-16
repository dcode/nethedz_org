(function($){
    var methods = {
        init: function( options )
        {
            return this.each( function( options ){
                var defaults = {
                        render_date: function( date_ ){
                            function pad_digit ( value )
                            {
                                return (value < 10 ? '0' + value : value );
                            }
                            return (date_.getFullYear() + '.' + pad_digit(d_.getMonth() + 1) + '.'
                                + pad_digit( d_.getDate() ) + ' // '
                                + pad_digit( d_.getHours() ) + ':'
                                + pad_digit( d_.getMinutes() )
                                );
                        }
                    },
                    $this = $(this),
                    data = $this.data('stream');

                var options = $.extend(defaults, options);

                // If the plugin hasn't been initialized yet
                if ( ! data ) {

                    $(this).data('stream', {
                        target : $this,
                        render_date: options['render_date'],
                        registry : [],
                    });
                }

            });
        },

        destroy: function() {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('stream');

                data.stream.remove();
                this.removeData('stream');
            });
        },

        register: function( options )
        {
            /* This method registers rendering functions that should return 
             * an array of contexts. The context should have the following
             * structure (if rendering your own template, this can change):
             * context = {
             *    datetime = new Date(),
             *    url: "http://www.example.com",
             *    stream_type: "STREAM", // This is the event type
             *    title: "My Event Title Line",
             *    body: "Pre-rendered body of event"
             * }
             */
            var defaults = {
                name: 'example', /* Name of the plugin */
                method: function( options ){ return this; },
                template: $.template( "streamTemplate",
                        "<li class=\"stream ${stream_type}\">"
                        + "<h5><span class=\"meta\">"
                        + "${stream_type} // <time datetime=\"${datetime}\">${dateline}</time></span>"
                        + "${title}</h5>"
                        + "<p>${body}</p>"
                        + "</li>"),
                };
            var options = $.extend(defaults, arguments[0]), 
                $this = $(this),
                data = $this.data('stream');

            var registry = data.registry;

            registry[registry.length] = options;
            $this.data('stream', {registry: options,} );

            alert("Line 80");

        },

        render: function( options )
        {
            var epoch = new Date();
            epoch.setTime(0);

            /* By default, render 25 entries with no date requisite.
             * If you wanted to say render all entries since last week,
             * you could set date to today's date minus 7 days and set
             * count to -1. If you want to render all entries ever, set 
             * count to -1 and leave the date at epoch. 
             *
             * NOTE: Some services limit data retrieval to a specific 
             * number of entries. Obviously you can't overcome this
             * limitation in the service.
             * */
            var defaults = {
                    count: 25,
                    date: epoch,
                },
                data = $(this).data('stream');

            var render_date = data['render_date'];
            var options = $.extend(defaults, options);

            return this.each( function(){
                /* Call all methods in the registry to collect entries
                 * for rendering
                 */
                var entries = [],
                    registry = data.registry;

                alert( "Registry length:" + registry.length );
                $.each(registry, function(index, item){
                    entries.concat( item['method']( {count: options['count'],}) );
                });

            });
        },
    };

    $.fn.stream = function( method ){
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
