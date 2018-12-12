
// anclajex e anclajey coordenadas cartesianas del punto de referencia del arrastre para mover el centrado
// centradox e centradoy coordenadas cartesianas del punto de centrado
// c contante de prueba    var f=1;for(var i=0; i<c; i++){ f=f*i; if(f==0){f=1}    if(i%2==0){continue; }  if((i+1)%4==0){ y-= Math.pow(x, i)/f} else{   y+= Math.pow(x, i)/f }   }   
//click si se está clickeando el canvas
//escala si es grande mayor zoom
// alto y ancho tamaño de la ventana
var n_funciones=0;
var color= new Array();
color[0]="rgba(250, 120, 200, 0.75)";
color[1]="rgba(200, 250, 120, 0.75)";
color[2]="rgba(250, 200, 120, 0.75)";
color[3]="rgba(120, 200, 250, 0.75)";
color[4]="rgba(200, 120, 250, 0.75)";
color[5]="rgba(120, 250, 200, 1)";
var anclajex=0, anclajey=0, distanciax=0, distanciay=0;
var centradox=0, centradoy=0 ;
var c;
var click=false;
var escala=100;
var alto, ancho;
var dibujos_f= new Array();
var definicion=100; 
var F= new Array();

// funciones
function funcion(x, n){

	var v1, v2, r;
	var cola= new Array();
	
	var t=0;
	var y=0;
    var h=0.000001;
    var bool=false;
     
	if(Math.abs(x)>h && FA.length>0)
	{
         
		cola=FA[n].slice();
		// if(FA.length==4){ alert("hola"+n); }
		while (cola.length!=1) {
			//alert("z "+x+" "+cola.length+" "+t+" "+cola[t]+" "+cola[1+t]+" "+cola[2+t]+" "+(!isNaN(cola[0+t]) || tipo(cola[0+t])==3) +" "+ (tipo(cola[1+t])==1 || tipo(cola[1+t])==3) +" "+ (tipo(cola[2+t])==2 ));
	        if( (!isNaN(cola[0+t]) || tipo(cola[0+t])==3) && (!isNaN(cola[1+t]) || tipo(cola[1+t])==3) && (tipo(cola[2+t])==2 ) ){
	        	if(cola[0+t]=="x"){ v1=x;  }else if(cola[0+t]=="-x"){v1=-x;}else{ v1=parseFloat(cola[0+t]);  }
	        	if(cola[1+t]=="x"){ v2=x;  }else if(cola[1+t]=="-x"){v1=-x;}else{ v2=parseFloat(cola[1+t]);  }
                
                if(cola[2+t]=="+"){  r=""+(v1+v2);  }
                if(cola[2+t]=="-"){  r=""+(v1-v2);  }
                if(cola[2+t]=="*"){  r=""+(v1*v2);  }
                if(cola[2+t]=="/"){  r=""+(v1/v2); }
                if(cola[2+t]=="^"){  r=""+(Math.pow(v1, v2));  }
              //  if(t==1){ alert("w " +v1+" "+v2+" "+r); }
               // for(var i=0; i<cola.length; i++){ alert("w "+cola[i]);  }
              cola.splice(t,3, r);    t=0;
               // for(var i=0; i<cola.length; i++){ alert("y "+cola[i]);  }
                if(isNaN(r)){ return NaN; }
	        }else {
	        	t++;
	        }

		}

        if(cola.length==1){ if(cola[0]=="x"){ y=x;  }else if(cola[0]=="-x"){ y=-x }else{ y=parseFloat(cola[0]);}   }


		return y;
	} else { return NaN }
}
// x=coordena real X1=coordenada cartesiana 
function XtoX1(b, x){
	var x1;
	if(b){ x1= (x- ancho/2)/escala } else { x1= x*escala +ancho/2 }
    return x1;
}
// y=coordena real Y1=coordenada cartesiana 
function YtoY1(b, y){
	var y1;
	if(b){ y1= (alto/2-y)/escala } else { y1= alto/2 -y*escala }
    return y1;
}

