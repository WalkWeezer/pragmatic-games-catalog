import type { Game } from '@/types/game'
import styles from './GameCard.module.scss'

const getImageUrl = (gameId: string) =>
  `https://bsw-dk1.pragmaticplay.net/game_pic/square/200/${gameId}.png`

interface GameCardProps {
  game: Game
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={getImageUrl(game.gameID)}
          alt={game.gameName}
          loading="lazy"
          width={200}
          height={200}
        />
      </div>
      <h3 className={styles.title} title={game.gameName}>
        {game.gameName}
      </h3>
    </article>
  )
}
