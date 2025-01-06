import { Meta, StoryFn } from '@storybook/react';
import DefaultButton from "./DefaultButton.tsx";

export default {
    title: 'Components/DefaultButton',
    component: DefaultButton,
} as Meta<typeof DefaultButton>;

const Template: StoryFn<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
