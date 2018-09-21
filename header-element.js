import {TelepathicElement} from "../telepathic-element/telepathic-element.js";
export default class HeaderElement extends TelepathicElement{
    static describe(){ return `HeaderElement is used to provide a consistent header that is databound and themeable`};
	constructor(){
        super(null,true);        
        this.headerText = `Telepathy Demos - Play with telepathic-elements`;
    }
	init(){ return true;}
}