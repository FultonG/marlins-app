import { useState } from "react";
import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { getAffiliateGames } from "./data/dataLayer";
import { AffiliateTeamTile } from "./components/AffiliateTeamTile";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";
import styles from "./App.module.css";

const ErrorMessage = ({ message }: { message: string }) => (
  <p className={styles.errorMessage}>{message}</p>
);

const App = () => {
  const [date, setDate] = useState(DateTime.now());

  const {
    data: tiles,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["date", date.toISODate()],
    queryFn: () => getAffiliateGames(date.toISODate()!),
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = DateTime.fromISO(e.target.value);
    if (newDate.isValid) setDate(newDate);
  };

  return (
    <div className={styles.appContainer}>
      <h1>Schedule and Results</h1>

      <input
        type="date"
        value={date.toISODate()!}
        onChange={handleDateChange}
        className={styles.dateInput}
      />

      {error && <ErrorMessage message={`Error: ${(error as Error).message}`} />}

      <div className={styles.tilesContainer}>
        {isFetching ? (
          <SkeletonLoader />
        ) : (
          tiles?.map((tile) => (
            <AffiliateTeamTile key={tile.teamId} tile={tile} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
