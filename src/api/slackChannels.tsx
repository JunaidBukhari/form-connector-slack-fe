import { useQuery } from 'react-query';
import axios from 'axios';
import queryKeys from '../constants/queryKeys';
import { environment } from '../constants/environment';
import { channel } from '../constants/interface';

export const useGetSlackChannels = () => {
  return useQuery(
    queryKeys.getSlackChannels(),
    async () => {
      const response = await axios.get(
        `${environment.VITE_SLACK_API_ENDPOINT}/channels`,
        {
          headers: {
            Authorization: `Bearer ${environment.VITE_SLACK_TOKEN}`,
          },
        }
      );
      return response.data.data as channel[];
    },
    {
      onError: (error: Error & { status: number }) => {
        console.error('Error fetching Slack channels:', error);
      },
      staleTime: 60000,
    }
  );
};
