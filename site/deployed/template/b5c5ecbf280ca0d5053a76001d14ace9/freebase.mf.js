jQuery.cookie=function(a,e,j){if(typeof e!="undefined"){j=j||{};if(e===null){e="";j=$.extend({},j);j.expires=-1}var b="";if(j.expires&&(typeof j.expires=="number"||j.expires.toUTCString)){if(typeof j.expires=="number"){b=new Date;b.setTime(b.getTime()+j.expires*24*60*60*1E3)}else b=j.expires;b="; expires="+b.toUTCString()}var d=j.path?"; path="+j.path:"",c=j.domain?"; domain="+j.domain:"";j=j.secure?"; secure":"";document.cookie=[a,"=",encodeURIComponent(e),b,d,c,j].join("")}else{e=null;if(document.cookie&&
document.cookie!=""){j=document.cookie.split(";");for(b=0;b<j.length;b++){d=jQuery.trim(j[b]);if(d.substring(0,a.length+1)==a+"="){e=decodeURIComponent(d.substring(a.length+1));break}}}return e}};
jQuery.fn.textPlaceholder=function(a){a=a||"#AAA";return this.each(function(){var e=this;if(!(e.placeholder&&"placeholder"in document.createElement(e.tagName))){var j=e.style.color,b=e.getAttribute("placeholder"),d=$(e);if(e.value===""||e.value==b){e.value=b;e.style.color=a;d.data("placeholder-visible",true)}d.focus(function(){this.style.color=j;if(d.data("placeholder-visible")){d.data("placeholder-visible",false);this.value=""}});d.blur(function(){if(this.value===""){d.data("placeholder-visible",
true);this.value=b;this.style.color=a}else{this.style.color=j;d.data("placeholder-visible",false)}});e.form&&$(e.form).submit(function(){if(d.data("placeholder-visible"))e.value=""})}})};
(function(a){a.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(e,j){this.defaults.type=e;this.defaults.name=j},get:function(e,j){var b=a.extend({},this.defaults,j);if(!b.single.length)b.single="metadata";var d=a.data(e,b.single);if(d)return d;d="{}";var c=function(h){if(typeof h!="string")return h;return h=eval("("+h+")")};if(b.type=="html5"){var f={};a(e.attributes).each(function(){var h=this.nodeName;if(h.match(/^data-/))h=h.replace(/^data-/,
"");else return true;f[h]=c(this.nodeValue)})}else{if(b.type=="class"){var g=b.cre.exec(e.className);if(g)d=g[1]}else if(b.type=="elem"){if(!e.getElementsByTagName)return;g=e.getElementsByTagName(b.name);if(g.length)d=a.trim(g[0].innerHTML)}else if(e.getAttribute!=undefined)if(g=e.getAttribute(b.name))d=g;f=c(d.indexOf("{")<0?"{"+d+"}":d)}a.data(e,b.single,f);return f}}});a.fn.metadata=function(e){return a.metadata.get(this[0],e)}})(jQuery);
(function(a,e){function j(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(!a.ui.version){a.extend(a.ui,{version:"1.8.4",plugin:{add:function(b,d,c){b=a.ui[b].prototype;for(var f in c){b.plugins[f]=b.plugins[f]||[];b.plugins[f].push([d,c[f]])}},call:function(b,d,c){if((d=b.plugins[d])&&b.element[0].parentNode)for(var f=0;f<d.length;f++)b.options[d[f][0]]&&d[f][1].apply(b.element,c)}},contains:function(b,
d){return document.compareDocumentPosition?b.compareDocumentPosition(d)&16:b!==d&&b.contains(d)},hasScroll:function(b,d){if(a(b).css("overflow")==="hidden")return false;var c=d&&d==="left"?"scrollLeft":"scrollTop",f=false;if(b[c]>0)return true;b[c]=1;f=b[c]>0;b[c]=0;return f},isOverAxis:function(b,d,c){return b>d&&b<d+c},isOver:function(b,d,c,f,g,h){return a.ui.isOverAxis(b,c,g)&&a.ui.isOverAxis(d,f,h)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,
CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});a.fn.extend({_focus:a.fn.focus,focus:function(b,d){return typeof b==="number"?this.each(function(){var c=this;setTimeout(function(){a(c).focus();d&&d.call(c)},b)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable",
"off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none")},scrollParent:function(){var b;b=a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,
"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(b){if(b!==e)return this.css("zIndex",b);if(this.length){b=a(this[0]);for(var d;b.length&&b[0]!==document;){d=b.css("position");if(d==="absolute"||d==="relative"||d==="fixed"){d=parseInt(b.css("zIndex"));if(!isNaN(d)&&d!=0)return d}b=b.parent()}}return 0}});a.each(["Width","Height"],function(b,d){function c(i,k,m,l){a.each(f,function(){k-=
parseFloat(a.curCSS(i,"padding"+this,true))||0;if(m)k-=parseFloat(a.curCSS(i,"border"+this+"Width",true))||0;if(l)k-=parseFloat(a.curCSS(i,"margin"+this,true))||0});return k}var f=d==="Width"?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),h={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(i){if(i===e)return h["inner"+d].call(this);return this.each(function(){a.style(this,g,c(this,i)+"px")})};a.fn["outer"+
d]=function(i,k){if(typeof i!=="number")return h["outer"+d].call(this,i);return this.each(function(){a.style(this,g,c(this,i,true,k)+"px")})}});a.extend(a.expr[":"],{data:function(b,d,c){return!!a.data(b,c[3])},focusable:function(b){var d=b.nodeName.toLowerCase(),c=a.attr(b,"tabindex");if("area"===d){d=b.parentNode;c=d.name;if(!b.href||!c||d.nodeName.toLowerCase()!=="map")return false;b=a("img[usemap=#"+c+"]")[0];return!!b&&j(b)}return(/input|select|textarea|button|object/.test(d)?!b.disabled:"a"==
d?b.href||!isNaN(c):!isNaN(c))&&j(b)},tabbable:function(b){var d=a.attr(b,"tabindex");return(isNaN(d)||d>=0)&&a(b).is(":focusable")}})}})(jQuery);
(function(a,e){var j=a.fn.remove;a.fn.remove=function(b,d){return this.each(function(){if(!d)if(!b||a.filter(b,[this]).length)a("*",this).add([this]).each(function(){a(this).triggerHandler("remove")});return j.call(a(this),b,d)})};a.widget=function(b,d,c){var f=b.split(".")[0],g;b=b.split(".")[1];g=f+"-"+b;if(!c){c=d;d=a.Widget}a.expr[":"][g]=function(h){return!!a.data(h,b)};a[f]=a[f]||{};a[f][b]=function(h,i){arguments.length&&this._createWidget(h,i)};d=new d;d.options=a.extend(true,{},d.options);
a[f][b].prototype=a.extend(true,d,{namespace:f,widgetName:b,widgetEventPrefix:a[f][b].prototype.widgetEventPrefix||b,widgetBaseClass:g},c);a.widget.bridge(b,a[f][b])};a.widget.bridge=function(b,d){a.fn[b]=function(c){var f=typeof c==="string",g=Array.prototype.slice.call(arguments,1),h=this;c=!f&&g.length?a.extend.apply(null,[true,c].concat(g)):c;if(f&&c.substring(0,1)==="_")return h;f?this.each(function(){var i=a.data(this,b),k=i&&a.isFunction(i[c])?i[c].apply(i,g):i;if(k!==i&&k!==e){h=k;return false}}):
this.each(function(){var i=a.data(this,b);if(i){c&&i.option(c);i._init()}else a.data(this,b,new d(c,this))});return h}};a.Widget=function(b,d){arguments.length&&this._createWidget(b,d)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(b,d){a.data(d,this.widgetName,this);this.element=a(d);this.options=a.extend(true,{},this.options,a.metadata&&a.metadata.get(d)[this.widgetName],b);var c=this;this.element.bind("remove."+this.widgetName,function(){c.destroy()});
this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(b,d){var c=b,f=this;if(arguments.length===0)return a.extend({},f.options);if(typeof b==="string"){if(d===e)return this.options[b];c={};c[b]=d}a.each(c,function(g,
h){f._setOption(g,h)});return f},_setOption:function(b,d){this.options[b]=d;if(b==="disabled")this.widget()[d?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",d);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(b,d,c){var f=this.options[b];d=a.Event(d);d.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();c=c||{};if(d.originalEvent){b=
a.event.props.length;for(var g;b;){g=a.event.props[--b];d[g]=d.originalEvent[g]}}this.element.trigger(d,c);return!(a.isFunction(f)&&f.call(this.element[0],d,c)===false||d.isDefaultPrevented())}}})(jQuery);
(function(a){a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(j){return e._mouseDown(j)}).bind("click."+this.widgetName,function(j){if(e._preventClickEvent){e._preventClickEvent=false;j.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(e){e.originalEvent=e.originalEvent||{};if(!e.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(e);this._mouseDownEvent=e;var j=this,b=e.which==1,d=typeof this.options.cancel=="string"?a(e.target).parents().add(e.target).filter(this.options.cancel).length:false;if(!b||d||!this._mouseCapture(e))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){j.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)){this._mouseStarted=this._mouseStart(e)!==false;if(!this._mouseStarted){e.preventDefault();
return true}}this._mouseMoveDelegate=function(c){return j._mouseMove(c)};this._mouseUpDelegate=function(c){return j._mouseUp(c)};a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.browser.safari||e.preventDefault();return e.originalEvent.mouseHandled=true}},_mouseMove:function(e){if(a.browser.msie&&!e.button)return this._mouseUp(e);if(this._mouseStarted){this._mouseDrag(e);return e.preventDefault()}if(this._mouseDistanceMet(e)&&
this._mouseDelayMet(e))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==false)?this._mouseDrag(e):this._mouseUp(e);return!this._mouseStarted},_mouseUp:function(e){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=e.target==this._mouseDownEvent.target;this._mouseStop(e)}return false},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-
e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
(function(a){a.ui=a.ui||{};var e=/left|center|right/,j=/top|center|bottom/,b=a.fn.position,d=a.fn.offset;a.fn.position=function(c){if(!c||!c.of)return b.apply(this,arguments);c=a.extend({},c);var f=a(c.of),g=(c.collision||"flip").split(" "),h=c.offset?c.offset.split(" "):[0,0],i,k,m;if(c.of.nodeType===9){i=f.width();k=f.height();m={top:0,left:0}}else if(c.of.scrollTo&&c.of.document){i=f.width();k=f.height();m={top:f.scrollTop(),left:f.scrollLeft()}}else if(c.of.preventDefault){c.at="left top";i=k=
0;m={top:c.of.pageY,left:c.of.pageX}}else{i=f.outerWidth();k=f.outerHeight();m=f.offset()}a.each(["my","at"],function(){var l=(c[this]||"").split(" ");if(l.length===1)l=e.test(l[0])?l.concat(["center"]):j.test(l[0])?["center"].concat(l):["center","center"];l[0]=e.test(l[0])?l[0]:"center";l[1]=j.test(l[1])?l[1]:"center";c[this]=l});if(g.length===1)g[1]=g[0];h[0]=parseInt(h[0],10)||0;if(h.length===1)h[1]=h[0];h[1]=parseInt(h[1],10)||0;if(c.at[0]==="right")m.left+=i;else if(c.at[0]==="center")m.left+=
i/2;if(c.at[1]==="bottom")m.top+=k;else if(c.at[1]==="center")m.top+=k/2;m.left+=h[0];m.top+=h[1];return this.each(function(){var l=a(this),o=l.outerWidth(),p=l.outerHeight(),n=a.extend({},m);if(c.my[0]==="right")n.left-=o;else if(c.my[0]==="center")n.left-=o/2;if(c.my[1]==="bottom")n.top-=p;else if(c.my[1]==="center")n.top-=p/2;n.left=parseInt(n.left);n.top=parseInt(n.top);a.each(["left","top"],function(q,r){a.ui.position[g[q]]&&a.ui.position[g[q]][r](n,{targetWidth:i,targetHeight:k,elemWidth:o,
elemHeight:p,offset:h,my:c.my,at:c.at})});a.fn.bgiframe&&l.bgiframe();l.offset(a.extend(n,{using:c.using}))})};a.ui.position={fit:{left:function(c,f){var g=a(window);g=c.left+f.elemWidth-g.width()-g.scrollLeft();c.left=g>0?c.left-g:Math.max(0,c.left)},top:function(c,f){var g=a(window);g=c.top+f.elemHeight-g.height()-g.scrollTop();c.top=g>0?c.top-g:Math.max(0,c.top)}},flip:{left:function(c,f){if(f.at[0]!=="center"){var g=a(window);g=c.left+f.elemWidth-g.width()-g.scrollLeft();var h=f.my[0]==="left"?
-f.elemWidth:f.my[0]==="right"?f.elemWidth:0,i=-2*f.offset[0];c.left+=c.left<0?h+f.targetWidth+i:g>0?h-f.targetWidth+i:0}},top:function(c,f){if(f.at[1]!=="center"){var g=a(window);g=c.top+f.elemHeight-g.height()-g.scrollTop();var h=f.my[1]==="top"?-f.elemHeight:f.my[1]==="bottom"?f.elemHeight:0,i=f.at[1]==="top"?f.targetHeight:-f.targetHeight,k=-2*f.offset[1];c.top+=c.top<0?h+f.targetHeight+k:g>0?h+i+k:0}}}};if(!a.offset.setOffset){a.offset.setOffset=function(c,f){if(/static/.test(a.curCSS(c,"position")))c.style.position=
"relative";var g=a(c),h=g.offset(),i=parseInt(a.curCSS(c,"top",true),10)||0,k=parseInt(a.curCSS(c,"left",true),10)||0;h={top:f.top-h.top+i,left:f.left-h.left+k};"using"in f?f.using.call(c,h):g.css(h)};a.fn.offset=function(c){var f=this[0];if(!f||!f.ownerDocument)return null;if(c)return this.each(function(){a.offset.setOffset(this,c)});return d.call(this)}}})(jQuery);window.freebase=window.fb={mwLWTReloading:false};if(typeof SERVER==="object"&&SERVER.acre)window.fb.acre=SERVER.acre;
(function(a,e){if(a.cookie("mwLWTReloaded"))a.cookie("mwLWTReloaded",null,{path:"/"});else{var j=0,b=0;if(typeof acre==="object"&&e.acre&&e.acre.request&&e.acre.request.cookies)b=e.acre.request.cookies.mwLastWriteTime||0;if(document.cookie&&document.cookie!="")for(var d=document.cookie.split(";"),c=0,f=d.length;c<f;c++){var g=a.trim(d[c]);if(g.indexOf("mwLastWriteTime=")===0){g=decodeURIComponent(g.substring(16)).split("|");if(g.length)j=g[0]}}d=j?parseInt(j,10):-1;c=b?parseInt(b,10):-1;if(j&&b&&
c<d){a.cookie("mwLWTReloaded","true",{path:"/"});e.mwLWTReloading=true;window.location.reload(true)}}})(jQuery,window.freebase);
(function(a,e){if(!e.mwLWTReloading){if(!window.console)window.console={log:a.noop,info:a.noop,debug:a.noop,warn:a.noop,error:a.noop};e.dispatch=function(g,h,i,k){if(typeof h!=="function")return false;g=a.event.fix(g||window.event);i||(i=[]);k||(k=this);return h.apply(k,[g].concat(i))};e.get_script=function(g,h){var i=e.get_script.cache,k=i[g];if(k)if(k.state===1)k.callbacks.push(h);else k.state===4&&h();else{k=i[g]={state:0,callbacks:[h]};a.ajax({url:g,dataType:"script",beforeSend:function(){k.state=
1},success:function(){k.state=4;a.each(k.callbacks,function(m,l){l()})},error:function(){k.state=-1}})}};e.get_script.cache={};a(window).bind("fb.user.signedin",function(g,h){console.log("fb.user.signnedin");e.user=h;var i=a("#nav-username a:first");if(i.length){i[0].href+=e.user.id;i.text(e.user.name)}a("#signedin").show()}).bind("fb.user.signedout",function(){console.log("fb.user.signedout");a("#signedout").show()});if(/^https?\:\/\/((www|devel)\.)?(freebase|sandbox\-freebase|branch\.qa\.metaweb|trunk\.qa\.metaweb)\.com(\:\d+)?/.test(e.acre.request.app_url)){var j=
function(g,h){var i=g.indexOf("|"+h+"_");if(i!=-1){i=i+2+h.length;var k=g.indexOf("|",i);if(k!=-1)return decodeURIComponent(g.substr(i,k-i))}return null},b=a.cookie("metaweb-user-info");if(b){var d=j(b,"g"),c=j(b,"u"),f=j(b,"p");f||(f="/user/"+this.name);setTimeout(function(){a(window).trigger("fb.user.signedin",{guid:d,name:c,id:f})},0)}else setTimeout(function(){a(window).trigger("fb.user.signedout")},0)}else a.ajax({url:"/acre/account/user_info",dataType:"json",success:function(g){g&&g.code===
"/api/status/ok"?a(window).trigger("fb.user.signedin",{id:g.id,guid:g.guid,name:g.username}):a(window).trigger("fb.user.signedout")},error:function(){a(window).trigger("fb.user.signedout")}});a(function(){var g=a("#SearchBox .SearchBox-input,#global-search-input"),h=e.acre.freebase.site_host;g.suggest({service_url:h,soft:true,category:"object",parent:"#site-search-box",align:"right",status:null});var i=a("#site-search-label"),k=a("#site-search-box .fbs-pane");g.bind("fb-select",function(m,l){window.location=
h+"/view"+l.id;return false}).bind("fb-pane-show",function(){i.html("<span>Select an item from the list</span>").removeClass("loading")}).bind("fb-textchange",function(){a.trim(g.val())===""?i.html("<span>Start typing to get some suggestions</span>").removeClass("loading"):i.html("<span>Searching...</span>").addClass("loading")}).bind("fb-error",function(){i.html("<span>Sorry, something went wrong. Please try again later</span>").removeClass("loading")}).focus(function(){i.is(":visible")||a("#site-search-label").slideDown("fast")}).blur(function(){!k.is(":visible")&&
i.is(":visible")&&a("#site-search-label").slideUp("fast")});a(".SearchBox-form").submit(function(){return a.trim(a("#global-search-input").val()).length==0?false:true});a("input, textarea").textPlaceholder()});e.disable=function(g){a(g).attr("disabled","disabled").addClass("disabled")};e.enable=function(g){a(g).removeAttr("disabled").removeClass("disabled")};e.lang_select=function(g,h){setTimeout(function(){a(window).trigger("fb.lang.select",h)},0)}}})(jQuery,window.freebase);
