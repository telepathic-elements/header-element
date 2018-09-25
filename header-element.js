import {TelepathicElement} from "../telepathic-element/telepathic-element.js";
export default class HeaderElement extends TelepathicElement{
    static describe(){ return `HeaderElement is used to provide a consistent header that is databound and themeable`};
	constructor(){
        super(null,true);        
        this.headerText = `Play with telepathic-elements`;
    }
    init(){return};
	async onReady(){
        
        if(this.getAttribute("nav-map")){
            this.navMapFileName = this.getAttribute("nav-map");
        }else{
            this.navMapFileName = 'navigation.json';
        }
        
        await this.parseNavFile(this.navMapContents);
        await this.makeNav();
        await this.update();
    }
    //Call this to start the chain of events from a new file
    async parseNavFile(navMapFileName){
        if(navMapFileName){
            this.navMapFileName = navMapFileName;
        }
        this.navMap = await this.loadFileJSON(this.navMapFileName);
        console.log("navMap: ",this.navMap);
        return this;
    }
    //Call this to start the chain of events from a new navMap object
    makeNav(navMap){
        if(navMap){
            this.navMap = navMap;
        }
        //A navMap is an array of navItems in their Object form
        //Each element contains, .name, .loc, .priority, .visibility, .text
        this.navItems = [];
        for(let item of this.navMap){
            let li = document.createElement("li");
            li.setAttribute("class","nav-item");
            let a = document.createElement("a");
            a.setAttribute("href",item.url);
            a.innerHTML = item.txt; 
            li.appendChild(a);
            this.navItems.push(li);
        }
        return this;
    }

    update(){
        this.header = this.$.querySelector('header');
        this.navUpper = this.header.querySelector('nav');
        this.nav = this.navUpper.querySelector("#nav-menu-ul");
        if(!this.nav){
            this.nav = document.createElement('ul');
            this.navUpper.appendChild(this.nav);
        } 
        while(this.nav.firstChild) {
            this.nav.removeChild(this.nav.firstChild);
        }
        for(let navItem of this.navItems){
            console.log("Setting: ",navItem);
            this.nav.appendChild(navItem);
            console.log("this.nav: ",this.nav);
        }
    }
}