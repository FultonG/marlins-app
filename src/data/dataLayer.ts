import type { AffiliateTeamTileData } from "../types/game";
import { getGameStatsByDate, getTeamInfo } from "../api";

const affiliateTeamIds = [
  146, 385, 467, 564, 554, 619, 3276, 4124, 3277, 479, 2127,
];

interface Game {
  gamePk: number;
  gameDate: string;
  status: { detailedState: string };
  teams: {
    home: { team: { id: number; name: string }; score: number };
    away: { team: { id: number; name: string }; score: number };
  };
  venue: { name: string };
}

export const fetchTeamInfo = async (teamId: number) => {
  const teamInfo = await getTeamInfo(teamId);
  return {
    teamId,
    teamName: teamInfo.teamName,
    sportName: teamInfo.sportName || "Unknown Sport",
  };
};

export const fetchGamesForDate = async (date: string) => {
  const schedule = await getGameStatsByDate({ date });
  return schedule.dates[0]?.games || [];
};

export const fetchGameDetails = async (teamId: number, date: string) => {
  const games = await fetchGamesForDate(date);
  const game = games.find(
    (g: Game) =>
      g.teams.home.team.id === teamId || g.teams.away.team.id === teamId
  );
  return game || null;
};

export const getAffiliateGames = async (
  date: string
): Promise<AffiliateTeamTileData[]> => {
  const gameDetailsPromises = affiliateTeamIds.map(async (teamId) => {
    const teamInfo = await fetchTeamInfo(teamId);
    const game = await fetchGameDetails(teamId, date);
    
    if (!game) {
      return {
        ...teamInfo,
        hasGame: false,
      };
    }

    const isHome = game.teams.home.team.id === teamId;
    const team = isHome ? game.teams.home : game.teams.away;
    const opponent = isHome ? game.teams.away : game.teams.home;

    const opponentInfo = await getTeamInfo(opponent.team.id);

    const teamScore = team.score;
    const opponentScore = opponent.score;

    const scoreType = isHome ? "vs" : "@";


    return {
      ...teamInfo,
      opponentName: opponent.team.name,
      opponentParent: opponentInfo.parentOrgName,
      gameState: game.status.detailedState,
      teamScore,
      opponentScore,
      scoreType,
      venue: game.venue.name,
      gameTime: new Date(game.gameDate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      hasGame: true,
    } as AffiliateTeamTileData;
  });

  return Promise.all(gameDetailsPromises);
};
