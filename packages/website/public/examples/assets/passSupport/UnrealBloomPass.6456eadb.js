import"../common.006007ed.js";import{M as r,g as e,i as t}from"../Vis.es.a3304217.js";import{g as d}from"../lil-gui.module.min.2e05211e.js";import"../three.75af7ea3.js";import"../vis-three.69d8f933.js";const i=new r().setDom(document.getElementById("app")).setSize().setStats(!0).play();e.injectEngine=i;const a=e("Scene");i.setScene(a.vid);e.injectScene=!0;e("PointLight",{position:{x:30,y:50},distance:100});const s=e(t.MESHSTANDARDMATERIAL,{color:"red"}),m=e(t.SPHEREGEOMETRY,{radius:10,widthSegments:64,heightSegments:64});e(t.MESH,{material:s.vid,geometry:m.vid});const o=e(t.UNREALBLOOMPASS,{strength:1}),n=new d;n.add(o,"strength",0,5,.1);n.add(o,"threshold",0,1,.01);n.add(o,"radius",0,5,.1);n.addColor(s,"color");