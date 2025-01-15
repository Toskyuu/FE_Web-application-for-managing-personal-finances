import {Meta, StoryObj} from "@storybook/react";
import Toast from "./Toast.tsx";

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const BasicUsage: Story = {
    args: {
        message: 'Powiadomienie',
        type: 'success',
        onClose: () => {},
    }
};