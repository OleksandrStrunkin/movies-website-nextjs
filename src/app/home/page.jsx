import styles from './HomePage.module.css'
import Image from 'next/image'
import main from '../../../public/image/main.jpeg'


export default function HomePage (){
    return (
   <>
   <Image src={main} alt='main' className={styles.main}/>
   </>
    )
}