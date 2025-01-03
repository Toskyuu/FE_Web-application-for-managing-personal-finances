import { Meta, StoryFn } from '@storybook/react';
import Label from "./FloatingButtonLabel";

export default {
    title: 'Components/Label',
    component: Label,
} as Meta<typeof Label>;

const Template: StoryFn<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Sample Label',
};
