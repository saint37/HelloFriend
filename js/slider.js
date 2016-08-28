function getById(i) {
    return document.getElementById(i)
}

function getByTag(c, p) {
    return p.getElementsByTagName(c)
}
var slider = function() {
    console.log('in slider')

    function inits(o) {
        console.log('in inits')
        this.id = o.id;
        this.at = o.auto ? o.auto : 3;
        this.o = 0;
        this.run = true;
        this.pos();
        // alert(o);
    }
    inits.prototype = {
        pos: function() {
            if(!this.run)return;
            console.log('in pos')
            clearInterval(this.__b);
            this.o = 0;
            var el = getById(this.id),
                li = getByTag('li', el),
                l = li.length;
            var tail = li[l - 1].offsetHeight;
            var cl = li[l - 1].cloneNode(true);
            cl.style.opacity = 0;
            cl.style.filter = 'alpha(opacity=0)';
            el.insertBefore(cl, el.firstChild);
            el.style.top = -tail + 'px';
            this.anim();
        },
        anim: function() {
            console.log('in anim')
            var _this = this;
            this.__a = setInterval(function() {
                _this.animH()
            }, 20);
        },
        animH: function() {
            console.log('in animh')
            var tail = parseInt(getById(this.id).style.top),
                _this = this;
            if (tail >= -1) {
                clearInterval(this.__a);
                getById(this.id).style.top = 0;
                var list = getByTag('li', getById(this.id));
                getById(this.id).removeChild(list[list.length - 1]);
                this.__c = setInterval(function() {
                    _this.animO()
                }, 20);
                //this.auto();
            } else {
                var __t = Math.abs(tail) - Math.ceil(Math.abs(tail) * .07);
                getById(this.id).style.top = -__t + 'px';
            }
        },
        animO: function() {
            console.log('in anim')
            this.o += 2;
            if (this.o == 100) {
                clearInterval(this.__c);
                getByTag('li', getById(this.id))[0].style.opacity = 1;
                getByTag('li', getById(this.id))[0].style.filter = 'alpha(opacity=100)';
                this.auto();
            } else {
                getByTag('li', getById(this.id))[0].style.opacity = this.o / 100;
                getByTag('li', getById(this.id))[0].style.filter = 'alpha(opacity=' + this.o + ')';
            }
        },
        auto: function() {
            console.log('in auto')
            var _this = this;
            this.__b = setInterval(function() {
                _this.pos()
            }, this.at * 1000);
        },
        setTime: function(interval){
            this.at= interval
        },
        pause: function(){
            console.log('pause');
            this.run = false;
        },
        resume: function(){
            console.log('resume');
            this.run = true;
        }
    }
    return inits;
}();
