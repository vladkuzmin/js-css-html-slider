// SHARED FUNCTIONS
// ------------------------
const $ = {
	init: init,
	elem: elem,
	elems: elems
}

function init(){
	console.log('Functions are loaded!');
}

function elem(el){
	return document.querySelector(el);
}

function elems(el){
	return document.querySelectorAll(el);
}


export default $;