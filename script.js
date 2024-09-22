
var Tabla=document.getElementById('table');
var TablaFr=document.getElementById('tabla_fr');
var CuerpoTabla=TablaFr.getElementsByTagName('tbody')[0];
var Filas=[];

function generate(){

Tabla.style.display='flex';

var Datos=document.getElementById('datos').value;
var ArrayDatos=Datos.split(" ");

calcularMedia(ArrayDatos);
calcularMediana(ArrayDatos);
calcularModa(ArrayDatos);
calcularDatos(ArrayDatos);

}

// - - - MEDIA - - - //

function calcularMedia(array){
var suma=0;

for(var i=0; i<array.length; i++){
suma+=parseFloat(array[i]); } 

var media=suma/array.length;
document.getElementById('media').innerText=media; }

// - - - MEDIANA - - - //

function calcularMediana(array){
var sortedArray=array.sort(function(a, b){
return a-b; });

var length=sortedArray.length;
var mediana;

if(length%2===0){
var mid1=length/2-1;
var mid2=length/2;
mediana=(parseFloat(sortedArray[mid1])+parseFloat(sortedArray[mid2]))/2;
}else{
var mid=Math.floor(length/2);
mediana=parseFloat(sortedArray[mid]); }

document.getElementById('mediana').innerText=mediana; }

// - - - MODA - - - //

var counts={};

function calcularModa(array){
var modas=[];

for(var i=0; i<array.length; i++){
var num=array[i];
counts[num]=counts[num]? counts[num]+1 : 1; }

var maxCount=0;
for(var num in counts){
if(counts[num]>maxCount){
maxCount=counts[num]; } }

for(var num in counts){
if(counts[num]===maxCount){
modas.push(parseFloat(num)); } }

document.getElementById('moda').innerText=modas; }

// - - - DATOS - - - //

