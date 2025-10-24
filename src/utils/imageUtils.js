import { FaLungs } from "react-icons/fa"; // sputum
import { PiFlaskFill } from "react-icons/pi"; //other
import { FaMicroscope } from "react-icons/fa"; //pathological samples
import { PiEyedropperSampleFill } from "react-icons/pi"; //blood
import { FaGlassWater } from "react-icons/fa6"; //urine
import { IoWaterOutline } from "react-icons/io5"; //body fluids
import { FaPoop } from "react-icons/fa"; //stool
import { PiNeedleBold } from "react-icons/pi"; //discharge swab
import { BiPlusMedical } from "react-icons/bi"; //medic



export const iconAssigner = (id,size) => {
    switch(id) {
        case "1":
            return <FaLungs color="white" size={size} />
        case "2":
            return <FaGlassWater color="white" size={size}/>
        case "3":
            return <FaMicroscope color="white" size={size}/>
        case "4":
            return <PiEyedropperSampleFill color="white" size={size}/>
        case "5":
            return <PiNeedleBold color="white" size={size}/>
        case "6": 
            return <IoWaterOutline color="white" size={size}/>
        case "7": 
            return <FaPoop color="white" size={size}/>
        case "facility":
            return <BiPlusMedical color="white" size={size} />
        default:
            return <PiFlaskFill color="white" size={size}/>
    }
}