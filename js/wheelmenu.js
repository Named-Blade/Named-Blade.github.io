(function (){
	var wheelmenu;
	for (styleSheet of document.styleSheets){
		if (/wheelmenu\.css$/.test(styleSheet.href)){
			wheelmenu = styleSheet;
			for (let i=0;i<styleSheet.cssRules.length;i++){
				if (/menu-item:nth-child/.test(styleSheet.cssRules[i].selectorText)){;
					styleSheet.deleteRule(i);
					i--
				}
			}
		}
	}
	window.addEventListener('load', function () {
		let selector = ".menu-item a";
		let rule = "{transform: rotate(90deg)}";
		wheelmenu.insertRule(selector+rule);
		let i=0
		for (nav of document.getElementsByClassName('menu')){
			let navClass = "menu-"+i;
			new navMenu(nav,navClass);
			i++;
		}
	});
	class navMenu{
		constructor(nav,navClass){
			this.navclass = navClass;
			this.nav = nav;
			nav.classList.add(this.navclass);
			this.styleSheet = new CSSStyleSheet();
			document.adoptedStyleSheets.push(this.styleSheet)
			this.observer = new MutationObserver(this.onChange.bind(this));
			this.observer.observe(this.nav.children[2],{childList:true});
			this.onChange();
			window.nav = this;
		}
		onChange(){
			for (const rule of this.styleSheet.cssRules){
				this.styleSheet.deleteRule(0);
			}
			let numItems = this.nav.children[2].children.length;
			for (let i=0;i<numItems;i++){
				let point = (Math.PI*2/numItems)*(i);
				let x= Math.cos(point);
				let y= Math.sin(point);
				let rule = "{transform: rotate(-90deg) translate("+(x*100)+"%,"+(y*100)+"%);}";
				let selector = "."+this.navclass+" .menu-toggler:checked ~ ul .menu-item:nth-child("+(i+1)+")";
				this.styleSheet.insertRule(selector+rule);
			}
		}
	}
})();