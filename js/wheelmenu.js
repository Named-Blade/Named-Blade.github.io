(function (){
	var wheelmenu;
	for (let i=0;i<document.styleSheets.length;i++){
		if (/wheelmenu\.css$/.test(document.styleSheets[i].href)){
			wheelmenu = i;
			for (let j=0;j<document.styleSheets[i].rules.length;j++){
				if (/menu-item:nth-child/.test(document.styleSheets[i].rules[j].selectorText)){
					document.styleSheets[i].deleteRule(j);
					j--;
				}
			}
		}
	}
	window.addEventListener('load', function () {
	let i=0
	let selector = ".menu-item a";
	let rule = "transform: rotate(90deg)";
	document.styleSheets[wheelmenu].addRule(selector,rule);
		for (nav of document.getElementsByClassName('menu')){
			let navClass = "menu-"+i;
			nav.classList.add(navClass);
			let numItems = nav.children[2].children.length;
			for (let j=0;j<numItems;j++){
				let point = (Math.PI*2/numItems)*(j);
				let x= Math.cos(point);
				let y= Math.sin(point);
				let rule = "transform: rotate(-90deg) translate("+(x*100)+"%,"+(y*100)+"%);";
				let selector = "."+navClass+" .menu-toggler:checked ~ ul .menu-item:nth-child("+(j+1)+")";
				document.styleSheets[wheelmenu].addRule(selector,rule);
			}
			i++;
		}
	});
})();