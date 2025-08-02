import * as authSchema from '@/db/schema/auth/_index';

import * as sectionSchema from './section';

export const schema = {
  ...authSchema,
  ...sectionSchema
};
