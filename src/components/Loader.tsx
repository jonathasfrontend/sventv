import { Loader2 } from "lucide-react"

function Loader(){
  return(
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className="text-blue-600 animate-spin" />
    </div>
  )
}

export default Loader