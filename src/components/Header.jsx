import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  presupuesto,
  setPrespuesto,
  setPresupuestoValido,
  presupuestoValido,
  setRestante,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {presupuestoValido ? (
        <ControlPresupuesto
          presupuesto={presupuesto}
          gastos={gastos}
          setGastos={setGastos}
          setPrespuesto={setPrespuesto}
          setPresupuestoValido={setPresupuestoValido}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPrespuesto={setPrespuesto}
          setPresupuestoValido={setPresupuestoValido}
          setRestante={setRestante}
        />
      )}
    </header>
  );
};

export default Header;
