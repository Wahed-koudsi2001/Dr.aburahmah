(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	$window.on('load', function () {
		$(".preloader").fadeOut(600);
	});

	window.addEventListener('scroll', function () {
		const header = document.querySelector('.main-header');
		if (window.scrollY > 0) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}
	});

	/* Sticky Header */
	if ($('.active-sticky-header').length) {
		$window.on('resize', function () {
			setHeaderHeight();
		});

		function setHeaderHeight() {
			$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}

		$window.on("scroll", function () {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}

	/* Slick Menu JS */
	$('#menu').slicknav({
		label: '',
		prependTo: '.responsive-menu'
	});

	if ($("a[href='#top']").length) {
		$(document).on("click", "a[href='#top']", function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Slider Layout JS */
	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
		slidesPerView: 1,
		speed: 1000,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.hero-pagination',
			clickable: true,
		},
	});

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 30,
			centeredSlides: true,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				991: {
					slidesPerView: 3,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function () {
			$('.skillbar').each(function () {
				$(this).find('.count-bar').animate({
					width: $(this).attr('data-percent')
				}, 2000);
			});
		}, {
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none"
				}
			});
			tl.set(container, {
				autoAlpha: 1
			});
			tl.from(container, 1, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1, {
				xPercent: 100,
				scale: 1,
				delay: -1,
				ease: Power2.out
			});
		});
	}

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount = 0.05,
			translateXValue = 0,
			delayValue = 0.5,
			animatedTextElements = document.querySelectorAll('.text-anime-style-1');

		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	if ($('.text-anime-style-2').length) {
		let staggerAmount = 0.03,
			translateXValue = 20,
			delayValue = 0.1,
			easeType = "power2.out",
			animatedTextElements = document.querySelectorAll('.text-anime-style-2');

		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.chars, {
				duration: 1,
				delay: delayValue,
				x: translateXValue,
				autoAlpha: 0,
				stagger: staggerAmount,
				ease: easeType,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	if ($('.text-anime-style-3').length) {
		let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

		animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element, start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if ($parallaxie.length && ($window.width() > 991)) {
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm() {
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success: function (text) {
				if (text === "success") {
					formSuccess();
				} else {
					submitMSG(false, text);
				}
			}
		});
	}

	function formSuccess() {
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Appointment form validation */
	var $appointmentForm = $("#appointmentForm");
	$appointmentForm.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitappointmentForm();
		}
	});

	function submitappointmentForm() {
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-appointment.php",
			data: $appointmentForm.serialize(),
			success: function (text) {
				if (text === "success") {
					appointmentformSuccess();
				} else {
					appointmentsubmitMSG(false, text);
				}
			}
		});
	}

	function appointmentformSuccess() {
		$appointmentForm[0].reset();
		appointmentsubmitMSG(true, "Message Sent Successfully!")
	}

	function appointmentsubmitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Appointment form validation end */

	/* Animated Wow Js */
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Service Item List Start */
	var $service_item_list = $('.service-item-list');
	if ($service_item_list.length) {
		var $service_item = $service_item_list.find('.service-item');

		if ($service_item.length) {
			$service_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$service_item.removeClass('active');
						$(this).addClass('active');
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Service Item List End */

})(jQuery);

