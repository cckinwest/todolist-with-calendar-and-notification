import React from 'react';
import {Card} from 'react-bootstrap';

function Day({date}) {
    return (<Card style={{ width: "14%" }}>
        <Card.Body>
          <Card.Title>{date}</Card.Title>
        </Card.Body>
      </Card>)
}

export default Day;