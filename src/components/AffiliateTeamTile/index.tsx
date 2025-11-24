import type { AffiliateTeamTileData } from "../../types/game";
import styles from "./AffiliateTeamTile.module.css";

interface Props {
  tile: AffiliateTeamTileData;
}

export const AffiliateTeamTile = ({ tile }: Props) => {
  const gameStateClass = tile.gameState?.toLowerCase() || "scheduled";

  return (
    <div className={styles.tile}>
      <div className={styles.leagueContainer}>
        <span className={styles.league}>{tile.sportName}</span>
      </div>

      <div className={styles.teamHeader}>
        <div className={styles.teamInfo}>
          <p className={styles.teamName}>
            <strong>{tile.teamName}</strong> {tile.teamScore && tile.teamScore}
          </p>
        </div>
      </div>

      <div className={styles.opponentStatus}>
        {tile.hasGame ? (
          <>
            <span className={styles.vsText}>{tile.scoreType}</span>
            <strong className={styles.opponentName}>{tile.opponentName} {tile.opponentScore}</strong>
            {tile.opponentParent && (
              <span className={styles.opponentParent}>
                ({tile.opponentParent})
              </span>
            )}
          </>
        ) : (
          <span className={styles.noGameText}>— No Game</span>
        )}
      </div>

      {tile.hasGame && (
        <div className={styles.gameDetails}>
          <div className={styles.timeAndVenue}>
            <div className={styles.timeLabel}>
              <strong>Time:</strong> <span className={styles.gameTime}>{tile.gameTime}</span>
            </div>
            <div className={styles.venueLabel}>
              <strong>Location:</strong> <span className={styles.venue}>{tile.venue}</span>
            </div>
          </div>

          <div className={styles.gameStateContainer}>
            <div className={styles.timeAndVenue}>
              <strong>Game State:</strong>
              <span className={`${styles.gameState} ${styles[gameStateClass]}`}>
                {tile.gameState}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