$(document).ready(function () {
	const translations = {
		en: {
			subtitle: "Body Mass Index (BMI) | Your Guide to Better Understanding Your Weight and Health",
			heading: "Quickly Assess Your Health Status Using Body Mass Index BMI",
			description: "BMI is calculated using your weight and height (weight divided by height squared). Along with other factors such as blood pressure and cholesterol, BMI can help estimate the risk of heart disease or stroke.",
			heightPlaceholder: "Enter your height (cm)",
			weightPlaceholder: "Enter your weight (kg)",
			button: "Calculate",
			tableTitle: "BMI Categories",
			tableList: [
				"Less than 18.5", "Underweight",
				"18.5 to 24.9", "Healthy weight",
				"25 to 29.9", "Overweight",
				"30 to 34.9", "Class I Obesity",
				"35 to 39.9", "Class II Obesity",
				"40 or more", "Class III Obesity"
			],
			note: "Note: The BMI table remains unchanged.",
			resultTitle: "Result",
			underweight: "Underweight",
			healthy: "Healthy",
			overweight: "Overweight",
			obese: "Obese",
			youLabel: "You",
			yourBmi: "Your BMI:",
			categories: {
				underweight: "Underweight",
				healthy: "Healthy Weight",
				overweight: "Overweight",
				obese1: "Class I Obesity",
				obese2: "Class II Obesity",
				obese3: "Class III Obesity"
			},
			alert: "Please enter valid values for height and weight."
		},
		ar: {
			subtitle: "مؤشر كتلة الجسم (BMI) | دليلك لفهم وزنك وصحتك بشكل أفضل",
			heading: "اكتشف وضعك الصحي بسرعة باستخدام مؤشر كتلة الجسم BMI",
			description: "يتم حساب مؤشر كتلة الجسم باستخدام وزنك وطولك (وزنك مقسوماً على طولك مربعاً)، جنباً إلى جنب مع العديد من العوامل الأخرى مثل ضغط الدم والكوليسترول، ويمكن أن يساعد مؤشر كتلة الجسم في تقدير خطر الإصابة بنوبة قلبية أو سكتة دماغية.",
			heightPlaceholder: "اكتب طولك (سم)",
			weightPlaceholder: "اكتب وزنك (كغ)",
			button: "احسب",
			tableTitle: "أقسام مؤشرات الكتلة",
			tableList: [
				"أقل من 18.5", "وزن ناقص",
				"من 18.5 إلى 24.9", "وزن صحي",
				"من 25 إلى 29.9", "وزن زائد",
				"من 30 إلى 34.9", "سمنة من الدرجة الأولى",
				"من 35 إلى 39.9", "سمنة من الدرجة الثانية",
				"من 40 أو أكثر", "سمنة من درجة ثالثة"
			],
			note: "ملاحظة: الجدول الخاص بـ مؤشرات يبقى ثابتاً",
			resultTitle: "النتيجة",
			underweight: "نقص الوزن",
			healthy: "صحيح",
			overweight: "وزن زائد",
			obese: "سمنة",
			youLabel: "أنت",
			yourBmi: "مؤشر كتلة جسمك:",
			categories: {
				underweight: "وزن ناقص",
				healthy: "وزن صحي",
				overweight: "وزن زائد",
				obese1: "سمنة من الدرجة الأولى",
				obese2: "سمنة من الدرجة الثانية",
				obese3: "سمنة من درجة ثالثة"
			},
			alert: "الرجاء إدخال قيم صحيحة للطول والوزن."
		}
	};

	function getCurrentLang() {
		return document.documentElement.lang || 'en';
	}

	function updateTranslations() {
		const lang = getCurrentLang();
		const t = translations[lang];

		$('#bmi-subtitle').text(t.subtitle);
		$('#bmi-heading').text(t.heading);
		$('#bmi-description').text(t.description);
		$('#height').attr('placeholder', t.heightPlaceholder);
		$('#weight').attr('placeholder', t.weightPlaceholder);
		$('#bmi-button').text(t.button);
		$('#bmi-table-title').text(t.tableTitle);
		$('#bmi-note').text(t.note);
		$('.result-text').text(t.resultTitle);
		$('.calc_info_line_underweight').text(t.underweight);
		$('.calc_info_line_healthy').text(t.healthy);
		$('.calc_info_line_overweight').text(t.overweight);
		$('.calc_info_line_obese').text(t.obese);
		$('#you-label').text(t.youLabel);

		let listHtml = '';
		for (let i = 0; i < t.tableList.length; i += 2) {
			listHtml += `<li>${t.tableList[i]}</li><li>${t.tableList[i + 1]}</li>`;
		}
		$('#bmi-list').html(listHtml);
	}

	updateTranslations();

	$('#bmiForm').on('submit', function (e) {
		e.preventDefault();
		const lang = getCurrentLang();
		const t = translations[lang];
		const heightInput = $('#height').val();
		const weightInput = $('#weight').val();

		if (!heightInput || !weightInput || heightInput <= 0 || weightInput <= 0) {
			alert(t.alert);
			return;
		}

		const heightInMeters = heightInput / 100;
		const bmi = (weightInput / (heightInMeters ** 2)).toFixed(2);

		let categoryKey = '';
		let percentage = 0;

		if (bmi < 18.5) {
			categoryKey = 'underweight';
			percentage = (bmi / 18.5) * 16.666;
		} else if (bmi < 25) {
			categoryKey = 'healthy';
			percentage = 16.666 + ((bmi - 18.5) / 6.4) * 16.666;
		} else if (bmi < 30) {
			categoryKey = 'overweight';
			percentage = 33.333 + ((bmi - 25) / 5) * 16.666;
		} else if (bmi < 35) {
			categoryKey = 'obese1';
			percentage = 50 + ((bmi - 30) / 5) * 16.666;
		} else if (bmi < 40) {
			categoryKey = 'obese2';
			percentage = 66.666 + ((bmi - 35) / 5) * 16.666;
		} else {
			categoryKey = 'obese3';
			percentage = 83.333 + ((bmi - 40) / 10) * 16.666;
		}

		percentage = Math.min(Math.max(percentage, 0), 100);
		const category = t.categories[categoryKey];

		$('.status').text(`${t.yourBmi} ${bmi} - ${category}`);
		$('.status').css('background-color',
			categoryKey === 'underweight' ? 'lightblue' :
				categoryKey === 'healthy' ? 'lightgreen' :
					categoryKey === 'overweight' ? 'yellow' :
						categoryKey === 'obese1' ? 'orange' :
							categoryKey === 'obese2' ? 'red' : 'darkred');

		$('.layout').fadeIn();
		$('.calc_info_line_result_wrapper').css('right', `${percentage}%`);
	});

	$('.fa-xmark').on('click', resetLayout);
	$(document).on('click', function (e) {
		if ($('.layout').is(':visible') && !$('.result').is(e.target) && $('.result').has(e.target).length === 0) {
			resetLayout();
		}
	});

	function resetLayout() {
		$('.layout').fadeOut();
		$('.calc_info_line_result_wrapper').css('right', '0');
	}
});