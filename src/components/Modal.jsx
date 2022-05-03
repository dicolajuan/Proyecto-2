import { useEffect, useState } from "react";
import ImagenCerrarModal from '../img/cerrar.svg';

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar
  }) => {

    const [nombre,setNombre] = useState('');
    const [valor,setValor] = useState('');
    const [categoria,setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    
    const editarGasto = Object.keys(gastoEditar).length > 0;

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre);
            setValor(gastoEditar.valor);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [])
    

    const handleClickCerrarModal = () => {
        
        setAnimarModal(false);
        
        setGastoEditar({});
        
        setTimeout(() => {
            setModal(false);
        }, 300);
    }

    const handleChangeNombre = (e) => {
        setNombre(e.target.value);
    }
    const handleChangeValor = (e) => {
        setValor(Number(e.target.value));
    }
    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(![nombre,valor,categoria].includes('')){
            guardarGasto({nombre, valor, categoria, id, fecha});
        }

        limpiarIngreso();

        handleClickCerrarModal();

    }

    

    const limpiarIngreso = () => {
        setNombre('');
        setValor(0);
        setCategoria('');
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={ImagenCerrarModal} 
                alt="Cerrar Modal" 
                onClick={handleClickCerrarModal}
            />
        </div>

        <form className={`formulario ${animarModal && 'animar'}`} onSubmit={handleSubmit} >
            <legend> { editarGasto ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    id="nombre"
                    type="text" 
                    placeholder="Anade el nombre del gasto"
                    value={nombre}
                    onChange={handleChangeNombre}
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="valor">Valor</label>

                <input 
                    id="valor"
                    type="number" 
                    placeholder="Añade el valor del gasto"
                    min={1}
                    value={valor}
                    onChange={handleChangeValor}
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>

                <select 
                    name="categoria" 
                    id="categoria" 
                    value={categoria} 
                    onChange={handleChangeCategoria}
                    required
                >
                    <option value=""> --- Seleccione una opcion --- </option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={ editarGasto ? 'Editar Gasto' : "Anadir Gasto" }
            />

        </form>

    </div>
  )
};

export default Modal;