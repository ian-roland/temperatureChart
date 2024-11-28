import { ChartComponent } from "./components/chartComponent";
import piIcon from "./assets/piIcon.svg";
import cddIcon from "./assets/cddLogo.png";

function App() {
  return (
    <>
      <div className="flex justify-center">
        <div className="size-[1300px] mb-0 overflow-hidden max-h-screen pt-6 px-4">
          <ChartComponent />

          
        </div>
        <div id="logos" className="w-36 pt-4">
            <img src={piIcon} alt="RaspberryPiLogo" />
            <img src={cddIcon} alt="ColeDDLogo" />
          </div>
      </div>
    </>
  );
}

export default App;
