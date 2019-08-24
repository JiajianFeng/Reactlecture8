import React from 'react';
import { useRouter } from 'next/router';
import CourseDetail from '../../../components/CourseDetail';
import withLayout from '../../../lib/withLayout';

function Detail({ user }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <CourseDetail id={id} user={user} />
    </div>
  );
}

export default withLayout(Detail);
