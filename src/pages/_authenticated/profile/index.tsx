import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/profile' />;

export const Route = createFileRoute('/_authenticated/profile/')({
  component: LearningModulePage
});
