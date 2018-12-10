var FA= new Array();

function hola() {
	for (var a = 0; a < F.length; a++) {
		
		var stack, cola, b=false, v=0; var espacios="";
		cola= new Array();
		stack= new Array();
	   
		for (var i = 0; i < F[a].length; i++) {
			
			if(F[a].charAt(i)==" "){continue;}
			espacios+=F[a].charAt(i);
			
		}
	    F[a]=espacios;
	  //5-3*10-10*2   5 3 10 *0 - 1 2 * -
	    for(var i=0; i<F[a].length; i++  ){
		    var l= F[a].charAt(i), l1; if(i>0){ l1=F[a].charAt(i-1) }

		 	if( tipo(l)==1 || (v==0 && l=="-" && cola[0]==undefined)|| ( l=="-" && !b && tipo(l1)==2 && l1!=")") ){
		 		if(!b){  cola.push(l); b=true; }else if(tipo(l)==1) {cola[v]+=l;  }            
		 	} 
		 	else if( tipo(l)==2 ){
			 	b=false; v++;
	            if(l=="("){  stack.push(l); v--; continue;   }else if(l==")") {
	            	for (var h = stack.length-1; h >=0 ; h--) {
	            		if(stack[h]=="("){  stack.pop(); v--; break; }
	    				cola.push(stack[h]); stack.pop(); v++;
	    			}
	            }
			    for (var h = stack.length - 1; h >= 0; h--) {
			    	if(stack[h]=="("){ break;   } 
			    	
			  		if( rango(l)<=rango(stack[h])){    cola.push(stack[h]); stack.pop(); v++; }
			  		
			    }
	            if(l!=")"){stack.push(l);}
			    
		 	}else if(tipo(l)==3){
		 		
	        if(!b){  cola.push(l); }else if(l1=="-") { cola[v]+=l; }else if(tipo(l1)==1) {
	        	cola.push(l); v++; cola.push("*"); v++;
	        }

		 	}
	    }
	    
	    
	    for (var i = stack.length-1; i >=0 ; i--) {
	    	cola.push(stack[i]);
	    }
	    FA[a]=cola;
	    /*
	    var cadena="";
	    for (var i = 0; i < cola.length; i++) {  cadena+=" "+cola[i];    }
	         
	         alert(cadena);*/
	   }
	   

	
}
 
  

function tipo (letra) {
	if( letra=="1" || letra=="2" || letra=="3" || letra=="4" || letra=="5" || letra=="6" || letra=="7" || letra=="8" || letra=="9" || letra=="." ||  letra=="0"){
		return 1;
	} else if (letra=="+" || letra=="-" || letra==")" || letra=="(" || letra=="*" || letra=="/" || letra=="^") {
		return 2;
	}
	else if(letra=="x"){
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



