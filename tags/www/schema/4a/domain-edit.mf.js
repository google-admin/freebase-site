
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Additional Licenses for Third Party components can be found here:
 * http://wiki.freebase.com/wiki/Freebase_Site_License
 *
 */
/*
 
 jQuery Tools @VERSION / Expose - Dim the lights

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/toolbox/expose.html

 Since: Mar 2010
 Date: @DATE 
 
 jQuery Tools @VERSION Overlay - Overlay base. Extend it.

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/overlay/

 Since: March 2008
 Date: @DATE 
*/
(function(c){function j(){if(c.browser.msie){var g=c(document).height(),i=c(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,g-i<20?i:g]}return[c(document).width(),c(document).height()]}function h(g){if(g)return g.call(c.mask)}c.tools=c.tools||{version:"@VERSION"};var b;b=c.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var a,e,d,f,k;c.mask={load:function(g,i){if(d)return this;if(typeof g=="string")g={color:g};g=g||f;f=g=c.extend(c.extend({},b.conf),g);a=c("#"+g.maskId);if(!a.length){a=c("<div/>").attr("id",g.maskId);c("body").append(a)}var n=j();a.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:g.startOpacity,zIndex:g.zIndex});g.color&&a.css("backgroundColor",g.color);if(h(g.onBeforeLoad)===false)return this;g.closeOnEsc&&c(document).bind("keydown.mask",function(m){m.keyCode==
27&&c.mask.close(m)});g.closeOnClick&&a.bind("click.mask",function(m){c.mask.close(m)});c(window).bind("resize.mask",function(){c.mask.fit()});if(i&&i.length){k=i.eq(0).css("zIndex");c.each(i,function(){var m=c(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});e=i.css({zIndex:Math.max(g.zIndex+1,k=="auto"?0:k)})}a.css({display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){c.mask.fit();h(g.onLoad)});d=true;return this},close:function(){if(d){if(h(f.onBeforeClose)===
false)return this;a.fadeOut(f.closeSpeed,function(){h(f.onClose);e&&e.css({zIndex:k})});c(document).unbind("keydown.mask");a.unbind("click.mask");c(window).unbind("resize.mask");d=false}return this},fit:function(){if(d){var g=j();a.css({width:g[0],height:g[1]})}},getMask:function(){return a},isLoaded:function(){return d},getConf:function(){return f},getExposed:function(){return e}};c.fn.mask=function(g){c.mask.load(g);return this};c.fn.expose=function(g){c.mask.load(g,this);return this}})(jQuery);
(function(c){function j(a,e){var d=this,f=a.add(d),k=c(window),g,i,n,m=c.tools.expose&&(e.mask||e.expose),q=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var s=e.target||a.attr("rel");i=s?c(s):a;if(!i.length)throw"Could not find Overlay: "+s;a&&a.index(i)==-1&&a.click(function(l){d.load(l);return l.preventDefault()});c.extend(d,{load:function(l){if(d.isOpened())return d;var o=b[e.effect];if(!o)throw'Overlay: cannot find effect : "'+e.effect+
'"';e.oneInstance&&c.each(h,function(){this.close(l)});l=l||c.Event();l.type="onBeforeLoad";f.trigger(l);if(l.isDefaultPrevented())return d;n=true;m&&c(i).expose(m);var p=e.top,t=e.left,u=i.outerWidth({margin:true}),v=i.outerHeight({margin:true});if(typeof p=="string")p=p=="center"?Math.max((k.height()-v)/2,0):parseInt(p,10)/100*k.height();if(t=="center")t=Math.max((k.width()-u)/2,0);o[0].call(d,{top:p,left:t},function(){if(n){l.type="onLoad";f.trigger(l)}});m&&e.closeOnClick&&c.mask.getMask().one("click",
d.close);e.closeOnClick&&c(document).bind("click."+q,function(r){c(r.target).parents(i).length||d.close(r)});e.closeOnEsc&&c(document).bind("keydown."+q,function(r){r.keyCode==27&&d.close(r)});return d},close:function(l){if(!d.isOpened())return d;l=l||c.Event();l.type="onBeforeClose";f.trigger(l);if(!l.isDefaultPrevented()){n=false;b[e.effect][1].call(d,function(){l.type="onClose";f.trigger(l)});c(document).unbind("click."+q).unbind("keydown."+q);m&&c.mask.close();return d}},getOverlay:function(){return i},
getTrigger:function(){return a},getClosers:function(){return g},isOpened:function(){return n},getConf:function(){return e}});c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(l,o){c.isFunction(e[o])&&c(d).bind(o,e[o]);d[o]=function(p){c(d).bind(o,p);return d}});g=i.find(e.close||".close");if(!g.length&&!e.close){g=c('<a class="close"></a>');i.prepend(g)}g.click(function(l){d.close(l)});e.load&&d.load()}c.tools=c.tools||{version:"@VERSION"};c.tools.overlay={addEffect:function(a,
e,d){b[a]=[e,d]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!c.browser.msie||c.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var h=[],b={};c.tools.overlay.addEffect("default",function(a,e){var d=this.getConf(),f=c(window);if(!d.fixed){a.top+=f.scrollTop();a.left+=f.scrollLeft()}a.position=d.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(d.speed,e)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
a)});c.fn.overlay=function(a){var e=this.data("overlay");if(e)return e;if(c.isFunction(a))a={onBeforeLoad:a};a=c.extend(true,{},c.tools.overlay.conf,a);this.each(function(){e=new j(c(this),a);h.push(e);c(this).data("overlay",e)});return a.api?e:this}})(jQuery);
(function(c){function j(b,a){this.options=c.extend(true,{},j.defaults,a);this.options.jsonp=j.use_jsonp(this.options.mqlread_url);this.input=c(b);this.original=this.input.val();this.init()}c.fn.mqlkey=function(b){return this.each(function(){var a=c(this);if(a.is(":text")){var e=a.data("mqlkey");e&&e._destroy();e=new j(this,b);a.data("mqlkey",e)}})};var h=/^(\!)?(?:([a-z](?:_?[a-z0-9])*)\:)?(\/|\/?[a-z](?:_?[a-z0-9])*(?:\/[a-z](?:_?[a-z0-9])*)*)$/;j.prototype={init:function(){var b=this;this.input.bind("keyup.mqlkey",
function(a){b.textchange(a)}).bind(c.browser.msie?"paste.mqlkey":"input.mqlkey",function(a){b.textchange(a)});if(this.options.source){this.source=c(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){b.source_generate=false});this.source.bind("change.mqlkey",function(){if(b.source_generate){var a=j.from(b.source.val());b.input.val(a).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(b){clearTimeout(this.textchange_timeout);
var a=this;this.textchange_timeout=setTimeout(function(){a.textchange_delay(b)},0)},textchange_delay:function(){this.input.trigger("textchange");var b=c.trim(this.input.val());return b===this.original&&b!==""?this.valid(b):h.test(b)?b.length<this.options.minlen?this.invalid(b):this.options.check_key?this.check_key(b):this.valid(b):this.invalid(b)},check_key:function(b){var a=this;if(this.xhr){this.xhr.abort();this.xhr=null}var e={query:'{"query": {"id": null, "key": {"namespace": "'+this.options.namespace+
'", "value": "'+b+'"}}}'};clearTimeout(this.check_key.timeout);var d={url:this.options.mqlread_url,data:e,success:function(f){if(f.code==="/api/status/ok")return f.result?a.invalid(b,"Key already exists"):a.valid(b)},error:function(f){if(f)return a.invalid(f.responseText())},dataType:a.options.jsonp?"jsonp":"json"};this.check_key.timeout=setTimeout(function(){a.ac_xhr=c.ajax(d)},200)},valid:function(b){this.input.trigger("valid",b)},invalid:function(b,a){if(!a){a=this.options.minlen>1?"Key must be "+
this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";a+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",a)}};c.extend(j,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread_url:"http://www.freebase.com/api/service/mqlread",source:null},use_jsonp:function(b){if(!b)return false;var a=window.location.href;a=a.substr(0,a.length-window.location.pathname.length);
if(a===b)return false;return true},from:function(b){b=b.toLowerCase();b=b.replace(/[^a-z0-9]/g,"_");b=b.replace(/\_\_+/g,"_");b=b.replace(/[^a-z0-9]+$/,"");return b=b.replace(/^[^a-z]+/,"")}})})(jQuery);
(function(c,j){c(window).ajaxSend(function(b,a,e){e.type==="POST"&&a.setRequestHeader("x-acre-cache-control","max-age: 3600")});var h=j.schema.edit={init_edit_form:function(b){if(b.mode==="add")c("tbody",b.table).append(b.row);else if(b.mode==="edit")b.trigger_row.before(b.row);else throw"Unknown edit type mode: "+b.mode;b.trigger_row.before(b.submit_row);var a=b.event_prefix||"fb.schema.edit.";b.row.bind(a+"submit",function(){h.submit_edit_form(b)}).bind(a+"cancel",function(){h.cancel_edit_form(b)}).bind(a+
"error",function(e,d,f){h.row_error(d,f);b.row.removeClass("loading")}).bind(a+"success",function(){b.row.removeClass("loading")});c(".button-submit",b.submit_row).click(function(){b.row.trigger(a+"submit")});c(".button-cancel",b.submit_row).click(function(){b.row.trigger(a+"cancel")});b.row.showRow(function(){typeof b.init_form==="function"&&b.init_form(b)});b.trigger_row.hide();b.submit_row.show();c("[placeholder]",b.row).placeholder();c(window).bind("fb.lang.select",function(e,d){h.toggle_lang(b.row,
d)})},cancel_edit_form:function(b){b.row.hideRow(function(){c(this).remove()});h.clear_row_message(b.row);b.submit_row.remove();b.trigger_row.show();b.trigger.removeClass("editing")},submit_edit_form:function(b){if(!b.row.is(".loading")){document.activeElement&&c(document.activeElement).blur();h.clear_row_message(b.row);typeof b.validate_form==="function"&&b.validate_form(b);if(!h.has_row_message(b.row,"error")){b.row.addClass("loading");typeof b.submit_form==="function"&&b.submit_form(b)}}},ajax_error_handler:function(b,
a,e){var d;try{d=JSON.parse(b.responseText);d=d.messages[0].message}catch(f){d=b.responseText}if(a){h.row_error(a,d);a.removeClass("loading")}else if(e){h.form_error(e,d);e.removeClass("loading")}},row_error:function(b,a){return h.row_message(b,a,"error")},row_message:function(b,a,e){var d=c('<a class="close-msg" href="#">Close</a>').click(function(f){return j.schema.close_message.apply(this,[f,".row-msg:first"])});a=c("<span>").text(a);d=c('<td colspan="5">').append(d).append(a);d=c('<tr class="row-msg">').append(d);
e&&d.addClass("row-msg-"+e);b.before(d);d.hide().showRow();a=b.data("row-msg");if(!a){a={};b.data("row-msg",a)}if(a[e])a[e].push(d);else a[e]=[d];return d},clear_row_message:function(b){var a=b.data("row-msg");if(a){c.each(a,function(e,d){c.each(d,function(f,k){k.remove()})});b.removeData("row-msg")}},has_row_message:function(b,a){var e=b.data("row-msg");if(a)return e&&e[a]&&e[a].length;return e!=null},init_modal_form:function(b){c(document.body).append(b.form.hide());var a=b.event_prefix||"fb.schema.edit.modal.";
b.form.bind(a+"submit",function(){h.submit_modal_form(b)}).bind(a+"error",function(e,d){h.form_error(b.form,d)}).bind(a+"success",function(){b.form.removeClass("loading")});c(".modal-buttons .button-submit",b.form).click(function(){b.form.trigger(a+"submit")});b.form.overlay({close:".modal-buttons .button-cancel",closeOnClick:false,load:true,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){typeof b.init_form==="function"&&b.init_form(b)}});c("[placeholder]",b.form).placeholder();j.schema.init_modal_help(b.form);
c(window).bind("fb.lang.select",function(e,d){h.toggle_lang(b.form,d)})},submit_modal_form:function(b){if(!b.form.is(".loading")){document.activeElement&&c(document.activeElement).blur();h.clear_form_message(b.form);typeof b.validate_form==="function"&&b.validate_form(b);if(!h.has_form_message(b.form,"error")){b.form.addClass("loading");typeof b.submit_form==="function"&&b.submit_form(b)}}},form_error:function(b,a){return h.form_message(b,a,"error")},form_message:function(b,a,e){a=c("<div class='form-msg'>").text(a).hide();
c(".form-group",b).prepend(a);a.slideDown();var d=b.data("form-msg");if(!d){d={};b.data("form-msg",d)}if(d[e])d[e].push(a);else d[e]=[a];return a},clear_form_message:function(b){var a=b.data("form-msg");if(a){c.each(a,function(e,d){c.each(d,function(f,k){k.remove()})});b.removeData("form-msg")}},has_form_message:function(b,a){var e=b.data("form-msg");if(a)return e&&e[a]&&e[a].length;return e!=null},toggle_lang:function(b,a){c("[lang]",b).each(function(){var e=c(this);c(this).attr("lang")===a?e.show().focus().blur():
e.hide()})},init_mqlkey:function(b,a){b.mqlkey(a).bind("valid",function(){c(this).next(".key-status").removeClass("invalid").removeClass("loading").addClass("valid").text("valid").attr("title","Key is available")}).bind("invalid",function(e,d){c(this).next(".key-status").removeClass("valid").removeClass("loading").addClass("invalid").text("invalid").attr("title",d)}).bind("textchange",function(){c(this).next(".key-status").removeClass("invalid").removeClass("valid").addClass("loading")})},validate_mqlkey:function(b,
a){var e=b.form||b.row,d=a.next(".key-status"),f=a.val();if(f===""){e.trigger(b.event_prefix+"error","Key is required");return false}if(f===a.data("mqlkey").original)return true;if(d.is(".invalid")){e.trigger(b.event_prefix+"error",d.attr("title"));return false}else if(d.is(".loading"))return false;return true},auto_key:function(b,a,e){var d=a.val();if(d)a.data("original",d);else{a.data("autogen",true);a.change(function(){a.data("autogen",false)});b.change(function(){if(a.data("autogen")){var f=c.trim(b.val()).toLowerCase();
f=f.replace(/[^a-z0-9]/g,"_");f=f.replace(/\_\_+/g,"_");f=f.replace(/[^a-z0-9]+$/,"");f=f.replace(/^[^a-z]+/,"");try{h.check_key(f,e)}catch(k){return}a.val(f)}})}},check_key:function(b,a){return a==="/type/domain"?h.check_key_domain(b):a==="/type/type"?h.check_key_type(b):a==="/type/property"?h.check_key_property(b):h.check_key_default(b)},check_key_domain:function(b){return h.check_key_default(b,5)},check_key_type:function(b){return h.check_key_default(b)},check_key_property:function(b){return h.check_key_default(b)},
check_key_default:function(b,a){a||(a=1);if(a===1&&b.length===1){if(/^[a-z]$/.test(b))return b}else{var e="^[a-z][a-z0-9_]";e+=a>1?"{"+(a-1)+",}$":"+$";if(RegExp(e).test(b))if(!(b.match(/__+/)||b.match(/[^a-z0-9]+$/)))return b}e=a>1?"Key must be "+a+" or more alphanumeric characters":"Key must be alphanumeric";e+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively.";throw e;}}})(jQuery,window.freebase);
(function(c,j){var h=j.schema.edit,b=j.schema.domain.edit={domain_settings_begin:function(a,e){c.ajax({url:j.acre.request.app_url+"/schema/domain/domain_settings_begin",data:{id:e},dataType:"json",success:function(d){d=c(d.result.html);d={event_prefix:"fb.schema.domain.settings.",ajax:{url:j.acre.request.app_url+"/schema/domain/domain_settings_submit",data:{id:e}},init_form:b.init_domain_settings_form,validate_form:b.validate_domain_settings_form,submit_form:b.submit_domain_settings_form,form:d};
h.init_modal_form(d);d.form.bind(d.event_prefix+"success",function(f,k){window.location=k.location})}})},init_domain_settings_form:function(a){var e=c("input[name=name]",a.form),d=c("input[name=key]",a.form);h.auto_key(e,d);c(":input:not(textarea)",a.form).keypress(function(f){f.keyCode===13&&!f.isDefaultPrevented()&&a.form.trigger(a.event_prefix+"submit")});c(".button-delete",a.form).click(function(){var f=c(this).parent().siblings().find(".modal-content"),k=c(".modal-buttons",a.form).animate({opacity:0},
500),g=c(".modal-help",f).height(f.height()).slideDown(),i=c(".button-cancel",f).click(function(){k.animate({opacity:1},500);g.slideUp()});c(".button-submit",f).click(function(){if(!a.form.is(".loading")){a.form.addClass("loading");c.ajax({url:j.acre.request.app_url+"/schema/domain/delete_domain_submit",type:"POST",dataType:"json",data:{id:a.ajax.data.id,user:j.user.id},success:function(n,m,q){if(n.code==="/api/status/error")return h.ajax_error_handler(q,null,a.form);a.form.trigger(a.event_prefix+
"success",n.result)},error:function(n){h.ajax_error_handler(n,null,a.form);i.click()}})}})})},validate_domain_settings_form:function(a){var e=c.trim(c("input[name=name]:visible",a.form).val()),d=c("input[name=key]",a.form),f=d.val();if(e===""||f==="")a.form.trigger(a.event_prefix+"error","Name and Key are required");else if(d.data("original")!==f)try{h.check_key_domain(f)}catch(k){a.form.trigger(a.event_prefix+"error",k)}},submit_domain_settings_form:function(a){var e=c("input[name=key]",a.form);
e={name:c.trim(c("input[name=name]:visible",a.row).val()),key:e.val(),namespace:c("input[name=namespace]",a.form).val(),description:c.trim(c("textarea[name=description]:visible",a.form).val()),lang:c("select[name=lang]",a.form).val()};c.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:c.extend(e,a.ajax.data),success:function(d,f,k){if(d.code==="/api/status/error")return h.ajax_error_handler(k,null,a.form);a.form.trigger(a.event_prefix+"success",d.result)},error:function(d){h.ajax_error_handler(d,
null,a.form)}})},add_type_begin:function(a,e,d){c.ajax({url:j.acre.request.app_url+"/schema/domain/add_type_begin",data:{id:e,mediator:d},dataType:"json",success:function(f,k,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,row);f=c(f.result.html);var i={mode:"add",event_prefix:"fb.schema.domain.add.type.",ajax:{url:j.acre.request.app_url+"/schema/domain/add_type_submit"},init_form:b.init_type_form,validate_form:b.validate_type_form,submit_form:b.submit_type_form,table:a.parents("table:first"),
trigger:a,trigger_row:a.parents("tr:first"),row:c(".edit-row",f).hide(),submit_row:c(".edit-row-submit",f).hide()};h.init_edit_form(i);i.row.bind("fb.schema.domain.add.type.success",function(){var n=c("thead:first .table-empty-column",i.table);n.length&&n.parents("tr:first").hide().prev("tr").show();c(".button-cancel",i.submit_row).text("Done");b.init_type_form(i)})},error:function(f){h.ajax_error_handler(f,row)}})},edit_type_begin:function(a,e){c.ajax({url:j.acre.request.app_url+"/schema/domain/edit_type_begin",
data:{id:e},dataType:"json",success:function(d,f,k){if(d.code==="/api/status/error")return h.ajax_error_handler(k,row);d=c(d.result.html);var g={mode:"edit",event_prefix:"fb.schema.domain.edit.type.",ajax:{url:j.acre.request.app_url+"/schema/domain/edit_type_submit",data:{id:e}},init_form:b.init_type_form,validate_form:b.validate_type_form,submit_form:b.submit_type_form,table:a.parents("table:first"),trigger:a,trigger_row:a.parents("tr:first"),row:c(".edit-row",d).hide(),submit_row:c(".edit-row-submit",
d).hide()};h.init_edit_form(g);g.row.bind("fb.schema.domain.edit.type.success",function(){g.trigger_row.remove();g.row.remove();g.submit_row.remove()})},error:function(d){h.ajax_error_handler(d,row)}})},init_type_form:function(a){var e=c("input[name=name]",a.row),d=c("input[name=key]",a.row);if(a.mode==="add"){e.val("");d.val("");c("textarea[name=description]",a.row).val("");c("input[name=enumeration]",a.row).removeAttr("checked")}if(!a.row.data("initialized")){h.auto_key(e,d,"/type/type");c(":input:not(textarea)",
a.row).keypress(function(f){if(f.keyCode===13)a.row.trigger(a.event_prefix+"submit");else f.keyCode===27&&a.row.trigger(a.event_prefix+"cancel")});a.row.data("initialized",true)}e.focus()},submit_type_form:function(a){var e=c("input[name=key]",a.row);e={domain:c("input[name=domain]",a.row).val(),name:c.trim(c("input[name=name]:visible",a.row).val()),key:e.val(),description:c.trim(c("textarea[name=description]:visible",a.row).val()),mediator:c("input[name=mediator]",a.row).is(":checked")?1:0,enumeration:c("input[name=enumeration]",
a.row).is(":checked")?1:0,lang:c("select[name=lang]",a.submit_row).val()};c.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:c.extend(e,a.ajax.data),success:function(d,f,k){if(d.code==="/api/status/error")return h.ajax_error_handler(k,a.row);var g=c(d.result.html).addClass("new-row");a.row.before(g);g.hide();g.showRow(function(){j.schema.init_row_menu(g);c(".edit",g).show()},null,"slow");a.row.trigger(a.event_prefix+"success")},error:function(d){h.ajax_error_handler(d,a.row)}})},validate_type_form:function(a){var e=
c.trim(c("input[name=name]:visible",a.row).val()),d=c("input[name=key]",a.row),f=d.val();if(e===""||f==="")a.row.trigger(a.event_prefix+"error",[a.row,"Name and Key are required"]);else if(d.data("original")!==f)try{h.check_key_type(f)}catch(k){a.row.trigger(a.event_prefix+"error",[a.row,k])}},delete_type_begin:function(a,e){var d=a.parents("tr:first");d.parents("table:first");c.ajax({url:j.acre.request.app_url+"/schema/domain/delete_type_submit",data:{id:e,user:j.user.id},type:"POST",dataType:"json",
success:function(f,k,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,d);f=c(f.result.html).addClass("new-row");d.before(f);f.hide();d.remove();f.showRow()},error:function(f){h.ajax_error_handler(f,d)}})},undo_delete_type_begin:function(a,e){var d=a.parents("tr:first");d.parents("table:first");c.ajax({url:j.acre.request.app_url+"/schema/domain/undo_delete_type_submit",data:{type_info:JSON.stringify(e)},type:"POST",dataType:"json",success:function(f,k,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,
d);var i=c(f.result.html).addClass("new-row");d.before(i);i.hide();d.remove();i.showRow(function(){j.schema.init_row_menu(i);c(".edit",i).show()},null,"slow")},error:function(f){h.ajax_error_handler(f,d)}})}}})(jQuery,window.freebase);
