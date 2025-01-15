import {Meta, StoryObj} from '@storybook/react';
import FloatingActionButton from './FloatingActionButton.tsx';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof FloatingActionButton> = {
    title: 'Components/FloatingActionButton',
    component: FloatingActionButton,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FloatingActionButton>;

export const BasicUsage: Story = {
    args: {
        color: 'text-text-dark',
        bgColor: 'bg-success',
        onClick: () => alert('Button clicked!'),
        label: 'Click me',
        icon: faPlus,
    },
};
