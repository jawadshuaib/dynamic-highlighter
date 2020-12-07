class Highlight {
    constructor (className=null, settings={}) {
        this.className = className || 'highlighter';
        this.tempColorClass = 'highlighter-temp-colored-class';
        this.tempPlainClass = 'highlighter-temp-plain-text-class';
        this.defaultColor = settings.color || 'yellow';
        this.defaultSpeed = settings.speed || 75;
        this.delay = settings.delay || 0;
    }

    init () {
        // get all the elements that need to be highlighted
        const content = document.querySelectorAll (`.${this.className}`);        

        /*        
        let color, speed;
        content.forEach (el => {
            
            color = el.hasAttribute ('data-color') === true ? el.getAttribute ('data-color') : this.defaultColor;
            speed = el.hasAttribute ('data-speed') === true ? el.getAttribute ('data-speed') : this.defaultSpeed;
            
            this.highlight (el, color, speed);
        });
        */

        let k = 0;
        // this.setup (content[0]);        
        const timer = setInterval (() => {            

            let el = content[k];
            this.setup (el);

            k===(content.length-1) ? clearInterval (timer) : k++;
        }, this.delay);
    }

    setup (el) {
        let color, speed;

        color = el.hasAttribute ('data-color') === true ? el.getAttribute ('data-color') : this.defaultColor;
        speed = el.hasAttribute ('data-speed') === true ? el.getAttribute ('data-speed') : this.defaultSpeed;

        this.highlight (el, color, speed);        
    }

    highlight (el, color, speed) {
        const text = el.textContent;
        
        let k = 0;        
        let chars = '';
        const timer = setInterval (() => {
            
            k===(text.length-1) ? clearInterval (timer) : el.textContent = '';

            // remove class from the previous extension of the content
            el.querySelectorAll (`.${this.tempColorClass}`).forEach (cl => {                    
                cl.remove ();
            });

            el.querySelectorAll (`.${this.tempPlainClass}`).forEach (cl => {                    
                cl.remove ();
            });

            // current chars
            chars = text.substr (0, k + 1);

            // add class to the new extention of the content
            let span = document.createElement ('span');
            span.style.backgroundColor = color;
            span.classList.add (this.tempColorClass);                        
            span.textContent = chars;
            el.appendChild (span);   

            // on each loop, we want to remove one more char from
            // the front of the plain text
            let spanTmp = document.createElement ('span');
            spanTmp.textContent = text.substr (k+1, text.length);
            spanTmp.classList.add (this.tempPlainClass);
            
            
            this.insertAfter (spanTmp, span);
            k++;
        }, speed);    
    }

    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }     
}

export { Highlight as default };