//funcion que inicia todo
function comenzar () {
//declarando y/o inicializando variables
var info = document.getElementById("info");
var htmlescala= document.getElementById("escala");
var htmlcentrado= document.getElementById("centrado");
var htmlcentradox= document.getElementById("centradox");
var htmlcentradoy= document.getElementById("centradoy");
var htmlformulario= document.getElementById("formulario");
var htmlrango= document.getElementById("rango");
var htmlnrango= document.getElementById("nrango");
var p= document.getElementById("p");
var lateral= document.getElementById("lateral");
var elemento=document.getElementById("lienzo");
var lienzo=elemento.getContext("2d");
var pctx=p.getContext("2d");
var puntero=document.getElementById("puntero");
var x, y;
var htmlfunciones=document.getElementById("funciones");
var htmlclassfuncion=document.getElementsByClassName("funcion");
var df=document.getElementById('df');


//asignando valores
c= parseFloat( htmlrango.value) ;
htmlnrango.innerHTML=""+c;
htmlescala.value= Math.round(escala*1000)/1000;
htmlcentradox.value=Math.round(centradox*10)/10;
htmlcentradoy.value=Math.round(centradoy*10)/10;
alto=elemento.height=window.innerHeight-10;
ancho=elemento.width=window.innerWidth-300;
p.height=alto;
p.width=ancho;
lateral.style.height=alto+"px";

for(var i=0; i<n_funciones- htmlclassfuncion.length; i++){ htmlfunciones.innerHTML+="<div><div class='Latex' onclick='latex1(event)' ></div> <input type='text' onkeyup = 'if(event.keyCode == 13) {escribir(); }' class='funcion' name='f1' value='' placeholder=''></div>"  }
df.innerHTML="";
for(var i=0; i<n_funciones;i++){  df.innerHTML+="<canvas class='f' width='"+ancho+"' height='"+alto+"' >    </canvas>";    }
for(var i=0; i<htmlclassfuncion.length; i++){ F[i]=htmlclassfuncion[i].value;    }



//funcion para el zoom
p.addEventListener("wheel", zoom, false);
//funcion para las coordenadas del puntero y distancia y direccion del arrastrado
p.addEventListener("mousemove",function(evt){  

	let coords= elemento.getBoundingClientRect();
	x=evt.clientX- coords.left;
	y=evt.clientY- coords.top ;

	if(!click){
		anclajex=anclajey=distanciax=distanciay =0;
		puntero.position = 'absolute';
		puntero.style.left = (x+20)+"px";
		puntero.style.top = (y-10)+"px";
		puntero.innerHTML="("+ Math.round( ( (XtoX1(true, x)+centradox )*100 ) )/100+" , "+Math.round( ( (YtoY1(true, y)+centradoy )*100 ) )/100+")";
	} else {
		distanciax= XtoX1(true, x)-anclajex+centradox ;
		distanciay=YtoY1(true, y)-anclajey+centradoy;
		puntero.innerHTML="";
	    info.innerHTML=""+distanciax+" "+distanciay;
	}

}, false);

//cuando el mouse sale del canva deja de clickear
p.addEventListener("mouseout", function(){  puntero.innerHTML=""; click=false; info.innerHTML=""+click;  },false);
//cuando hace click
p.addEventListener("mousedown", function(evt){  
	click=true;  info.innerHTML=""+click;  
	let coords= elemento.getBoundingClientRect();
	x=evt.clientX- coords.left;
	y=evt.clientY- coords.top ;
	anclajex= XtoX1(true, x)+centradox;
	anclajey= YtoY1(true, y)+centradoy;
}, false);

//cuando deja de clickear
p.addEventListener("mouseup", function (){  
	try {
		let c= p.cloneNode(true);
		p.parentNode.replaceChild(c, p);
		centradox-=distanciax; centradoy-=distanciay;	click=false;  info.innerHTML=""+click; centradox=Math.round(centradox), centradoy=Math.round(centradoy);
		comenzar();

	} catch(e) {
		// statements
		console.log("error" + 393+" "+e);
	}
} , false);
//fin Event Listener
//cuadriculado
lienzo.beginPath();

lienzo.lineWidth=1;
lienzo.strokeStyle="rgba(180, 220, 220, 1)";

var linea= Math.pow(5, Math.floor(Math.log((100/escala))/Math.log(5)))

var cx=XtoX1(false, -centradox), cy=YtoY1(false, -centradoy);

for(var i=XtoX1(true, cx)+centradox; i<XtoX1(true, ancho)+centradox; i+= linea ){
var n= i;
lienzo.moveTo(XtoX1(false,n- centradox),0);
lienzo.lineTo(XtoX1(false,n- centradox),alto);
}
for(var i=XtoX1(true, cx)+centradox; i>XtoX1(true, 0)+centradox; i-=linea ){
var n= i;
lienzo.moveTo(XtoX1(false,n- centradox),0);
lienzo.lineTo(XtoX1(false,n- centradox),alto);
}
//dibujar numeros eje y
for(var i=YtoY1(true, cy)+centradoy; i<YtoY1(true, 0)+centradoy; i+=linea ){
var n= i;
lienzo.moveTo(0, YtoY1(false,n- centradoy));
lienzo.lineTo(ancho, YtoY1(false,n- centradoy));
}
for(var i=YtoY1(true, cy)+centradoy; i>YtoY1(true, alto)+centradoy; i-=linea ){
var n= i;
lienzo.moveTo(0, YtoY1(false,n- centradoy));
lienzo.lineTo(ancho, YtoY1(false,n- centradoy));
}
lienzo.stroke();

//fin cuadriculado
//dibujar ejes
lienzo.beginPath();
lienzo.strokeStyle="rgba(180, 220, 220, 1)";
lienzo.lineWidth=4;
lienzo.moveTo(0,YtoY1(false,-centradoy));
lienzo.lineTo(ancho,YtoY1(false,-centradoy));
lienzo.moveTo(XtoX1(false, -centradox),0);
lienzo.lineTo(XtoX1(false, -centradox),alto);
lienzo.stroke();
//fin dibujar ejes

//dibujar funciones
if(document.getElementsByClassName("f").length>0){dibujar();}
//fin dibujar funciones

//dibujar punto c
lienzo.beginPath();
lienzo.arc(XtoX1(false, c-centradox),YtoY1(false, funcion(c, 0)-centradoy), 3, 0, 2*Math.PI, true );
lienzo.fillStyle="#E46BAA";
lienzo.fill();
lienzo.stroke();
//fin dibujar punto

//dibujar numeros ejes
pctx.beginPath();
pctx.font = ' 16px small-caption';
pctx.lineWidth=2;
pctx.strokeStyle="#312929";
//dibujar numeros eje x
var cx=XtoX1(false, -centradox), cy=YtoY1(false, -centradoy);

for(var i=XtoX1(true, cx)+centradox; i<XtoX1(true, ancho)+centradox; i+= 100/escala ){
var n= Math.round(i);
pctx.strokeText(n,XtoX1(false,n- centradox)-4,YtoY1(false,-centradoy)+4);
}
for(var i=XtoX1(true, cx)+centradox; i>XtoX1(true, 0)+centradox; i-=100/escala ){
var n= Math.round(i);
pctx.strokeText(n,XtoX1(false,n- centradox)-4,YtoY1(false,-centradoy)+4);
}
//dibujar numeros eje y
for(var i=YtoY1(true, cy)+centradoy; i<YtoY1(true, 0)+centradoy; i+=100/escala ){
var n= Math.round(i);
pctx.strokeText(n,XtoX1(false,-centradox)-4,YtoY1(false,n- centradoy)+4);
}
for(var i=YtoY1(true, cy)+centradoy; i>YtoY1(true, alto)+centradoy; i-=100/escala ){
var n= Math.round(i);
pctx.strokeText(n,XtoX1(false,-centradox)-4,YtoY1(false,n- centradoy)+4);
}
pctx.stroke();
//fin dibujar numeros ejes

}//fin comenzar

