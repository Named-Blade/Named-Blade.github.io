window.addEventListener('load', function () {
	let i=0
	for (nav of document.getElementsByClassName('menu')){
		let navClass = "menu-"+i;
		new navMenu(nav,navClass);
		i++;
	}
});
class navMenu{
	constructor(nav,navClass,n=6){
		this.nav = nav;
		this.nav.navMenu = this;
		this.navClass = navClass;
		this.n = n;
		this.nav.classList.add(this.navClass);
		this.observer = new MutationObserver(this.onChange.bind(this));
		this.observer.observe(this.nav.children[2],{childList:true});
		this.onChange();
	}
	onChange(){
		let styleSheets = Array.from(document.adoptedStyleSheets);
		for (let i=0;i<styleSheets.length;i++){
			if (styleSheets[i] == this.styleSheet){
				styleSheets = styleSheets.slice(0,i).concat(styleSheets.slice(i+1))
			}
		}
		this.styleSheet = new CSSStyleSheet();
		document.adoptedStyleSheets = styleSheets;
		let numItems = this.nav.children[2].children.length;
		for (let i=0;i<numItems;i++){
			let n = this.n;
			let tau = Math.PI*2
			let circle = Math.floor(-(1/2)+(n+1+8*i)**(1/2)/(2*(n)**(1/2)))+1;
			let lastCircle = Math.floor(-(1/2)+(n+1+8*(numItems-1))**(1/2)/(2*(n)**(1/2)))+1;
			let maxSize = n*lastCircle*(lastCircle+1)/2;
			let circleSize = n*circle;
			let circlePoints = (circle == lastCircle && maxSize >= circleSize)?numItems-(maxSize-circleSize):circleSize;
			let point = (tau/circlePoints)*(i%circlePoints);
			let x= Math.cos(point);
			let y= Math.sin(point);
			let selector = "."+this.navClass+" .menu-toggler:checked ~ ul .menu-item:nth-child("+(i+1)+")";
			let rule = `{
				transform: rotate(-90deg) translate(`+(x*100*circle)+`%,`+(y*100*circle)+`%);
			}`;
			this.styleSheet.insertRule(selector+rule);
			selector = "."+this.navClass+" .menu-toggler ~ ul .menu-item:nth-child("+(i+1)+")";
			rule = `{
				animation: spin-`+(((circle-1)%2)+1)+` 30s linear infinite;
			}`
			this.styleSheet.insertRule(selector+rule);
			selector = "."+this.navClass+" .menu-toggler ~ ul .menu-item:nth-child("+(i+1)+") a";
			rule = `{
				animation: spin-`+(circle%2 == 1 ? 2:1)+` 30s linear infinite;
			}`;
			this.styleSheet.insertRule(selector+rule);
			selector = "."+this.navClass+" .menu-toggler:checked ~ ul .menu-item:nth-child("+(i+1)+") a";
			rule = `{
				transform: rotate(90deg);
			}`;
			this.styleSheet.insertRule(selector+rule);
		}
		this.nav.classList.remove(this.navClass);
		this.nav.offsetWidth;
		this.nav.classList.add(this.navClass);
		document.adoptedStyleSheets.push(this.styleSheet);
	}
	changeN(n){
		this.n = n;
		this.onChange();
	}
}