import styles from './AlertError.module.css'

interface props{
    msg: string
}

const AlertError:React.FC<props> = ({msg})=>{
    return(
        <div className={styles.container}>
            <p style={{color: 'black'}}>{msg}</p>
        </div>
    )
}


export default AlertError