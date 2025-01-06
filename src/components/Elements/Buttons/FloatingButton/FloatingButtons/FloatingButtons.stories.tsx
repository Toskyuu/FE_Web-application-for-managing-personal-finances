import { Meta, StoryFn } from '@storybook/react';
import FloatingButtons from "./FloatingButtons.tsx";

export default {
    title: 'Components/FloatingActionButton',
    component: FloatingButtons,
} as Meta<typeof FloatingButtons>;

const Template: StoryFn<typeof FloatingButtons> = (args) => <FloatingButtons {...args} />;

export const Default = Template.bind({});
Default.args = {};
