import React from "react";

// Components
import Button from "src/components/Board/BoardDetails/Button";

export default props => {
  return (
    <div className="board-details">
      <Button>
        <h1>{props.board.name}</h1>
      </Button>

      <Button>
        <i className="far fa-star"></i>
      </Button>

      <Button>
        {props.board.personal ?
          <span>Personal</span>

          :

          <span>Team</span>
        }
      </Button>

      <Button>
        <i className="fas fa-suitcase"></i>
        {props.board.private ?
          <span>Private</span>

          :

          <span>Open</span>
        }
      </Button>
    </div>
  );
}