//para hacer zoom
function zoom(event){
	if(escala && escala>0 && escala<10000){
		try {
			var delta = 0;
			if (!event) event = window.event; 
			if (event.wheelDelta){
				delta = event.wheelDelta/120; 
			}else if (event.detail){
				delta = -event.detail/3;
			}

			var proporcion=escala/40;
			comenzar();
			escala+=delta*proporcion;
		}
		catch(e) {
			alert("hola1"+e);
		}

    }
}

//funciones para fijar datos
function fijar_escala(){
	var htmlescala= document.getElementById("escala");
	if(htmlescala.value>0 && htmlescala.value<10000){
		escala=parseFloat(htmlescala.value) ;
	    comenzar();
    }
}
function fijar_calidad(){
	var calidad= document.getElementById("calidad");
	if(calidad.value>0 && calidad.value<21){
		definicion=parseFloat(calidad.value)*100;
	    comenzar();
    }
}
function fijar_centradox(){
	var htmlcentradox= document.getElementById("centradox");
	if(htmlcentradox.value>-1000 && htmlcentradox.value<1000){	
		centradox=parseFloat(htmlcentradox.value) ;
		comenzar();
    }
}

function fijar_centradoy(){
	var htmlcentradoy= document.getElementById("centradoy");
	if(htmlcentradoy.value>-1000 && htmlcentradoy.value<1000){
	centradoy=parseFloat(htmlcentradoy.value) ;
	comenzar();
    }
}
//fin funciones para fijar datos



