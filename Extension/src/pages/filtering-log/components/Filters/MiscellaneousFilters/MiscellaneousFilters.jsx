import React, { useContext, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { Icon } from '../../../../common/components/ui/Icon';
import { rootStore } from '../../../stores/RootStore';
import { reactTranslator } from '../../../../reactCommon/reactTranslator';
import { MISCELLANEOUS_FILTERS, REQUEST_SOURCE_FILTERS } from '../../../stores/LogStore';

import './miscellaneous-filters.pcss';

const MiscellaneousFilters = observer(() => {
    const [showPopup, setShowPopup] = useState(false);

    const ref = useRef(null);

    const { logStore } = useContext(rootStore);
    const { miscellaneousFilters, requestSourceFilter } = logStore;

    const filtersCheckboxHandler = (filter) => (e) => {
        logStore.setMiscellaneousFilterValue(filter, e.target.checked);
    };

    const requestSourceFilterClickHandler = (e) => {
        logStore.setRequestSourceFilterValue(e.target.value);
    };

    const hidePopup = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowPopup(false);
            document.removeEventListener('click', hidePopup);
        }
    };

    const miscellaneousFiltersButtonHandler = () => {
        if (!showPopup) {
            setShowPopup(true);
            document.addEventListener('click', hidePopup);
        }
    };

    const filtersClassNames = (name, value) => cn(
        name,
        { active: value },
    );

    const checkboxFilters = [
        {
            id: MISCELLANEOUS_FILTERS.REGULAR,
            text: reactTranslator.translate('filtering_log_filter_regular'),
        },
        {
            id: MISCELLANEOUS_FILTERS.ALLOWLISTED,
            text: reactTranslator.translate('filtering_log_filter_allowlisted'),
        },
        {
            id: MISCELLANEOUS_FILTERS.BLOCKED,
            text: reactTranslator.translate('filtering_log_filter_blocked'),
        },
        {
            id: MISCELLANEOUS_FILTERS.MODIFIED,
            text: reactTranslator.translate('filtering_log_filter_modified'),
        },
        {
            id: MISCELLANEOUS_FILTERS.USER_FILTER,
            text: reactTranslator.translate('filtering_log_filter_user_rule'),
        },
    ];

    const renderCheckboxFilters = () => {
        return checkboxFilters.map(({ id, text }) => {
            return (
                <label key={id} className="checkbox-label" htmlFor={id}>
                    <input
                        type="checkbox"
                        id={id}
                        name={id}
                        onClick={filtersCheckboxHandler(id)}
                        value={miscellaneousFilters[id]}
                        checked={miscellaneousFilters[id]}
                    />
                    <div className="custom-checkbox">
                        <Icon id="#checked" classname="icon--checked" />
                    </div>
                    {text}
                </label>
            );
        });
    };

    const requestSourceFilters = [
        {
            id: REQUEST_SOURCE_FILTERS.ALL,
            text: reactTranslator.translate('filtering_log_filter_all'),
        },
        {
            id: REQUEST_SOURCE_FILTERS.FIRST_PARTY,
            text: reactTranslator.translate('filtering_log_filter_first_party'),
        },
        {
            id: REQUEST_SOURCE_FILTERS.THIRD_PARTY,
            text: reactTranslator.translate('filtering_log_filter_third_party'),
        },
    ];

    const renderRequestSourceFilters = () => {
        return requestSourceFilters.map(({ id, text }) => {
            return (
                <label key={id} className="radio-button-label" htmlFor={id}>
                    <input
                        type="radio"
                        id={id}
                        name="request-source-filter"
                        onClick={requestSourceFilterClickHandler}
                        value={id}
                        checked={requestSourceFilter === id}
                    />
                    <div className="radio-button" />
                    {text}
                </label>
            );
        });
    };

    return (
        <div className="miscellaneous-filters">
            <button
                className="miscellaneous-filters__button"
                type="button"
                onClick={miscellaneousFiltersButtonHandler}
            >
                <Icon id="#filters" classname="icon--filters miscellaneous-filters__filters-ico" />
                {reactTranslator.translate('filtering_log_filter_title')}
                <Icon id="#select" classname="icon--select miscellaneous-filters__select-ico" />
            </button>
            <div className={filtersClassNames('miscellaneous-filters__filters', showPopup)} ref={ref}>
                <div className="miscellaneous-filters__section">
                    {renderCheckboxFilters()}
                </div>
                <div className="hrow" />
                <div className="miscellaneous-filters__section">
                    {renderRequestSourceFilters()}
                </div>
            </div>
        </div>
    );
});

export { MiscellaneousFilters };
