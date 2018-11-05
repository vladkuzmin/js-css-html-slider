import $ from './Functions';

class Slider {
	
	constructor(opts = {}){
		this.selector = document.querySelector(opts.selector);
		this.auto = opts.auto || false;
		this.duration = opts.duration || 5000;
		this.active = 0;
		this.isClickable = false;
		this.mouseover = false;
		this.mobile = window.matchMedia(`(max-width: ${opts.mobile}px)`);
		this.init();

	}

	init(){
		
		// Init selectors
		this.isClickable = true;
		const s = this.selectors = {};
		
		s.wrapper = $.elem('#slider-wrapper');
		s.navs = $.elems('#slider-nav li');
		s.grids = $.elems('#slider-grid li');
		s.slides = $.elems('#slider-content li');
		s.controls = $.elems('#slider-controls li');

		//  Init slider length
		this.len = s.slides.length;

		// Init active slide
		this.show(this.active);

		// Init content height + resize event
		this.height();

		window.addEventListener('resize', ()=>{
			this.height();
		});

		// Navigation event
		s.navs.forEach((item, index)=> {
			item.addEventListener('click', () => {
				if(this.isClickable){
					this.show(index);
				}
			});
		});

		// Controls events
		s.controls.forEach((item, index) => {
			item.addEventListener('click', () => {
				if(this.isClickable){
					this.direction = index;
					this.next(index);
				}
			});
		});

		if(this.auto){
			this.animation();
			this.mouseEvents();
		}

	}

	mouseEvents(){
		this.selector.addEventListener('mouseover', (e) => {
			this.mouseover = true;
		});
		this.selector.addEventListener('mouseleave', (e) => {
			this.mouseover = false;
		});
	}

	animation(){
		setInterval(() => {
			if(!this.mouseover){
				this.direction = 1;
				this.next(1);
			}
		}, this.duration);
	}

	height(){
		const s = this.selectors;
		let height = [];
		s.slides.forEach((x)=> {
			let a = x.offsetHeight + (this.mobile.mathes ? 0 : 100);
			height.push(a);
		});
		s.wrapper
			.style
			.height = Math.max(...height) + 'px';
	}

	next(index){
		let next = this.active + (index === 0 ? -1 : 1);
		
		if(next < 0) next = this.len - 1
		else if (next === this.len ) next = 0

		this.show(next);
	}

	show(index){

		this.isClickable = false;
		
		const s = this.selectors;
		let prev = this.active;

		let direction = this.direction === 0 ? 'left' : 'right';
		let point = (this.len - 1)/2;
		let isPoint = false;

		let prevText = s.slides[prev].querySelector('.slide__content');
		let nextText = s.slides[index].querySelector('.slide__content');

		if(
			prev < point && index > point || 
			prev > point && index < point 
		) {
			isPoint = true;
		}

		if(isPoint && !this.mobile.matches) {
			
			s.wrapper.classList.add('is-point-'+ direction);
			
			setTimeout(()=>{
				s.wrapper.classList
					.remove(
						'is-point-left',
						'is-point-right'
					)
			}, 750);

			setTimeout(()=>{
				addActiveClass();
			}, 375);

			this.addContentActiveClasses(prevText, nextText, direction);


		} else {

			// add next slide classes
			s.slides[index].classList.add('is-enter-'+ direction);
			setTimeout(()=>{
				s.slides.forEach( x => 
					x.classList
					.remove(
						'is-enter-left',
						'is-enter-right'
					)
				);
			}, 750);
			
			// remove prev slide classes
			s.slides[prev].classList.add('is-leave-'+ direction);
			setTimeout(()=>{
				s.slides.forEach( x =>
					x.classList
					.remove(
						'is-leave-left',
						'is-leave-right'
					)
				);
			}, 750);
			
			addActiveClass();
			this.addContentActiveClasses(prevText, nextText, direction);
			
		}

		// Slider classes
		function addActiveClass(){
			// removing active classes
			s.navs.forEach(x=> x.classList.remove('is-active'));
			s.grids.forEach(x => x.classList.remove('is-active'));
			s.slides.forEach(x => x.classList.remove('is-active'));

			// adding active classes
			s.grids[index].classList.add('is-active');
			s.navs[index].classList.add('is-active');
			s.slides[index].classList.add('is-active');
		}
		
		// Change active slide
		this.active = index;
	}

	addContentActiveClasses(prev, next, dir){

		prev.classList.add('is-leave-'+ dir);
		
		[...prev.querySelectorAll('.slide__content > *')].forEach((x)=>{
			x.classList.remove('is-active');
		});

		setTimeout(()=>{
			prev.classList
				.remove(
					'is-leave-left',
					'is-leave-right'
				)
		}, 750);
		
		setTimeout(()=>{
			next.classList.add('is-enter-'+ dir);
			setTimeout(()=>{
				next.classList
					.remove(
						'is-enter-left',
						'is-enter-right'
					)
			}, 750);

			[...next.querySelectorAll('.slide__content > *')].forEach((x)=>{
				x.classList.add('is-active');
			});

			setTimeout(()=>{
				this.isClickable = true;
			}, 500);

		}, 750);
	}
}

export default Slider;