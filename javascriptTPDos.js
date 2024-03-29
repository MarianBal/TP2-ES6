//Local de ventas de PCs
//Una empresa de venta de computadoras está desarrollando un sistema para llevar registro de ventas. Para ello cuenta con la siguiente información:

//Lista de las vendedoras de la empresa
//Lista de ventas. Un array con objetos. Cada objeto representa una venta y tiene las propiedades fecha, nombreVendedora (un String con el nombre), componentes (un array Strings con el nombre de cada componente vendido).
//Lista de precios de los componentes, de la forma (nombre componente, precio).

var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};


//1. Se pide desarrollar las siguientes funciones:

//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,
//que es la suma de los precios de cada componente incluido

const precioMaquina = array=>{
  const sumar = [];

  array.length ? (array.map(a=>local.precios.map(p=>a === p.componente ? sumar.push(p.precio): null))): 0;
  return sumar.reduce((total, suma)=> total + suma)
}
console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]))
console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]))
console.log(precioMaquina(["Monitor ASC 543", "Motherboard MZI"]))
console.log(precioMaquina(["Monitor ASC 543", "Motherboard ASUS 1200"]))
console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1200"]))
console.log('\n')

//---------------------------------------------------------------------------------------------------------------------------

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que
//formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.


const cantidadVentasComponente = componente =>{
  let i = 0
  local.ventas.map(v=> v.componentes.map(c=>componente === c ? i++ : null))
  return i;
}

console.log( cantidadVentasComponente("Monitor GPRS 3000") ); // 3
console.log( cantidadVentasComponente("Motherboard ASUS 1500") );//2
console.log( cantidadVentasComponente("Monitor ASC 543") );
console.log( cantidadVentasComponente("Motherboard ASUS 1200") );
console.log( cantidadVentasComponente("Motherboard MZI") );
console.log( cantidadVentasComponente("HDD Toyiva") );
console.log( cantidadVentasComponente("HDD Wezter Dishital") );
console.log( cantidadVentasComponente("RAM Quinston") );
console.log( cantidadVentasComponente("RAM Quinston Fury") );
console.log('\n')

// //---------------------------------------------------------------------------------------------------------------------------

// //vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre
//de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total
//de las ventas. El importe de una venta es el que indica la función precioMaquina.

const vendedoraDelMes = (mes, anio)=>{

  const vendedoras = [];

  local.vendedoras.map(v=>vendedoras.push({vendedora:v, componentes:[], precio:0}))

  local.ventas.map(v => (v.fecha.getMonth() === mes-1 && v.fecha.getFullYear()) === anio ?

  (vendedoras.map(ven=>ven.vendedora === v.nombreVendedora ? ven.componentes.push(...v.componentes): ''))
  :null)

  let precios = {vendedora: '', precio: 0}

  vendedoras.map(v=> v.componentes.length ? precioMaquina(v.componentes)> precios.precio ? 
  precios= {vendedora:v.vendedora, precio:precioMaquina(v.componentes) } 
  : 0:0)

  return precios.vendedora
}

console.log('vendedoraDelMes')
console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)
console.log(vendedoraDelMes(2, 2019));
console.log('\n')

// //---------------------------------------------------------------------------------------------------------------------------


//ventasMes(mes, anio): Obtener las ventas de un mes.

const ventasMes = (mes, anio) =>{

  const componentesVendidos = [];

  local.ventas.map(v=>(v.fecha.getMonth() === mes-1 && v.fecha.getFullYear()) === anio ? componentesVendidos.push(...v.componentes):'')

  return precioMaquina(componentesVendidos)
}

console.log('ventasMes')
console.log( ventasMes(1, 2019) ); // 1250
console.log( ventasMes(2, 2019) ); // 320
console.log('\n')

// //---------------------------------------------------------------------------------------------------------------------------

// //ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = nombre => {

const venta= []

  local.ventas.map(v=> v.nombreVendedora === nombre ? venta.push(...v.componentes): '')

  return precioMaquina(venta)
}

