import { createFileRoute } from '@tanstack/react-router';

import { LearningModulesExample } from '../-components/LearningModulesExample';

const LearningModulePage = () => <LearningModulesExample activeUrl='/certificates' />;

export const Route = createFileRoute('/_authenticated/certificates/')({
  component: LearningModulePage
});
