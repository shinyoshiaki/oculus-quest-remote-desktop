(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{37:function(e,n,t){e.exports=t(74)},65:function(e,n){},74:function(e,n,t){"use strict";t.r(n);var o=t(1),r=t.n(o),a=t(34),c=t.n(a),i=t(4),u=t.n(i),s=t(9),l=t(36);var d=r.a.createRef(),f=function(e){var n=e.onStream;Object(o.useEffect)(function(){t()},[]);var t=function(){var e=Object(s.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise(function(e){navigator.getUserMedia({audio:!1,video:{mandatory:{chromeMediaSource:"screen"}}},function(n){return e(n)},function(){})});case 2:t=e.sent,d.srcObject=t,n(t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("p",null,"display"),r.a.createElement("video",{ref:function(e){return d=e},autoPlay:!0,muted:!0}))},m=t(35),p=t.n(m),v=t(17),w=t.n(v),h=p.a.connect("https://aqueous-earth-75182.herokuapp.com/");function b(e,n){return new Promise(function(t){var o=new w.a({nodeId:"answer",trickle:n});h.emit("create",{roomId:e}),h.on("sdp",function(e){console.log({data:e}),o.setSdp(e.sdp)});var r=o.onSignal.subscribe(function(n){console.log({sdp:n,roomId:e}),h.emit("sdp",{sdp:n,roomId:e})});o.onConnect.once(function(){console.log("connect"),r.unSubscribe(),t(o)})})}var g=function(){var e,n,t=Object(o.useState)((e=1e6,n=1e7,e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e))+e).toString()),a=Object(l.a)(t,2),c=a[0],i=(a[1],function(){var e=Object(s.a)(u.a.mark(function e(n){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(c,!1);case 2:t=e.sent,console.log({stream:n}),t.addTrack(n.getVideoTracks()[0],n),t.addTrack(n.getAudioTracks()[0],n),t.onData.subscribe(function(e){});case 7:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}());return r.a.createElement("div",null,r.a.createElement("p",null,"pin code"),r.a.createElement("p",null,c),r.a.createElement(f,{onStream:i}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[37,1,2]]]);
//# sourceMappingURL=main.7970cf67.chunk.js.map