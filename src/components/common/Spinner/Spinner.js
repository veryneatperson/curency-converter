import React from 'react';
import {
  Segment, Dimmer, Loader, Image,
} from 'semantic-ui-react';

import shortParagraph from './short-paragraph.png';

const Spinner = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader size="massive" className="loadingIndicator">Loading</Loader>
    </Dimmer>
    <Image src={shortParagraph} />
    <Image src={shortParagraph} />
    <Image src={shortParagraph} />
    <Image src={shortParagraph} />
    <Image src={shortParagraph} />
    <Image src={shortParagraph} />
  </Segment>
);

export default Spinner;
