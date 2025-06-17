import type React from "react"

interface props{
    isActive: boolean
}


const IsActiveStatus:React.FC<props> = ({isActive})=>{
    return(
        <>
            {isActive ? (
                <div style={{background: 'green', width: '20px', height: '20px', borderRadius: 100}}>

                </div>
            ):(
                <div style={{background: 'red', width: '20px', height: '20px', borderRadius: 100}}>

                </div>
            )}
        </>
    )
}


export default IsActiveStatus