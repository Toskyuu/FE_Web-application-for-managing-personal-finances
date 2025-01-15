import {Meta, StoryObj} from '@storybook/react';
import DropDownMenu from "./DropDownMenu.tsx";


const meta: Meta<typeof DropDownMenu> = {
    title: 'Components/DropDownMenu',
    component: DropDownMenu,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DropDownMenu>;

export const BasicUsage: Story = {
    args: {
        options: [
            {
                label: "Option 1",
                onClick: () => alert("Option 1 clicked!"),
            },
            {
                label: "Option 2",
                onClick: () => alert("Option 2 clicked!"),
            },
            {
                label: "Option 3",
                onClick: () => alert("Option 3 clicked!"),
            },
        ],
    },
};