function dibujar()
{
	if(n_funciones>0){
		var x,y ,x1, y1, x2, y2, exactitud, n1=0, lienzo;
		
	    var f=document.getElementsByClassName('f');

	    
		y=y1=y2= new Array();

		if(escala>100){exactitud=0.1}
		else{ exactitud=escala/definicion }

		//dibujar funcion
		var X= new Array();
		var Y= new Array(n_funciones);

		for (var i =0; i <n_funciones; i++) {
			Y[i]= new Array();
		}

		for(var i=XtoX1(false,  XtoX1(true, 0)+centradox); i<ancho-XtoX1(false,  XtoX1(true, 0)-centradox);i+=exactitud)
		{
			x=i;
			x1=XtoX1(true, x);
		    x2=XtoX1(false, (x1-centradox));
	        X[n1]=x2;

		    for (var h = 0; h <n_funciones ; h++) 
		    {
	            lienzo=f[h].getContext("2d");
	              
		        lienzo.beginPath();
				lienzo.lineWidth=3;
	        	lienzo.strokeStyle=color[h];
				lienzo.lineCap="round";
				lienzo.lineJoin="miter";			
			    y1[h]=funcion(x1,h);

			    if(y1[h]!=NaN){
	           
					y2[h]=YtoY1(false, (y1[h]-centradoy));			   
					Y[h][n1]=y2[h];
				   
					if(n1>0)
				    { 
				    	var dx= x2-X[n1-1], dy=y2[h]-Y[h][n1-1];// if(h==0 && n_funciones==2){ alert("x2="+x2+" dy="+dy+" y2="+y2+" "+Y[h][n1-1]); }
						if(Math.sqrt(dx*dx+dy*dy)>1 && Math.sqrt(dx*dx+dy*dy)<alto-10)
						{
	                    

						//	alert(Math.sqrt(dx*dx+dy*dy));
						//	alert(X[n1-1]+" "+Y[h][n1-1]);
						    lienzo.moveTo(X[n1-1],Y[h][n1-1]);
					    	lienzo.lineTo(x2+1,y2[h]+1);
					    }
				    }
							    
					lienzo.moveTo(x2,y2[h]);
					lienzo.lineTo(x2+1,y2[h]+1);
				}

				lienzo.stroke();
								//dibujar inetersecciones
	            if(h>0)
		    	{
		            for(var j=h-1; j>=0; j--){
			            // if(x1>0.95 && x1<1.05){ alert(y1[h]+""+y1[j]+""+(y1[h]-y1[j])) }
			            if( Math.abs(y1[h]-y1[j])<escala/10000 ){ dibujar_punto(x1, h) }// puntos
		            }
	            }                      
		    }	
		    n1++;
		}
	}
	

}
// fin dibujar funcion
function dibujar_punto(x, n){
var p= document.getElementById("p");
var pctx=p.getContext("2d");
pctx.beginPath();
pctx.strokeStyle="#392929";
pctx.arc(XtoX1(false, x-centradox),YtoY1(false, funcion(x, n)-centradoy), 4, 0, 2*Math.PI, true );
pctx.fillStyle="#E46BAA";
pctx.fill();
pctx.stroke();

}

function agregar_funcion(){

n_funciones++;

	var df=document.getElementById('df');
	var htmlfunciones=document.getElementById("funciones");
    var htmlclassfuncion= document.getElementsByClassName("funcion");
    for(var i=0; i<htmlclassfuncion.length; i++){ F[i]=htmlclassfuncion[i].value;    }
	for(var i=0; i<n_funciones- htmlclassfuncion.length; i++){ 
		htmlfunciones.innerHTML+="<div><div class='Latex' onclick='latex1(event)' ></div> <input type='text' onkeyup = 'if(event.keyCode == 13){   escribir(); }' class='funcion' name='f1' value='' placeholder=''></div>"  
	}

	df.innerHTML="";
	for(var i=0; i<n_funciones ;i++){  df.innerHTML+="<canvas class='f' width='"+ancho+"' height='"+alto+"' >    </canvas>";   htmlclassfuncion[i].value=F[i];  }

dibujar();

}

