import { PROVIDER_NAME } from '@/shared/config/constants'
import styles from './ProviderHeader.module.scss'
import pragmaticPlayLogo from '@/assets/PragmaticPlay.svg'

export const ProviderHeader = () => {
  return (
    <div className={styles.header}>
      <img
        className={styles.icon}
        src={pragmaticPlayLogo}
        alt=""
        aria-hidden="true"
      />
      <h2 className={styles.title}>{PROVIDER_NAME}</h2>
    </div>
  )
}
