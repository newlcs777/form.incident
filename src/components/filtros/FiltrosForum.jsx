import InputWrapper from "../inputs/InputWrapper";
import SelectUnidade from "../select/SelectUnidade";

export default function FiltrosForum({ unidade, setUnidade }) {
  return (
    <div
    className="
      w-full max-w-xl mx-auto bg-white
      p-4 rounded-lg shadow-sm 
      border border-gray-200
      mb-8
    "
  >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
  Filtrar Incidentes
</h3>


      <InputWrapper label="Unidade">
        <SelectUnidade
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        />
      </InputWrapper>
    </div>
  );
}