function calcularDatos(array){

var DatoMayor=Math.max(...array);
var DatoMenor=Math.min(...array);

console.log(DatoMenor);
console.log(DatoMayor);

var Rango=parseFloat(DatoMayor+0.5-(DatoMenor-0.5));
var Intervalo=(Math.round(Rango/(1+3.322*Math.log10(array.length)))==1)? 2 : Math.round(Rango/(1+3.322*Math.log10(array.length)));
var Clases=Math.round(Rango/Intervalo);
var Ajuste=Math.ceil(((Intervalo*Clases)-Rango)/2);

for(var i=0; i<Clases; i++){
var nuevaFila=document.createElement('tr');
Filas.push([]);
for(var j=0; j<13; j++){
var nuevaCelda=document.createElement('td');
nuevaCelda.innerText="0";
nuevaCelda.id='col'+(i+1)+'-'+(j+1);
nuevaFila.appendChild(nuevaCelda);
Filas[i].push(nuevaCelda); }

CuerpoTabla.appendChild(nuevaFila); }

document.getElementById('rango').innerText=Rango;
document.getElementById('intervalo').innerText=Intervalo;
document.getElementById('clases').innerText=Clases;
document.getElementById('ajuste').innerText=Ajuste;

// - - - LLENAR TABLA - - - //

for(var i=0; i<Clases; i++){

Filas[i][0]=(i==0)? DatoMenor-Ajuste : Filas[i-1][0]+Intervalo;
Filas[i][1]=(i==0)? Filas[i][0]+(Intervalo-1) : Filas[i-1][1]+Intervalo;
Filas[i][2]=(i==0)? DatoMenor-Ajuste-0.5 : Filas[i-1][2]+Intervalo;
Filas[i][3]=(i==0)? Filas[i][0]+(Intervalo-0.5) : Filas[i-1][3]+Intervalo;
Filas[i][4]=(Filas[i][0]+Filas[i][1])/2;

document.getElementById('col'+(i+1)+'-1').innerText=Filas[i][0];
document.getElementById('col'+(i+1)+'-2').innerText=Filas[i][1];
document.getElementById('col'+(i+1)+'-3').innerText=Filas[i][2];
document.getElementById('col'+(i+1)+'-4').innerText=Filas[i][3];
document.getElementById('col'+(i+1)+'-5').innerText=Filas[i][4];

}

// - - - CALCULAR FRECUENCIAS - - - //

var Frecuencias=Array(Clases).fill(0);
var Mu=0;
var SuMu=0;
var Varianza=0;
var SumDe=0;
var SumDm=0;

for(var i=0; i<array.length; i++){
    for(var j=0; j<Clases; j++){
    if(array[i] >= Filas[j][0] && array[i] <= Filas[j][1]){
    Frecuencias[j]++;
break; } } }

for(var i=0; i<Clases; i++){

Filas[i][5]=Frecuencias[i];
Filas[i][6]=(i==0)? Frecuencias[i] : Filas[i-1][6]+Frecuencias[i];
Filas[i][7]=Filas[i][5]/array.length;
Filas[i][8]=(i==0)? Frecuencias[i]/array.length : (Filas[i-1][8]+Filas[i][7]);
Filas[i][9]=Filas[i][4]*Frecuencias[i];

SuMu+=Filas[i][9];

document.getElementById('col'+(i+1)+'-6').innerText=Filas[i][5];
document.getElementById('col'+(i+1)+'-7').innerText=Filas[i][6];
document.getElementById('col'+(i+1)+'-8').innerText=Filas[i][7].toFixed(4);
document.getElementById('col'+(i+1)+'-9').innerText=Filas[i][8].toFixed(4);
document.getElementById('col'+(i+1)+'-10').innerText=Filas[i][9];

}

Mu=SuMu/array.length;

for(var i=0; i<Clases; i++){

Filas[i][10]=Math.abs(Filas[i][4]-Mu);
Filas[i][11]=Filas[i][10]*Filas[i][5];
Filas[i][12]=Filas[i][5]*Math.pow(Filas[i][10], 2);

SumDm+=Filas[i][11];
Varianza+=Filas[i][12];

document.getElementById('col'+(i+1)+'-11').innerText=Filas[i][10].toFixed(4);
document.getElementById('col'+(i+1)+'-12').innerText=Filas[i][11].toFixed(4);
document.getElementById('col'+(i+1)+'-13').innerText=Filas[i][12].toFixed(4);

}

SumDe=Math.sqrt(Varianza/array.length);

document.getElementById('mu').innerText=Mu.toFixed(4);
document.getElementById('varianza').innerText=(Varianza/array.length).toFixed(4);
document.getElementById('desviacion_e').innerText=SumDe.toFixed(4);
document.getElementById('desviacion_m').innerText=(SumDm/array.length).toFixed(4);

graphic(array, counts);
cuartil(Filas, Intervalo, Clases, array);

}

function cuartil(filas, inter, clases, array){

var numC1=null;
var numC3=null;
var fila1=0;
var fila3=0;
var n1=0;
var n3=0;

for(var i=0; i<clases; i++){
    if(filas[i][8]>0.25 && (numC1===null || filas[i][8]-0.25<numC1-0.25)){
n1=i;
numC1=filas[i][8];
fila1=i==0? 0 : filas[i-1][6]; } }

for(var i=0; i<clases; i++){
    if(filas[i][8]>0.75 && (numC3===null || filas[i][8]-0.75<numC3-0.75)){
n3=i;
numC3=filas[i][8];
fila3=i==0? 0 : filas[i-1][6]; } }

var cuartil1=filas[n1][2]+((inter*(((array.length*25)/100)-fila1))/filas[n1][5]);
var cuartil3=filas[n3][2]+((inter*(((array.length*75)/100)-fila3))/filas[n3][5]);

console.log(cuartil3);
console.log(cuartil1);

document.getElementById('desviacion_c').innerText=((cuartil3-cuartil1)/2).toFixed(4);

}