import {Meta, StoryObj} from '@storybook/react';
import DefaultButton from "./DefaultButton.tsx";

const meta: Meta<typeof DefaultButton> = {
    title: 'Components/DefaultButton',
    component: DefaultButton,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DefaultButton>;

export const BasicUsage: Story = {
    args: {
        text: 'Click Me',
        onClick: () => alert('Button clicked!'),
        color: 'text-text-dark',
        bgColor: 'bg-success',
        fontSize: 'text-lg',
        padding: 'p-3',
        radius: 'rounded-xl',
        minwidth: 'min-w-40',
    },
};