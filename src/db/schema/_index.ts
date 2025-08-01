import * as authSchema from '@/db/schema/auth/_index';

import * as projectSchema from './projects';

export const schema = {
  ...authSchema,
  ...projectSchema
};
