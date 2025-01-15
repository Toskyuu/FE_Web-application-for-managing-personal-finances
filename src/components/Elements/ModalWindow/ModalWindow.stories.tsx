import {Meta, StoryObj} from "@storybook/react";
import ModalWindow from "./ModalWindow.tsx";
import {ModalProvider} from "@/providers/ModalProvider.tsx";
import {useModal} from "@/hooks/useModal.tsx";


const meta: Meta = {
    title: "Components/ModalWindow",
    component: ModalWindow,
    parameters: {
        layout: "centered",
        controls: {expanded: true},
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ModalProvider>
                <Story/>
            </ModalProvider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ModalWindow>;

export const BasicUsage: Story = {
        render: () => {
            const {openModal} = useModal();
            return (
                <>
                    <button onClick={() => openModal(<div>Custom Modal Content</div>)}
                            className="bg-success p-3 rounded-2xl">
                        Open Modal
                    </button>
                    <ModalWindow/>
                </>
        )
            ;
        },
    }
;
