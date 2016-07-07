var to_top = function(step_size){
	    window.scrollBy(0, -step_size);
	    console.log(step_size);
	    scrolldelay = setTimeout(function(){to_top(step_size)}, 30);
	    if (document.documentElement.scrollTop + document.body.scrollTop == 0) {
	    	clearTimeout(scrolldelay);
	    }
	}

	var scroll_to_top = function() {
		var step_size = (document.documentElement.scrollTop + document.body.scrollTop) / 10;
		to_top(step_size);
	}

	document.onkeyup = function (event) {
        var e = event || window.event;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 38:
                scroll_to_top()
                break;
            default:
                break;
        }
    }

    document.body.onscroll = function() {
    	if (document.documentElement.scrollTop + document.body.scrollTop <= 0) {
    		document.getElementById('button').style.display = 'none';
    	}
    	else {
    		document.getElementById('button').style.display = 'block';
    	}
    }

    var backToTop = document.getElementById('button');
    backToTop.init = function(setting) {
    	var div = this.children[0];
    	if (setting.hasOwnProperty('x')) {
    		div.style.left = setting.x + 'px';
    		div.style.top = setting.y + 'px';
    	}
    	else
    	if (setting.hasOwnProperty('LeftUp')) {
    		div.style.left = '8px';
    		div.style.top = '8px';
    	}
    	else
    	if (setting.hasOwnProperty('LeftDown')) {
    		div.style.left = '8px';
    		div.style.bottom = '8px';
    	}
    	else
    	if (setting.hasOwnProperty('RightUp')) {
    		div.style.right = '8px';
    		div.style.top = '8px';
    	}
    	else
    	if (setting.hasOwnProperty('RightDown')) {
    		div.style.right = '8px';
    		div.style.bottom = '8px';
    	}
    }

    backToTop.init({RightDown: true});