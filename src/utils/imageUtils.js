import { FaLungs } from "react-icons/fa"; // sputum
import { PiFlaskFill } from "react-icons/pi"; //other
import { FaMicroscope } from "react-icons/fa"; //pathological samples
import { PiEyedropperSampleFill } from "react-icons/pi"; //blood
import { FaGlassWater, FaL } from "react-icons/fa6"; //urine
import { IoWaterOutline } from "react-icons/io5"; //body fluids
import { FaPoop } from "react-icons/fa"; //stool
import { PiNeedleBold } from "react-icons/pi"; //discharge swab
import { BiPlusMedical } from "react-icons/bi"; //medic



export const iconAssigner = (sampleType,size,type) => {
    let color = type == "test" ? "#0d5d73" : "white"
    switch(sampleType) {
        case "Blood":
            return <PiEyedropperSampleFill color={color} size={size} /> //blood
        case "Urine":
            return <FaGlassWater color={color} size={size}/> //urine
        case "Body Fluids":
            return <IoWaterOutline color={color} size={size}/> //body fluids
        case "Stool":
            return <FaPoop color={color} size={size}/> //stool
        case "Discharge":
            return <PiNeedleBold color={color} size={size}/> //discharge swab
        case "Pathological Sample": 
            return <FaMicroscope color={color} size={size}/> //pathological sample 
        case "Sputum": 
            return <FaLungs color={color} size={size}/> //sputum
        case "facility":
            // return <BiPlusMedical color={color} size={size} />
            return <div className={`flex items-center justify-center h-${size} w-auto`}><img className="h-max-full h-full" src='/medical_cross_1.png'/></div>
        default:
            return <PiFlaskFill color={color} size={size}/>
    }
}