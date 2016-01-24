import { translate as $t } from '../../helpers';

import SelectWithDefault from './SelectWithDefault';

export default class OpCatChartTypeSelect extends SelectWithDefault {

    constructor(props) {
        let options = [
            <option key="all" value="all">{ $t('client.charts.all_types') }</option>,
            <option key="positive" value="positive">{ $t('client.charts.positive') }</option>,
            <option key="negative" value="negative">{ $t('client.charts.negative') }</option>
        ];
        super(props, options);
    }

}
