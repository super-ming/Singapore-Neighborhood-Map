(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(54)},20:function(e,t,n){},22:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var a,i,o=n(0),r=n.n(o),s=n(3),c=n.n(s),l=(n(20),n(4)),u=n(5),p=n(7),f=n(6),d=n(8),h=(n(22),n(14)),g=n(11),m=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).state={hasError:!1},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.hasError?r.a.createElement("h1",null,"Something went wrong with Google Maps API."):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),t}(o.Component),k=["5fb0135271cbc2d43d9bb4de1b617fc5","googleMapsAPI","AIzaSyB7-KXcHw7r4ky9v9mfQPuzHyLSvzWSoFE","fbAppID","903239466731007"];a=k,i=486,function(e){for(;--e;)a.push(a.shift())}(++i);var w=function(e,t){return k[e-=0]};function b(){var e={};return e[w("0x0")]=w("0x1"),e[w("0x2")]=w("0x3"),e.fbAppSecret=w("0x4"),e}window.gm_authFailure=function(){alert("Invalid Google API key. Please check your Google API key")};var v=b().fbAppID,y=b().fbAppSecret,M=b().googleMapsAPI,E=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(p.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(i)))).mapReady=function(e,t){setTimeout(function(){n.addMarkers(t)},1300)},n.getVenueInfo=function(){var e=[],t='https://graph.facebook.com/v3.2/search?type=place&center=1.290604,103.846473&categories=["FOOD_BEVERAGE"]&distance=1000&fields=name, location, overall_star_rating, phone, website, picture, link, checkins, price_range&access_token='.concat(v,"|").concat(y),a=new Headers,i=new Request(t,{method:"GET",headers:a});fetch(i).then(function(e){if(e.ok)return e.json();throw Error("Request rejected with status code ".concat(e.status))}).then(function(t){t.data.forEach(function(t,n){var a={};a.name=t.name,a.lat=t.location.latitude,a.lng=t.location.longitude,a.id=t.id,t.overall_star_rating?a.rating=t.overall_star_rating:a.rating="No rating provided",t.price_range?a.price_range=t.price_range:a.price_range="No price range provided",t.checkins?a.checkins=t.checkins:a.checkins="None",t.website?a.website=t.website:a.website=t.link,a.index=n,e.push(a)})}).catch(function(e){alert("Something went wrong with Facebook Places API."+e)}),n.props.getFbResults(e)},n.onMapClicked=function(){n.props.infoWindow&&n.props.infoWindow.close(),n.props.allMarkers.forEach(function(e){e.setAnimation(null)},n.props.onInfoWindowClose),n.props.updateQuery(n.props.query)},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.getVenueInfo()}},{key:"addMarkers",value:function(e){var t=this,n=[],a=new this.props.google.maps.InfoWindow;if(this.props.fbResults){var i=!0,o=!1,r=void 0;try{for(var s,c=function(){var i=s.value,o=new t.props.google.maps.Marker({position:{lat:i.lat,lng:i.lng},map:e,title:i.name,id:i.index,animation:2});n.push(o);var r="<h4>".concat(i.name,"</h4><p>Rating: ").concat(i.rating,"</p><p>Price Range: ").concat(i.price_range,"</p><p>Facebook Check-ins: ").concat(i.checkins,"</p><a href=").concat(i.website,">Website</a>");["click","mouseover"].forEach(function(n){o.addListener(n,function(){null!==o.getAnimation()?o.setAnimation(null):o.setAnimation(1),a.setContent(r),a.open(e,o),t.props.onMarkerClick(i,o,a)},!1)}),o.addListener("mouseout",function(){o.setAnimation(null),t.props.onInfoWindowClose()}),a.addListener("closeclick",function(){o.setAnimation(null),t.props.onInfoWindowClose()})},l=this.props.fbResults[Symbol.iterator]();!(i=(s=l.next()).done);i=!0)c()}catch(u){o=!0,r=u}finally{try{i||null==l.return||l.return()}finally{if(o)throw r}}}this.props.getMap(n,a,e,this.props.google)}},{key:"render",value:function(){return window.google?r.a.createElement(m,null,r.a.createElement(g.Map,{"aria-label":"map",className:"map",role:"application",google:this.props.google,initialCenter:{lat:1.290604,lng:103.846473},onClick:this.onMapClicked,onReady:this.mapReady,zoom:15})):r.a.createElement("div",null,"Error loading Google Maps")}}]),t}(o.Component),C=Object(g.GoogleApiWrapper)({apiKey:"".concat(M)})(E),A=function(e){var t=e.venues;return r.a.createElement("div",null,r.a.createElement("label",{className:"label",htmlFor:"searchBox"},"Search Box"),r.a.createElement("input",{id:"searchBox",type:"text",placeholder:"Type here to filter locations",value:e.query,onChange:function(t){return e.updateQuery(t.target.value)}}),r.a.createElement("ul",{className:"venue-list"},t&&t.map(function(t,n){return r.a.createElement("li",{className:"list-item",key:n},r.a.createElement("button",{className:"item",name:t.name,key:n,onClick:function(a){return e.onListClick(t,n)}},t.name))})))},O=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).updateQuery=function(e){n.state.infoWindow&&n.state.infoWindow.close(),n.setState({query:e,menuOpen:!0},n.filterList(e))},n.onListClick=function(e){e=[e],n.setState({clickedPlace:e,menuOpen:!1}),setTimeout(function(){n.setMarkerVisibility([e[0]])},100)},n.filterList=function(e){var t=e.toUpperCase(),a=document.querySelectorAll(".item"),i=[];a.forEach(function(e){if(e.innerHTML.toUpperCase().indexOf(t)>-1){e.style.display="";var n=e.innerHTML.replace(/&amp;/,"&");i.push(n.trim())}else e.style.display="none"}),n.setState({placesOnList:i},n.setMarkerVisibility(i))},n.setMarkerVisibility=function(e){n.state.allMarkers.find(function(t){return e.includes(t.title.trim())?t.setVisible(!0):n.state.clickedPlace?!![e[0].name].includes(t.title.trim())&&(n.setState({activeMarker:t}),n.triggerMarkerClick()):t.setVisible(!1)})},n.triggerMarkerClick=function(){n.state.google.maps.event.trigger(n.state.activeMarker,"click")},n.onMarkerClick=function(e,t,a){n.state.allMarkers.forEach(function(e){t.title!==e.title&&e.setAnimation(null)}),n.setState({activeMarker:t,clickedPlace:e,infoWindow:a,menuOpen:!1,showingInfoWindow:!0})},n.onInfoWindowClose=function(){n.setState({activeMarker:{},clickedPlace:null,infoWindow:null,menuOpen:!1,showingInfoWindow:!1},n.showAllMarkers)},n.showAllMarkers=function(){n.state.allMarkers.forEach(function(e){e.setVisible(!0)})},n.getMap=function(e,t,a,i){n.setState({allMarkers:e,infoWindow:t,map:a,google:i})},n.getFbResults=function(e){n.setState({fbResults:e})},n.state={activeMarker:{},fbResults:null,allMarkers:[],clickedPlace:null,infoWindow:null,map:null,menuOpen:!1,placesOnList:"",query:"",showingInfoWindow:!1},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("nav",{className:"App-header",role:"navigation"},r.a.createElement("h1",null,"Singapore Restaurants"),r.a.createElement("div",{tabIndex:"0"},r.a.createElement(h.slide,{noOverlay:!0,isOpen:this.state.menuOpen,tabIndex:0,className:"burger-menu",width:300},r.a.createElement(A,{className:"map-list",onListClick:this.onListClick,venues:this.state.fbResults,query:this.state.query,updateQuery:this.updateQuery.bind(this)})))),r.a.createElement("main",null,r.a.createElement(C,{ref:"map",className:"map-wrapper",fbResults:this.state.fbResults,infoWindow:this.state.infoWindow,allMarkers:this.state.allMarkers,query:this.state.query,getFbResults:this.getFbResults,getMap:this.getMap,onInfoWindowClose:this.onInfoWindowClose,onMapClicked:this.onMapClicked,onMarkerClick:this.onMarkerClick,setMarkerVisibility:this.setMarkerVisibility,triggerMarkerClick:this.triggerMarkerClick,updateQuery:this.updateQuery})))}}]),t}(o.Component),W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function I(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(r.a.createElement(O,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Neighborhood-Map",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/Neighborhood-Map","/service-worker.js");W?(function(e,t){fetch(e).then(function(n){404===n.status||-1===n.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):I(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):I(t,e)})}}()}},[[15,2,1]]]);
//# sourceMappingURL=main.b9c7e384.chunk.js.map