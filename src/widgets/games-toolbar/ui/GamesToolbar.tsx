import type { FormEvent } from 'react'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  applySearch,
  selectGameTypeId,
  selectSearchQuery,
  setGameTypeId,
  setSearchQuery,
} from '@/features/filters/model/filtersSlice'
import type { Game } from '@/types/game'
import styles from './GamesToolbar.module.scss'
import searchVectorIcon from '@/assets/Vector.svg'

interface GamesToolbarProps {
  games: Game[]
}

export const GamesToolbar = ({ games }: GamesToolbarProps) => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)
  const gameTypeId = useAppSelector(selectGameTypeId)

  const gameTypeOptions = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(games.map((game) => game.gameTypeID)),
    ).sort()

    return [
      { value: 'all', label: 'All' },
      ...uniqueTypes.map((type) => ({ value: type, label: type })),
    ]
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
              {gameTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden="true" />
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
                  aria-hidden="true"
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