console.log('ventaVendedora');
console.log( ventasVendedora("Grace") ); // 900
console.log( ventasVendedora("Ada") ); // 670
console.log('\n')

// //---------------------------------------------------------------------------------------------------------------------------

// //componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es 
//el que indica la función cantidadVentasComponente

const componenteMasVendido = () =>{

  const compo = [];

  local.precios.map(p=> compo.push({compo:p.componente, ventas:cantidadVentasComponente(p.componente)}) )

  let masVendido = {ventas:0}

  compo.map(c=>c.ventas> masVendido.ventas ? masVendido = {...c}: '' )

  return masVendido.compo;
}

console.log('componenteMasVendido')
console.log( componenteMasVendido()); // Monitor GPRS 3000
console.log('\n')

// //---------------------------------------------------------------------------------------------------------------------------

// //huboVentas(mes, anio): que indica si hubo ventas en un mes determinado.

const huboVentas = (mes, anio) =>{

  let ventas = false;

  local.ventas.map(v => (v.fecha.getMonth() === mes-1 && v.fecha.getFullYear() === anio ? ventas = true : '' ))

  return ventas;
}

console.log('huboVentas')
console.log( huboVentas(3, 2019) ); // false
console.log( huboVentas(1, 2019) ); // true
console.log( huboVentas(2, 2019) ); // true
console.log('\n')


// //---------------------------------------------------------------------------------------------------------------------------

// //2.Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó.
// //Por ejemplo:
// //{ fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }.
// //Por este cambio, se pide:

// //En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).

local.ventas.forEach(v=>v.sucursal = 'Centro')

// //---------------------------------------------------------------------------------------------------------------------------

// //Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales = ['Centro', 'Caballito'];


// //---------------------------------------------------------------------------------------------------------------------------

// //Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora,
// //componentes, sucursal

// // 12/02/2019, Hedy, [Monitor GPRS 3000, HDD Toyiva], Centro
// // 24/02/2019, Sheryl, [Motherboard ASUS 1500, HDD Wezter Dishital], Caballito
// // 01/02/2019, Ada, [Motherboard MZI, RAM Quinston Fury], Centro
// // 11/02/2019, Grace, [Monitor ASC 543, RAM Quinston], Caballito
// // 15/02/2019, Ada, [Motherboard ASUS 1200, RAM Quinston Fury], Centro
// // 12/02/2019, Hedy, [Motherboard ASUS 1500, HDD Toyiva], Caballito
// // 21/02/2019, Grace, [Motherboard MZI, RAM Quinston], Centro
// // 08/02/2019, Sheryl, [Monitor ASC 543, HDD Wezter Dishital], Centro
// // 16/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston Fury], Centro
// // 27/02/2019, Hedy, [Motherboard ASUS 1200, HDD Toyiva], Caballito
// // 22/02/2019, Grace, [Monitor ASC 543, HDD Wezter Dishital], Centro
// // 05/02/2019, Ada, [Motherboard ASUS 1500, RAM Quinston], Centro
// // 01/02/2019, Grace, [Motherboard MZI, HDD Wezter Dishital], Centro
// // 07/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston], Caballito
// // 14/02/2019, Ada, [Motherboard ASUS 1200, HDD Toyiva], Centro

