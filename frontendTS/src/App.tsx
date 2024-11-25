import { ChartComponent } from "./components/chartComponent"
import  Icon  from "./assets/piIcon.svg"

function App() {

  return (
    <>
      <div className="pt-4 max-w-full mx-4 size-[80%] justify-start flex">
        <div className="container rounded-3xl">
        <ChartComponent/> 
        </div>
        <div id="logos" className="size-36">
            <img src={Icon} alt="" />
          </div>
      </div>
    </>
  )
}

export default App
