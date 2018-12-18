var FA= new Array();

var cola, stack, v;
cola= new Array();
stack= new Array();
function hola() {

 
	
	for (var a = 0; a < F.length; a++) {
	
	    FA[a]=parser(F[a]);
	   
        
	   
	   }
	   
  
	
}

function parser (F1) {
	 cola= new Array();
       stack= new Array();
		var b=false, espacios="";
		
	   
		for (var i = 0; i < F1.length; i++) {
			
			if(F1.charAt(i)==" "){continue;}
			espacios+=F1.charAt(i);
			
		}
	    F1=espacios;
        var f_especial= new Array();
        var NF= new Array();

        while ((F1.indexOf("sqrt(")!=-1 || F1.indexOf("sen(")!=-1 || F1.indexOf("sin(")!=-1 || F1.indexOf("cos(")!=-1 ||F1.indexOf("tan(")!=-1 || F1.indexOf("log(")!=-1) && F1!="") {
	        f_especial[0]=F1.indexOf("sqrt(");
	        f_especial[1]=F1.indexOf("sen(");
	        f_especial[2]=F1.indexOf("sin(");
	        f_especial[3]=F1.indexOf("cos(");
	        f_especial[4]=F1.indexOf("tan(");
	        f_especial[5]=F1.indexOf("log(");

            var i, nf=0, cadena="", s=1;

            while (f_especial[nf]==-1 && nf<=f_especial.length) {
            	nf++;
            }
            
	        for(var h=0; h<f_especial.length; h++){
            	if(f_especial[nf]>f_especial[h] && f_especial[h]!=-1){ nf=h;  }
	        }
            
            i=f_especial[nf];
	       
	        if(nf==0){var hola=F1.split('');   hola.splice(i, 4); F1=hola.join('');  }
	        if(nf==1 || nf==2 || nf==3 || nf==4|| nf==5){var hola=F1.split('');   hola.splice(i, 3); F1=hola.join('');  }

	        for(var h=i+1; h<F1.length; h++){
	        if(F1.charAt(h)=="("){s++;}
	        if(F1.charAt(h)==")"){s--;}
	        if(s==0){  var hola=F1.split('');  NF.push(parser(cadena)); NF[NF.length-1].unshift(nf); hola.splice(i, 2+cadena.length, "$"); F1=hola.join('');   break;  }
	       	cadena+=F1.charAt(h);

	        }
	         cola= new Array();
	         stack= new Array();
	    	// alert("hola "+cadena+" nf="+nf+" F1="+F1+" i="+i+" NF="+NF+" cola="+cola);      
       }

       v=0;
	  //5-3*10-10*2   5 3 10 *0 - 1 2 * -
	    for(var i=0; i<F1.length; i++  ){
		    var l= F1.charAt(i), l1; if(i>0){ l1=F1.charAt(i-1) }
          
		 	if( tipo(l)==1 || (v==0 && l=="-" && cola[0]==undefined)|| ( l=="-" && !b && tipo(l1)==2 && l1!=")") ){

		 		if(!b){  cola.push(l); b=true;   }else if(tipo(l)==1) {cola[v]+=l;  }               
		 	} 
		 	else if( tipo(l)==2 ){
			 	b=false; v++;
	            if(l=="("){ if(l1=="-" && v==1){l1=cola[v-1]="-1"}  if(!isNaN(l1)|| tipo(l1)==3){ if(v!=1){ poner_stack(0); stack.push("+") }   poner_stack(1); stack.push("*"); }  stack.push(l); v--; continue;   }else if(l==")") {
	            	for (var h = stack.length-1; h >=0 ; h--) {
	            		if(stack[h]=="("){  stack.pop(); v--; break; }
	    				cola.push(stack[h]); stack.pop(); v++;
	    			}
	            }
			    poner_stack(rango(l));
	            if(l!=")"){stack.push(l);}
			    
		 	}else if(tipo(l)==3){
		 		
	        if(!b){  cola.push(l); }else if(l1=="-") { cola[v]+=l;  }else if(tipo(l1)==1) {
	        	cola.push(l); v++; cola.push("*"); v++;
	        }

		 	}
	    }
	    
	    
	    for (var i = stack.length-1; i >=0 ; i--) {
	    	cola.push(stack[i]);
	    }
	    var c=0;
        for(var i=0; i<cola.length; i++){
        if(cola[i]=="$"){ cola[i]=NF[c]; c++;  }else if(cola[i]=="-$") {
        	
        	cola.splice(i, 1, "-1" ,NF[c], "*");
        	//alert("were "+cola);
        	i+=2;
        }

        }
    	//alert("cola="+cola+" F1="+F1);
	    return cola; 
}
  

function tipo (letra) {
	if( letra=="1" || letra=="2" || letra=="3" || letra=="4" || letra=="5" || letra=="6" || letra=="7" || letra=="8" || letra=="9" || letra=="." ||  letra=="0"){
		return 1;
	} else if (letra=="+" || letra=="-" || letra==")" || letra=="(" || letra=="*" || letra=="/" || letra=="^") {
		return 2;
	}
	else if(letra=="x" || letra=="-x"|| letra=="$"|| letra=="-$" || letra=="e" || letra=="-e"|| letra=="π"|| letra=="-π"){
		return 3;
	}
	else {
		return 0;
	}
}

function rango (letra) {
  if(letra=="+" || letra=="-"){ return 0  }else if( letra=="/" || letra=="*"){ return 1 }else if(letra=="^") {return 2 } else{
  	return undefined;
  }
}

function poner_stack(n){

	for (var h = stack.length - 1; h >= 0; h--) {
		if(stack[h]=="("){ break;   } 
			    	
	    if( n<=rango(stack[h])){    cola.push(stack[h]); stack.pop(); v++; }
			  		
    }

}


/*

    	switch (f) {
    		case -1:
    			return y;
    			break;
    		case 0:
    			return Math.sqrt(y);
    			break;
    	}



    	for (var i = 0; i < FA[n].length; i++) {
    	if( isArray(FA[n][i]) ){  var w= parseInt(FA[n][i][0]); FA[n][i].shift(); FA[n][i]=funcion( FA[n][i] );  }
    }
   
*/