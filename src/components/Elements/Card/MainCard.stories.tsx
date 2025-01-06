import { Meta, StoryFn } from '@storybook/react';
import MainCard from "@/components/Elements/Card/MainCard.tsx";

export default {
    title: 'Components/MainCard',
    component: MainCard,
} as Meta<typeof MainCard>;

const Template: StoryFn<typeof MainCard> = (args) => <MainCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
