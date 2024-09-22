
function graphic(array, counts){

var countS=Object.values(counts);
var arrayS=[...new Set(array)];


var options={
  series: [{
  name: 'Repeticiones',
  data: countS,
}],
  chart: {
  type: 'line',
},
  plotOptions: {
  bar: {
  borderRadius: 5,
  dataLabels: {
  position: 'top',
},
} },
  stroke: {
  curve: 'smooth',
},    
  xaxis: {
  categories: arrayS,
  position: 'bottom',
  axisBorder: {
  show: false,
},
  axisTicks: {
  show: false,
},
  crosshairs: {
  fill: {
  type: 'gradient',
  gradient: {
  colorFrom: '#535858',
  colorTo: '#535858',
  stops: [0, 100],
  opacityFrom: 0.4,
  opacityTo: 0.5,
} } },
  tooltip: {
  enabled: true,
} },
  yaxis: {
  axisBorder: {
  show: false,
},
  axisTicks: {
  show: false,
},
  labels: {
  show: false,
} },
  title: {
  text: 'DATOS',
  floating: true,
  offsetY: 0,
  align: 'center',
  style: {
  color: '#535858',
} } };

var chart=new ApexCharts(document.querySelector("#chart"), options);
chart.render(); }