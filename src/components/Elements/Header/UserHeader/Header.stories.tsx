import {Meta, StoryObj} from '@storybook/react';
import Header from './Header.tsx';

const meta: Meta<typeof Header> = {
    title: 'Components/Header',
    component: Header,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const BasicUsage: Story = {};