local.ventas.push({fecha: new Date(2019, 1, 12), nombreVendedora: 'Hedy', componentes: ['Monitor GPRS 3000', 'HDD Toyiva'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 24), nombreVendedora: 'Sheryl', componentes: ['Motherboard ASUS 1500', 'HDD Wezter Dishital'], sucursal: 'Caballito'})
local.ventas.push({fecha: new Date(2019, 1, 01), nombreVendedora: 'Ada', componentes: ['Motherboard MZI', 'RAM Quinston Fury'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 11), nombreVendedora: 'Grace', componentes: ['Monitor ASC 543', 'RAM Quinston'], sucursal: 'Caballito'})
local.ventas.push({fecha: new Date(2019, 1, 15), nombreVendedora: 'Ada', componentes: ['Motherboard ASUS 1200', 'RAM Quinston Fury'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 12), nombreVendedora: 'Hedy', componentes: ['Motherboard ASUS 1500', 'HDD Toyiva'], sucursal: 'Caballito'})
local.ventas.push({fecha: new Date(2019, 1, 21), nombreVendedora: 'Grace', componentes: ['Motherboard MZI', 'RAM Quinston'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 08), nombreVendedora: 'Sheryl', componentes: ['Monitor ASC 543', 'HDD Wezter Dishital'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 16), nombreVendedora: 'Sheryl', componentes: ['Monitor GPRS 3000', 'RAM Quinston Fury'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 27), nombreVendedora: 'Hedy', componentes: ['Motherboard ASUS 1200', 'HDD Toyiva'], sucursal: 'Caballito'})
local.ventas.push({fecha: new Date(2019, 1, 22), nombreVendedora: 'Grace', componentes: ['Monitor ASC 543', 'HDD Wezter Dishital'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 05), nombreVendedora: 'Ada', componentes: ['Motherboard ASUS 1500', 'RAM Quinston'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 01), nombreVendedora: 'Grace', componentes: ['Motherboard MZI', 'HDD Wezter Dishital'], sucursal: 'Centro'})
local.ventas.push({fecha: new Date(2019, 1, 07), nombreVendedora: 'Sheryl', componentes: ['Monitor GPRS 3000', 'RAM Quinston'], sucursal: 'Caballito'})
local.ventas.push({fecha: new Date(2019, 1, 14), nombreVendedora: 'Ada', componentes: ['Motherboard ASUS 1200', 'HDD Toyiva'], sucursal: 'Centro'})


// //---------------------------------------------------------------------------------------------------------------------------

// //Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = sucursal =>{

  const ventas = [];

  local.ventas.map(v=> v.sucursal === sucursal? ventas.push(...v.componentes): '')

  return precioMaquina(ventas)
}

console.log('ventasSucursal')
console.log( ventasSucursal("Centro") ); // 4195
console.log( ventasSucursal("Caballito") ); //
console.log('\n')

// //Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una
// //propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

// I don't know


// //---------------------------------------------------------------------------------------------------------------------------

// //Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes.
// //No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina.

const sucursalDelMes = (mes, anio)=>{

  const sucursal = [];

  local.sucursales.map(v=>sucursal.push({sucursal:v, componentes:[], precio:0}))

  local.ventas.map(v => (v.fecha.getMonth() === mes-1 && v.fecha.getFullYear()) === anio ?

  (sucursal.map(s=>s.sucursal === v.sucursal ? s.componentes.push(...v.componentes): '')):null)

  let precios = {sucursal: '', precio: 0}

  sucursal.map(s=> s.componentes.length ? precioMaquina(s.componentes)> precios.precio ? 
  precios= {sucursal:s.sucursal, precio:precioMaquina(s.componentes) } : 0:0)

  return precios.sucursal
}

console.log('sucursalDelMes')
console.log( sucursalDelMes(1, 2019) ); // "Centro"
console.log( sucursalDelMes(2, 2019) );
console.log('\n')

// //---------------------------------------------------------------------------------------------------------------------------

// //3. Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos crear las siguientes funciones:

// //renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

// function renderPorMes(){

//   var ventasRender = {anio:[local.ventas[0].fecha.getUTCFullYear()],
//                       meses: [{mes:1, nombre: 'enero'}, {mes:2, nombre: 'febrero'}, {mes:3, nombre: 'marzo'}, {mes:4, nombre: 'abril'}, {mes:5, nombre: 'mayo'}, {mes: 6, nombre: 'junio'},
//                       {mes:7, nombre: 'julio'}, {mes:8, nombre: 'agosto'}, {mes:9, nombre: 'septiembre'}, {mes:10, nombre: 'octubre'},{mes:11, nombre: 'noviembre'},{mes:12, nombre: 'diciembre'}]
//                     }


