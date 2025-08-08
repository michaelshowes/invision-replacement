import * as authSchema from '@/db/schema/auth/_index';

import * as screenSchema from './screen';
import * as sectionSchema from './section';

export const schema = {
  ...authSchema,
  ...sectionSchema,
  ...screenSchema
};
