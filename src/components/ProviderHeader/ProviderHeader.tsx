import pragmaticPlayLogo from '@/assets/PragmaticPlay.svg'
import styles from './ProviderHeader.module.scss'

export const ProviderHeader = () => {
  return (
    <div className={styles.header}>
      <img className={styles.icon} src={pragmaticPlayLogo} alt="" />
      <h2 className={styles.title}>Pragmatic Play</h2>
    </div>
  )
}
