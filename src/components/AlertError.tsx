interface props{
    msg: string
}

const AlertError:React.FC<props> = ({msg})=>{
    return(
        <div style={{background: '#F6AFAF', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
            <p style={{color: 'black'}}>{msg}</p>
        </div>
    )
}


export default AlertError