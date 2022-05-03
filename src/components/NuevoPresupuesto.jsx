import { useState } from "react";
import AlertMessage from "./shared/AlertMessage";

const NuevoPresupuesto = ({presupuesto,setPrespuesto,setPresupuestoValido,setRestante}) => {

    const [error,setError] = useState(false);

    const handleChange = (e) => {
        // console.log(e.target.value);
        setPrespuesto(Number(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(presupuesto <= 0) {
            setError(true);
            return;
        }

        setError(false);
        setPresupuestoValido(true);
        setRestante(presupuesto);
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    
                    <input 
                        type="number" 
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onClick={(e) => e.target.value = ''}
                        onChange={handleChange}
                        min={0}
                    />
                    {error && <AlertMessage mensaje='El presupuesto es invalido' />}

                    <input type="submit" value="Añadir" />

                </div>
            </form>
        </div>
    )
}

export default NuevoPresupuesto