// local.ventas.map(function(cadaVenta){

//   if(cadaVenta.fecha.getFullYear() !== ventasRender.anio[0]){

//     ventasRender.anio.push(cadaVenta.fecha.getFullYear())
//   }

// })

// for(var i = 0; i<ventasRender.anio.length; i++){

//   for(var j=0; j<ventasRender.meses.length; j++){

//   return 'ventas por mes:\n' + ventasRender.meses[j].nombre + ' ' + ventasRender.anio[i] + ': ' + ventasMes(ventasRender.meses[j].mes, ventasRender.anio[i])
//     //acá no logro retornar sin cortar el for
//   }
// }
// }

// console.log( renderPorMes() );
// console.log('\n')

// // Ventas por mes:
// //   Total de enero 2019: 1250,
// //   Total de febrero 2019: 4210



// //---------------------------------------------------------------------------------------------------------------------------

// //renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

// function renderPorSucursal(){

//   var sucursales = [];

//   local.sucursales.map(function(cadaSucursal){

//     sucursales.push({sucursal: cadaSucursal, componentes: []})
//   })

//   for(var i=0; i<sucursales.length; i++){

//     for(var j=0; j<local.ventas.length; j++){

//       if(sucursales[i].sucursal === local.ventas[j].sucursal){

//         for(var k=0; k<local.ventas[j].componentes.length; k++){

//           sucursales[i].componentes.push(local.ventas[j].componentes[k])
//         }

//       }
//     }
//   }
//   var porSucursal =['ventas por sucursal:\n'];

//   for(var i=0; i<sucursales.length; i++){

//     porSucursal.push('Total de ' + sucursales[i].sucursal + ': ' +  precioMaquina(sucursales[i].componentes)+ '\n')

//   }
// return porSucursal
// }
// //Como no podía retornar dentro de un for, acá retorné desde un array, pero tampoco queda bien.
// console.log( renderPorSucursal() );

// // Ventas por sucursal:
// //   Total de Centro: 4195
// //   Total de Caballito: 1265


// //---------------------------------------------------------------------------------------------------------------------------

// //render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó

// function vendedora(){

//   var ventasVendedora = [];

//   for(var i=0; i<local.vendedoras.length; i++){
//       ventasVendedora[i]={nombre: local.vendedoras[i], componentes: [] }
//   }

//   for(var i=0; i<local.ventas.length; i++){

//           for(j=0; j<ventasVendedora.length; j++){

//               if(local.ventas[i].nombreVendedora === ventasVendedora[j].nombre){

//                   ventasVendedora[j].componentes.push(precioMaquina(local.ventas[i].componentes))
//               }
//           }
//       }

//   for(var i=0; i<ventasVendedora.length; i++){

//     if(ventasVendedora[i].componentes.length){

//           ventasVendedora[i].componentes = ventasVendedora[i].componentes.reduce(function(total,suma){
//             return total + suma

//       })

//     }

//   }

//   var valorMaximo = 0;
//   var vendedora ='';

//   for(var i=0; i<ventasVendedora.length; i++){

//     if(valorMaximo< ventasVendedora[i].componentes){

//       valorMaximo = ventasVendedora[i].componentes;

//       vendedora = ventasVendedora[i].nombre;

//     }
//   }
// return vendedora

// }

// function render(){

// return 'Reporte ' + '\nVentas por mes: \n' + renderPorMes() + '\n\n ventas por sucursal: ' + renderPorSucursal() + '\n Producto estrella: ' + componenteMasVendido () + '\n\n Vendedora que más ingresos generó: ' + vendedora()
// }


// console.log( render() );
// // Reporte
// // Ventas por mes:
// //   Total de enero 2019: 1250
// //   Total de febrero 2019: 4210
// // Ventas por sucursal:
// //   Total de Centro: 4195
// //   Total de Caballito: 1265
// // Producto estrella: Monitor GPRS 3000
// // Vendedora que más ingresos generó: Grace
