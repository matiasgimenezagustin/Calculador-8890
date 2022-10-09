const listaDePorcentajePorAntiguedad = () =>{
    const listaDePorcentajes = []
    let porcentaje = 0
    for(let i = 0; i <= 50; i++){
        if(i === 0){
            listaDePorcentajes.push( porcentaje )
        }else if( porcentaje < 20){
            porcentaje += 2
            listaDePorcentajes.push( porcentaje )
        }else if( porcentaje >= 20 && porcentaje < 50){
            porcentaje += 3
            listaDePorcentajes.push( porcentaje )
        }else if( porcentaje >= 50){
            porcentaje +=4
            listaDePorcentajes.push( porcentaje )
        }
    }
    return listaDePorcentajes
}
const tablas = {
    categorias: {
        categoria1: 105708,
        categoria2: 101014,
        categoria3: 97899,
        categoria4: 94808,
        categoria5: 93732,
    },
    porcentajePorAntiguedad: listaDePorcentajePorAntiguedad(),

}
const calcularBap = (sueldoBase, bap) =>{
    if(bap === "true"){
        return sueldoBase * 0.1
    }else{
        return 0
    }
}

const calcularBonificacion = (sueldoBase, cantidad, bonificacion) =>{
    if( cantidad === 0 || cantidad === "" || isNaN(cantidad)){
        return 0 
    }else{
        return sueldoBase * bonificacion * cantidad
    }
}


const calcularPorHoras = (sueldoBasico, horas) =>{
    if(horas === 45){
        return sueldoBasico
    }else{
        return (sueldoBasico * horas) / 45
    }
}

const calcularAntiguedad = (sueldo, antiguedad) =>{
    return (sueldo * antiguedad) / 100
}

const calcularSueldo = (sueldoBase, resultado) =>{
    const { porcentajePorAntiguedad } = tablas
    const {antiguedad, horas, bap, titulo, certificaciones, guarderia, tareasDeRiesgo, vivienda, desayuno, almuerzo, merienda, cena} = resultado

    let sueldo = calcularPorHoras(sueldoBase, horas)

    let sueldoParaDescuentos = calcularPorHoras(sueldoBase, horas) + calcularAntiguedad(sueldo, porcentajePorAntiguedad[antiguedad]) + calcularBap(sueldo, bap)
    
    return sueldo + calcularAntiguedad(sueldo, porcentajePorAntiguedad[antiguedad]) +  calcularBap(sueldo, bap) + calcularBonificacion(sueldo, titulo, 0.07) + calcularBonificacion(sueldo, certificaciones, 0.08 ) + calcularBonificacion(sueldo, guarderia, 0.15) + calcularBonificacion(sueldo, tareasDeRiesgo, 0.15) - calcularBonificacion(sueldoParaDescuentos, vivienda, 0.02) - calcularBonificacion(sueldoParaDescuentos, desayuno, 0.01) - calcularBonificacion(sueldoParaDescuentos, almuerzo, 0.03) - calcularBonificacion(sueldoParaDescuentos, merienda, 0.01) - calcularBonificacion(sueldoParaDescuentos, cena, 0.03)

}



const calcularSueldoPorCategoria = ( resultado ) => {
    const {categoria} = resultado
    const {categorias} = tablas
    switch(categoria){
        case "c1":
            return calcularSueldo(categorias.categoria1, resultado)
        case "c2":
            return calcularSueldo(categorias.categoria2, resultado)
        case "c3":
            return calcularSueldo(categorias.categoria3, resultado)
        case "c4":
            return calcularSueldo(categorias.categoria4, resultado)
        case "c5":
            return calcularSueldo(categorias.categoria5, resultado)
    }
}
const calcularJubilacion = ( sueldoBruto ) =>{
    return sueldoBruto * 0.11
}
const calcularLey19032 = ( sueldoBruto ) =>{
    return sueldoBruto * 0.03
}
const calcularObraSocial = ( sueldoBruto ) =>{
    return sueldoBruto * 0.03
}
const calcularAporteSolidario = ( sueldoBruto ) =>{
    return sueldoBruto * 0.01
}

const formulario8890 = document.getElementById("formulario-8890")
const contenedorResultado = document.getElementById("resultado")

formulario8890.addEventListener("submit", (e) =>{
    const {codigoDeCargo, antiguedad, horasTrabajadas, bap, tituloSecundario, certificaciones, guarderia, tareasDeRiesgo, vivienda, desayuno, almuerzo, merienda, cena} = formulario8890

    e.preventDefault()

    let sueldoBruto = parseInt(calcularSueldoPorCategoria({ 
        categoria: codigoDeCargo.value,
        antiguedad: parseFloat(antiguedad.value),
        horas: parseFloat(horasTrabajadas.value),
        bap: bap.value,
        titulo: parseFloat(tituloSecundario.value),
        certificaciones: parseFloat(certificaciones.value),
        guarderia: parseFloat(guarderia.value),
        tareasDeRiesgo: parseFloat(tareasDeRiesgo.value),
        vivienda: parseFloat(vivienda.value),
        desyuno: parseFloat(desayuno.value),
        almuerzo: parseFloat(almuerzo.value),
        merienda: parseFloat(merienda.value),
        cena: parseFloat(cena.value)
    }))
    let sueldoNeto = sueldoBruto - calcularJubilacion(sueldoBruto) - calcularLey19032(sueldoBruto) - calcularObraSocial(sueldoBruto) - calcularAporteSolidario(sueldoBruto);
    contenedorResultado.innerHTML = `<div>
                                        <h3>Sueldo Bruto: </h3>
                                        <p>${sueldoBruto}</p>
                                    </div>
                                    <div>
                                        <h3>Sueldo Neto: </h3>
                                        <p>${sueldoNeto}</p>
                                    </div>`
    
})










