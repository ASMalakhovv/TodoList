import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {store} from "../redux/store";
import {Provider} from "react-redux";


export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}>
    <AppWithRedux/>
</Provider>;

export const AppWithReduxStory = Template.bind({});


