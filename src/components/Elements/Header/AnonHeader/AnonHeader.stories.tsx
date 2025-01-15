import AnonHeader from "./AnonHeader.tsx";
import {Meta, StoryObj} from '@storybook/react';


const meta: Meta<typeof AnonHeader> = {
    title: 'Components/AnonHeader',
    component: AnonHeader,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AnonHeader>;

export const BasicUsage: Story = {};
