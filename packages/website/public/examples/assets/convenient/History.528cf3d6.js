var O=Object.defineProperty;var B=(t,e,s)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var g=(t,e,s)=>(B(t,typeof e!="symbol"?e+"":e,s),s);import"../common.006007ed.js";import{M,g as D,a2 as S,j as k,K}from"../three.75af7ea3.js";import{a as A,H as G,A as b}from"../Vis.es.a3304217.js";import"../vis-three.69d8f933.js";const r=class extends b{constructor({objects:e,engine:s}){super();this.oldObjects=[].concat(r.cacheSection),this.newObjects=[].concat(e),this.engine=s,r.cacheSection=[].concat(e)}next(){r.status=!0,this.engine.setSelectionBox({objects:this.newObjects})}prev(){r.status=!0,this.engine.setSelectionBox({objects:this.oldObjects})}};let n=r;g(n,"status",!1),g(n,"cacheSection",[]);class H extends b{constructor({transformControls:e}){super();this.nextState={mode:"translate",space:"world",tranform:"",objectMap:new Map},this.prevState={mode:"translate",space:"world",tranform:"",objectMap:new Map},this.transfromControls=e}generate(e){const s=this.transfromControls,p=s.mode,d=p==="rotate"?"rotation":p==="translate"?"position":p,z=s.getTransObjectSet(),h=this[`${e}State`];h.mode=p,h.tranform=d,h.space=s.space;const L=h.objectMap;z.forEach(o=>{L.set(o,{x:o[d].x,y:o[d].y,z:o[d].z})}),this[e]=function(){const o=this.transfromControls,l=this[`${e}State`];o.mode=l.mode,o.space=l.space;const f=l.tranform,x=[];l.objectMap.forEach((u,a)=>{a[f].x=u.x,a[f].y=u.y,a[f].z=u.z,a.updateMatrixWorld(),x.push(a)}),o.setAttach(...x)}}}const c=new A().setDom(document.getElementById("app")).setSize().setStats(!0).play(),m=new G(50);c.keyboardManager.register({shortcutKey:["ctrl","z"],desp:"undo",keyup:t=>{t==null||t.preventDefault(),m.undo()}}).register({shortcutKey:["ctrl","y"],desp:"redo",keyup:t=>{t==null||t.preventDefault(),m.redo()}});const y=c.scene,j=new M(new D(10,10,10),new S({color:"rgb(255, 105, 100)"}));j.position.x=10;y.add(j);const C=new M(new k(5,32,32),new S({color:"rgb(255, 205, 100)"}));C.position.x=-10;y.add(C);const E=new K("rgb(255, 255, 255)",1,300,0);E.position.y=30;y.add(E);c.addEventListener("selected",t=>{if(n.status){n.status=!1;return}!n.cacheSection.length&&!t.objects.length||m.apply(new n({objects:t.objects,engine:c}))});const w=c.transformControls;let i="";w.addEventListener("mouseDown",t=>{i=new H({transformControls:w}),i.generate("prev")});w.addEventListener("mouseUp",t=>{i.generate("next"),m.apply(i),i=""});