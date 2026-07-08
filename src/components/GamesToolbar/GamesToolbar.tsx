import type { FormEvent } from 'react'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  applySearch,
  setGameTypeId,
  setSearchQuery,
} from '@/store/filtersSlice'
import type { Game } from '@/types/game'
import searchVectorIcon from '@/assets/Vector.svg'
import styles from './GamesToolbar.module.scss'

interface GamesToolbarProps {
  games: Game[]
}

export const GamesToolbar = ({ games }: GamesToolbarProps) => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.filters.searchQuery)
  const gameTypeId = useAppSelector((state) => state.filters.gameTypeId)

  const gameTypeOptions = useMemo(() => {
    const types = Array.from(new Set(games.map((game) => game.gameTypeID))).sort()

    return ['all', ...types]
  }, [games])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(applySearch())
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.block}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="game-type">
            Game Type
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="game-type"
              className={styles.select}
              value={gameTypeId}
              onChange={(event) =>
                dispatch(setGameTypeId(event.target.value))
              }
            >
              {gameTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All' : type}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} />
          </div>
        </div>
      </div>

      <div className={`${styles.block} ${styles.searchBlock}`}>
        <form className={styles.searchGroup} onSubmit={handleSearchSubmit}>
          <div className={`${styles.field} ${styles.searchField}`}>
            <label className={styles.label} htmlFor="search">
              Search
            </label>
            <div className={styles.searchControls}>
              <div className={styles.inputWrapper}>
                <img
                  className={styles.searchIcon}
                  src={searchVectorIcon}
                  alt=""
                />
                <input
                  id="search"
                  className={styles.input}
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) =>
                    dispatch(setSearchQuery(event.target.value))
                  }
                />
              </div>
              <button className={styles.searchButton} type="submit">
                SEARCH
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
