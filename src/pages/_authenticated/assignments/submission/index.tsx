import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/assignments/submission' />;

export const Route = createFileRoute('/_authenticated/assignments/submission/')({
  component: LearningModulePage
});
