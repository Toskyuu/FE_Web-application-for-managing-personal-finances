import {Meta, StoryObj} from '@storybook/react';
import Loader from './Loader.tsx';

const meta: Meta<typeof Loader> = {
    title: 'Components/Loader',
    component: Loader,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const BasicUsage: Story = {};

