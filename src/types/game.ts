export interface AffiliateTeamTileData {
  sportName: string;
  teamId: number;
  teamName: string;
  opponentName?: string;
  opponentParent?: string;
  gameState?: string;
  teamScore?: number;
  opponentScore?: number;
  scoreType?: string;
  venue?: string;
  gameTime?: string;
  hasGame: boolean;
}
