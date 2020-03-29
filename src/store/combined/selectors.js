import { getBaseCurrencyLoading } from '../user/selectors';
import { getRatesLoading } from '../rates/selectors';

const getIsLoading = (state) => getBaseCurrencyLoading(state) || getRatesLoading(state);

export default getIsLoading;
