
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
(function(){var a=window.mjt,b=window.mjt={};b.noConflict=function(){window.mjt=a;return b};b.NAME="mjt";b.VERSION="0.9.3";b.LICENSE="========================================================================\nCopyright (c) 2007-2009, Metaweb Technologies, Inc.\nAll rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions\nare met:\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\nTHIS SOFTWARE IS PROVIDED BY METAWEB TECHNOLOGIES ``AS IS'' AND ANY\nEXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\nIMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\nPURPOSE ARE DISCLAIMED. IN NO EVENT SHALL METAWEB TECHNOLOGIES BE\nLIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR\nCONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF\nSUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR\nBUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,\nWHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE\nOR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN\nIF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n========================================================================\n"})();
(function(a){if(typeof a.services=="undefined")a.services={};a.debug=0;var b={};a.uniqueid=function(d){var e=b[d];if(typeof e!=="number")e=1;b[d]=e+1;return d+"_"+e};var c=function(d,e){var f=document.createElement("div"),g,h;g=document.createElement("h3");g.style.backgroundColor="#fff0f0";g.appendChild(document.createTextNode(d));f.appendChild(g);for(var j=0;j<e.length;j++){var i=e[j];if(i instanceof Array){g=document.createElement("div");g.innerHTML=a.flatten_markup(i)}else{g=document.createElement("pre");
if(typeof i=="string")h=i;else try{h=JSON.stringify(i)}catch(k){h=""+i}h=h.replace(/\r?\n/g,"\r\n");g.appendChild(document.createTextNode(h))}f.appendChild(g)}(g=document.getElementById("mjt_debug_output"))||(g=document.getElementsByTagName("body")[0]);g&&g.appendChild(f)};(function(){function d(f){return Array.prototype.slice.apply(f).join(" ")}if(typeof console!="object"||typeof console.log=="undefined")if(typeof document!="undefined"){a.error=function(){c("error",arguments);return""};a.warn=function(){c("warning",
arguments);return""};a.log=function(){return""};a.note=function(){return""};a.openlog=function(){return""};a.closelog=function(){return""};a.assert=function(){return""}}else{if(typeof Packages!="undefined"){var e=java.lang.System.err;a.error=function(){e.println("error: "+d(arguments));return""};a.warn=function(){e.println("error: "+d(arguments));return""};a.log=function(){e.println("log: "+d(arguments));return""};a.note=function(){e.println("note: "+d(arguments));return""};a.openlog=function(){return""};
a.closelog=function(){return""};a.assert=function(){return""}}}else if(typeof console.debug=="function"){a.error=function(){console.error.apply(console,arguments);return""};a.warn=function(){console.warn.apply(console,arguments);return""};a.log=function(){console.log.apply(console,arguments);return""};a.note=function(){a.debug&&console.info.apply(console,arguments);return""};a.openlog=typeof console.group!="undefined"?function(){a.debug&&console.group.apply(console,arguments)}:a.log;a.closelog=typeof console.groupEnd!=
"undefined"?function(){a.debug&&console.groupEnd.apply(console,arguments);return""}:function(){return""};a.assert=function(f){if(!f){console.error.apply(console,arguments);throw new Error("assertion failed");}return""}}else{a.error=function(){console.log("error: "+d(arguments));return""};a.warn=function(){console.log("warning: "+d(arguments));return""};a.log=function(){return""};a.note=function(){return""};a.openlog=function(){return""};a.closelog=function(){return""};a.assert=function(){return""}}})();
a.formquote=function(d){if(/^[-A-Za-z0-9~!*()_.',:@$\/]*$/.test(d))return d;return encodeURIComponent(d).replace("%2C",",","g").replace("%3A",":","g").replace("%40","@","g").replace("%24","$","g").replace("%2F","/","g")};a.formencode=function(d){var e=[],f="",g,h,j,i=[];for(g in d)i.push(g);i.sort();for(j in i){g=i[j];h=d[g];if(typeof h!="undefined"){h instanceof Array||(h=[h]);for(var k=0;k<h.length;k++){var l=h[k];e.push(f);f="&";e.push(a.formquote(g));e.push("=");e.push(a.formquote(l))}}}return e.join("")};
a.formdecode=function(d){if(typeof d=="undefined"||d===null)return{};d=d.replace(/^\s*/m,"").replace(/\s+$/m,"");if(d=="")return{};var e={};d=d.split("&");for(var f=0;f<d.length;f++){var g=d[f].indexOf("=");if(g<1)a.log('bad uri query argument, missing "=": ',d[f]);else{var h=[d[f].substring(0,g),d[f].substring(g+1)];g=decodeURIComponent(h[0].replace(/\+/g," "));h=decodeURIComponent(h[1].replace(/\+/g," "));if(g in e)if(e[g]instanceof Array)e[g].push(h);else e[g]=[e[g],h];else e[g]=h}}return e};a.form_url=
function(d,e){if(!(e&&a.formencode(e)))return d;return d+"?"+a.formencode(e)};a.htmlencode=function(d){if(typeof d!="string")d=""+d;return d.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\"/g,"&quot;")};a.label_package=function(d){var e=window;if(d){for(var f=d.split(".");f.length;)e=e[f.shift()];if(typeof e=="function")e=e.prototype;if((typeof e=="object"||typeof e=="function")&&e!==null)e._package_name=d;else a.log("missing package",d)}for(var g in e){f=e[g];if(a&&
a.Task&&f&&typeof f!="string"&&!f.nodeName&&f.constructor!=Array&&/function/i.test(f+"")&&typeof f.prototype=="object"&&f.prototype instanceof a.Task)f.prototype._task_class=d+"."+g}}})(mjt);
(function(a){a.bless=function(b){return new a.Markup(b)};a.MarkupList=function(){for(var b=0;b<arguments.length;b++)this[b]=arguments[b]};a.Markup=function(b){this.html=b};a.Markup.prototype.toMarkup=function(){return this.html};(function(){function b(d,e,f){f.push('<span style="outline-style:solid;color:red;">');if(e){f.push(e);f.push("</span>")}else{f.push("bad markup element, type [");f.push(typeof d);f.push("]</span>")}}function c(d,e){switch(typeof d){case "object":if(d===null)b(d,"[null]",e);
else if(d instanceof a.MarkupList)for(var f=0;f in d;f++)c(d[f],e);else if(typeof d.toMarkupList==="function")c(d.toMarkupList(),e);else if(typeof d.toMarkup==="function")e.push(d.toMarkup());else typeof d.toString==="function"?e.push(a.htmlencode(d.toString())):b(d,"[object]",e);break;case "undefined":b(d,"[undefined]",e);break;case "string":e.push(a.htmlencode(d));break;case "boolean":e.push(String(d));break;case "number":e.push(String(d));break;case "function":b(d,"[function]",e);break}return e}
a.flatten_markup=function(d){return c(d,[]).join("")}})();a.make_attr_safe=function(b){return a.bless(a.flatten_markup(b).replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\"/g,"&quot;"))}})(mjt);
(function(a){a.error_html=function(b,c,d){var e=[];if(c&&b.lineNumber){var f=b.lineNumber;c=c.split("\n");if(f<0)f=0;if(f>=c.length)f=c.length-1;var g=f-10;if(g<0)g=0;var h=[];e.push(a.bless(["\n<pre>"]));for(g=g;g<f;g++)h.push(c[g]);e.push(h.join("\n"));e.push(a.bless(['</pre>\n<pre style="color:red">']));e.push(c[f]+"\n");e.push(a.bless(["</pre>\n<pre>"]));h=[];for(g=f+1;g<c.length;g++)h.push(c[g]);e.push(h.join("\n"));e.push(a.bless(["</pre>\n"]))}b=[a.bless(['<div class="mjt_error"']),d?[a.bless([' id="']),
d,a.bless(['"'])]:[],a.bless([">"]),b.name,": ",b.message,e,a.bless(["</div>\n"])];return b=b.concat(e)};a.Codeblock=function(b,c){this.name=b;this.codestr=c;this.baseline=this.basefile=null};a.Codeblock.prototype.handle_exception=function(b,c){if(typeof c.mjt_error=="undefined"){var d=false;if(typeof c.sourceURL!="undefined")c.fileName=c.sourceURL;if(typeof c.line!="undefined"){d=true;c.lineNumber=c.line}c.mjt_error=c instanceof Error?{fileName:c.fileName,lineNumber:c.lineNumber,name:c.name,message:c.message,
stack:c.stack,rhinoException:c.rhinoException}:{name:"Unknown exception",fileName:"",message:""+c};if(this.basefile||d)if(typeof c.stack=="string"){d=this.basefile.replace(/(\W)/g,"\\$1")+":(\\d+)\n";d=new RegExp(d);if(d=d.exec(c.stack)){d=parseInt(d[1])-this.baseline;d>0&&this.log_error_context(b,c,d)}}else if(c.fileName==this.basefile||d){d=d?c.lineNumber-1:c.lineNumber-this.baseline;if(d>0){c.mjt_error.lineNumber=d;c.mjt_error.fileName="<generated code>";this.log_error_context(b,c,d)}}}};a.Codeblock.prototype.log_error_context=
function(b,c,d){var e=this.extract_context(this.codestr,d,5);d="---"+d+"--\>  ";for(var f=[],g=0;g<d.length;g++)f.push(" ");f=f.join("");e=[f,e.prev_lines.join("\n"+f),"\n",d,e.the_line,"\n",f,e.next_lines.join("\n"+f)].join("");a.error("error",b,"\n    "+c.name+": "+c.message+"\n",e)};a.Codeblock.prototype.extract_context=function(b,c,d){b=b.split("\n");if(c<0)c=0;if(c>=b.length)c=b.length-1;var e=c-d;if(e<0)e=0;var f=[];for(line=e;line<c;line++)f.push(b[line]);e=b[c];var g=[];for(line=c+1;line<
b.length&&line<c+d;line++)g.push(b[line]);return{prev_lines:f,the_line:e,next_lines:g}};a.Codeblock.prototype.evaluate=function(){var b=(new Date).getTime(),c=[this.codestr];c=["var __mjt_eval = (function(){",this.codestr,"})(); __mjt_eval;\n"];c=c.join("");a.debug&&a.log("evaluating code "+this.name,{click_me:"view code",codestr:c});var d;if(typeof window=="undefined"||typeof window.navigator.appName=="undefined")d=eval(c);else{try{null()}catch(e){this.baseline=e.lineNumber+2;this.basefile=e.fileName}try{d=
eval(c)}catch(f){this.handle_exception("evaluating codeblock "+this.name,f);throw f;}}b=(new Date).getTime()-b;a.note("evaluated code in ",b,"msec, ",c.length,"chars, got ",typeof d);return d}})(mjt);
(function(a){a._eventcb={};a.kws=function(){for(var b={},c=0;c<arguments.length;c+=2)b[arguments[c]]=arguments[c+1];return b};a.foreach=function(b,c,d){var e,f;if(typeof c=="string"||c instanceof Array||typeof jQuery=="object"&&c instanceof jQuery){f=c.length;for(e=0;e<f;e++)d.apply(b,[e,c[e]])}else if(typeof c==="object")if(typeof document!="undefined"&&typeof c.item!="undefined"&&c.item===document.childNodes.item){f=c.length;for(e=0;e<f;e++)d.apply(b,[e,c.item(e)])}else for(e in c)c.hasOwnProperty(e)&&
d.apply(b,[e,c[e]])};a.ondomready=function(b,c){var d=a._ondomready_queue;if(a._ondomready_timer===null)a._ondomready_timer=setTimeout(a._ondomready_run,20);d.push(b);d.push(c)};a._ondomready_queue=[];a._ondomready_timer=null;a._ondomready_run=function(){a._ondomready_timer=null;var b=a._ondomready_queue;for(a._ondomready_queue=[];b.length;){var c=b.shift(),d=b.shift();c.apply(d)}};a.cleanup_noquote=function(b,c){var d=a.flatten_markup(b);d=d.replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,
">").replace(/&amp;/g,"&");if(typeof c!="undefined")d=d.replace(new RegExp("</("+c+"\\s*)>","ig"),"<\\/$1>");return a.bless(d)};a.ref=function(b){b=['<a href="view?name=',a.formquote(b),'">',a.htmlencode(b),"</a>"].join("");return new a.Markup(b)};a.TemplateCall=function(b){this.raw_tfunc=b;delete this._markup};a.TemplateCall.prototype.toMarkupList=function(){return this._markup};a.TemplateCall.prototype.toMarkup=function(){return a.flatten_markup(this._markup)};a.TemplateCall.prototype.redisplay=
function(){var b=new this.this_tfunc;b.prev_tcall=this;b.subst_id=this.subst_id;b.render(this.targs).display();return b};a.TemplateCall.prototype.display=function(b){if(typeof acre!="undefined")return this;if(typeof b!="undefined")this.subst_id=b;b=this.subst_id;if(typeof b=="string"){var c=document.getElementById(b);if(c)b=c;else{a.note("no element with id "+b);return null}}if(b.nodeName=="IFRAME"){b=b.contentWindow||b.contentDocument;if(b.document)b=b.document;b=b.getElementsByTagName("body")[0]}if(!b)return this;
typeof this._markup!="undefined"&&a.replace_html(b,this);return this};a.TemplateCall.prototype.render=function(b){if(typeof b!="undefined")this.targs=b;b=this.raw_tfunc;if(typeof window=="undefined"||typeof window.navigator.appName=="undefined"){this._markup=b.apply(this,this.targs);return this}try{this._markup=b.apply(this,this.targs)}catch(c){c.tcall=this;b=this.tpackage._codeblock;if(b===null)throw c;b.handle_exception("applying tfunc "+this.signature,c);b=[];for(var d in this.tasks){var e=this.tasks[d];
typeof e==="object"&&e!==null?b.push(d+":"+e.state):b.push(d+":"+typeof e)}this._markup=new a.MarkupList(a.bless("<h3>error applying "),this.signature," to id=",this.subst_id,a.bless("</h3>"),"states:[",b.join(" "),"]");throw c;}return this};a.TemplateCall.prototype.mktask=function(b,c){this.tasks[b]=c;var d=this;c.state=="init"&&c.enqueue();return c.ondone(function(){d.render().display()})};a.tfunc_factory=function(b,c,d,e){var f=function(){var g=arguments.callee;if(this instanceof g){this.tasks=
{};this.defs=this.exports={};typeof a.deprecate=="function"&&a.deprecate(this,"defs",".exports")}else{for(var h=new g,j=[],i=0;i<arguments.length;i++)j[i]=arguments[i];i=h.signature.replace(/\(.*\)$/,"");h.subst_id=g.prototype.has_tasks?a.uniqueid("tcall__"+i):null;h.render(j);return h}};f.prototype=new a.TemplateCall(c);f.prototype.signature=b;f.prototype.tpackage=d;f.prototype.has_tasks=e;f.prototype.source_microdata=c.source_microdata;return f.prototype.this_tfunc=f}})(mjt);
(function(a){a.TemplatePackage=function(){this.namespace=this._template_fragments=this.output_mode=this.debug_locs=this._codeblock=this._compiled=this._template_strings=this.source=null};a.TemplatePackage.prototype.runtime={_break_token:a._break_token,_continue_token:a._continue_token,bless:a.bless,cleanup_noquote:a.cleanup_noquote,foreach:a.foreach,htmlencode:a.htmlencode,make_attr_safe:a.make_attr_safe,new_markuplist:function(){return new a.MarkupList},ondomready:a.ondomready,ref:a.ref,tfunc_factory:a.tfunc_factory,
uniqueid:a.uniqueid};a.TemplatePackage.prototype.init_from_json=function(b){if(typeof b.file!="undefined")this.source=b.file;if(typeof b.stringtable!="undefined")this._template_strings=b.stringtable;this._codeblock=null;if(typeof b.code=="string")this._codeblock=new a.Codeblock(this.source,b.code);else if(typeof b.code=="function")this._compiled=b.code;if(typeof b.debug_locs!="undefined")this.debug_locs=b.debug_locs;if(typeof b.output_mode!="undefined")this.output_mode=b.output_mode;return this};
a.TemplatePackage.prototype.init_from_js=function(b){var c=b.def;this.init_from_json(b.info);this._compiled=c;return this};a.TemplatePackage.prototype.get_metadata=function(){return{file:this.source,stringtable:this._template_strings,debug_locs:this.debug_locs,output_mode:this.output_mode}};a.TemplatePackage.prototype.toJSON=function(){var b=this.get_metadata();if(this._codeblock===null){a.warn("TemplatePackage.toJSON: complete source code unavailable",this.source);b.code=this._compiled}else b.code=
this._codeblock.codestr;return JSON.stringify(b)};a.TemplatePackage.prototype.toJS=function(){var b=null;if(this._codeblock===null){a.warn("TemplatePackage.toJS: complete source code unavailable",this.source);b=this._compiled}else b="(function () {"+this._codeblock.codestr+"})()";return["{def: ",b,",\ninfo:",JSON.stringify(this.get_metadata()),"}\n"].join("")};a.TemplatePackage.prototype.lookup_line=function(b){if(!(debug_locs instanceof Array)||b>=this.debug_locs.length)return null;return this.debug_locs[b-
1]};a.TemplatePackage.prototype.compile_document=function(b,c){(new Date).getTime();if(typeof c=="undefined")c=new a.TemplateCompiler;c.compile_top(b,"rawmain()");(new Date).getTime();return this.init_from_json({source:this.source,stringtable:c.strings,code:c.codestr+"; return rawmain;",debug_locs:c.debug_locs,output_mode:c.output_mode})};a.TemplatePackage.prototype.load_document=function(b,c){this.source+="#"+b.id;this.compile_document(b);return this.load(c)};a.TemplatePackage.prototype.toplevel=
function(b){this.namespace===null&&this.load(b);return this.namespace};a.TemplatePackage.prototype.toString=function(){this.namespace===null&&this.load(targs);return a.flatten_markup(this.namespace._main.prototype.tpackage.tcall)};a.TemplatePackage.prototype.load=function(b){this._template_fragments=[];for(var c=0;c<this._template_strings.length;c++)this._template_fragments[c]=a.bless(this._template_strings[c]);if(this._compiled===null)if(this._codeblock===null)a.error("TemplatePackage has no code",
this.source);else this._compiled=this._codeblock.evaluate();if(typeof b=="undefined")b=[];this._args=b;b=a.tfunc_factory("_main()",this._compiled,this,false,true);c=new b;c.render(this._args);this.tcall=c;c.pkg=this;if(typeof this._compiled.doc_content_type!="undefined")c.doc_content_type=this._compiled.doc_content_type;if(typeof c.exports._main!="undefined")throw new Error("_main() is illegal as a template function name");this.namespace=c.exports;this.namespace._main=b;if(typeof c.exports.main!=
"undefined")throw new Error("main() is illegal as a template function name");this.namespace.main=b;typeof a.deprecate=="function"&&a.deprecate(this.namespace,"main","._main");return this}})(mjt);
typeof jQuery!="undefined"&&function(a){if(typeof a!="undefined"){var b={};a(window).bind("acre.template.register",function(c,d){var e=d.pkgid,f=d.source;if(typeof e==="string"&&typeof f==="object"){if(f.def)f=(new mjt.TemplatePackage).init_from_js(f).toplevel();b[e]=f}});a.fn.mjt=function(c){var d=mjt.flatten_markup(c);return this.each(function(){this.innerHTML=d})};a.fn.acre=function(c,d,e){var f="";if(typeof d!=="undefined"){c=b[c];if(typeof c==="object"){c=c[d];if(typeof c==="function")f=mjt.flatten_markup(c.apply(this,
e));else console.warn("acre template '"+d+"' does not exist in package '"+pkgid+"'")}else console.warn("acre template package '"+pkgid+"' has not been registered")}else f=mjt.flatten_markup(c);return this.each(function(){this.innerHTML=f})}}}(jQuery);
