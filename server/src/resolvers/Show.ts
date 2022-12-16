import { ShowResolvers } from './types';
import { prop } from './helpers';

const resolvers: ShowResolvers = {
  description: ({ description, html_description }, { format }) => {
    return format === 'HTML' ? html_description : description;
  },
  externalUrls: prop('external_urls'),
  isExternallyHosted: prop('is_externally_hosted'),
  mediaType: prop('media_type'),
};

export default resolvers;
