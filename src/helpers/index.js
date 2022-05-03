export const Helper = {

    formatearCantidad : (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    },

    generarId : () => {
        let fecha = Date.now().toString(36);
        let random = Math.random().toString(36).substring(2);
        return fecha + random;
    },

    formatearFecha : fecha => {
        const fechaNueva = new Date(fecha);
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        };
        return fechaNueva.toLocaleDateString('es-ES',opciones);
    },

    hallarPorcentaje: (numA, numB) => {
        return (numA / numB) * 100;
    }

}

