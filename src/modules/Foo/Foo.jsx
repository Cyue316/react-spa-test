import React from 'react';
import './Foo.less';
import Bar from 'components/Bar/Bar';

const Foo = (props) => {
  return(
      <div className="foo">I'm Foo module!
        <Bar/>
      </div>
  )
};

export default Foo