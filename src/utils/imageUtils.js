import { FaLungs } from "react-icons/fa"; // sputum
import { PiFlaskFill } from "react-icons/pi"; //other
import { FaMicroscope } from "react-icons/fa"; //pathological samples
import { PiEyedropperSampleFill } from "react-icons/pi"; //blood
import { FaGlassWater, FaL } from "react-icons/fa6"; //urine
import { IoWaterOutline } from "react-icons/io5"; //body fluids
import { FaPoop } from "react-icons/fa"; //stool
import { PiNeedleBold } from "react-icons/pi"; //discharge swab
import { BiPlusMedical } from "react-icons/bi"; //medic



export const iconAssigner = (id,size,type) => {
    let color = type == "test" ? "#0d5d73" : "white"
    switch(id) {
        case "1":
            return <PiEyedropperSampleFill color={color} size={size} /> //blood
        case "2":
            return <FaGlassWater color={color} size={size}/> //urine
        case "3":
            return <IoWaterOutline color={color} size={size}/> //body fluids
        case "4":
            return <FaPoop color={color} size={size}/> //stool
        case "5":
            return <PiNeedleBold color={color} size={size}/> //discharge swab
        case "6": 
            return <FaMicroscope color={color} size={size}/> //pathological sample 
        case "7": 
            return <FaLungs color={color} size={size}/> //sputum
        case "facility":
            // return <BiPlusMedical color={color} size={size} />
            return <div className="flex items-center justify-center h-32 w-auto"><img className="h-max-full" src='/medical_cross_1.png'/></div>
        default:
            return <PiFlaskFill color={color} size={size}/>
    }
}