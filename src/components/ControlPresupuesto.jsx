import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import { Helper } from "../helpers"


const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPrespuesto,setPresupuestoValido}) => {

    const [disponible,setDisponible] = useState('0');
    const [gastado,setGastado] = useState('0');
    const [porcentaje, setPorcentaje] = useState(0);

    
    useEffect(() => {
      const totalGastado = gastos.reduce( (total,gasto) => gasto.valor + total,0);
      const totalDisponible = presupuesto - totalGastado;
      setDisponible(totalDisponible);
      setGastado(totalGastado);
      setTimeout(() => {
          setPorcentaje(Helper.hallarPorcentaje(totalGastado,presupuesto));
      }, 500);
    }, [gastos]);

    
    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar el presupuesto?');
        if (resultado){
            setGastos([]);
            setPrespuesto(0);
            setPresupuestoValido(false);
        } 
        
    }


    const colorPorcentaje = porcentaje > 100 ? '#b82d2d' : (porcentaje > 70 && porcentaje < 100) ? '#e7a52b' : '#3b82f6';
  
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathColor: colorPorcentaje,
                    trailColor: '#e4e4e4',
                    textColor: colorPorcentaje
                })}
            />
        </div>
        <div className="contenido-presupuesto">
            <button 
                className="reset-app" 
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {Helper.formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible <= 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {Helper.formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {Helper.formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
};

export default ControlPresupuesto;