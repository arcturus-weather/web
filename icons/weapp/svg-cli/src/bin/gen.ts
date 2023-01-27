import { getConfig } from '../libs/config';
import { generateComponent } from '../libs/gen';

const config = getConfig();

generateComponent(config);

