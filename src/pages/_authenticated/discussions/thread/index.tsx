import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/discussions/thread' />;

export const Route = createFileRoute('/_authenticated/discussions/thread/')({
  component: LearningModulePage
});
