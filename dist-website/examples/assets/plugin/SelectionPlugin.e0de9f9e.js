import"../common.006007ed.js";import{M as d,g as r,m,n as p,i as g,L as w,v as b,s as h,o as y}from"../three.b54e9ae7.js";import{f as M}from"../Vis.es.74edd40b.js";import"../vis-three.36482fbe.js";const n=new M().install("ObjectHelper").install("Selection").complete().setDom(document.getElementById("app")).setSize().play(),e=n.scene,t=new d(new r(10,10,10),new m({color:"rgb(255, 105, 100)"}));t.position.x=10;e.add(t);const i=new p("rgb(255, 255, 255)",1,30,0);i.position.y=20;e.add(i);const L=new g(t.geometry,new w({color:"yellow"}));e.add(L);const a=new b(t.geometry,new h({color:"blue"}));a.position.x=-10;e.add(a);const s=new y(180/Math.PI*45,16/9,5,70);s.position.set(0,20,50);s.lookAt(0,0,0);e.add(s);n.addEventListener("selected",l=>{let o="";l.objects.forEach(c=>{o+=`<div class="selected-elem">${c.uuid}</div>`}),document.getElementById("selected").innerHTML=o});