import {Meta, StoryObj} from '@storybook/react';
import MainCard from "./MainCard.tsx";


const meta: Meta<typeof MainCard> = {
    title: 'Components/MainCard',
    component: MainCard,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainCard>;

export const BasicUsage: Story = {
    args: {
        fontSize: 'text-lg',
        padding: 'p-3',
        height: 'h-auto',
        width: 'w-auto',
        children: 'Hello World',
    }
};