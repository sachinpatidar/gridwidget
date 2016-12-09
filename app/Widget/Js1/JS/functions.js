;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		// select
		$('.select select').dropdown();

		// tooltip
		$('.tooltip-toggle').on('click', function(event){
			event.preventDefault();

			$(this).closest('.tooltip').toggleClass('tooltip-visible');
		});

		// datepicker
		$('.datepicker .field').datepicker({
			changeMonth: true,
            changeYear: true,
            showOn: 'both'
		});

		// tabs
		$('.tabs-nav a').on('click', function(event){
			event.preventDefault();

			var $tabLink = $(this);
			var target = $tabLink.attr('href');

			$tabLink
				.parent()
					.addClass('current')
				.siblings()
					.removeClass('current');

			$(target)
				.addClass('current')
				.siblings()
					.removeClass('current');
		});

		// popup
		$('.popup-toggle').on('click', function(event){
			event.preventDefault();

			var target = $(this).attr('href');

			$(target).addClass('popup-open');
		});

		$('.popup-close').on('click', function(event){
			event.preventDefault();

			$(this)
				.closest('.popup')
					.removeClass('popup-open');
		});

		$('a').on('keydown', function(e){
			if (e.keyCode == 9);

			e.preventDefault()
		});
		
		(function(){
		    var hasSelectedClass = 'file-upload-has-selected';
		    var holderSelector = '.file-upload';
		    var namesSelector = '.file-upload-names';
		    var inputSelector = '.file-upload-input';
		    var multipleNamesDivider = ', ';
		 
		    $(inputSelector)
		        .on('change', function() {
		            var input = this;
		            var files = input.files;
		 
		            // Files property polyfill
		            if(!('files' in input)) {
		                files = [];
		                files.push({
		                    name: input.value.replace('C:\\fakepath\\', '')
		                });
		            };
		 
		            $(input)
		                .closest(holderSelector)
		                .toggleClass(hasSelectedClass, input.value !== '')
		                    .find(namesSelector)
		                    .val(
		                        $.map(files, function(file) {
		                            return file.name;
		                        })
		                        .join(multipleNamesDivider)
		                    );
		        });
		})();

		//  box
		$('.box-toggle').on('click', function(event){
			event.preventDefault();

			$(this).closest('.box-interactive').toggleClass('expanded').removeClass('edit');
		});

		$('.box-toggle-edit').on('click', function(event){
			event.preventDefault();

			$(this).closest('.box-interactive').addClass('expanded').toggleClass('edit');
		});

		// messages
		$('.message-toggle').on('click', function(event){
			event.preventDefault();

			var $toggle = $(this);

			$toggle.closest('.messages').toggleClass('messages-expanded');
			$toggle.closest('.message-holder').toggleClass('message-holder-expanded');

			$toggle.closest('.popup-body').scrollTop(0);
		});

		// slider charts
		var $sliderCharts = $('.slider-charts');
		var $sliderChartsSlides = $sliderCharts.find('.slides');

		$sliderChartsSlides.owlCarousel({
			items: 1,
			mouseDrag: false,
			loop: true
		});

		$sliderCharts.find('.slider-prev').on('click', function(event){
			event.preventDefault();

			$sliderChartsSlides.trigger('prev.owl.carousel');
		});

		$sliderCharts.find('.slider-next').on('click', function(event){
			event.preventDefault();

			$sliderChartsSlides.trigger('next.owl.carousel');
		});

		// example loading
		$('.toggle-loading').on('click', function(event){
			event.preventDefault();

			$('.loading-overlay').addClass('visible');
		});

		// accordion
		$('.accordion-head').on('click', function(){
			$(this)
				.closest('.accordion-section')
					.toggleClass('accordion-section-expanded')
				.siblings()
					.removeClass('accordion-section-expanded');
		});

		$('.open-next-accordion-section').on('click', function(event){
			event.preventDefault();

			$(this)
				.closest('.accordion-section')
					.next()
					.toggleClass('accordion-section-expanded')
				.siblings()
					.removeClass('accordion-section-expanded');
		});

		$('.open-prev-accordion-section').on('click', function(event){
			event.preventDefault();

			$(this)
				.closest('.accordion-section')
					.prev()
					.toggleClass('accordion-section-expanded')
				.siblings()
					.removeClass('accordion-section-expanded');
		});

		$('.item-toggle').on('click', function(event){
			event.preventDefault();

			$(this).toggleClass('item-hidden');
		});

		// scrollable table
		$('.table-scroll-x-y .table-body .table-part-scrollable').on('scroll', function(){
			var $tablePartScrollable = $(this);
			var $table = $(this).closest('.table-scroll-x-y');
			var $tablePartScrollX = $table.find('.table-part-scroll-x');
			var $tablePartScrollY = $table.find('.table-part-scroll-y');

			$tablePartScrollX.css('margin-left', '-' + $tablePartScrollable.scrollLeft() + 'px');
			$('.form-filter-inner').css('margin-left', '-' + $tablePartScrollable.scrollLeft() + 'px');
			$tablePartScrollY.css('margin-top', '-' + $tablePartScrollable.scrollTop() + 'px');
		});

		// charts
		var chartDefaultConfig = {
			 chart: {
	            type: 'pie',
	            backgroundColor: null,
	            style: {
	            	'font-family': '"DIN", sans-serif;',
	            	'text-transform': 'uppercase',
	            	'font-size': '12px',
	            	'font-weight': 'bold'
	            }
	        },
	        plotOptions:{
	        	pie: {
	        		 dataLabels: {
	                    enabled: true,
	                    distance: -30,
	                    style: {
	                        fontWeight: 'bold',
	                        color: 'white',
	                        textShadow: null
	                    },
	                    formatter: function(){
			        		return  this.percentage + '%'
			        	}
	                },
	        		showInLegend: true,
		        	states: {
		        		hover: {
		        			enabled: false
		        		}
		        	}
	        	}
	        },
	        legend: {
	        	// floating: true,
	        	layout: 'vertical',
	        	align: 'right',
	        	symbolHeight: 0,
	        	symbolWidth: 0,
	        	margin: 0,
	        	padding: 0,
	        	verticalAlign: 'middle',
	        	style: {
	        		'text-transform': 'uppercase'
	        	},
	        	// labelFormat: '{name} {point.y}'
	        	labelFormatter: function(){
	        		return this.name + '<br>' + this.percentage + '%'
	        	}
	        },
	        title: null
		}

		$('.chart-canvas').each(function(){
			var $chart = $(this);

			$.ajax({
				url: $chart.attr('data-feed-url'),
				type: 'get'
			}).success(function(response){
				var highChartConfig = $.extend({}, chartDefaultConfig);

				highChartConfig.series = response;

				$chart.highcharts(highChartConfig)
			});
		});

		// remove
		$('.link-remove').on('click', function(event){
			event.preventDefault();

			$(this).closest('.item-remove').remove();
		});

		// link toggle all
		$('.link-toggle-all').on('click', function(event){
			event.preventDefault();

			$('.accordion-section').addClass('accordion-section-expanded');
		});

		// sortable
		$('.sortable').sortable();
		$('.sortable').disableSelection();
		
		$('.draggable').draggable({
			revert: true,
			revertDuration: 0
		});
		
		$('.droppable').droppable({
			activeClass: 'droppable-highlight',
			greedy: true,
			drop: function(){
				$($('#' + $('.droppable').data('template')).html()).appendTo($(this).find('.template-holder'));
			}
		});

		// check if iOS
		if (navigator.appVersion.indexOf('Macintosh') > 1) {
			$('html').addClass('page-macintosh');
		}

	});

	$win.on('load resize', function() {
		// equalise height
		$('.eq-elements').each(function(){
			$(this).find('.eq-element').equalizeHeight();
		});
	})

	$.fn.equalizeHeight = function() {
	    var maxHeight = 0, itemHeight;
	 
	    for (var i = 0; i < this.length; i++) {
	        itemHeight = $(this[i]).height('auto').height();
	        if (maxHeight < itemHeight) {
	            maxHeight = itemHeight;
	        }
	    }
	 
	    return this.height(maxHeight);
	}

})(jQuery, window, document);
