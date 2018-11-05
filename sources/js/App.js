import $ from './Functions';
import Slider from './Slider';

const App = {
	init: init
}

function init(){
	new Slider({
		selector: '#slider',
		auto: true,
		duration: 3000,
		mobile: 620
	});
}

App.init();
