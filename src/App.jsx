import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import Filtros from './components/Filtros';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { Helper } from './helpers';
import IconoNuevogasto from './img/nuevo-gasto.svg';

function App() {

  // Declaracion de States
  const [presupuesto,setPrespuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  const [restante,setRestante] = useState(0);
  const [presupuestoValido,setPresupuestoValido] = useState(false);
  const [modal,setModal] = useState(false);
  const [animarModal,setAnimarModal] = useState(false);
  const [gastoEditar,setGastoEditar] = useState({});
  const [filtro,setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  // UseEffects
  useEffect(() => {
    
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);
      
      setTimeout(() => {
        setAnimarModal(true);
      }, 300);
    }

  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto ?? 0);
  }, [presupuesto]);
  
  useEffect(() => {
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if(filtro){
      const arrayGastosFiltrados = gastos.filter(gasto => gasto.categoria == filtro);
      setGastosFiltrados(arrayGastosFiltrados);
    }
  }, [filtro]);
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    presupuestoLS > 0 && setPresupuestoValido(true);
  }, []);

  // Funciones

  const handleClickNuevoGasto = () => {
    setModal(true);
    
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  const guardarGasto = gasto => {
    
    if(gasto.id) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = Helper.generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto]);
    }
    setAnimarModal(false);
    
    setTimeout(() => {
      setModal(false);
    }, 300);
  }

  return (
    <div className={modal ? 'fijar' : null}>
      <Header 
        presupuesto={presupuesto} 
        setPrespuesto={setPrespuesto}
        setPresupuestoValido={setPresupuestoValido}
        presupuestoValido={presupuestoValido}
        setRestante={setRestante}
        restante={restante}
        gastos={gastos}
        setGastos={setGastos}
      />

      { presupuestoValido && 
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos 
              gastos={gastos} 
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevogasto} 
              alt="Icono Nuevo Gasto" 
              onClick={handleClickNuevoGasto}
              />
          </div>
        </>
      }

      {modal &&  
          <Modal 
            setModal={setModal} 
            animarModal={animarModal} 
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
      }

    </div>
  )
};

export default App;
