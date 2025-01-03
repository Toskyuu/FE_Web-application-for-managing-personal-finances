import { Meta, StoryFn } from '@storybook/react';
import FloatingActionButton from "./FloatingActionButton.tsx";

export default {
    title: 'Components/FloatingActionButton',
    component: FloatingActionButton,
} as Meta<typeof FloatingActionButton>;

const Template: StoryFn<typeof FloatingActionButton> = (args) => <FloatingActionButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