function reorganizar(){
	var htmlclassfuncion= document.getElementsByClassName("funcion");
	var htmlfunciones=document.getElementById("funciones");
	var F1= new Array();
	for(var i=0; i<htmlclassfuncion.length; i++){ F[i]=htmlclassfuncion[i].value; if(F[i]!="" && F[i]!="undefined"){  F1.push(F[i]) }   }
	F=F1;
    htmlfunciones.innerHTML="";
    n_funciones=F.length;
 
    for(var i=0; i<n_funciones; i++){ 
		htmlfunciones.innerHTML+="<div><div class='Latex' onclick='latex1(event)' ></div> <input type='text' onkeyup = 'if(event.keyCode == 13){ escribir(); } ' class='funcion' name='f1' value='' placeholder=''></div>"  
	}
	htmlclassfuncion= document.getElementsByClassName("funcion");
	var htmlclasslatex=document.getElementsByClassName("Latex");
    for(var i=0; i<htmlclassfuncion.length; i++){ 
    	htmlclassfuncion[i].value=F[i]; htmlclassfuncion[i].style.display = 'none'; htmlclasslatex[i].style.display = 'block';
    	htmlclasslatex[i].innerHTML="<a href='https://www.codecogs.com/eqnedit.php?latex=x' target='_blank'><img style='margin-top:5px' src='https://latex.codecogs.com/gif.latex?"+LaTex(F[i])+"' title='"+F[i]+"' /></a>";
    	// htmlclasslatex[i].innerHTML=F[i];
    }
}


function escribir(){
	
	reorganizar();
	
	var df=document.getElementById('df');
	var htmlrango= document.getElementById("rango");
	var htmlnrango= document.getElementById("nrango");
	c= parseFloat( htmlrango.value) ;
	htmlnrango.innerHTML=""+c;

	
    
    
    df.innerHTML="";
	for(var i=0; i<n_funciones ;i++){  df.innerHTML+="<canvas class='f' width='"+ancho+"' height='"+alto+"' >    </canvas>";  }
    
	 
    hola();
   
	dibujar();




}


function latex1 (e) {
	

     e.target.parentNode.lastChild.style.display = 'block';
     e.target.style.display = 'none';
	
		
	
}

function LaTex(F){
var l, espacios="";
l=new Array();
	for (var i = 0; i < F.length; i++) {
    l[0]=F.charAt(i);
		if(l[0]==" "){continue;}
		if(l[0]=="("){ l[0]="{";  }
		if(l[0]==")"){ l[0]="}";  }
		espacios+=l[0];		
	}
    F=espacios;
   
	for (var i = 0; i < F.length; i++) {

    l[i]=F.charAt(i); 
  
    if(l[i]=="/"){
    	alert("hola1");
    	var si=1,sd=1,  cli=1, cld=1, li="", ld="";
    	if(l[i-1]=="}"){alert("hola2");
       		for(var h=i-2; h>=0; h--){ if(l[h]=="}"){ si++; } if(l[h]=="{"){si--;}    cli++; if(si<=0){ alert("1li="+li); break; } li+=l[h];  }
    	}else {cli=0; alert("hola3 "+i);
       		for(var h=i-1; h>=0; h--){ if(!isNaN(l[h]) || tipo(l[h])==3 ){ cli++; li+=l[h]; }else{  alert("2li="+li); break; }  }
    	}
        
        if(F.charAt(i+1)=="{"){alert("hola4");
       		for(var h=i+2; h<F.length; h++){ if(F.charAt(h)=="{"){ sd++; } if(F.charAt(h)=="}"){sd--;}    cld++;  alert("sd="+sd+" h="+h+" l[h]="+F.charAt(h)); if(sd<=0){ alert("1ld="+ld); break; } ld+=F.charAt(h);  }
    	}else {cld=0; alert("hola5 "+i);
       		for(var h=i+1; h<F.length; h++){ if(!isNaN(F.charAt(h)) || tipo(F.charAt(h))==3 ){ cld++; ld+=F.charAt(h); }else{  alert("2ld="+ld); break; }  }
    	}

    var r=" \\frac{"+li.split('').reverse().join('')+"}{"+ld+"} ";
   var R= new Array();
   R=F.split('');
   R.splice(i-cli, 1+cld+cli, r);
   F=R.join('');
    
    i+= (-(cli+1) + r.length); 
     alert("r="+r+" F="+F+" i="+i+" cli="+cli+" cld="+cld+" r.length="+r.length);
    }

			
	}
    espacios="";
	for (var i = 0; i < F.length; i++) {
    l[0]=F.charAt(i);
		if(l[0]==" "){continue;}
	
		espacios+=l[0];		
	}
    F=espacios;

return F;


}

//funciones para empezar
window.addEventListener("load", comenzar, false);
window.addEventListener("resize", comenzar, false);