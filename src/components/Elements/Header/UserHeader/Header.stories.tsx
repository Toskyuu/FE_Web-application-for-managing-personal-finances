import { Meta, StoryFn } from '@storybook/react';
import Header from './Header.tsx';

export default {
    title: 'Components/Header',
    component: Header,
} as Meta;

const Template: StoryFn = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
};
