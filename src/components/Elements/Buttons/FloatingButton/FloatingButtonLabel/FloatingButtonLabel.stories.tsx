import {Meta, StoryObj} from '@storybook/react';
import FloatingButtonLabel from "./FloatingButtonLabel.tsx";

const meta: Meta<typeof FloatingButtonLabel> = {
    title: 'Components/FloatingButtonLabel',
    component: FloatingButtonLabel,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FloatingButtonLabel>;

export const BasicUsage: Story = {
    args: {
        label: 'text',
        color: 'text-text-dark',
        bgColor: 'bg-primary',
    },
};
