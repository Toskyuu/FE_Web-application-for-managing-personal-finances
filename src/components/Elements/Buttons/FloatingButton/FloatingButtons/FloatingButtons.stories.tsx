import {Meta, StoryObj} from '@storybook/react';
import FloatingButtons from "./FloatingButtons.tsx";
import {ModalProvider} from "@/providers/ModalProvider.tsx";

const meta: Meta<typeof FloatingButtons> = {
    title: 'Components/FloatingButtons',
    component: FloatingButtons,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ModalProvider>
                <Story />
            </ModalProvider>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof FloatingButtons>;

export const BasicUsage: Story = {
};