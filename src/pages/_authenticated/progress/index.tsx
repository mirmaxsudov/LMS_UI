import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/progress' />;

export const Route = createFileRoute('/_authenticated/progress/')({
  component: LearningModulePage
});
