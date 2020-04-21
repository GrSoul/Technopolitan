var CirclePlayer=function(a,b,c){var d=this,e={supplied:"m4a, oga",cssSelectorAncestor:"#cp_container_1",cssSelector:{play:".cp-play",pause:".cp-pause"}},f={bufferHolder:".cp-buffer-holder",buffer1:".cp-buffer-1",buffer2:".cp-buffer-2",progressHolder:".cp-progress-holder",progress1:".cp-progress-1",progress2:".cp-progress-2",circleControl:".cp-circle-control"};this.cssClass={gt50:"cp-gt50",fallback:"cp-fallback"},this.spritePitch=104,this.spriteRatio=.24,this.player=$(a),this.media=$.extend({},b),this.options=$.extend(!0,{},e,c),this.cssTransforms=Modernizr.csstransforms,this.audio={},this.dragging=!1,this.eventNamespace=".CirclePlayer",this.jq={},$.each(f,function(a,b){d.jq[a]=$(d.options.cssSelectorAncestor+" "+b)}),this._initSolution(),this._initPlayer()};CirclePlayer.prototype={_createHtml:function(){},_initPlayer:function(){var a=this;this.player.jPlayer(this.options),this.player.bind($.jPlayer.event.ready+this.eventNamespace,function(b){b.jPlayer.html.used&&b.jPlayer.html.audio.available&&(a.audio=$(this).data("jPlayer").htmlElement.audio),$(this).jPlayer("setMedia",a.media),a._initCircleControl()}),this.player.bind($.jPlayer.event.play+this.eventNamespace,function(a){$(this).jPlayer("pauseOthers")}),this.player.bind($.jPlayer.event.timeupdate+this.eventNamespace,function(b){a.dragging||a._timeupdate(b.jPlayer.status.currentPercentAbsolute)}),this.player.bind($.jPlayer.event.progress+this.eventNamespace,function(b){var c=0;if("object"==typeof a.audio.buffered&&a.audio.buffered.length>0){if(a.audio.duration>0){for(var d=0,e=0;e<a.audio.buffered.length;e++)d+=a.audio.buffered.end(e)-a.audio.buffered.start(e);c=100*d/a.audio.duration}}else c=0;a._progress(c)}),this.player.bind($.jPlayer.event.ended+this.eventNamespace,function(b){a._resetSolution()})},_initSolution:function(){this.cssTransforms?(this.jq.progressHolder.show(),this.jq.bufferHolder.show()):(this.jq.progressHolder.addClass(this.cssClass.gt50).show(),this.jq.progress1.addClass(this.cssClass.fallback),this.jq.progress2.hide(),this.jq.bufferHolder.hide()),this._resetSolution()},_resetSolution:function(){this.cssTransforms?(this.jq.progressHolder.removeClass(this.cssClass.gt50),this.jq.progress1.css({transform:"rotate(0deg)"}),this.jq.progress2.css({transform:"rotate(0deg)"}).hide()):this.jq.progress1.css("background-position","0 "+this.spritePitch+"px")},_initCircleControl:function(){var a=this;this.jq.circleControl.grab({onstart:function(){a.dragging=!0},onmove:function(b){var c=a._getArcPercent(b.position.x,b.position.y);a.player.jPlayer("playHead",c).jPlayer("play"),a._timeupdate(c)},onfinish:function(b){a.dragging=!1;var c=a._getArcPercent(b.position.x,b.position.y);a.player.jPlayer("playHead",c).jPlayer("play")}})},_timeupdate:function(a){var b=3.6*a+"deg",c=(Math.floor(Math.round(a)*this.spriteRatio)-1)*-this.spritePitch;a<=50?this.cssTransforms?(this.jq.progressHolder.removeClass(this.cssClass.gt50),this.jq.progress1.css({transform:"rotate("+b+")"}),this.jq.progress2.hide()):this.jq.progress1.css("background-position","0 "+c+"px"):a<=100&&(this.cssTransforms?(this.jq.progressHolder.addClass(this.cssClass.gt50),this.jq.progress1.css({transform:"rotate(180deg)"}),this.jq.progress2.css({transform:"rotate("+b+")"}),this.jq.progress2.show()):this.jq.progress1.css("background-position","0 "+c+"px"))},_progress:function(a){var b=3.6*a+"deg";this.cssTransforms&&(a<=50?(this.jq.bufferHolder.removeClass(this.cssClass.gt50),this.jq.buffer1.css({transform:"rotate("+b+")"}),this.jq.buffer2.hide()):a<=100&&(this.jq.bufferHolder.addClass(this.cssClass.gt50),this.jq.buffer1.css({transform:"rotate(180deg)"}),this.jq.buffer2.show(),this.jq.buffer2.css({transform:"rotate("+b+")"})))},_getArcPercent:function(a,b){var c=this.jq.circleControl.offset(),d=a-c.left-this.jq.circleControl.width()/2,e=b-c.top-this.jq.circleControl.height()/2,f=Math.atan2(e,d);return f>-1*Math.PI&&f<-.5*Math.PI&&(f=2*Math.PI+f),(f+Math.PI/2)/2*Math.PI*10},setMedia:function(a){this.media=$.extend({},a),this.player.jPlayer("setMedia",this.media)},play:function(a){this.player.jPlayer("play",a)},pause:function(a){this.player.jPlayer("pause",a)},destroy:function(){this.player.unbind(this.eventNamespace),this.player.jPlayer("destroy")}};