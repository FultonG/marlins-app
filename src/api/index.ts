import scheduleClient, { baseURL } from "./client";
import axios from "axios";

interface GetGameStatsByDate {
  date: string;
}

export const getGameStatsByDate = async (
  params: GetGameStatsByDate
) => {
  try {
    const response = await scheduleClient.get("/schedule", {
      params,
    });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverMessage =
        (err.response?.data as { message?: string })?.message;
      throw new Error(serverMessage ?? err.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

const teamInfoCache: Record<
  number,
  { teamName: string; parentOrgName?: string; sportName?: string }
> = {};

export interface TeamInfo {
  teamName: string;
  parentOrgName?: string;
  sportName?: string;
}

export const getTeamInfo = async (teamId: number): Promise<TeamInfo> => {
  if (teamInfoCache[teamId]) return teamInfoCache[teamId];

  try {
    const res = await axios.get(`${baseURL}/teams/${teamId}`);
    const teamData = res.data.teams[0];
    const teamInfo: TeamInfo = {
      teamName: teamData?.name || `Team ${teamId}`,
      parentOrgName: teamData?.parentOrgName,
      sportName: teamData?.sport?.name,
    };
    teamInfoCache[teamId] = teamInfo;
    return teamInfo;
  } catch (err) {
    console.error(`Failed to fetch team info for team ${teamId}`, err);
    return { teamName: `Team ${teamId}` };
  }
};