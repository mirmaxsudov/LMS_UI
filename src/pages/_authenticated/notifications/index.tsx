import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/notifications' />;

export const Route = createFileRoute('/_authenticated/notifications/')({
  component: LearningModulePage
});
