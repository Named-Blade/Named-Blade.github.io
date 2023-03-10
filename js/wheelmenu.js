for (styleSheet of document.styleSheets){
	if (/wheelmenu\.css$/.test(styleSheet.href)){
		for (let i=0;i<styleSheet.cssRules.length;i++){
			if (/menu-item:nth-child/.test(styleSheet.cssRules[i].selectorText)){;
				styleSheet.deleteRule(i);
				i--
			}
		}
	}
}
window.addEventListener('load', function () {
	let i=0
	for (nav of document.getElementsByClassName('menu')){
		let navClass = "menu-"+i;
		new navMenu(nav,navClass,5);
		i++;
	}
});
class navMenu{
	constructor(nav,navClass,n){
		this.nav = nav;
		this.nav.nav = this;
		this.navclass = navClass;
		this.n = n;
		nav.classList.add(this.navclass);
		this.observer = new MutationObserver(this.onChange.bind(this));
		this.observer.observe(this.nav.children[2],{childList:true});
		this.onChange();
	}
	onChange(){
		let styleSheets = Array.from(document.adoptedStyleSheets);
		for (let i=0;i<styleSheets.length;i++){
			if (styleSheets[i] == this.styleSheet){
				styleSheets = styleSheets.splice(i,1);
			}
		}
		document.adoptedStyleSheets = styleSheets;
		this.styleSheet = new CSSStyleSheet();
		document.adoptedStyleSheets.push(this.styleSheet)
		this.styleSheet.insertRule(`@keyframes spin-1 {
										from {
											rotate:0deg;
										}
										to {
											rotate:360deg;
										}
									}`)
		this.styleSheet.insertRule(`@keyframes spin-2 {
										from {
											rotate:0deg;
										}
										to {
											rotate:-360deg;
										}
									}`)
		let numItems = this.nav.children[2].children.length;
		for (let i=0;i<numItems;i++){
			let n = this.n;
			let tau = Math.PI*2
			let circle = Math.floor(-(1/2)+(n+1+8*i)**(1/2)/(2*(n)**(1/2)))+1;
			let lastCircle = Math.floor(-(1/2)+(n+1+8*(numItems-1))**(1/2)/(2*(n)**(1/2)))+1;
			let maxSize = n*lastCircle*(lastCircle+1)/2;
			let circleSize = n*circle;
			let circlePoints;
			if (circle == lastCircle && maxSize >= circleSize){
				circlePoints = numItems-(maxSize-circleSize);
			} else {
				circlePoints = circleSize;
			}
			let point = (tau/circlePoints)*(i%circlePoints);
			let x= Math.cos(point);
			let y= Math.sin(point);
			let selector = "."+this.navclass+" .menu-toggler:checked ~ ul .menu-item:nth-child("+(i+1)+")";
			let rule = `{
							animation: spin-`+(circle%2 == 1 ? 1:2)+` 30s linear infinite;
							transform: rotate(-90deg) translate(`+(x*100*circle)+`%,`+(y*100*circle)+`%);
						}`;
			this.styleSheet.insertRule(selector+rule);
			selector = "."+this.navclass+" .menu-toggler:checked ~ ul .menu-item:nth-child("+(i+1)+") a";
			rule = `{
						animation: spin-`+(circle%2 == 1 ? 2:1)+` 30s linear infinite;
						transform: rotate(90deg);
					}`;
			this.styleSheet.insertRule(selector+rule);
		}
	}
	changeN(n){
		this.n = n;
		this.onChange();
	}
}