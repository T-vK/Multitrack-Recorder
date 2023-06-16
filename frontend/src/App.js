import React from "react";

// "global" ui-config
import { UIMetaProvider, useUIMeta } from '@ui-schema/ui-schema/UIMeta';
// for data-stores / data-binding
import { UIStoreProvider, createEmptyStore, createStore } from '@ui-schema/ui-schema/UIStore';
import { storeUpdater } from '@ui-schema/ui-schema/storeUpdater';

// util for `PluginStack` rendering
import { injectPluginStack } from '@ui-schema/ui-schema/applyPluginStack';

// for validity checking
import { isInvalid } from '@ui-schema/ui-schema/ValidityReporter';
// for deep immutables
import { createOrderedMap } from '@ui-schema/ui-schema/Utils/createMap';
// for `t` keyword support / basic in-schema translation
import { relTranslator } from '@ui-schema/ui-schema/Translate/relT';

// import the widgets for your design-system.
import { widgets } from "@ui-schema/ds-material";

// root-level grid container
import { GridContainer } from "@ui-schema/ds-material/GridContainer";
import {Table} from '@ui-schema/ds-material/Widgets/Table';

import testSchema from './schemas/Test.json'
import devicesSchema from './schemas/AudioInputDevices.json'

// Empty Demo Schema & Data/Values
// Minimal Schema, transformed from JS-Object into deep immutable
const schema = createOrderedMap(testSchema);

const tableSchema = createOrderedMap(devicesSchema);

const values = {};

// wire up the grid container component with the render engine:
const GridStack = injectPluginStack(GridContainer)

const Generator = () => {
    // Create a state with the data, transforming into immutable on first mount
    const [store, setStore] = React.useState(() => createStore(createOrderedMap(values)));

    // or create empty store, based on the schema type:
    // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));

    const onChange = React.useCallback((actions) => {
        setStore(storeUpdater(actions))
    }, [setStore])

    return (
        // move `UIMetaProvider` somewhere higher in your app
        <UIMetaProvider
            widgets={widgets}
            t={relTranslator}
        >
            <UIStoreProvider
                store={store}
                onChange={onChange}
                showValidity={true}
            >
                <GridStack isRoot schema={schema}/>

            </UIStoreProvider>
        </UIMetaProvider>
    )
};

export default Generator