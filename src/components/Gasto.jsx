import React from 'react'
import { Helper } from '../helpers';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

const diccionarioIconos = {
  ahorro: IconoAhorro,
  casa: IconoCasa,
  comida: IconoComida,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
};

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {nombre, valor, categoria, id, fecha} = gasto;


    const handleEditarGasto = () => {
      setGastoEditar(gasto);
    }

    const handleEliminarGasto = () => {
      eliminarGasto(id);
    };


    const leadingActions = () => (
      <LeadingActions>
        <SwipeAction onClick={handleEditarGasto}>
          Editar
        </SwipeAction>
      </LeadingActions>
    );

    const trailingActions = () => (
      <TrailingActions>
        <SwipeAction 
          onClick={handleEliminarGasto}
          destructive={true}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );

    

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className='gasto sombra'>
            <div className='contenido-gasto'>
              <img src={diccionarioIconos[categoria]} alt="Icono Categoria" />
              <div className='descripcion-gasto'>
                <p className='categoria'>{categoria}</p>
                  <p className='nombre-gasto'>{nombre}</p>
                  <p className='fecha-gasto'>
                    Fecha: {' '}
                    <span>{Helper.formatearFecha(fecha)}</span>
                  </p>
                </div>
            </div>
            <p className='cantidad-gasto'>${valor}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
};

export default Gasto