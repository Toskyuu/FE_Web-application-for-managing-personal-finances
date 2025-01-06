import { Meta, StoryFn } from '@storybook/react';
import AnonHeader from "./AnonHeader.tsx";

export default {
    title: 'Components/AnonHeader',
    component: AnonHeader,
} as Meta;

const Template: StoryFn = (args) => <AnonHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
};
