import { ChartComponent } from "./components/chartComponent";
import { ButtonOutline } from "./components/Button";
import piIcon from "./assets/piIcon.svg";
import cddIcon from "./assets/cddLogo.png";

function App() {
  return (
    <>
    
      <div className="justify-center flex w-full min-h-screen pt-6 px-2 gap-2">
        <div className="size-[1300px] mb-0 overflow-hidden max-h-screen">
          <ChartComponent/>
        </div>
       
        <div className="flex flex-col size-32 space-y-4">
          
          <img src={piIcon} className="w-full" alt="RaspberryPiLogo" />
          <img src={cddIcon} className="w-full" alt="ColeDDLogo" />
          <ButtonOutline></ButtonOutline>
        </div>

  
  
        
      </div>

      
    </>
  );
}

export default App;
