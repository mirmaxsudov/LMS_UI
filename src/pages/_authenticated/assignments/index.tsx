import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/assignments' />;

export const Route = createFileRoute('/_authenticated/assignments/')({
  component: LearningModulePage
});
