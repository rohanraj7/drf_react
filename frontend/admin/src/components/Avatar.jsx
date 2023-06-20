import React from "react";
import { url } from "../constants/Constants";

function Avatar({size,urls}){
    let width = 'w-12'
    let hight = 'h-12'

    if (size === 'large'){
        width = 'w-36'
        hight = 'h-36'
    }

    if (size === 'small'){
        width = 'w-5'
        hight = 'h-5'
    }

    if (size === 'medium'){
        width = 'w-8'
        hight = 'h-8'
    }

    return(
        <>
         <div className={`${width} ${hight} rounded-full overflow-hidden`}>
            {urls ? <img className="object-fill" src={url +urls} alt="None"></img> : <img className="object-fill"  alt="img"></img>}
        </div>
        </>
    )
}

export default Avatar