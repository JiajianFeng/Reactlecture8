import React from 'react';
import withLayout from '../../lib/withLayout';
import SubscriptionCourses from '../../components/SubscriptionCourses';

function Subscriptions(props) {
  return (
    <div>
      <SubscriptionCourses {...props} />
    </div>
  );
}

export default withLayout(Subscriptions);
