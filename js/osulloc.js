var mainSwiper


$(document).ready(function () {

	$('.language > a').click(function () {
		$('.language_box').slideToggle();
	});

	$('.language_box > a').click(function () {
		var txt = $(this).text();
		//		alert(txt);
		$('.language > a').text(txt);
		$('.language_box').slideUp();
	});
	//menu-toggle


	$(document).on('click', 'a[href="#"]', function (e) {
		e.preventDefault();
	});

	$('.gnb > ul > li > a').on('mouseenter focus', function () {
		$('.gnb > ul > li > ul').css({
			'display': 'block'
		});
		$('header').addClass('on');
	});
	$('header').on('mouseleave', function () {
		$('.gnb > ul > li > ul').css({
			'display': 'none'
		});
		$('header').removeClass('on');
	});
	//header-gnb


	mainSwiper = new Swiper('.main', {
		effect: 'fade',
		loop: true,
		initialSlide: 0,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false
		},
		on: {
			slideChange: function (swiper) {
				var previousIndex = (swiper.previousIndex - 1) % 4
				var activeIndex = (swiper.activeIndex - 1) % 4
				
				var dots = $('.pagination_area li');

				var previousDots = dots[previousIndex];
				$(previousDots).removeClass('active');

				var activeDots = dots[activeIndex];
				$(activeDots).addClass('active');
			}
		}
	});
	
	$('.play_button a').on('click', function () {
		$(this).toggleClass('pause');
		
		if ($(this).hasClass('pause')) {
			mainSwiper.autoplay.stop();
			
			var li = $('.pagination_area .pag_inner li')[mainSwiper.activeIndex - 1]
			var curWidth = li.children[0].clientWidth
			
			$(li).removeClass('active')
			
			li.children[0].style.width = curWidth + 'px'
			
		} else {
			mainSwiper.autoplay.start();
			var li = $('.pagination_area .pag_inner li')[mainSwiper.activeIndex - 1]
			li.children[0].style.width = null
			$(li).addClass('active')
		}
	})
	//swiper-main


	var weeklySwiper = new Swiper('.weekly', {
		slidesPerView: 5,
		spaceBetween: 30,
		loop: true,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	//swiper-weekly


	var mdSwiper = new Swiper('.md', {
		slidesPerView: 3,
		spaceBetween: 30,
		freeMode: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	//swiper-md


	var imgBoxSwiper = new Swiper('.img_box', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	//wiper-img_box


	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var countDownDate = new Date(`${year} ${month} ${day} 24:00:00`).getTime();

	var getTimeText = function (value) {
		return `${value < 10 ? 0 : ''}${value}`
	}

	var x = setInterval(function () {

		var now = new Date().getTime();

		var diff = new Date(countDownDate - now);

		var hours = diff.getUTCHours();
		var minutes = diff.getMinutes();
		var seconds = diff.getSeconds();

		document.getElementById("counTime").innerHTML = getTimeText(hours) + ":" +
			getTimeText(minutes) + ":" + getTimeText(seconds)

		if (diff.getTime() <= 0) {
			clearInterval(x);
			document.getElementById("counTime").innerHTML = "00:00:00";
		}
	}, 1000);
	//event-counTime


	function changeVideo(swiper) {
		var tapSlides = $('.choice_tap .swiper-slide')
		tapSlides.removeClass('swiper-slide__custom_active')

		var previousIndex = swiper.previousIndex;
		if (previousIndex >= 0) {
			// previous video stop
			var previousSlide = swiper.slides[previousIndex]
			var video = previousSlide.children[1]
			video.remove()
		}

		var activeIndex = swiper.activeIndex;
		if (activeIndex >= 0) {
			// next video start
			var videoName = `video${activeIndex < 9 ? '0' : ''}${activeIndex + 1}.mp4`
			var source = document.createElement('source');
			source.setAttribute('type', 'video/mp4');
			source.setAttribute('src', `img/video/${videoName}`);

			var video = document.createElement('video');
			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			video.appendChild(source)

			var activeSlide = swiper.slides[activeIndex]
			activeSlide.appendChild(video)

			$(tapSlides[activeIndex]).addClass('swiper-slide__custom_active')
		}
	}

	var choiceSwiper = new Swiper('.choice', {
		spaceBetween: 30,
		centeredSlides: true,
		effect: 'fade',
		on: {
			init: function (swiper) {
				changeVideo(swiper)
			},
			slideChange: function (swiper) {
				changeVideo(swiper)
			}
		}
	});
	//choice-video


	var tapSwiper = new Swiper('.choice_tap', {
		slidesPerView: 4,
		spaceBetween: 30,
		navigation: {
			clickable: false,
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			click: function (swiper) {
				if (swiper.clickedIndex) {
					choiceSwiper.slideTo(swiper.clickedIndex);
				}
			}
		}
	});
	//choice_tap



	$('.tabset').each(function () {
		var tabDiv = $(this);
		var anchors = tabDiv.find('.tabs a');
		var panelDivs = tabDiv.find('.panel');

		var lastAnchor;
		var lastPanel;

		anchors.show();

		lastAnchor = anchors.filter('.on');
		lastPanel = $(lastAnchor.attr('href'));

		panelDivs.hide();
		lastPanel.show();

		anchors.on('click', function (e) {
			e.preventDefault();

			var currentAnchor = $(this);
			var currentPanel = $(currentAnchor.attr('href'));

			if (currentAnchor.get(0) == lastAnchor.get(0)) {
				return;
			}

			lastPanel.hide(0.3, function () {
				lastAnchor.removeClass('on');

				currentAnchor.addClass('on');

				currentPanel.show(0.3);

				lastPanel.hide();

				lastAnchor = currentAnchor;
				lastPanel = currentPanel;
			})
		});
	});
	//best_tab

	
	$('#top-btn').on('click', function () {
		$('body').stop().animate({
			scrollTop: 0
		}, 500)
	})
	//top button


	$('body').scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('#top-btn').addClass('on');
		} else {
			$('#top-btn').removeClass('on');
		}
	});
	//top button animation


	var footerSwiper = new Swiper('.footer_more', {
		direction: 'vertical',
		autoplay: {
			delay: 3000,
		},
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	//footer_more


});
