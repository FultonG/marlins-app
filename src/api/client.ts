import axios from "axios";
import qs from "qs";

export const baseURL = "https://statsapi.mlb.com/api/v1";

const defaultParams = {
  teamId: [146, 385, 467, 564, 554, 619, 3276, 4124, 3277, 479, 2127],
  sportId: [1, 21, 16, 11, 13, 16, 21, 12, 21, 14, 16]
};

const scheduleClient = axios.create({
  baseURL,
  paramsSerializer: params =>
    qs.stringify(params, { arrayFormat: "repeat" })
})

scheduleClient.interceptors.request.use(config => {
  config.params = {
    teamId: defaultParams.teamId,
    sportId: defaultParams.sportId,
    ...config.params
  };
  return config;
});

export default scheduleClient;
