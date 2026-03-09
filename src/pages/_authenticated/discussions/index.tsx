import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/discussions' />;

export const Route = createFileRoute('/_authenticated/discussions/')({
  component: LearningModulePage
});
